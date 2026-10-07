"use client";

import { useEffect, useRef } from "react";
import { createLattice, type Point } from "./graphene";

/*
 * Rede de grafeno viva: os átomos vibram numa onda (como as vibrações reais
 * da rede cristalina) e as ligações acompanham. Uma corrente de hexágonos
 * acesos percorre a rede. Atualiza o SVG direto pelos refs, sem re-render.
 */

const lattice = createLattice(6, 4, 30);
const AMPLITUDE = 2.6;
const PERIOD = 4200;
const STEP_MS = 650;
const TRAIL = 3;

/* Caminho da corrente: um laço de hexágonos vizinhos pelo meio da rede. */
const route = ["0,1", "1,1", "2,1", "3,1", "4,1", "5,1", "5,2", "4,2", "3,2", "2,2", "1,2", "0,2"];
const cellIndex = new Map(lattice.cells.map((cell, index) => [`${cell.col},${cell.row}`, index]));
const routeCells = route.map((id) => cellIndex.get(id)!).filter((index) => index !== undefined);

function displace(p: Point, t: number): Point {
  const phase = (t / PERIOD) * Math.PI * 2;
  return {
    x: p.x + AMPLITUDE * Math.sin(phase + p.y * 0.05 + p.x * 0.02),
    y: p.y + AMPLITUDE * Math.cos(phase * 0.8 + p.x * 0.045),
  };
}

const fmt = (n: number) => n.toFixed(2);
const pointsAttr = (points: Point[], t: number) =>
  points.map((p) => displace(p, t)).map((p) => `${fmt(p.x)},${fmt(p.y)}`).join(" ");

export function GrapheneMotion() {
  const bondsRef = useRef<SVGPathElement>(null);
  const cellsRef = useRef<(SVGPolygonElement | null)[]>([]);
  const atomsRef = useRef<(SVGCircleElement | null)[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    function draw(t: number) {
      let d = "";
      for (const [a, b] of lattice.bondPairs) {
        const pa = displace(a, t);
        const pb = displace(b, t);
        d += `M${fmt(pa.x)} ${fmt(pa.y)}L${fmt(pb.x)} ${fmt(pb.y)}`;
      }
      bondsRef.current?.setAttribute("d", d);

      const head = Math.floor(t / STEP_MS) % routeCells.length;
      lattice.cells.forEach((cell, index) => {
        const el = cellsRef.current[index];
        if (!el) return;
        el.setAttribute("points", pointsAttr(cell.points, t));
        const behind = routeCells.findIndex((_, k) => routeCells[(head - k + routeCells.length) % routeCells.length] === index);
        el.style.opacity = behind >= 0 && behind < TRAIL ? String(1 - behind / TRAIL) : "0";
      });

      lattice.atoms.forEach((atom, index) => {
        const el = atomsRef.current[index];
        if (!el) return;
        const p = displace(atom, t);
        el.setAttribute("cx", fmt(p.x));
        el.setAttribute("cy", fmt(p.y));
      });
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      draw(0);
      return;
    }

    let frame = 0;
    let running = false;
    const start = performance.now();
    const loop = (now: number) => {
      draw(now - start);
      frame = requestAnimationFrame(loop);
    };

    // Só anima enquanto a rede está na tela.
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true;
        frame = requestAnimationFrame(loop);
      } else if (!entry.isIntersecting && running) {
        running = false;
        cancelAnimationFrame(frame);
      }
    });
    observer.observe(svg);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox={`-8 -8 ${(lattice.width + 16).toFixed(0)} ${(lattice.height + 16).toFixed(0)}`}
      role="img"
      aria-label="Rede de hexágonos do grafeno em movimento, com um átomo de carbono em cada vértice"
    >
      {lattice.cells.map((cell, index) => (
        <polygon
          key={`${cell.col},${cell.row}`}
          ref={(el) => {
            cellsRef.current[index] = el;
          }}
          className="why-glow"
          points={cell.points.map((p) => `${fmt(p.x)},${fmt(p.y)}`).join(" ")}
          style={{ opacity: 0 }}
        />
      ))}
      <path ref={bondsRef} className="why-bonds" d={lattice.bondPath} />
      {lattice.atoms.map((p, index) => (
        <circle
          key={`${p.x.toFixed(1)}-${p.y.toFixed(1)}`}
          ref={(el) => {
            atomsRef.current[index] = el;
          }}
          className="why-atom"
          cx={p.x}
          cy={p.y}
          r={3.6}
        />
      ))}
    </svg>
  );
}

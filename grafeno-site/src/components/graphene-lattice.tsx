import type { CSSProperties } from "react";
import { createLattice } from "./graphene";

/*
 * Rede de grafeno que se monta uma vez ao entrar na tela: os átomos aparecem
 * numa onda da esquerda para a direita, as ligações se desenham entre eles e,
 * por fim, alguns hexágonos acendem. Depois fica parada. Só CSS: o atraso de
 * cada peça sai da posição dela (--d), e o gatilho é o data-revealed do <figure>.
 */

const lattice = createLattice(6, 4, 30);
const lit = new Set(["1,1", "2,2", "3,1", "4,2"]);
const WAVE_S = 1.1;

const delayFor = (x: number, y: number) =>
  `${(((x + y * 0.35) / (lattice.width + lattice.height * 0.35)) * WAVE_S).toFixed(3)}s`;

const fmt = (n: number) => n.toFixed(1);

export function GrapheneLattice() {
  return (
    <svg
      viewBox={`-8 -8 ${(lattice.width + 16).toFixed(0)} ${(lattice.height + 16).toFixed(0)}`}
      role="img"
      aria-label="Rede de hexágonos do grafeno, com um átomo de carbono em cada vértice"
    >
      {lattice.cells
        .filter((cell) => lit.has(`${cell.col},${cell.row}`))
        .map((cell, index) => (
          <polygon
            key={`${cell.col},${cell.row}`}
            className="why-glow"
            points={cell.points.map((p) => `${fmt(p.x)},${fmt(p.y)}`).join(" ")}
            style={{ "--d": `${(WAVE_S + 0.5 + index * 0.15).toFixed(2)}s` } as CSSProperties}
          />
        ))}
      {lattice.bondPairs.map(([a, b]) => (
        <path
          key={`${fmt(a.x)},${fmt(a.y)}-${fmt(b.x)},${fmt(b.y)}`}
          className="why-bond"
          d={`M${fmt(a.x)} ${fmt(a.y)}L${fmt(b.x)} ${fmt(b.y)}`}
          pathLength={1}
          style={{ "--d": delayFor(Math.min(a.x, b.x), Math.min(a.y, b.y)) } as CSSProperties}
        />
      ))}
      {lattice.atoms.map((p) => (
        <circle
          key={`${fmt(p.x)}-${fmt(p.y)}`}
          className="why-atom"
          cx={p.x}
          cy={p.y}
          r={3.6}
          style={{ "--d": delayFor(p.x, p.y) } as CSSProperties}
        />
      ))}
    </svg>
  );
}

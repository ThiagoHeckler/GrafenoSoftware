"use client";

import { useEffect, useRef, type PointerEvent, type ReactNode } from "react";

/*
 * Lâminas de vidro que inclinam na direção do mouse e refletem a luz onde ele
 * está. Cada .glass-pane recebe --rx/--ry (inclinação) e --mx/--my (reflexo);
 * o CSS faz o resto. Só com mouse e sem movimento reduzido: no toque, as
 * lâminas ficam paradas.
 */

const TILT_X = 7;
const TILT_Y = 9;

export function GlassTilt({ as: Tag = "ul", className, children }: { as?: "ul" | "div"; className?: string; children: ReactNode }) {
  const enabled = useRef(false);
  const active = useRef<HTMLElement | null>(null);
  const frame = useRef(0);

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const update = () => { enabled.current = query.matches; };
    update();
    query.addEventListener("change", update);
    return () => {
      query.removeEventListener("change", update);
      cancelAnimationFrame(frame.current);
    };
  }, []);

  function release() {
    const pane = active.current;
    if (!pane) return;
    pane.removeAttribute("data-active");
    pane.style.removeProperty("--rx");
    pane.style.removeProperty("--ry");
    active.current = null;
  }

  function handleMove(event: PointerEvent<HTMLElement>) {
    if (!enabled.current || event.pointerType !== "mouse") return;
    const pane = (event.target as Element).closest<HTMLElement>(".glass-pane");
    if (pane !== active.current) release();
    if (!pane) return;
    active.current = pane;

    const { clientX, clientY } = event;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const box = pane.getBoundingClientRect();
      const x = (clientX - box.left) / box.width;
      const y = (clientY - box.top) / box.height;
      pane.setAttribute("data-active", "");
      pane.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
      pane.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
      pane.style.setProperty("--rx", `${((0.5 - y) * TILT_X).toFixed(2)}deg`);
      pane.style.setProperty("--ry", `${((x - 0.5) * TILT_Y).toFixed(2)}deg`);
    });
  }

  function handleLeave() {
    cancelAnimationFrame(frame.current);
    release();
  }

  return (
    <Tag className={className} onPointerMove={handleMove} onPointerLeave={handleLeave}>
      {children}
    </Tag>
  );
}

import { createLattice } from "./graphene";

/*
 * Malha atrás das lâminas de vidro. O grafeno deixa passar 97,7% da luz, então
 * os cartões são vidro: a malha aparece nítida entre eles e desfocada por baixo,
 * e os hexágonos acesos viram manchas de luz através do vidro. Cores em
 * --vidro-malha e --vidro-aceso, para cada seção ajustar ao próprio fundo.
 */
export function GlassBackdrop({ cols, rows, side = 34, lit }: { cols: number; rows: number; side?: number; lit: string[] }) {
  const lattice = createLattice(cols, rows, side);
  const litCells = new Set(lit);

  return (
    <svg
      className="glass-backdrop"
      viewBox={`0 0 ${lattice.width.toFixed(0)} ${lattice.height.toFixed(0)}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {lattice.cells
        .filter((cell) => litCells.has(`${cell.col},${cell.row}`))
        .map((cell) => (
          <polygon
            key={`${cell.col},${cell.row}`}
            className="glass-backdrop-glow"
            points={cell.points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ")}
          />
        ))}
      <path className="glass-backdrop-bond" d={lattice.bondPath} />
    </svg>
  );
}

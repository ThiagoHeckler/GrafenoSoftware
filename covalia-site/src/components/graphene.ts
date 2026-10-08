/*
 * Geometria da rede do grafeno: hexágonos de topo plano, um átomo em cada
 * vértice e uma ligação em cada aresta. Usada no herói e em "Por que Covalia".
 */

export type Point = { x: number; y: number };

export function createLattice(cols: number, rows: number, side: number) {
  const h = Math.sqrt(3) * side;
  const keyOf = (p: Point) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`;

  function corner(col: number, row: number, k: number): Point {
    const cx = side + 1.5 * side * col;
    const cy = h / 2 + h * row + (col % 2 ? h / 2 : 0);
    const angle = (Math.PI / 3) * k;
    return { x: cx + side * Math.cos(angle), y: cy + side * Math.sin(angle) };
  }

  const atoms = new Map<string, Point>();
  const bonds = new Map<string, Set<string>>();
  const cells: { col: number; row: number; points: Point[] }[] = [];

  for (let col = 0; col < cols; col++) {
    for (let row = 0; row < rows; row++) {
      const points = Array.from({ length: 6 }, (_, k) => corner(col, row, k));
      cells.push({ col, row, points });
      points.forEach((a, k) => {
        const b = points[(k + 1) % 6];
        const ka = keyOf(a);
        const kb = keyOf(b);
        atoms.set(ka, a);
        atoms.set(kb, b);
        if (!bonds.has(ka)) bonds.set(ka, new Set());
        if (!bonds.has(kb)) bonds.set(kb, new Set());
        bonds.get(ka)!.add(kb);
        bonds.get(kb)!.add(ka);
      });
    }
  }

  const seen = new Set<string>();
  const bondPairs: [Point, Point][] = [];
  let bondPath = "";
  for (const [ka, neighbours] of bonds) {
    for (const kb of neighbours) {
      const id = ka < kb ? `${ka}|${kb}` : `${kb}|${ka}`;
      if (seen.has(id)) continue;
      seen.add(id);
      const a = atoms.get(ka)!;
      const b = atoms.get(kb)!;
      bondPairs.push([a, b]);
      bondPath += `M${a.x.toFixed(1)} ${a.y.toFixed(1)}L${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
    }
  }

  /** Caminho mais curto pelas ligações entre dois vértices (busca em largura). */
  function route(from: Point, to: Point): Point[] {
    const start = keyOf(from);
    const end = keyOf(to);
    const previous = new Map<string, string | null>([[start, null]]);
    const queue = [start];
    while (queue.length) {
      const current = queue.shift()!;
      if (current === end) break;
      for (const next of bonds.get(current) ?? []) {
        if (!previous.has(next)) {
          previous.set(next, current);
          queue.push(next);
        }
      }
    }
    const path: Point[] = [];
    for (let step: string | null | undefined = end; step; step = previous.get(step)) path.unshift(atoms.get(step)!);
    return path;
  }

  return {
    width: side * 2 + 1.5 * side * (cols - 1),
    height: h * rows + h / 2,
    atoms: [...atoms.values()],
    cells,
    bondPath,
    bondPairs,
    corner,
    route,
  };
}

export const toPath = (points: Point[]) =>
  points.map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join("");

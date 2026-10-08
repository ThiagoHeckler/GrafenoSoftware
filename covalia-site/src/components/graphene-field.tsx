import { createLattice, toPath } from "./graphene";

/*
 * Fundo do herói: a rede inteira em traço fino e três correntes verdes
 * que se desenham uma vez no carregamento, ligando as bordas aos aparelhos.
 */
const lattice = createLattice(16, 9, 38);
const c = lattice.corner;

const currents = [
  lattice.route(c(0, 7, 3), c(7, 4, 3)),
  lattice.route(c(8, 0, 4), c(10, 4, 0)),
  lattice.route(c(15, 8, 0), c(11, 5, 1)),
];

const lit = currents.flat();

export function GrapheneField() {
  return (
    <svg
      className="graphene-field"
      viewBox={`0 0 ${lattice.width.toFixed(0)} ${lattice.height.toFixed(0)}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <path className="field-bonds" d={lattice.bondPath} />
      {currents.map((points, index) => (
        <path key={index} className="field-current" d={toPath(points)} pathLength={1} style={{ animationDelay: `${0.2 + index * 0.35}s` }} />
      ))}
      {lit.map((p, index) => (
        <circle key={index} className="field-atom" cx={p.x} cy={p.y} r={3.2} />
      ))}
    </svg>
  );
}

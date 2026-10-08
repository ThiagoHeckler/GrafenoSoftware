import Link from "next/link";

const bonds = "M40.5 17.28 L23.5 17.28 L15 32 L23.5 46.72 L40.5 46.72";
const atoms = [[40.5, 46.72], [23.5, 46.72], [15, 32], [23.5, 17.28], [40.5, 17.28]];

/** Anel de carbono aberto em "C": o átomo solto é a ligação que se completa com o cliente. */
export function BrandMark({ size = 40 }: { size?: number }) {
  return (
    <svg className="brand-mark" viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <polygon className="brand-mark-bg" points="16,6 48,6 62,32 48,58 16,58 2,32" />
      <path className="brand-mark-bond" d={bonds} />
      {atoms.map(([x, y]) => (
        <circle key={`${x}-${y}`} className="brand-mark-atom" cx={x} cy={y} r={3.7} />
      ))}
      <circle className="brand-mark-free" cx={49} cy={32} r={4.6} />
    </svg>
  );
}

export function Brand() {
  return (
    <Link className="brand" href="/" aria-label="Covalia Software, página inicial">
      <BrandMark />
      <span className="brand-name" translate="no">
        covalia<span>software</span>
      </span>
    </Link>
  );
}

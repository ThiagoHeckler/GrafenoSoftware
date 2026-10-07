import Link from "next/link";

const ring = "45,32 38.5,43.3 25.5,43.3 19,32 25.5,20.7 38.5,20.7";
const atoms = ring.split(" ").map((pair) => pair.split(",").map(Number));

/** Um anel de carbono com três ligações saindo: o menor pedaço reconhecível de grafeno. */
export function BrandMark({ size = 40 }: { size?: number }) {
  return (
    <svg className="brand-mark" viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <polygon className="brand-mark-bg" points="16,6 48,6 62,32 48,58 16,58 2,32" />
      <polygon className="brand-mark-bond" points={ring} />
      <path className="brand-mark-bond" d="M45 32h9M25.5 43.3 21 51.1M25.5 20.7 21 12.9" />
      {atoms.map(([x, y]) => (
        <circle key={`${x}-${y}`} className="brand-mark-atom" cx={x} cy={y} r={3.4} />
      ))}
    </svg>
  );
}

export function Brand() {
  return (
    <Link className="brand" href="/" aria-label="Grafeno Software, página inicial">
      <BrandMark />
      <span className="brand-name" translate="no">
        grafeno<span>software</span>
      </span>
    </Link>
  );
}

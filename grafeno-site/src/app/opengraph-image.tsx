import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { createLattice, toPath } from "@/components/graphene";

/*
 * Imagem de compartilhamento (WhatsApp, LinkedIn, redes): a rede do grafeno
 * no fundo escuro, com uma corrente verde atravessando, e a chamada do herói.
 * Gerada no build; as subpáginas herdam esta imagem.
 */

export const alt = "Grafeno Software: sites, aplicativos e sistemas que fazem seu negócio andar.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const fontDir = join(process.cwd(), "assets/fonts");
const [unbounded, figtree500, icon] = await Promise.all([
  readFile(join(fontDir, "unbounded-600.ttf")),
  readFile(join(fontDir, "figtree-500.ttf")),
  readFile(join(process.cwd(), "src/app/icon.svg"), "base64"),
]);

const lattice = createLattice(16, 7, 52);
const c = lattice.corner;
const current = lattice.route(c(14, 6, 1), c(9, 0, 4));
const latticeSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${lattice.width.toFixed(0)} ${lattice.height.toFixed(0)}">
  <path d="${lattice.bondPath}" fill="none" stroke="#1f3a34" stroke-width="1.6"/>
  <path d="${toPath(current)}" fill="none" stroke="#2bd497" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  ${current.map((p) => `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="6" fill="#2bd497"/>`).join("")}
</svg>`;
const latticeSrc = `data:image/svg+xml;base64,${Buffer.from(latticeSvg).toString("base64")}`;

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#0c1715", fontFamily: "Figtree" }}>
        <img src={latticeSrc} alt="" width={lattice.width} height={lattice.height} style={{ position: "absolute", top: 0, left: 0 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, #0c1715 30%, rgba(12,23,21,0.6) 62%, rgba(12,23,21,0) 85%)" }} />
        <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "72px 80px", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <img src={`data:image/svg+xml;base64,${icon}`} alt="" width={64} height={64} />
            <span style={{ display: "flex", alignItems: "baseline", fontFamily: "Unbounded", fontSize: 32, letterSpacing: -1, color: "#e6f0ed" }}>
              grafeno
              <span style={{ marginLeft: 10, fontFamily: "Figtree", fontWeight: 500, letterSpacing: 0, color: "#9fb5af" }}>software</span>
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
            <span style={{ fontFamily: "Unbounded", fontSize: 58, lineHeight: 1.1, letterSpacing: -2, color: "#e6f0ed", maxWidth: 760 }}>
              Sites, aplicativos e sistemas que fazem seu negócio andar.
            </span>
            <span style={{ fontSize: 28, color: "#9fb5af" }}>
              Software sob medida, do primeiro site ao sistema da empresa.
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Unbounded", data: unbounded, weight: 600, style: "normal" },
        { name: "Figtree", data: figtree500, weight: 500, style: "normal" },
              ],
    },
  );
}

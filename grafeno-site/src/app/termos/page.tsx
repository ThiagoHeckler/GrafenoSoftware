import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Termos de uso",
  description: "Termos de uso do site da Covalia Software.",
};

export default function TermsPage() {
  return (
    <article className="legal-page" aria-labelledby="legal-title">
      <h1 id="legal-title">Termos de uso</h1>
      <p className="legal-note">
        Conteúdo demonstrativo. Antes de publicar, substitua este texto pelos termos de uso oficiais
        da Covalia Software.
      </p>
      <p>
        As telas, pedidos e valores mostrados no site são ilustrativos. Para condições reais de
        contratação, <Link className="text-link" href="/orcamento">peça um orçamento</Link>.
      </p>
    </article>
  );
}

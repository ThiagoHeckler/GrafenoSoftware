import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacidade",
  description: "Como a Grafeno Software trata os dados enviados pelo site.",
};

export default function PrivacyPage() {
  return (
    <article className="legal-page" aria-labelledby="legal-title">
      <h1 id="legal-title">Privacidade</h1>
      <p className="legal-note">
        Conteúdo demonstrativo. Antes de publicar, substitua este texto pela política de privacidade
        oficial da Grafeno Software.
      </p>
      <p>
        Nesta versão do site, o formulário de orçamento não envia nem armazena nenhuma informação.
        Dúvidas? <Link className="text-link" href="/orcamento">Fale com a gente</Link>.
      </p>
    </article>
  );
}

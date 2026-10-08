import type { Metadata } from "next";
import Link from "next/link";
import { Callout } from "@/components/callout";
import { GlassBackdrop } from "@/components/glass-backdrop";
import { GlassTilt } from "@/components/glass-tilt";
import { Icon } from "@/components/icon";
import { SolutionArt, type SolutionArtKind } from "@/components/solution-art";

export const metadata: Metadata = {
  title: "Soluções",
  description: "Sites, aplicativos, sistemas de gestão e integrações sob medida para o seu negócio.",
};

const solutions: {
  id: SolutionArtKind;
  title: string;
  text: string;
  includes: string[];
  good: string;
}[] = [
  {
    id: "sites",
    title: "Sites que trazem cliente",
    text: "Do site institucional à loja virtual: rápido no celular, fácil de achar no Google e com um painel para você mesmo atualizar.",
    includes: ["Site institucional ou landing page", "Loja virtual com Pix, cartão e frete", "Blog e páginas editáveis", "Domínio, hospedagem e e-mail configurados"],
    good: "Para quem quer ser encontrado e vender online.",
  },
  {
    id: "aplicativos",
    title: "Aplicativos que seus clientes usam",
    text: "Apps para Android e iPhone com a sua marca: agendamento, pedidos, área do cliente, programa de fidelidade.",
    includes: ["App para Android e iPhone", "Login, notificações e pagamentos", "Painel para gerenciar o conteúdo", "Publicação na Play Store e App Store"],
    good: "Para quem quer estar no bolso do cliente.",
  },
  {
    id: "sistemas",
    title: "Sistemas que organizam a empresa",
    text: "Sistemas web sob medida para vendas, estoque, financeiro, agenda e equipe. Funciona no navegador, sem instalar nada.",
    includes: ["Cadastros e fluxos do seu jeito", "Relatórios e painéis", "Permissões por usuário", "Importação das planilhas atuais"],
    good: "Para quem cansou de planilha e de sistema que não serve.",
  },
  {
    id: "integracoes",
    title: "Integrações e automações",
    text: "Ligamos as ferramentas que você já usa para os dados correrem sozinhos de uma ponta à outra.",
    includes: ["Emissão de NF-e e NFC-e", "Pagamentos e conciliação", "WhatsApp e e-mail automáticos", "Conexão com ERPs e APIs"],
    good: "Para quem digita a mesma informação em três lugares.",
  },
];

export default function SolutionsPage() {
  return (
    <>
      <section className="page-hero" aria-labelledby="page-title">
        <h1 id="page-title">Soluções</h1>
        <p>Quatro jeitos de colocar tecnologia para trabalhar no seu negócio. Dá para começar por um e ligar os outros depois.</p>
        <nav className="page-index" aria-label="Nesta página">
          {solutions.map((item) => (
            <a key={item.id} href={`#${item.id}`}>{item.title.split(" ")[0]}</a>
          ))}
        </nav>
      </section>

      <div className="solutions">
        {solutions.map((item) => (
          <section key={item.id} id={item.id} className="solution" data-reveal aria-labelledby={`${item.id}-title`}>
            <div className="solution-copy">
              <h2 id={`${item.id}-title`}>{item.title}</h2>
              <p>{item.text}</p>
              <p className="solution-good">{item.good}</p>
              <GlassTilt as="div" className="glass-sheets solution-sheets">
                <GlassBackdrop cols={8} rows={4} lit={["1,1", "5,2", "6,0"]} />
                <div className="glass-pane solution-includes">
                  <h3>O que entra</h3>
                  <ul>
                    {item.includes.map((line) => (
                      <li key={line}><Icon name="check" size={18} />{line}</li>
                    ))}
                  </ul>
                  <Link className="btn btn-primary" href="/orcamento">Pedir orçamento</Link>
                </div>
              </GlassTilt>
            </div>
            <SolutionArt kind={item.id} />
          </section>
        ))}
      </div>

      <Callout />
    </>
  );
}

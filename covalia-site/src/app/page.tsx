import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { Callout } from "@/components/callout";
import { GrapheneField } from "@/components/graphene-field";
import { GrapheneWhy } from "@/components/graphene-why";
import { Icon, type IconName } from "@/components/icon";
import { Showcase } from "@/components/showcase";

const services: { icon: IconName; title: string; text: string; items: string[] }[] = [
  {
    icon: "globe",
    title: "Sites",
    text: "Sites institucionais, landing pages e lojas virtuais que carregam rápido e aparecem no Google.",
    items: ["Design próprio, sem cara de modelo", "Painel para editar textos e fotos", "Loja com Pix e cartão"],
  },
  {
    icon: "phone",
    title: "Aplicativos",
    text: "Apps para Android e iPhone que seus clientes instalam e sua equipe usa no dia a dia.",
    items: ["Agendamento, pedidos e fidelidade", "Notificações no celular", "Publicação nas lojas"],
  },
  {
    icon: "chart",
    title: "Sistemas de gestão",
    text: "Sistemas web sob medida para organizar vendas, estoque, clientes e equipe num lugar só.",
    items: ["Relatórios que mostram o que importa", "Acesso por perfil de usuário", "Funciona no navegador, sem instalar"],
  },
  {
    icon: "plug",
    title: "Integrações e automações",
    text: "Ligamos o que você já usa: pagamento, NF-e e NFC-e, WhatsApp, ERP e planilhas.",
    items: ["Fim da digitação repetida", "Nota fiscal emitida sozinha", "Avisos automáticos para clientes"],
  },
];

const pillars: { icon: IconName; title: string; text: string; proof: string[] }[] = [
  {
    icon: "spark",
    title: "Inteligentes",
    text: "Automatizamos o que é repetitivo e deixamos os dados trabalharem por você.",
    proof: ["Tarefas que rodam sozinhas", "Painéis com números do negócio", "Fluxos pensados com a sua equipe"],
  },
  {
    icon: "shield",
    title: "Robustas",
    text: "Tecnologia atual, código revisado e cuidado com segurança desde o primeiro dia.",
    proof: ["Testes antes de cada entrega", "Backup e monitoramento", "Boas práticas da LGPD"],
  },
  {
    icon: "trend",
    title: "Que fazem diferença",
    text: "Cada projeto começa por um objetivo do negócio, não por uma lista de telas.",
    proof: ["Mais pedidos e agendamentos online", "Menos retrabalho na rotina", "Suporte de quem construiu"],
  },
];

const steps = [
  ["Conversa", "Entendemos o negócio, o público e o que precisa melhorar."],
  ["Proposta", "Escopo, prazo e investimento por escrito, sem letra miúda."],
  ["Design", "Você vê e aprova as telas antes de qualquer código."],
  ["Desenvolvimento", "Entregas curtas, com acesso para testar desde cedo."],
  ["Lançamento e suporte", "Colocamos no ar e seguimos por perto."],
];

export default function HomePage() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <GrapheneField />
        <div className="hero-inner">
          <div className="hero-copy">
            <h1 id="hero-title">Sites, aplicativos e sistemas que fazem seu negócio andar.</h1>
            <p>
              A Covalia projeta e desenvolve software sob medida: inteligente no que automatiza,
              robusto no que entrega e simples para quem usa.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-primary" href="/orcamento">Pedir orçamento</Link>
              <Link className="btn btn-ghost" href="/solucoes">Ver soluções</Link>
            </div>
          </div>
          <Showcase />
        </div>
      </section>

      <section className="section services" aria-labelledby="services-title">
        <div className="section-intro" data-reveal>
          <h2 id="services-title">O que a gente faz</h2>
          <p>Do primeiro site ao sistema que roda a empresa inteira. Tudo ligado, tudo feito para o seu caso.</p>
        </div>
        <ul className="rail" data-reveal="rail">
          {services.map((service, index) => (
            <li key={service.title} data-reveal style={{ "--i": index } as CSSProperties}>
              <span className="rail-atom" aria-hidden="true"><Icon name={service.icon} size={22} /></span>
              <div className="rail-body">
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </div>
              <ul className="rail-items">
                {service.items.map((item) => (
                  <li key={item}><Icon name="check" size={16} />{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <GrapheneWhy />

      <section className="section" aria-labelledby="pillars-title">
        <div className="section-intro" data-reveal>
          <h2 id="pillars-title">Por que escolher a Covalia</h2>
          <p>Seu site ou sistema é parte do negócio. Ele precisa trabalhar tão bem quanto a sua equipe.</p>
        </div>
        <ul className="pillars">
          {pillars.map((pillar, index) => (
            <li key={pillar.title} data-reveal style={{ "--i": index } as CSSProperties}>
              <span className="pillar-atom" aria-hidden="true"><Icon name={pillar.icon} size={22} /></span>
              <h3>{pillar.title}</h3>
              <p>{pillar.text}</p>
              <ul>
                {pillar.proof.map((item) => (
                  <li key={item}><Icon name="check" size={16} />{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <section className="section" aria-labelledby="process-title">
        <div className="section-intro" data-reveal>
          <h2 id="process-title">Como trabalhamos</h2>
          <p>Você sabe o que acontece em cada etapa, da primeira conversa ao suporte.</p>
        </div>
        <ol className="chain" data-reveal="chain">
          {steps.map(([title, text], index) => (
            <li key={title} style={{ "--i": index } as CSSProperties}>
              <span className="chain-atom">{index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="quem-faz" className="section" aria-labelledby="author-title">
        <div className="author" data-reveal="author">
          <Image className="author-mark" src="/thiago-heckler.webp" alt="Foto de Thiago Heckler" width={400} height={400} unoptimized />
          <div className="author-copy">
            <h2 id="author-title">Quem faz</h2>
            <p>
              Oi, eu sou o <strong>Thiago Heckler</strong>, desenvolvedor de software. Criei a Covalia para
              levar a empresas de qualquer tamanho o cuidado técnico de projetos grandes: código bem feito,
              design claro e suporte de perto, com quem construiu.
            </p>
            <p>No meu portfólio você encontra projetos, estudos e o que ando construindo.</p>
            <div className="author-links">
              <a className="btn btn-primary" href="https://thiagoheckler.com.br" target="_blank" rel="noreferrer">
                Ver portfólio
                <span className="sr-only"> em thiagoheckler.com.br (abre em nova aba)</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Callout />
    </>
  );
}

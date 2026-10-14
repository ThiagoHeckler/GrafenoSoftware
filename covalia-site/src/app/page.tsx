import type { CSSProperties } from "react";
import Link from "next/link";
import { BudgetSection } from "@/components/budget-section";
import { GlassBackdrop } from "@/components/glass-backdrop";
import { GlassTilt } from "@/components/glass-tilt";
import { GrapheneField } from "@/components/graphene-field";
import { Icon, type IconName } from "@/components/icon";
import { Services } from "@/components/services";
import { Showcase } from "@/components/showcase";
import { WhyHire } from "@/components/why-hire";

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
              <a className="btn btn-primary" href="#orcamento">Pedir orçamento</a>
              <Link className="btn btn-ghost" href="/solucoes">Ver soluções</Link>
            </div>
          </div>
          <Showcase />
        </div>
      </section>

      <section className="section services" aria-labelledby="services-title">
        <div className="section-intro" data-reveal>
          <h2 id="services-title">O que a gente faz</h2>
          <p>Do primeiro site ao sistema que roda a empresa. Tudo ligado.</p>
        </div>
        <Services />
      </section>

      <WhyHire />

      <section className="section" aria-labelledby="pillars-title">
        <div className="section-intro" data-reveal>
          <h2 id="pillars-title">Por que escolher a Covalia</h2>
          <p>Seu site ou sistema é parte do negócio. Ele precisa trabalhar tão bem quanto a sua equipe.</p>
        </div>
        <div className="glass-sheets">
          <GlassBackdrop cols={14} rows={5} lit={["1,1", "3,3", "6,1", "7,2", "11,1", "12,3"]} />
          <GlassTilt className="pillars">
            {pillars.map((pillar, index) => (
              <li key={pillar.title} data-reveal style={{ "--i": index } as CSSProperties}>
                <div className="glass-pane pillar-pane">
                  <span className="pillar-atom" aria-hidden="true"><Icon name={pillar.icon} size={22} /></span>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.text}</p>
                  <ul>
                    {pillar.proof.map((item) => (
                      <li key={item}><Icon name="check" size={16} />{item}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </GlassTilt>
        </div>
      </section>

      <BudgetSection />
    </>
  );
}

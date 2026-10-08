"use client";

import Image from "next/image";
import { CSSProperties, useState } from "react";

/*
 * Vitrine do herói: um notebook aberto com o site e um celular com o app
 * do mesmo cliente. Cada exemplo tem paleta própria para mostrar que cada
 * projeto ganha a identidade do negócio, não a da Covalia.
 */

type Example = {
  id: string;
  label: string;
  theme: { bg: string; surface: string; ink: string; muted: string; accent: string; onAccent: string };
  site: {
    brand: string;
    url: string;
    nav: string[];
    title: string;
    text: string;
    cta: string;
    art: string;
    cards: { art: string; name: string; detail: string }[];
  };
  app: {
    screen: string;
    status: string;
    detail: string;
    progress?: number;
    items: { text: string; done?: boolean }[];
    action: string;
  };
};

const examples: Example[] = [
  {
    id: "padaria",
    label: "Padaria",
    theme: { bg: "#fff7ec", surface: "#ffffff", ink: "#3b2414", muted: "#8a6a55", accent: "#c8662b", onAccent: "#ffffff" },
    site: {
      brand: "Padaria Araucária",
      url: "padariaaraucaria.com.br",
      nav: ["Cardápio", "Encomendas", "Contato"],
      title: "Pão quentinho a partir das 6h",
      text: "Encomende pelo site e retire sem fila.",
      cta: "Fazer encomenda",
      art: "/showcase/padaria-hero.webp",
      cards: [
        { art: "/showcase/padaria-croissant.webp", name: "Croissant", detail: "R$ 9,50" },
        { art: "/showcase/padaria-pao.webp", name: "Pão de fermentação natural", detail: "R$ 22,00" },
        { art: "/showcase/padaria-torta.webp", name: "Torta de morango", detail: "R$ 64,00" },
      ],
    },
    app: {
      screen: "Minha encomenda",
      status: "Pronta às 7h30",
      detail: "Retirada na Rua das Flores, 210",
      progress: 66,
      items: [{ text: "2 croissants", done: true }, { text: "1 pão de fermentação", done: true }, { text: "Embalagem para presente" }],
      action: "Avisar que estou chegando",
    },
  },
  {
    id: "clinica",
    label: "Clínica",
    theme: { bg: "#f1f6ff", surface: "#ffffff", ink: "#10284a", muted: "#5a6f8f", accent: "#2f6fdb", onAccent: "#ffffff" },
    site: {
      brand: "Clínica Vida",
      url: "clinicavida.com.br",
      nav: ["Especialidades", "Convênios", "Contato"],
      title: "Agende sua consulta em poucos cliques",
      text: "Horários livres em tempo real e confirmação pelo WhatsApp.",
      cta: "Agendar consulta",
      art: "/showcase/clinica-hero.webp",
      cards: [
        { art: "/showcase/clinica-odonto.webp", name: "Odontologia", detail: "Seg a sáb" },
        { art: "/showcase/clinica-oftalmo.webp", name: "Oftalmologia", detail: "Ter e qui" },
        { art: "/showcase/clinica-cardio.webp", name: "Cardiologia", detail: "Seg a sex" },
      ],
    },
    app: {
      screen: "Minhas consultas",
      status: "Quinta, 14h30",
      detail: "Dra. Helena Costa, cardiologia",
      items: [{ text: "Lembrete 1 dia antes", done: true }, { text: "Exames anexados", done: true }, { text: "Check-in na recepção" }],
      action: "Confirmar presença",
    },
  },
  {
    id: "academia",
    label: "Academia",
    theme: { bg: "#17161c", surface: "#23212b", ink: "#f6f4f1", muted: "#a7a2b3", accent: "#ff6b2c", onAccent: "#17161c" },
    site: {
      brand: "Pulso Academia",
      url: "pulsoacademia.com.br",
      nav: ["Planos", "Aulas", "Unidades"],
      title: "Treine no seu ritmo e acompanhe pelo app",
      text: "Planos a partir de R$ 89 por mês.",
      cta: "Começar agora",
      art: "/showcase/academia-hero.webp",
      cards: [
        { art: "/showcase/academia-funcional.webp", name: "Funcional", detail: "Seg, qua e sex" },
        { art: "/showcase/academia-bike.webp", name: "Bike indoor", detail: "Todo dia, 18h" },
        { art: "/showcase/academia-yoga.webp", name: "Yoga", detail: "Ter e qui" },
      ],
    },
    app: {
      screen: "Treino de hoje",
      status: "Pernas e core",
      detail: "45 min, 6 exercícios",
      progress: 50,
      items: [{ text: "Agachamento 4x12", done: true }, { text: "Afundo 3x10", done: true }, { text: "Prancha 3x40s" }],
      action: "Marcar série",
    },
  },
];

export function Showcase() {
  const [activeId, setActiveId] = useState(examples[0].id);
  const example = examples.find((item) => item.id === activeId)!;
  const { theme, site, app } = example;
  const vars = {
    "--ex-bg": theme.bg,
    "--ex-surface": theme.surface,
    "--ex-ink": theme.ink,
    "--ex-muted": theme.muted,
    "--ex-accent": theme.accent,
    "--ex-on-accent": theme.onAccent,
  } as CSSProperties;

  return (
    <div className="showcase">
      <figure
        className="devices"
        style={vars}
        aria-label={`Exemplo de projeto: site e aplicativo da ${site.brand}`}
      >
        <div className="laptop">
          <div className="laptop-lid">
            <div className="laptop-screen">
              <div className="mini-site" key={`site-${example.id}`}>
                <div className="mini-browser">
                  <span className="mini-dots" aria-hidden="true"><i /><i /><i /></span>
                  <span className="mini-url">{site.url}</span>
                </div>
                <div className="mini-nav">
                  <strong>{site.brand}</strong>
                  <span>{site.nav.map((item) => <span key={item}>{item}</span>)}</span>
                </div>
                <div className="mini-hero">
                  <div>
                    <p className="mini-title">{site.title}</p>
                    <p className="mini-text">{site.text}</p>
                    <span className="mini-cta">{site.cta}</span>
                  </div>
                  <Image className="mini-art" src={site.art} alt="" width={480} height={480} loading="eager" unoptimized />
                </div>
                <div className="mini-cards">
                  {site.cards.map((card) => (
                    <div key={card.name}>
                      <Image src={card.art} alt="" width={240} height={240} loading="eager" unoptimized />
                      <strong>{card.name}</strong>
                      <small>{card.detail}</small>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="laptop-base" aria-hidden="true" />
        </div>

        <div className="phone">
          <div className="phone-screen">
            <div className="mini-app" key={`app-${example.id}`}>
              <span className="phone-notch" aria-hidden="true" />
              <p className="app-screen">{app.screen}</p>
              <div className="app-status">
                <strong>{app.status}</strong>
                <small>{app.detail}</small>
                {app.progress !== undefined && (
                  <span className="app-progress" aria-hidden="true"><i style={{ width: `${app.progress}%` }} /></span>
                )}
              </div>
              <ul className="app-items">
                {app.items.map((item) => (
                  <li key={item.text} className={item.done ? "is-done" : ""}>{item.text}</li>
                ))}
              </ul>
              <span className="app-action">{app.action}</span>
            </div>
          </div>
        </div>
      </figure>

      <div className="showcase-picker" role="group" aria-label="Trocar o exemplo de projeto">
        <span className="picker-label">Veja um exemplo:</span>
        {examples.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={item.id === activeId}
            onClick={() => setActiveId(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { CSSProperties, useEffect, useRef, useState } from "react";

/*
 * Vitrine do herói: um notebook aberto com o site e um celular com o app
 * do mesmo cliente. Cada exemplo tem paleta própria para mostrar que cada
 * projeto ganha a identidade do negócio, não a da Covalia.
 *
 * Os aparelhos são uma foto (gerada no Higgsfield) com as telas recortadas.
 * O conteúdo de cada tela é HTML de verdade, posto em perspectiva por baixo
 * da foto com matrix3d, e os exemplos se alternam sozinhos.
 */

type Example = {
  id: string;
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

/* Tamanho da foto e cantos de cada tela nela (em px, sentido horário a partir do topo esquerdo). */
const FRAME = { width: 875, height: 583 };
type Quad = [number, number][];
const LAPTOP: Quad = [[305.2, 7.2], [808.8, 34.7], [792.6, 444.3], [263.8, 376.6]];
const PHONE: Quad = [[716.8, 201.3], [865.3, 213.7], [856.6, 540.0], [712.6, 520.1]];
const LAPTOP_SIZE = { width: 1000, height: 650 };
const PHONE_SIZE = { width: 300, height: 640 };
const INTERVAL = 5000;

/* Homografia que leva o retângulo w x h aos quatro cantos da tela na foto. */
function perspective(w: number, h: number, [[x0, y0], [x1, y1], [x2, y2], [x3, y3]]: Quad) {
  const dx1 = x1 - x2, dx2 = x3 - x2, dx3 = x0 - x1 + x2 - x3;
  const dy1 = y1 - y2, dy2 = y3 - y2, dy3 = y0 - y1 + y2 - y3;
  const den = dx1 * dy2 - dx2 * dy1;
  const g = (dx3 * dy2 - dx2 * dy3) / den;
  const k = (dx1 * dy3 - dx3 * dy1) / den;
  const m = [
    (x1 - x0 + g * x1) / w, (y1 - y0 + g * y1) / w, 0, g / w,
    (x3 - x0 + k * x3) / h, (y3 - y0 + k * y3) / h, 0, k / h,
    0, 0, 1, 0,
    x0, y0, 0, 1,
  ];
  return `matrix3d(${m.map((n) => +n.toFixed(8)).join(",")})`;
}

const laptopTransform = perspective(LAPTOP_SIZE.width, LAPTOP_SIZE.height, LAPTOP);
const phoneTransform = perspective(PHONE_SIZE.width, PHONE_SIZE.height, PHONE);
/* Preto sob os recortes só enquanto a escala ainda não foi medida. */
const toPercent = (quad: Quad) =>
  `polygon(${quad.map(([x, y]) => `${(x / FRAME.width) * 100}% ${(y / FRAME.height) * 100}%`).join(",")})`;

function themeVars(theme: Example["theme"]) {
  return {
    "--ex-bg": theme.bg,
    "--ex-surface": theme.surface,
    "--ex-ink": theme.ink,
    "--ex-muted": theme.muted,
    "--ex-accent": theme.accent,
    "--ex-on-accent": theme.onAccent,
  } as CSSProperties;
}

export function Showcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [scale, setScale] = useState<number | null>(null);
  const figureRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const figure = figureRef.current;
    if (!figure) return;
    const observer = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / FRAME.width));
    observer.observe(figure);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      if (!document.hidden) setActive((index) => (index + 1) % examples.length);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, [paused]);

  const current = examples[active];

  return (
    <figure
      ref={figureRef}
      className="devices"
      style={{ aspectRatio: `${FRAME.width} / ${FRAME.height}` }}
      aria-label={`Exemplo de projeto: site e aplicativo da ${current.site.brand}`}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      {scale === null && (
        <>
          <span className="devices-blank" style={{ clipPath: toPercent(LAPTOP) }} aria-hidden="true" />
          <span className="devices-blank" style={{ clipPath: toPercent(PHONE) }} aria-hidden="true" />
        </>
      )}

      <div
        className="devices-stage"
        style={{ width: FRAME.width, height: FRAME.height, scale: scale ?? 1, visibility: scale ? "visible" : "hidden" }}
      >
        <div
          className="laptop-screen"
          style={{ ...LAPTOP_SIZE, transform: laptopTransform }}
        >
          <div className="screen-display">
            {examples.map(({ id, theme, site }, index) => (
              <div className="mini-site" key={id} style={themeVars(theme)} data-active={index === active} aria-hidden={index !== active}>
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
            ))}
          </div>
        </div>

        <div
          className="phone-screen"
          style={{ ...PHONE_SIZE, transform: phoneTransform }}
        >
          <div className="screen-display">
            {examples.map(({ id, theme, app }, index) => (
              <div className="mini-app" key={id} style={themeVars(theme)} data-active={index === active} aria-hidden={index !== active}>
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
            ))}
          </div>
        </div>
      </div>

      <Image className="devices-frame" src="/showcase/devices.webp" alt="" width={FRAME.width} height={FRAME.height} loading="eager" fetchPriority="high" unoptimized />
    </figure>
  );
}

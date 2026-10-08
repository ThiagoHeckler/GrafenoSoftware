import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

/*
 * Ilustrações dos cartões de Soluções. Cada tela usa a paleta do cliente de
 * exemplo da vitrine (Clínica, Academia, Padaria), porque cada projeto ganha a
 * identidade do negócio. Só o mapa de integrações fala com as cores da
 * Covalia: ali o desenho é a própria rede de grafeno, com o dado passando.
 * Medidas em cqi para escalar junto com o cartão.
 */

export type SolutionArtKind = "sites" | "aplicativos" | "sistemas" | "integracoes";

const labels: Record<SolutionArtKind, string> = {
  sites: "Ilustração: site da Clínica Vida aberto no navegador e o mesmo site aparecendo numa busca, com nota 4,9",
  aplicativos: "Ilustração: app da Pulso Academia no celular com o treino do dia e uma notificação de aula",
  sistemas: "Ilustração: painel de gestão da Padaria Araucária com faturamento, encomendas, gráfico da semana e estoque baixo",
  integracoes: "Ilustração: um Pix recebido pelo sistema central dispara nota fiscal, recibo no WhatsApp e planilha atualizada",
};

const themes = {
  clinica: { bg: "#f1f6ff", surface: "#ffffff", ink: "#10284a", muted: "#5a6f8f", accent: "#2f6fdb", onAccent: "#ffffff" },
  academia: { bg: "#17161c", surface: "#23212b", ink: "#f6f4f1", muted: "#a7a2b3", accent: "#ff6b2c", onAccent: "#17161c" },
  padaria: { bg: "#fff7ec", surface: "#ffffff", ink: "#3b2414", muted: "#8a6a55", accent: "#c8662b", onAccent: "#ffffff" },
};

function themeVars(theme: (typeof themes)[keyof typeof themes]) {
  return {
    "--t-bg": theme.bg,
    "--t-surface": theme.surface,
    "--t-ink": theme.ink,
    "--t-muted": theme.muted,
    "--t-accent": theme.accent,
    "--t-on-accent": theme.onAccent,
  } as CSSProperties;
}

export function SolutionArt({ kind }: { kind: SolutionArtKind }) {
  return (
    <figure className={`sol-art sol-art-${kind}`} role="img" aria-label={labels[kind]}>
      <div aria-hidden="true">{art[kind]}</div>
    </figure>
  );
}

function Photo({ src, className }: { src: string; className: string }) {
  return <Image className={className} src={src} alt="" width={240} height={240} unoptimized />;
}

/* ---------- Integrações: geometria da rede (viewBox 160 x 100) ---------- */

const hub = { x: 46, y: 50, r: 13 };

type Bond = "in" | "out" | "idle";
const nodes: { name: string; x: number; y: number; label: "above" | "below"; bond: Bond; icon: ReactNode }[] = [
  {
    name: "Pix e cartão", x: 16.6, y: 34.5, label: "below", bond: "in",
    icon: <><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M3 10h18M7 14.5h3" /></>,
  },
  {
    name: "NF-e e NFC-e", x: 46, y: 19, label: "above", bond: "out",
    icon: <path d="M7 3h7l4 4v14H7zM14 3v4h4M9.5 12h5M9.5 15.5h5" />,
  },
  {
    name: "WhatsApp", x: 75.4, y: 34.5, label: "below", bond: "out",
    icon: <path d="M4 19V7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H8zM8.5 8.5h7M8.5 11.5h4" />,
  },
  {
    name: "ERP", x: 16.6, y: 65.5, label: "below", bond: "idle",
    icon: <><ellipse cx="12" cy="6" rx="7" ry="2.5" /><path d="M5 6v12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V6M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5" /></>,
  },
  {
    name: "Planilhas", x: 46, y: 81, label: "below", bond: "out",
    icon: <><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M4 9.5h16M4 15h16M10 4v16" /></>,
  },
  {
    name: "E-mail", x: 75.4, y: 65.5, label: "below", bond: "idle",
    icon: <><rect x="3" y="5.5" width="18" height="13" rx="2" /><path d="m3.5 7 8.5 6 8.5-6" /></>,
  },
];

function hexPoints(cx: number, cy: number, r: number) {
  const h = r * 0.866;
  return [[cx - r, cy], [cx - r / 2, cy - h], [cx + r / 2, cy - h], [cx + r, cy], [cx + r / 2, cy + h], [cx - r / 2, cy + h]]
    .map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`)
    .join(" ");
}

const log = [
  ["14:02:07", "Pix de R$ 64,00 recebido"],
  ["14:02:08", "NF-e emitida"],
  ["14:02:08", "Recibo enviado no WhatsApp"],
  ["14:02:09", "Planilha de vendas atualizada"],
];

const art: Record<SolutionArtKind, ReactNode> = {
  /* Site: a página da clínica e, por cima, a busca em que ela aparece. */
  sites: (
    <>
      <div className="art-window art-site" style={themeVars(themes.clinica)}>
        <div className="art-bar">
          <span className="art-dots"><i /><i /><i /></span>
          <span className="art-url">clinicavida.com.br</span>
        </div>
        <div className="art-site-nav">
          <strong><i />Clínica Vida</strong>
        </div>
        <div className="art-site-hero">
          <div>
            <div className="art-site-title">Agende sua consulta em poucos cliques</div>
            <div className="art-site-text">Horários livres em tempo real e confirmação no WhatsApp.</div>
            <span className="art-site-cta">Agendar consulta</span>
          </div>
          <Photo className="art-site-photo" src="/showcase/clinica-hero.webp" />
        </div>
        <div className="art-site-specs">
          <span><Photo className="art-thumb" src="/showcase/clinica-odonto.webp" />Odontologia</span>
          <span><Photo className="art-thumb" src="/showcase/clinica-cardio.webp" />Cardiologia</span>
        </div>
      </div>
      <div className="art-search">
        <div className="art-search-field">
          <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4.5 4.5" /></svg>
          cardiologista perto de mim
        </div>
        <div className="art-search-result">
          <small>clinicavida.com.br</small>
          <strong>Clínica Vida: agende sua consulta online</strong>
          <span className="art-stars"><b>4,9</b> ★★★★★ <small>212 avaliações</small></span>
        </div>
      </div>
    </>
  ),

  /* App: o treino do dia e o lembrete que chega na tela de bloqueio. */
  aplicativos: (
    <>
      <div className="art-phone" style={themeVars(themes.academia)}>
        <div className="art-app">
          <div className="art-app-status"><span>9:41</span><i /></div>
          <div className="art-app-cover">
            <Photo className="art-app-photo" src="/showcase/academia-hero.webp" />
            <span><small>Treino de hoje</small><strong>Pernas e core</strong></span>
          </div>
          <div className="art-app-progress">
            <svg viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15" pathLength="100" />
              <circle cx="18" cy="18" r="15" pathLength="100" />
            </svg>
            <span><strong>4 de 6</strong><small>exercícios feitos</small></span>
          </div>
          <ul className="art-app-list">
            <li className="is-done">Agachamento 4x12</li>
            <li className="is-done">Afundo 3x10</li>
            <li>Prancha 3x40s</li>
          </ul>
        </div>
      </div>
      <div className="art-notice" style={themeVars(themes.academia)}>
        <span className="art-notice-icon">P</span>
        <span>
          <span className="art-notice-head"><strong>Pulso Academia</strong><small>agora</small></span>
          Bike indoor começa em 30 min. Sua bike é a 12.
        </span>
      </div>
      <div className="art-store">
        <span className="art-stars"><b>4,8</b> ★★★★★</span>
        <small>Android e iPhone</small>
      </div>
    </>
  ),

  /* Sistema: o painel que a dona da padaria abre de manhã. */
  sistemas: (
    <div className="art-window art-dash" style={themeVars(themes.padaria)}>
      <div className="art-bar">
        <span className="art-dots"><i /><i /><i /></span>
        <span className="art-url">gestao.padariaaraucaria.com.br</span>
      </div>
      <div className="art-dash-body">
        <nav className="art-dash-side">
          <strong>Araucária</strong>
          {["Painel", "Encomendas", "Estoque", "Clientes", "Equipe"].map((item, index) => (
            <span key={item} className={index === 0 ? "is-on" : ""}><i />{item}</span>
          ))}
        </nav>
        <div className="art-dash-main">
          <div className="art-dash-top">
            <span><strong>Bom dia, Ana</strong><small>Terça, 7 de outubro</small></span>
            <i>AN</i>
          </div>
          <div className="art-kpis">
            <span><small>Faturamento hoje</small><strong>R$ 3.482</strong><em>+12% na semana</em></span>
            <span><small>Encomendas</small><strong>47</strong><em>9 para retirar</em></span>
            <span><small>Ticket médio</small><strong>R$ 74</strong><em>+R$ 6</em></span>
          </div>
          <div className="art-dash-grid">
            <div className="art-panel">
              <small>Vendas da semana</small>
              <svg className="art-area" viewBox="0 0 120 40" preserveAspectRatio="none">
                <path className="art-area-fill" d="M0 30 L20 26 L40 28 L60 18 L80 21 L100 10 L120 6 V40 H0Z" />
                <path className="art-area-line" d="M0 30 L20 26 L40 28 L60 18 L80 21 L100 10 L120 6" />
              </svg>
              <span className="art-days">{["seg", "ter", "qua", "qui", "sex", "sáb", "dom"].map((day) => <i key={day}>{day}</i>)}</span>
            </div>
            <div className="art-panel art-stock">
              <small>Estoque baixo</small>
              {([["Farinha de trigo", "8 kg", 18], ["Manteiga", "3 kg", 30], ["Fermento natural", "1 kg", 12]] as const).map(([item, left, level]) => (
                <span key={item}>
                  <b>{item}</b><em>{left}</em>
                  <i style={{ "--level": `${level}%` } as CSSProperties} />
                </span>
              ))}
              <span className="art-stock-action">Pedir ao fornecedor</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),

  /* Integrações: a rede de grafeno. O pulso entra pelo Pix e sai para as demais. */
  integracoes: (
    <>
      <svg className="art-net" viewBox="0 0 160 100">
        {nodes.map((node) => (
          <line key={node.name} className="art-bond" x1={hub.x} y1={hub.y} x2={node.x} y2={node.y} />
        ))}
        {nodes.filter((node) => node.bond !== "idle").map((node) =>
          node.bond === "in" ? (
            <line key={node.name} className="art-pulse art-pulse-in" pathLength="100" x1={node.x} y1={node.y} x2={hub.x} y2={hub.y} />
          ) : (
            <line key={node.name} className="art-pulse art-pulse-out" pathLength="100" x1={hub.x} y1={hub.y} x2={node.x} y2={node.y} />
          ),
        )}
        <polygon className="art-hub-glow" points={hexPoints(hub.x, hub.y, hub.r + 2.6)} />
        <polygon className="art-hub" points={hexPoints(hub.x, hub.y, hub.r)} />
        <text className="art-hub-text" x={hub.x} y={hub.y - 0.6}>Seu</text>
        <text className="art-hub-text" x={hub.x} y={hub.y + 4.4}>sistema</text>
        {nodes.map((node) => (
          <g key={node.name} className={`art-node${node.bond === "idle" ? "" : " is-active"}`}>
            <polygon points={hexPoints(node.x, node.y, 7)} />
            <g className="art-node-icon" transform={`translate(${node.x - 4} ${node.y - 4}) scale(${8 / 24})`}>{node.icon}</g>
            <text x={node.x} y={node.label === "above" ? node.y - 9.5 : node.y + 12.5}>{node.name}</text>
          </g>
        ))}
      </svg>
      <div className="art-log">
        <strong>Venda 1043</strong>
        <ol>
          {log.map(([time, text]) => (
            <li key={text}><time>{time}</time>{text}</li>
          ))}
        </ol>
      </div>
    </>
  ),
};

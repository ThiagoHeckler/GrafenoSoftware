"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { FormEvent, ReactNode, useState } from "react";

type IconName =
  | "arrow"
  | "check"
  | "chart"
  | "chat"
  | "file"
  | "layers"
  | "menu"
  | "shield"
  | "spark"
  | "target"
  | "time"
  | "x";

function Icon({
  name,
  size = 20,
}: {
  name: IconName;
  size?: number;
}) {
  const paths: Record<IconName, ReactNode> = {
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    chart: <><path d="M4 19V5" /><path d="M4 19h16" /><path d="m7 14 4-4 3 3 5-6" /></>,
    chat: <><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z" /></>,
    file: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M8 13h8M8 17h8" /></>,
    layers: <><path d="m12 2 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5M3 17l9 5 9-5" /></>,
    menu: <><path d="M4 6h16M4 12h16M4 18h16" /></>,
    shield: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" /><path d="m9 12 2 2 4-4" /></>,
    spark: <><path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z" /><path d="m19 14 1.1 2.9L23 18l-2.9 1.1L19 22l-1.1-2.9L15 18l2.9-1.1L19 14Z" /></>,
    target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></>,
    time: <><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>,
    x: <><path d="m18 6-12 12M6 6l12 12" /></>,
  };

  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

const problems = [
  {
    icon: "layers" as const,
    title: "A planilha virou uma bagunça",
    text: "Informações espalhadas, versões diferentes e decisões que dependem de alguém encontrar o arquivo certo.",
  },
  {
    icon: "file" as const,
    title: "Nota fiscal manual toma tempo",
    text: "Conferir dados e corrigir rejeições vira parte da rotina — quando poderia ser simples e previsível.",
  },
  {
    icon: "chat" as const,
    title: "Pedido de WhatsApp se perde",
    text: "Uma mensagem passa batida, um endereço fica incompleto e o cliente espera por uma resposta.",
  },
];

const cases = [
  {
    sector: "Alimentação · exemplo ilustrativo",
    title: "Mais controle em cada pedido",
    problem: "Pedidos anotados em conversas e comandas de papel.",
    solution: "Organização dos pedidos em uma tela simples para a equipe.",
    result: "Menos retrabalho na rotina e mais clareza do início ao fim.",
  },
  {
    sector: "Comércio · exemplo ilustrativo",
    title: "Uma rotina fiscal mais leve",
    problem: "Emissão e conferência de notas feitas manualmente.",
    solution: "Fluxo fiscal pensado para acompanhar o processo de venda.",
    result: "Menos tarefas repetitivas e mais tempo para atender clientes.",
  },
  {
    sector: "Serviços · exemplo ilustrativo",
    title: "Informação no mesmo lugar",
    problem: "Planilhas separadas dificultavam acompanhar o negócio.",
    solution: "Sistema sob medida para reunir dados e etapas do trabalho.",
    result: "Equipe mais alinhada e gestores com uma visão mais clara.",
  },
];

const processSteps = [
  ["01", "Diagnóstico", "Entendemos sua rotina e os pontos que mais pesam."],
  ["02", "Proposta", "Você recebe um escopo claro, prazo e investimento."],
  ["03", "Desenvolvimento", "Construímos junto com você, com etapas visíveis."],
  ["04", "Implantação", "Ajudamos sua equipe a começar com segurança."],
  ["05", "Suporte", "Seguimos por perto para manter tudo funcionando."],
];

function Brand() {
  return (
    <Link className="brand" href="/" aria-label="Grafeno Software — página inicial">
      <span className="brand-mark" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </span>
      <span className="brand-name">grafeno<span>software</span></span>
    </Link>
  );
}

function Header({ active }: { active: string }) {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "/", label: "Início", key: "home" },
    { href: "/solucoes", label: "Soluções", key: "solucoes" },
  ];

  return (
    <header className="site-header">
      <div className="header-inner">
        <Brand />
        <button
          className="mobile-menu"
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <Icon name={open ? "x" : "menu"} />
        </button>
        <nav className={`main-nav ${open ? "nav-open" : ""}`} aria-label="Navegação principal">
          {links.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              aria-current={active === link.key ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            className={`nav-cta ${active === "orcamento" ? "nav-cta-active" : ""}`}
            href="/orcamento"
            onClick={() => setOpen(false)}
          >
            Vamos conversar <Icon name="arrow" size={17} />
          </Link>
        </nav>
      </div>
    </header>
  );
}

function Footer({
  onLegal,
}: {
  onLegal: (topic: string) => void;
}) {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand-block">
          <Brand />
          <p>Sistemas que deixam o trabalho mais simples.</p>
        </div>
        <div className="footer-links">
          <div>
            <span className="footer-label">Grafeno</span>
            <Link href="/solucoes">Soluções</Link>
            <Link href="/orcamento">Solicitar orçamento</Link>
          </div>
          <div>
            <span className="footer-label">Na rede</span>
            <a href="https://thiagoheckler.com.br" target="_blank" rel="noreferrer">thiagoheckler.com.br</a>
            <a href="https://devdiary.cloud" target="_blank" rel="noreferrer">devdiary.cloud</a>
            <a href="https://jornaldoti.com" target="_blank" rel="noreferrer">jornaldoti.com</a>
          </div>
          <div>
            <span className="footer-label">Informações</span>
            <button type="button" onClick={() => onLegal("Privacidade")}>Privacidade</button>
            <button type="button" onClick={() => onLegal("Termos de uso")}>Termos de uso</button>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Grafeno Software. Todos os direitos reservados.</span>
        <span>CNPJ 00.000.000/0001-00 <small>· dado demonstrativo</small></span>
      </div>
    </footer>
  );
}

function WhatsAppFloat() {
  return (
    <a
      className="whatsapp-float"
      href="https://wa.me/5549999999999"
      target="_blank"
      rel="noreferrer"
      aria-label="Conversar pelo WhatsApp — substituir pelo número oficial"
      title="Fale com a Grafeno"
    >
      <svg aria-hidden="true" viewBox="0 0 32 32" width="23" height="23" fill="currentColor">
        <path d="M16.03 3C8.86 3 3.03 8.82 3.03 15.99c0 2.29.6 4.53 1.73 6.51L3 29l6.67-1.75a12.96 12.96 0 0 0 6.36 1.66h.01c7.16 0 13-5.83 13-12.99A12.9 12.9 0 0 0 25.23 6.7 12.9 12.9 0 0 0 16.03 3Zm0 23.7h-.01a10.7 10.7 0 0 1-5.45-1.5l-.39-.23-3.96 1.04 1.06-3.86-.25-.4a10.68 10.68 0 0 1-1.64-5.76C5.39 10.09 10.18 5.3 16.03 5.3c2.84 0 5.51 1.11 7.52 3.12a10.56 10.56 0 0 1 3.11 7.51c0 5.85-4.78 10.77-10.63 10.77Zm5.84-8.06c-.32-.16-1.9-.94-2.2-1.05-.3-.11-.51-.16-.72.16-.21.32-.83 1.05-1.02 1.26-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.72-1.74-.99-2.38-.26-.62-.52-.54-.72-.55h-.62c-.21 0-.56.08-.86.4-.3.32-1.12 1.1-1.12 2.67 0 1.58 1.15 3.1 1.31 3.31.16.21 2.26 3.45 5.48 4.84.77.33 1.37.53 1.84.68.77.25 1.47.21 2.02.13.62-.09 1.9-.78 2.17-1.53.27-.75.27-1.39.19-1.53-.08-.13-.29-.21-.61-.37Z" />
      </svg>
    </a>
  );
}

function SectionHeading({
  eyebrow,
  title,
  text,
  centered = false,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  centered?: boolean;
}) {
  return (
    <div className={`section-heading ${centered ? "centered" : ""}`}>
      <span className="eyebrow"><span className="eyebrow-dot" />{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

function HomePage() {
  const reduce = useReducedMotion();
  const reveal = {
    initial: { opacity: 0, y: reduce ? 0 : 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: reduce ? 0.15 : 0.48, ease: "easeOut" as const },
  };

  return (
    <>
      <section className="hero">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.15 : 0.55, ease: "easeOut" }}
          >
            <span className="eyebrow hero-eyebrow"><span className="eyebrow-dot" />Tecnologia que entende a sua rotina</span>
            <h1>Menos trabalho repetido.<br /><em>Mais empresa</em> acontecendo.</h1>
            <p className="hero-copy">
              Criamos sistemas para organizar pedidos, simplificar notas fiscais e
              dar mais controle ao dia a dia da sua empresa.
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/orcamento">
                Solicitar orçamento <Icon name="arrow" size={18} />
              </Link>
              <Link className="text-link" href="/solucoes">
                Conheça as soluções <span>↗</span>
              </Link>
            </div>
            <div className="hero-proof">
              <span className="proof-mark"><Icon name="check" size={15} /></span>
              <span>Conversa direta, escopo claro e suporte de verdade.</span>
            </div>
          </motion.div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, y: reduce ? 0 : 18, scale: reduce ? 1 : 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: reduce ? 0.15 : 0.65, delay: reduce ? 0 : 0.12, ease: "easeOut" }}
            aria-label="Ilustração de pedidos organizados em um painel"
          >
            <div className="visual-top">
              <div>
                <span className="visual-caption">ROTINA DA EMPRESA</span>
                <strong>Um dia mais organizado</strong>
              </div>
              <span className="live-pill"><i /> Em andamento</span>
            </div>
            <div className="visual-summary">
              <div className="summary-card">
                <span className="summary-icon coral"><Icon name="chat" size={18} /></span>
                <span><small>Pedidos recebidos</small><strong>24 <small className="unit">hoje</small></strong></span>
                <span className="summary-trend">+8%</span>
              </div>
              <div className="summary-card">
                <span className="summary-icon green"><Icon name="file" size={18} /></span>
                <span><small>Notas organizadas</small><strong>18 <small className="unit">emitidas</small></strong></span>
                <span className="summary-check"><Icon name="check" size={14} /></span>
              </div>
              <div className="summary-card">
                <span className="summary-icon blue"><Icon name="chart" size={18} /></span>
                <span><small>Visão do negócio</small><strong>Em um só lugar</strong></span>
                <span className="summary-arrow">↗</span>
              </div>
            </div>
            <div className="visual-note">
              <span className="note-line" />
              <span>Informação fluindo entre as etapas do seu negócio.</span>
            </div>
            <div className="visual-decoration" aria-hidden="true">
              <span /><span /><span /><span /><span /><span />
            </div>
          </motion.div>
        </div>
        <div className="hero-bottom"><span>Feito para pequenas e médias empresas</span><span className="hero-bottom-line" /><span>Do primeiro passo ao suporte</span></div>
      </section>

      <section className="section problems-section">
        <motion.div {...reveal}>
          <SectionHeading
            eyebrow="A gente conhece essa rotina"
            title="O seu negócio merece menos improviso."
            text="Quando o trabalho cresce, os processos precisam acompanhar. A gente ajuda a trocar o improviso por uma rotina mais clara."
            centered
          />
        </motion.div>
        <div className="problem-grid">
          {problems.map((item, index) => (
            <motion.article
              className="problem-card"
              key={item.title}
              {...reveal}
              transition={{ ...reveal.transition, delay: reduce ? 0 : index * 0.07 }}
            >
              <span className={`icon-tile tile-${index}`}><Icon name={item.icon} size={22} /></span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <span className="card-index">0{index + 1}</span>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="section solutions-preview">
        <motion.div {...reveal}>
          <SectionHeading
            eyebrow="Soluções que cabem no seu negócio"
            title="Comece com o que você precisa."
            text="Um produto pronto para colocar a rotina em ordem ou um sistema pensado para o jeito que sua empresa trabalha."
          />
        </motion.div>
        <div className="preview-grid">
          <motion.article className="solution-preview-card" {...reveal}>
            <div className="preview-card-top">
              <span className="icon-tile tile-green"><Icon name="chat" size={22} /></span>
              <span className="small-tag">Produto pronto</span>
            </div>
            <h3>Delivery sem pedido perdido</h3>
            <p>Uma solução para pizzarias organizarem pedidos e acompanharem a operação com mais tranquilidade.</p>
            <Link className="text-link" href="/solucoes">Ver produto <span>↗</span></Link>
          </motion.article>
          <motion.article className="solution-preview-card featured-preview" {...reveal} transition={{ ...reveal.transition, delay: 0.08 }}>
            <div className="preview-card-top">
              <span className="icon-tile tile-copper"><Icon name="target" size={22} /></span>
              <span className="small-tag">Feito para você</span>
            </div>
            <h3>Um sistema com a sua cara</h3>
            <p>Gestão, integração fiscal e automações desenhadas para resolver desafios reais da sua empresa.</p>
            <Link className="text-link" href="/solucoes">Conhecer sob medida <span>↗</span></Link>
          </motion.article>
        </div>
      </section>

      <section className="section cases-section">
        <motion.div {...reveal}>
          <SectionHeading
            eyebrow="Exemplos de desafios que resolvemos"
            title="Do problema a uma rotina melhor."
            text="Cada empresa tem seu jeito. Estes exemplos ilustrativos mostram como uma solução bem pensada pode fazer diferença."
            centered
          />
        </motion.div>
        <div className="case-grid">
          {cases.map((item, index) => (
            <motion.article className="case-card" key={item.title} {...reveal} transition={{ ...reveal.transition, delay: reduce ? 0 : index * 0.07 }}>
              <span className="case-sector">{item.sector}</span>
              <h3>{item.title}</h3>
              <div className="case-flow">
                <div><span>O desafio</span><p>{item.problem}</p></div>
                <div><span>O caminho</span><p>{item.solution}</p></div>
                <div className="case-result"><span>O resultado esperado</span><p>{item.result}</p></div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="section process-section">
        <motion.div {...reveal}>
          <SectionHeading
            eyebrow="Sem mistério, do começo ao fim"
            title="Você sabe o que acontece em cada etapa."
            text="Uma parceria próxima, com combinados claros e sua equipe acompanhada ao longo do caminho."
          />
        </motion.div>
        <div className="process-list">
          {processSteps.map(([number, title, description], index) => (
            <motion.div className="process-step" key={number} {...reveal} transition={{ ...reveal.transition, delay: reduce ? 0 : index * 0.05 }}>
              <span className="step-number">{number}</span>
              <span className="step-connector" aria-hidden="true" />
              <div><h3>{title}</h3><p>{description}</p></div>
            </motion.div>
          ))}
        </div>
      </section>

      <Callout />
    </>
  );
}

function Callout() {
  return (
    <section className="callout-section">
      <div className="callout-pattern" aria-hidden="true" />
      <div className="callout-inner">
        <div>
          <span className="eyebrow callout-eyebrow"><span className="eyebrow-dot" />Próximo passo</span>
          <h2>Vamos deixar sua rotina mais leve?</h2>
          <p>Conte o que está tirando seu tempo. A primeira conversa é para entender, sem compromisso.</p>
        </div>
        <Link className="button button-light" href="/orcamento">
          Solicitar orçamento <Icon name="arrow" size={18} />
        </Link>
      </div>
    </section>
  );
}

function SolutionsPage() {
  const reduce = useReducedMotion();
  const reveal = {
    initial: { opacity: 0, y: reduce ? 0 : 14 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: reduce ? 0.15 : 0.45, ease: "easeOut" as const },
  };

  return (
    <>
      <section className="inner-hero">
        <div className="inner-hero-pattern" aria-hidden="true" />
        <motion.div {...reveal} initial={{ opacity: 0, y: reduce ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} viewport={undefined}>
          <span className="eyebrow"><span className="eyebrow-dot" />Soluções Grafeno</span>
          <h1>Ferramentas para sua empresa <em>seguir em frente.</em></h1>
          <p>Produtos prontos para desafios comuns e sistemas sob medida quando o seu negócio pede um jeito próprio de trabalhar.</p>
          <Link className="button button-primary" href="/orcamento">Falar sobre meu negócio <Icon name="arrow" size={18} /></Link>
        </motion.div>
      </section>

      <section className="section ready-section">
        <motion.div {...reveal}>
          <SectionHeading
            eyebrow="Produtos prontos"
            title="Comece com uma solução feita para o seu segmento."
            text="Licença mensal, implantação assistida e uma experiência pensada para a rotina de quem usa."
          />
        </motion.div>
        <motion.article className="product-card" {...reveal}>
          <div className="product-main">
            <span className="product-label"><span className="eyebrow-dot" />PRIMEIRO PRODUTO</span>
            <h3>Delivery organizado para pizzarias.</h3>
            <p>Receba e acompanhe os pedidos em um só lugar. Menos informação perdida entre mensagens; mais clareza para a equipe cuidar de cada entrega.</p>
            <ul className="check-list">
              <li><Icon name="check" size={17} />Pedidos reunidos em uma rotina simples</li>
              <li><Icon name="check" size={17} />Mais visibilidade para a equipe</li>
              <li><Icon name="check" size={17} />Acompanhamento próximo na implantação</li>
            </ul>
            <Link className="button button-primary" href="/orcamento?assunto=delivery">
              Agendar demonstração <Icon name="arrow" size={18} />
            </Link>
            <small className="product-note">Licença mensal · Demonstração sem compromisso</small>
          </div>
          <div className="product-visual" aria-label="Prévia ilustrativa da lista de pedidos">
            <div className="mock-window">
              <div className="mock-window-head"><span className="mock-dots"><i /><i /><i /></span><span>Pedidos de hoje</span><span className="mock-date">SEX · 19:42</span></div>
              <div className="mock-stats"><div><small>Na fila</small><strong>08</strong></div><div><small>Em preparo</small><strong>04</strong></div><div><small>A caminho</small><strong>03</strong></div></div>
              <div className="mock-order"><span className="mock-order-icon">01</span><span><strong>Pedido #184</strong><small>Pizza família · 2 sabores</small></span><b className="order-status status-ready">Em preparo</b></div>
              <div className="mock-order"><span className="mock-order-icon">02</span><span><strong>Pedido #183</strong><small>Pizza média · retirada</small></span><b className="order-status status-delivery">A caminho</b></div>
              <div className="mock-order"><span className="mock-order-icon">03</span><span><strong>Pedido #182</strong><small>Pizza grande · 1 sabor</small></span><b className="order-status status-new">Novo</b></div>
              <div className="mock-foot"><span><i /> Tudo atualizado</span><span>Prévia ilustrativa</span></div>
            </div>
            <div className="product-stamp"><Icon name="spark" size={18} /><span>Feito para<br /><strong>o seu dia a dia</strong></span></div>
          </div>
        </motion.article>
      </section>

      <section className="fiscal-section">
        <div className="fiscal-inner">
          <motion.div className="fiscal-copy" {...reveal}>
            <span className="eyebrow fiscal-eyebrow"><span className="eyebrow-dot" />Nosso diferencial</span>
            <h2>Nota fiscal sem dor de cabeça.</h2>
            <p>A parte fiscal não precisa ser um quebra-cabeça. Ajudamos a conectar o fluxo da sua empresa com a emissão e a conferência de documentos fiscais.</p>
            <p>Do primeiro desenho à rotina diária, explicamos cada etapa em linguagem simples e acompanhamos a implantação.</p>
            <Link className="button button-light" href="/orcamento">Conversar sobre fiscal <Icon name="arrow" size={18} /></Link>
          </motion.div>
          <motion.div className="fiscal-panel" {...reveal} transition={{ ...reveal.transition, delay: 0.1 }}>
            <div className="fiscal-panel-head"><span className="fiscal-panel-icon"><Icon name="shield" size={21} /></span><span><small>FLUXO FISCAL</small><strong>Mais clareza em cada etapa</strong></span></div>
            <div className="fiscal-list">
              <div><span className="fiscal-list-icon"><Icon name="file" size={18} /></span><span><strong>NF-e</strong><small>Nota fiscal eletrônica</small></span><span className="fiscal-arrow">↗</span></div>
              <div><span className="fiscal-list-icon"><Icon name="file" size={18} /></span><span><strong>NFC-e</strong><small>Venda ao consumidor</small></span><span className="fiscal-arrow">↗</span></div>
              <div><span className="fiscal-list-icon"><Icon name="layers" size={18} /></span><span><strong>SEFAZ</strong><small>Integração e comunicação</small></span><span className="fiscal-arrow">↗</span></div>
            </div>
            <div className="fiscal-disclaimer">Cada cenário fiscal é avaliado de acordo com a operação da empresa.</div>
          </motion.div>
        </div>
      </section>

      <section className="section custom-section">
        <motion.div {...reveal}>
          <SectionHeading
            eyebrow="Sistemas sob medida"
            title="O seu processo não precisa caber numa caixa."
            text="Quando as ferramentas prontas não acompanham sua operação, desenhamos uma solução alinhada à realidade da sua equipe."
          />
        </motion.div>
        <div className="custom-grid">
          {[
            { icon: "chart" as const, title: "Sistemas de gestão", text: "Reúna informações, acompanhe etapas e facilite decisões do dia a dia." },
            { icon: "file" as const, title: "Integrações fiscais", text: "Conecte sua rotina à emissão de NF-e, NFC-e e serviços da SEFAZ." },
            { icon: "spark" as const, title: "Automações", text: "Reduza tarefas repetidas e deixe o time focar no que realmente importa." },
          ].map((item, index) => (
            <motion.article className="custom-card" key={item.title} {...reveal} transition={{ ...reveal.transition, delay: reduce ? 0 : index * 0.06 }}>
              <span className="icon-tile tile-copper"><Icon name={item.icon} size={21} /></span>
              <h3>{item.title}</h3><p>{item.text}</p>
            </motion.article>
          ))}
        </div>
        <div className="custom-bottom"><span>Tem um processo específico em mente?</span><Link className="text-link" href="/orcamento">Conte pra gente <span>↗</span></Link></div>
      </section>

      <Callout />
    </>
  );
}

const segments = ["Alimentação e delivery", "Comércio", "Indústria", "Serviços", "Saúde", "Outro"];
const companySizes = ["Sou só eu", "2 a 5 pessoas", "6 a 20 pessoas", "21 a 50 pessoas", "Mais de 50 pessoas"];
const needs = ["Sistema de gestão", "Emissão ou integração fiscal", "Delivery e pedidos", "Automação de tarefas", "Outro"];

function BudgetPage() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    segment: "",
    size: "",
    needs: [] as string[],
    details: "",
    deadline: "",
    budget: "",
  });

  function update(key: string, value: string) {
    setForm((previous) => ({ ...previous, [key]: value }));
    setErrors((previous) => ({ ...previous, [key]: "" }));
  }

  function validateStepOne() {
    const nextErrors: Record<string, string> = {};
    if (!form.name.trim()) nextErrors.name = "Conte seu nome para a gente.";
    if (!form.company.trim()) nextErrors.company = "Informe o nome da empresa.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = "Confira o e-mail informado.";
    if (form.phone.replace(/\D/g, "").length < 10) nextErrors.phone = "Informe um WhatsApp com DDD.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function validateStepTwo() {
    const nextErrors: Record<string, string> = {};
    if (!form.segment) nextErrors.segment = "Selecione o segmento da empresa.";
    if (!form.size) nextErrors.size = "Selecione o tamanho da equipe.";
    if (!form.needs.length) nextErrors.needs = "Escolha pelo menos uma opção.";
    if (!form.deadline) nextErrors.deadline = "Selecione um prazo desejado.";
    if (!form.budget) nextErrors.budget = "Selecione uma faixa de investimento.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleNext() {
    if (validateStepOne()) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: reduce ? "instant" : "smooth" });
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (validateStepTwo()) setSubmitted(true);
  }

  function toggleNeed(item: string) {
    setForm((previous) => ({
      ...previous,
      needs: previous.needs.includes(item)
        ? previous.needs.filter((need) => need !== item)
        : [...previous.needs, item],
    }));
    setErrors((previous) => ({ ...previous, needs: "" }));
  }

  if (submitted) {
    return (
      <section className="budget-page">
        <motion.div className="success-card" initial={{ opacity: 0, y: reduce ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduce ? 0.15 : 0.4 }}>
          <span className="success-icon"><Icon name="check" size={30} /></span>
          <span className="eyebrow"><span className="eyebrow-dot" />Tudo preenchido</span>
          <h1>Obrigado por contar um pouco sobre a sua empresa.</h1>
          <p>Esta é apenas uma confirmação visual. O formulário não envia nem armazena seus dados.</p>
          <Link className="button button-primary" href="/">Voltar ao início <Icon name="arrow" size={18} /></Link>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="budget-page">
      <div className="budget-layout">
        <div className="budget-intro">
          <span className="eyebrow"><span className="eyebrow-dot" />Vamos conversar</span>
          <h1>Um bom projeto começa entendendo <em>o seu negócio.</em></h1>
          <p>Responda algumas perguntas rápidas. Assim, nossa conversa pode ser mais objetiva e próxima da sua realidade.</p>
          <div className="budget-aside">
            <span className="budget-aside-icon"><Icon name="time" size={19} /></span>
            <span><strong>Leva cerca de 2 minutos</strong><small>Sem compromisso e sem envio de dados nesta demonstração.</small></span>
          </div>
          <div className="budget-contact"><span>Prefere uma conversa direta?</span><a href="https://wa.me/5549999999999" target="_blank" rel="noreferrer">Fale pelo WhatsApp <span>↗</span></a></div>
        </div>

        <div className="form-card">
          <div className="form-progress">
            <div className="form-step-heading">
              <span>ETAPA {step} DE 2</span>
              <strong>{step === 1 ? "Seus dados" : "Sobre o projeto"}</strong>
            </div>
            <div className="progress-track" role="progressbar" aria-valuenow={step * 50} aria-valuemin={0} aria-valuemax={100}>
              <span style={{ transform: `scaleX(${step / 2})` }} />
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {step === 1 ? (
              <motion.div key="step-one" initial={{ opacity: 0, x: reduce ? 0 : 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: reduce ? 0.12 : 0.25 }}>
                <div className="form-heading"><h2>Como podemos chamar você?</h2><p>Seus dados servem apenas para esta conversa demonstrativa.</p></div>
                <div className="field-grid">
                  <Field label="Seu nome" error={errors.name} required>
                    <input id="name" autoComplete="name" value={form.name} onChange={(event) => update("name", event.target.value)} placeholder="Ex.: Ana Souza" aria-invalid={!!errors.name} />
                  </Field>
                  <Field label="Empresa" error={errors.company} required>
                    <input id="company" autoComplete="organization" value={form.company} onChange={(event) => update("company", event.target.value)} placeholder="Nome da empresa" aria-invalid={!!errors.company} />
                  </Field>
                  <Field label="E-mail" error={errors.email} required>
                    <input id="email" type="email" autoComplete="email" value={form.email} onChange={(event) => update("email", event.target.value)} placeholder="voce@empresa.com.br" aria-invalid={!!errors.email} />
                  </Field>
                  <Field label="WhatsApp com DDD" error={errors.phone} required>
                    <input id="phone" type="tel" autoComplete="tel" value={form.phone} onChange={(event) => update("phone", event.target.value)} placeholder="(49) 99999-9999" aria-invalid={!!errors.phone} />
                  </Field>
                </div>
                <button className="button button-primary form-next" type="button" onClick={handleNext}>
                  Continuar <Icon name="arrow" size={18} />
                </button>
              </motion.div>
            ) : (
              <motion.div key="step-two" initial={{ opacity: 0, x: reduce ? 0 : 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: reduce ? 0.12 : 0.25 }}>
                <div className="form-heading"><h2>O que sua empresa precisa?</h2><p>Uma estimativa já ajuda a gente a entender por onde começar.</p></div>
                <div className="field-grid">
                  <Field label="Segmento" error={errors.segment} required>
                    <select id="segment" value={form.segment} onChange={(event) => update("segment", event.target.value)} aria-invalid={!!errors.segment}>
                      <option value="">Selecione o segmento</option>
                      {segments.map((item) => <option key={item}>{item}</option>)}
                    </select>
                  </Field>
                  <Field label="Tamanho da empresa" error={errors.size} required>
                    <select id="size" value={form.size} onChange={(event) => update("size", event.target.value)} aria-invalid={!!errors.size}>
                      <option value="">Selecione o tamanho</option>
                      {companySizes.map((item) => <option key={item}>{item}</option>)}
                    </select>
                  </Field>
                </div>
                <fieldset className="need-fieldset">
                  <legend>O que você precisa? <span>*</span></legend>
                  <div className="choice-grid">
                    {needs.map((item) => (
                      <label className={`choice-chip ${form.needs.includes(item) ? "choice-selected" : ""}`} key={item}>
                        <input type="checkbox" checked={form.needs.includes(item)} onChange={() => toggleNeed(item)} />
                        <span className="choice-check"><Icon name="check" size={13} /></span>{item}
                      </label>
                    ))}
                  </div>
                  {errors.needs && <span className="field-error" role="alert">{errors.needs}</span>}
                </fieldset>
                <Field label="Conte um pouco mais (opcional)">
                  <textarea id="details" value={form.details} onChange={(event) => update("details", event.target.value)} placeholder="Qual tarefa ou situação você gostaria de melhorar?" rows={3} />
                </Field>
                <div className="field-grid">
                  <Field label="Prazo desejado" error={errors.deadline} required>
                    <select id="deadline" value={form.deadline} onChange={(event) => update("deadline", event.target.value)} aria-invalid={!!errors.deadline}>
                      <option value="">Selecione um prazo</option>
                      <option>O quanto antes</option>
                      <option>Nos próximos 3 meses</option>
                      <option>Em 3 a 6 meses</option>
                      <option>Estou pesquisando, sem prazo definido</option>
                    </select>
                  </Field>
                  <Field label="Faixa de investimento" error={errors.budget} required>
                    <select id="budget" value={form.budget} onChange={(event) => update("budget", event.target.value)} aria-invalid={!!errors.budget}>
                      <option value="">Selecione uma faixa</option>
                      <option>Até R$ 5 mil</option>
                      <option>R$ 5 mil a R$ 15 mil</option>
                      <option>R$ 15 mil a R$ 40 mil</option>
                      <option>Acima de R$ 40 mil</option>
                      <option>Quero entender as possibilidades</option>
                    </select>
                  </Field>
                </div>
                <div className="form-actions">
                  <button className="button button-secondary" type="button" onClick={() => setStep(1)}>Voltar</button>
                  <button className="button button-primary" type="submit">Finalizar <Icon name="check" size={18} /></button>
                </div>
                <p className="form-disclaimer">Demonstração visual: nenhuma informação é enviada ou armazenada.</p>
              </motion.div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}) {
  const childWithId = children as React.ReactElement<{ id?: string }>;
  const inputId = childWithId.props.id;

  return (
    <div className="field">
      <label htmlFor={inputId}>{label}{required && <span className="required-mark"> *</span>}</label>
      {children}
      {error && <span className="field-error" role="alert">{error}</span>}
    </div>
  );
}

export default function GrafenoSite() {
  const pathname = usePathname();
  const route = pathname.split("/").filter(Boolean)[0] || "home";
  const active = ["solucoes", "orcamento"].includes(route) ? route : "home";
  const [legalTopic, setLegalTopic] = useState("");

  return (
    <>
      <style jsx global>{`
        :root {
          --ink: #202d2c;
          --ink-soft: #3e4b49;
          --muted: #687572;
          --paper: #faf9f5;
          --white: #fffefa;
          --line: #e7e7df;
          --green: #1d6656;
          --green-dark: #174c42;
          --green-light: #e6f0e9;
          --copper: #bd6c48;
          --copper-light: #f5e8df;
          --blue-light: #e6eef0;
          --success: #26704f;
          --danger: #b5473b;
          --radius-sm: 10px;
          --radius-md: 16px;
          --radius-lg: 24px;
          --shadow-soft: 0 18px 55px rgba(32, 45, 44, .08);
          --ease-out: cubic-bezier(.2, .75, .25, 1);
        }
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
          margin: 0;
          background: var(--paper);
          color: var(--ink);
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          -webkit-font-smoothing: antialiased;
        }
        a { color: inherit; text-decoration: none; }
        button, input, select, textarea { font: inherit; }
        button { color: inherit; }
        ::selection { background: #d7e9df; color: var(--ink); }
        :focus-visible { outline: 3px solid #bf704d; outline-offset: 3px; }
        .site-header { height: 76px; position: sticky; z-index: 30; top: 0; background: rgba(250,249,245,.94); backdrop-filter: blur(14px); border-bottom: 1px solid rgba(32,45,44,.07); }
        .header-inner { max-width: 1180px; height: 100%; margin: 0 auto; padding: 0 28px; display: flex; align-items: center; justify-content: space-between; }
        .brand { display: inline-flex; align-items: center; gap: 10px; width: fit-content; }
        .brand-mark { width: 28px; height: 28px; display: grid; grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(2, 1fr); gap: 2px; transform: rotate(30deg); }
        .brand-mark span { background: var(--green); clip-path: polygon(25% 0,75% 0,100% 50%,75% 100%,25% 100%,0 50%); }
        .brand-mark span:nth-child(2), .brand-mark span:nth-child(5) { background: var(--copper); }
        .brand-name { font-size: 17px; font-weight: 760; letter-spacing: -.7px; color: var(--ink); }
        .brand-name span { color: var(--green); font-weight: 520; margin-left: 4px; }
        .main-nav { display: flex; align-items: center; gap: 34px; }
        .main-nav > a:not(.nav-cta) { font-size: 14px; color: var(--ink-soft); transition: color .16s ease; }
        .main-nav > a:not(.nav-cta):hover, .main-nav > a[aria-current="page"] { color: var(--green); }
        .nav-cta { min-height: 42px; display: inline-flex; align-items: center; justify-content: center; gap: 9px; padding: 0 17px; background: var(--green); color: white; border-radius: 8px; font-size: 13px; font-weight: 650; transition: transform .18s ease, background .18s ease; }
        .nav-cta:hover, .button-primary:hover { background: var(--green-dark); transform: translateY(-2px); }
        .nav-cta-active { box-shadow: 0 0 0 3px rgba(29,102,86,.15); }
        .mobile-menu { display: none; border: 1px solid var(--line); background: var(--white); width: 42px; height: 42px; border-radius: 10px; align-items: center; justify-content: center; cursor: pointer; }
        .hero { position: relative; overflow: hidden; background: var(--paper); }
        .hero-grid { position: absolute; inset: 0 0 0 48%; opacity: .52; pointer-events: none; background-image: url("data:image/svg+xml,%3Csvg width='82' height='72' viewBox='0 0 82 72' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20.5 1 41 12.8v23.7L20.5 48.3 0 36.5V12.8L20.5 1Z M61.5 24.7 82 36.5v23.7L61.5 72 41 60.2V36.5l20.5-11.8Z' fill='none' stroke='%23dce5dc' stroke-width='1'/%3E%3C/svg%3E"); mask-image: linear-gradient(90deg, transparent, #000 30%, #000); }
        .hero-content { max-width: 1180px; min-height: 574px; margin: auto; padding: 84px 28px 64px; display: grid; grid-template-columns: 1.08fr .92fr; align-items: center; gap: 40px; position: relative; }
        .eyebrow { display: inline-flex; align-items: center; gap: 9px; font-size: 11px; line-height: 1.4; font-weight: 720; color: var(--green); letter-spacing: 1.2px; text-transform: uppercase; }
        .eyebrow-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--copper); display: inline-block; flex: 0 0 auto; }
        .hero h1, .inner-hero h1 { font-size: clamp(43px, 5.2vw, 66px); letter-spacing: -3.3px; line-height: 1.04; max-width: 650px; margin: 21px 0 20px; font-weight: 660; }
        h1 em, h2 em { color: var(--green); font-style: normal; }
        .hero-copy { max-width: 480px; margin: 0; color: var(--muted); font-size: 17px; line-height: 1.72; }
        .hero-actions { display: flex; align-items: center; gap: 24px; flex-wrap: wrap; margin-top: 30px; }
        .button { display: inline-flex; min-height: 48px; align-items: center; justify-content: center; gap: 12px; border-radius: 9px; padding: 0 20px; font-size: 14px; font-weight: 650; cursor: pointer; border: 0; transition: transform .18s ease, background .18s ease, border-color .18s ease; }
        .button-primary { color: white; background: var(--green); box-shadow: 0 6px 15px rgba(29,102,86,.14); }
        .button-primary svg, .text-link span { transition: transform .18s ease; }
        .button-primary:hover svg, .text-link:hover span { transform: translateX(3px); }
        .text-link { color: var(--green); font-size: 14px; font-weight: 650; display: inline-flex; gap: 8px; align-items: center; }
        .text-link span { font-size: 17px; }
        .hero-proof { display: flex; align-items: center; gap: 10px; color: var(--muted); font-size: 12px; margin-top: 26px; }
        .proof-mark { width: 21px; height: 21px; border-radius: 50%; color: var(--green); background: var(--green-light); display: inline-flex; justify-content: center; align-items: center; }
        .hero-visual { position: relative; z-index: 1; max-width: 480px; width: 100%; justify-self: end; padding: 24px; background: rgba(255,254,250,.94); border: 1px solid #e6e8e0; border-radius: 19px; box-shadow: var(--shadow-soft); }
        .visual-top { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding-bottom: 19px; border-bottom: 1px solid var(--line); }
        .visual-top > div { display: grid; gap: 6px; }
        .visual-caption { font-size: 9px; color: #87918c; letter-spacing: 1.1px; font-weight: 700; }
        .visual-top strong { font-size: 15px; letter-spacing: -.3px; }
        .live-pill { display: inline-flex; align-items: center; gap: 6px; padding: 7px 9px; background: #edf4ed; border-radius: 20px; color: #3d7657; font-size: 10px; white-space: nowrap; }
        .live-pill i, .mock-foot i { width: 6px; height: 6px; background: #5c9b6e; border-radius: 50%; }
        .visual-summary { display: grid; gap: 10px; padding-top: 17px; }
        .summary-card { min-height: 66px; display: flex; align-items: center; gap: 12px; padding: 10px 12px; border: 1px solid #eeeee8; border-radius: 11px; background: #fff; }
        .summary-card > span:nth-child(2) { display: grid; gap: 3px; flex: 1; }
        .summary-card small { color: #7a8581; font-size: 10px; }
        .summary-card strong { font-size: 15px; letter-spacing: -.2px; }
        .summary-card .unit { font-weight: 450; }
        .summary-icon { width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; border-radius: 10px; }
        .coral { color: #a55b43; background: #f8eae3; }
        .green { color: #2d7454; background: #e8f2e9; }
        .blue { color: #507580; background: #e8f0f1; }
        .summary-trend { font-size: 10px; color: #508161; background: #eef5ed; padding: 5px 7px; border-radius: 6px; }
        .summary-check { color: #45825c; }
        .summary-arrow { color: var(--green); font-size: 17px; }
        .visual-note { display: flex; gap: 9px; align-items: center; margin-top: 17px; color: #87918c; font-size: 10px; }
        .note-line { height: 1px; width: 26px; background: var(--copper); }
        .visual-decoration { position: absolute; right: -18px; top: 55px; display: grid; grid-template-columns: repeat(2, 15px); gap: 3px; transform: rotate(30deg); opacity: .55; }
        .visual-decoration span { width: 15px; height: 17px; border: 1px solid var(--copper); clip-path: polygon(25% 0,75% 0,100% 50%,75% 100%,25% 100%,0 50%); }
        .visual-decoration span:nth-child(2n) { border-color: var(--green); }
        .hero-bottom { max-width: 1124px; margin: 0 auto; padding: 0 0 23px; display: flex; gap: 15px; align-items: center; color: #88918e; text-transform: uppercase; font-size: 9px; letter-spacing: 1.1px; }
        .hero-bottom-line { height: 1px; width: 42px; background: #d9ded7; }
        .section { max-width: 1180px; margin: 0 auto; padding: 96px 28px; }
        .section-heading { max-width: 610px; margin-bottom: 36px; }
        .section-heading.centered { text-align: center; margin-left: auto; margin-right: auto; }
        .section-heading h2, .fiscal-copy h2, .callout-inner h2 { font-size: clamp(31px, 4vw, 45px); line-height: 1.14; letter-spacing: -1.8px; font-weight: 640; margin: 14px 0 13px; }
        .section-heading p { max-width: 550px; color: var(--muted); font-size: 15px; line-height: 1.7; margin: 0; }
        .centered p { margin: auto; }
        .problem-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 17px; }
        .problem-card { position: relative; min-height: 225px; overflow: hidden; padding: 25px 24px; background: var(--white); border: 1px solid var(--line); border-radius: var(--radius-md); transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease; }
        .problem-card:hover, .solution-preview-card:hover, .custom-card:hover { transform: translateY(-4px); box-shadow: 0 13px 35px rgba(32,45,44,.07); border-color: #cedbd0; }
        .icon-tile { width: 44px; height: 44px; display: inline-flex; align-items: center; justify-content: center; border-radius: 12px; color: var(--green); background: var(--green-light); }
        .tile-1, .tile-copper { color: #a65d40; background: var(--copper-light); }
        .tile-2 { color: #587b84; background: var(--blue-light); }
        .tile-green { color: #2d7454; background: #e8f2e9; }
        .problem-card h3, .solution-preview-card h3, .custom-card h3 { margin: 20px 0 8px; font-size: 17px; letter-spacing: -.35px; }
        .problem-card p, .solution-preview-card p, .custom-card p { margin: 0; color: var(--muted); font-size: 13px; line-height: 1.65; }
        .card-index { position: absolute; right: 21px; top: 25px; color: #c8cfca; font-size: 11px; letter-spacing: 1px; }
        .solutions-preview { display: grid; grid-template-columns: .85fr 1.15fr; gap: 50px; align-items: center; }
        .solutions-preview .section-heading { margin-bottom: 0; }
        .preview-grid { display: grid; gap: 13px; }
        .solution-preview-card { border: 1px solid var(--line); background: var(--white); border-radius: var(--radius-md); padding: 23px; transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease; }
        .featured-preview { background: #f2f4ed; }
        .preview-card-top { display: flex; align-items: center; justify-content: space-between; }
        .small-tag { color: #78837e; font-size: 10px; font-weight: 650; letter-spacing: .6px; text-transform: uppercase; }
        .solution-preview-card h3 { margin-top: 15px; }
        .solution-preview-card .text-link { margin-top: 17px; font-size: 12px; }
        .cases-section { padding-top: 78px; }
        .case-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; }
        .case-card { padding: 22px; background: var(--white); border: 1px solid var(--line); border-radius: var(--radius-md); }
        .case-sector { color: var(--green); font-size: 10px; font-weight: 680; letter-spacing: .3px; }
        .case-card h3 { margin: 11px 0 19px; font-size: 18px; letter-spacing: -.4px; }
        .case-flow { display: grid; gap: 13px; }
        .case-flow > div { padding-left: 12px; border-left: 2px solid #e6e9e1; }
        .case-flow > div > span { font-size: 10px; font-weight: 700; color: #87918c; text-transform: uppercase; letter-spacing: .7px; }
        .case-flow p { margin: 4px 0 0; color: var(--muted); font-size: 12px; line-height: 1.55; }
        .case-flow .case-result { border-color: var(--copper); }
        .case-result > span { color: #a65d40 !important; }
        .process-section { display: grid; grid-template-columns: .9fr 1.1fr; gap: 66px; padding-top: 72px; padding-bottom: 93px; }
        .process-section .section-heading { margin: 0; }
        .process-list { display: grid; grid-template-columns: 1fr 1fr; gap: 23px 24px; }
        .process-step { display: grid; grid-template-columns: 35px 1fr; gap: 12px; position: relative; }
        .step-number { width: 32px; height: 32px; display: inline-flex; align-items: center; justify-content: center; background: var(--green-light); color: var(--green); border-radius: 50%; font-size: 10px; font-weight: 750; }
        .step-connector { position: absolute; width: 1px; height: 20px; background: #dce5dc; top: 38px; left: 15px; }
        .process-step h3 { margin: 3px 0 5px; font-size: 14px; }
        .process-step p { margin: 0; color: var(--muted); font-size: 12px; line-height: 1.55; }
        .callout-section { position: relative; overflow: hidden; background: var(--green-dark); color: white; }
        .callout-inner { max-width: 1124px; margin: auto; min-height: 250px; padding: 48px 0; display: flex; align-items: center; justify-content: space-between; gap: 36px; position: relative; z-index: 1; }
        .callout-inner > div { max-width: 620px; }
        .callout-eyebrow { color: #c1d6c9; }
        .callout-inner h2 { margin-top: 13px; max-width: 560px; }
        .callout-inner p { margin: 0; color: #d0ded6; font-size: 14px; line-height: 1.65; max-width: 560px; }
        .button-light { background: #fffefa; color: var(--green-dark); white-space: nowrap; }
        .button-light:hover { background: #e8f1e9; transform: translateY(-2px); }
        .callout-pattern { position: absolute; inset: 0; opacity: .16; background-image: url("data:image/svg+xml,%3Csvg width='82' height='72' viewBox='0 0 82 72' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20.5 1 41 12.8v23.7L20.5 48.3 0 36.5V12.8L20.5 1Z M61.5 24.7 82 36.5v23.7L61.5 72 41 60.2V36.5l20.5-11.8Z' fill='none' stroke='%23ffffff' stroke-width='1'/%3E%3C/svg%3E"); mask-image: linear-gradient(90deg, transparent, #000); }
        .site-footer { background: #f1f1eb; }
        .footer-top, .footer-bottom { max-width: 1124px; margin: auto; }
        .footer-top { display: flex; justify-content: space-between; gap: 55px; padding: 49px 0 38px; }
        .footer-brand-block p { max-width: 215px; color: var(--muted); font-size: 12px; line-height: 1.6; }
        .footer-links { display: grid; grid-template-columns: repeat(3, auto); gap: clamp(35px, 6vw, 82px); }
        .footer-links > div { display: grid; align-content: start; justify-items: start; gap: 10px; }
        .footer-label { color: var(--ink); font-size: 11px; font-weight: 700; margin-bottom: 3px; }
        .footer-links a, .footer-links button { padding: 0; border: 0; background: transparent; cursor: pointer; color: var(--muted); font-size: 11px; text-align: left; }
        .footer-links a:hover, .footer-links button:hover { color: var(--green); }
        .footer-bottom { min-height: 50px; border-top: 1px solid #dedfd8; display: flex; align-items: center; justify-content: space-between; gap: 12px; color: #7b8580; font-size: 10px; }
        .footer-bottom small { color: #9a8177; }
        .whatsapp-float { position: fixed; z-index: 25; bottom: 24px; right: 24px; width: 52px; height: 52px; display: flex; justify-content: center; align-items: center; border-radius: 50%; color: white; background: #287b55; box-shadow: 0 6px 22px rgba(25,75,52,.25); transition: transform .18s ease, box-shadow .18s ease; }
        .whatsapp-float:hover { transform: translateY(-3px); box-shadow: 0 10px 26px rgba(25,75,52,.3); }
        .inner-hero { position: relative; overflow: hidden; min-height: 385px; display: flex; align-items: center; max-width: none; padding: 70px max(28px, calc((100vw - 1124px) / 2)); background: #f2f3ec; }
        .inner-hero > div:not(.inner-hero-pattern) { position: relative; z-index: 1; max-width: 720px; }
        .inner-hero h1 { font-size: clamp(39px, 5vw, 58px); max-width: 700px; margin: 17px 0 15px; }
        .inner-hero p { max-width: 570px; color: var(--muted); line-height: 1.7; font-size: 15px; margin: 0 0 25px; }
        .inner-hero-pattern { position: absolute; width: 470px; height: 400px; right: 0; top: 0; opacity: .6; background-image: url("data:image/svg+xml,%3Csvg width='82' height='72' viewBox='0 0 82 72' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20.5 1 41 12.8v23.7L20.5 48.3 0 36.5V12.8L20.5 1Z M61.5 24.7 82 36.5v23.7L61.5 72 41 60.2V36.5l20.5-11.8Z' fill='none' stroke='%23d4dfd3' stroke-width='1'/%3E%3C/svg%3E"); mask-image: linear-gradient(90deg, transparent, #000); }
        .ready-section { padding-top: 83px; padding-bottom: 88px; }
        .product-card { display: grid; grid-template-columns: .95fr 1.05fr; gap: 45px; padding: 34px; background: var(--white); border: 1px solid var(--line); border-radius: 20px; box-shadow: 0 13px 38px rgba(32,45,44,.04); }
        .product-label { display: inline-flex; align-items: center; gap: 8px; color: #78837e; font-size: 10px; font-weight: 720; letter-spacing: 1px; }
        .product-label .eyebrow-dot { width: 6px; height: 6px; }
        .product-main h3 { max-width: 440px; margin: 17px 0 13px; font-size: 34px; line-height: 1.16; letter-spacing: -1.2px; font-weight: 640; }
        .product-main > p { max-width: 440px; margin: 0; color: var(--muted); font-size: 14px; line-height: 1.7; }
        .check-list { list-style: none; padding: 0; margin: 21px 0 24px; display: grid; gap: 11px; color: var(--ink-soft); font-size: 12px; }
        .check-list li { display: flex; align-items: center; gap: 9px; }
        .check-list svg { color: var(--green); }
        .product-note { display: block; color: #8a938e; font-size: 10px; margin-top: 12px; }
        .product-visual { position: relative; min-height: 330px; display: flex; align-items: center; justify-content: center; padding: 19px; background: #eef2ec; border-radius: 15px; overflow: hidden; }
        .mock-window { width: 100%; max-width: 410px; padding: 17px; background: #fffefa; border: 1px solid #e1e6dd; border-radius: 12px; box-shadow: 0 14px 34px rgba(32,45,44,.09); }
        .mock-window-head { display: flex; align-items: center; gap: 9px; padding-bottom: 13px; border-bottom: 1px solid #edf0e9; color: #596460; font-size: 10px; font-weight: 650; }
        .mock-dots { display: inline-flex; gap: 3px; }
        .mock-dots i { width: 5px; height: 5px; border-radius: 50%; background: #d9a18b; }
        .mock-dots i:nth-child(2) { background: #e6c681; }
        .mock-dots i:nth-child(3) { background: #9ab596; }
        .mock-date { margin-left: auto; color: #8a938e; font-size: 8px; }
        .mock-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin: 13px 0; }
        .mock-stats > div { display: grid; gap: 5px; padding: 9px; background: #f5f6f1; border-radius: 7px; }
        .mock-stats small { color: #85908a; font-size: 8px; }
        .mock-stats strong { font-size: 14px; }
        .mock-order { display: flex; align-items: center; gap: 9px; padding: 10px 0; border-bottom: 1px solid #f0f0ea; }
        .mock-order-icon { width: 25px; height: 25px; display: flex; align-items: center; justify-content: center; background: #e8f0e8; color: var(--green); border-radius: 7px; font-size: 8px; font-weight: 750; }
        .mock-order > span:nth-child(2) { display: grid; gap: 3px; flex: 1; }
        .mock-order strong { font-size: 9px; }
        .mock-order small { color: #89928d; font-size: 8px; }
        .order-status { padding: 4px 6px; border-radius: 5px; font-size: 7px; font-weight: 600; white-space: nowrap; }
        .status-ready { background: #fbf0df; color: #9a6b2d; }
        .status-delivery { background: #e8f0f1; color: #527780; }
        .status-new { background: #e9f1e8; color: #41704f; }
        .mock-foot { padding-top: 12px; display: flex; justify-content: space-between; color: #8b948f; font-size: 8px; }
        .mock-foot span:first-child { display: flex; align-items: center; gap: 5px; }
        .product-stamp { position: absolute; right: 9px; bottom: 15px; display: flex; align-items: center; gap: 8px; padding: 10px 12px; background: var(--green-dark); color: #fff; border-radius: 10px; font-size: 9px; line-height: 1.5; box-shadow: 0 7px 19px rgba(23,76,66,.2); }
        .product-stamp svg { color: #e2bd8a; }
        .fiscal-section { background: var(--green-dark); color: white; }
        .fiscal-inner { max-width: 1124px; padding: 82px 0; margin: auto; display: grid; grid-template-columns: 1fr .86fr; align-items: center; gap: 80px; }
        .fiscal-eyebrow { color: #c3d7ca; }
        .fiscal-copy h2 { margin: 16px 0; max-width: 480px; }
        .fiscal-copy > p { max-width: 485px; color: #d0ded6; font-size: 14px; line-height: 1.75; }
        .fiscal-copy .button { margin-top: 12px; }
        .fiscal-panel { padding: 22px; background: #fffefa; color: var(--ink); border-radius: 16px; box-shadow: 0 15px 38px rgba(0,0,0,.11); }
        .fiscal-panel-head { display: flex; align-items: center; gap: 12px; padding-bottom: 17px; border-bottom: 1px solid var(--line); }
        .fiscal-panel-icon { width: 41px; height: 41px; display: inline-flex; align-items: center; justify-content: center; color: var(--green); background: var(--green-light); border-radius: 11px; }
        .fiscal-panel-head > span:last-child { display: grid; gap: 4px; }
        .fiscal-panel-head small { color: #87918c; letter-spacing: 1px; font-size: 8px; font-weight: 700; }
        .fiscal-panel-head strong { font-size: 13px; }
        .fiscal-list { display: grid; padding: 7px 0; }
        .fiscal-list > div { display: flex; align-items: center; gap: 11px; padding: 12px 0; border-bottom: 1px solid #eff0ea; }
        .fiscal-list-icon { width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; background: #f2f4ed; border-radius: 9px; color: var(--green); }
        .fiscal-list > div > span:nth-child(2) { flex: 1; display: grid; gap: 3px; }
        .fiscal-list strong { font-size: 11px; }
        .fiscal-list small { color: #818b86; font-size: 9px; }
        .fiscal-arrow { color: var(--copper); font-size: 14px; }
        .fiscal-disclaimer { color: #89928d; font-size: 9px; line-height: 1.5; padding-top: 8px; }
        .custom-section { padding-top: 86px; padding-bottom: 80px; }
        .custom-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; }
        .custom-card { min-height: 190px; padding: 22px; border: 1px solid var(--line); border-radius: var(--radius-md); background: var(--white); transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease; }
        .custom-card h3 { margin-top: 16px; }
        .custom-bottom { margin-top: 23px; padding-top: 18px; border-top: 1px solid var(--line); display: flex; align-items: center; justify-content: space-between; gap: 15px; color: var(--muted); font-size: 12px; }
        .custom-bottom .text-link { font-size: 12px; }
        .budget-page { min-height: 680px; padding: 78px 28px 90px; background: #f5f5ef; }
        .budget-layout { max-width: 1124px; margin: auto; display: grid; grid-template-columns: .78fr 1.22fr; gap: 72px; align-items: start; }
        .budget-intro { padding-top: 18px; }
        .budget-intro h1 { margin: 17px 0; max-width: 440px; font-size: clamp(37px, 4.3vw, 53px); line-height: 1.08; letter-spacing: -2.1px; font-weight: 650; }
        .budget-intro > p { max-width: 400px; color: var(--muted); font-size: 14px; line-height: 1.7; }
        .budget-aside { display: flex; align-items: flex-start; gap: 11px; max-width: 370px; margin-top: 32px; padding: 15px; border: 1px solid #e5e7df; background: rgba(255,254,250,.62); border-radius: 12px; }
        .budget-aside-icon { color: var(--green); }
        .budget-aside > span:last-child { display: grid; gap: 5px; }
        .budget-aside strong { font-size: 12px; }
        .budget-aside small { color: var(--muted); font-size: 10px; line-height: 1.5; }
        .budget-contact { display: grid; gap: 7px; margin-top: 28px; color: var(--muted); font-size: 11px; }
        .budget-contact a { color: var(--green); font-weight: 680; }
        .budget-contact a span { margin-left: 4px; }
        .form-card { padding: 29px; background: var(--white); border: 1px solid #e8e9e1; border-radius: 17px; box-shadow: 0 16px 45px rgba(32,45,44,.06); }
        .form-progress { margin-bottom: 25px; }
        .form-step-heading { display: flex; flex-direction: column; gap: 6px; margin-bottom: 13px; }
        .form-step-heading span { color: var(--green); font-size: 9px; letter-spacing: 1px; font-weight: 720; }
        .form-step-heading strong { font-size: 17px; }
        .progress-track { height: 4px; background: #e9ede7; border-radius: 10px; overflow: hidden; }
        .progress-track span { width: 100%; height: 100%; display: block; transform-origin: left; background: var(--green); border-radius: inherit; transition: transform .3s ease; }
        .form-heading { margin-bottom: 22px; }
        .form-heading h2 { margin: 0 0 7px; font-size: 19px; letter-spacing: -.45px; }
        .form-heading p { margin: 0; color: var(--muted); font-size: 11px; line-height: 1.5; }
        .field-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px 13px; margin-bottom: 16px; }
        .field { display: grid; gap: 7px; margin-bottom: 15px; }
        .field label, .need-fieldset legend { color: #44514e; font-size: 11px; font-weight: 650; }
        .required-mark, .need-fieldset legend span { color: var(--copper); }
        .field input, .field select, .field textarea { width: 100%; min-height: 43px; padding: 0 12px; color: var(--ink); background: #fff; border: 1px solid #dfe3dc; border-radius: 8px; font-size: 12px; transition: border-color .15s ease, box-shadow .15s ease; }
        .field textarea { min-height: 83px; padding: 11px 12px; resize: vertical; line-height: 1.5; }
        .field input::placeholder, .field textarea::placeholder { color: #a0a8a3; }
        .field select { appearance: none; padding-right: 30px; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23687572' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 12px center; }
        .field input:focus, .field select:focus, .field textarea:focus { outline: none; border-color: var(--green); box-shadow: 0 0 0 3px rgba(29,102,86,.12); }
        .field input[aria-invalid="true"], .field select[aria-invalid="true"] { border-color: var(--danger); }
        .field-error { color: var(--danger); font-size: 10px; }
        .form-next { width: 100%; margin-top: 3px; }
        .need-fieldset { margin: 1px 0 17px; padding: 0; border: 0; }
        .need-fieldset legend { padding: 0; margin-bottom: 10px; }
        .choice-grid { display: flex; flex-wrap: wrap; gap: 8px; }
        .choice-chip { min-height: 35px; display: inline-flex; align-items: center; gap: 7px; padding: 0 10px; border: 1px solid #e1e4dd; border-radius: 20px; color: #596460; font-size: 10px; cursor: pointer; transition: border-color .15s ease, background .15s ease; }
        .choice-chip:hover { border-color: #a8c0ae; }
        .choice-chip input { position: absolute; opacity: 0; pointer-events: none; }
        .choice-chip:focus-within { outline: 3px solid rgba(189,108,72,.4); outline-offset: 2px; }
        .choice-selected { border-color: #9db9a2; color: var(--green-dark); background: #eef4ec; }
        .choice-check { width: 15px; height: 15px; display: inline-flex; align-items: center; justify-content: center; border: 1px solid #cbd3cb; border-radius: 4px; color: transparent; background: #fff; }
        .choice-selected .choice-check { color: white; border-color: var(--green); background: var(--green); }
        .form-actions { display: flex; justify-content: space-between; gap: 12px; margin-top: 5px; }
        .button-secondary { color: var(--ink-soft); border: 1px solid #dfe3dc; background: white; }
        .button-secondary:hover { background: #f5f6f1; }
        .form-disclaimer { text-align: center; color: #8b948e; font-size: 9px; line-height: 1.5; margin: 15px 0 0; }
        .success-card { max-width: 580px; margin: 10px auto; padding: 48px; text-align: center; background: var(--white); border: 1px solid var(--line); border-radius: 20px; box-shadow: var(--shadow-soft); }
        .success-icon { width: 58px; height: 58px; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; color: var(--green); background: var(--green-light); border-radius: 50%; }
        .success-card h1 { margin: 14px 0; font-size: 34px; line-height: 1.15; letter-spacing: -1.2px; }
        .success-card p { margin: 0 0 23px; color: var(--muted); font-size: 13px; line-height: 1.7; }
        .legal-overlay { position: fixed; z-index: 60; inset: 0; display: flex; align-items: center; justify-content: center; padding: 20px; background: rgba(20,33,30,.5); }
        .legal-dialog { width: min(100%, 450px); padding: 25px; background: var(--white); border-radius: 16px; box-shadow: var(--shadow-soft); }
        .legal-dialog-top { display: flex; align-items: center; justify-content: space-between; }
        .legal-dialog h2 { margin: 0; font-size: 20px; }
        .legal-close { width: 38px; height: 38px; border: 1px solid var(--line); background: white; border-radius: 9px; display: flex; align-items: center; justify-content: center; cursor: pointer; }
        .legal-dialog p { color: var(--muted); line-height: 1.65; font-size: 13px; }
        @media (max-width: 1150px) {
          .hero-bottom, .callout-inner, .footer-top, .footer-bottom, .fiscal-inner { margin-left: 28px; margin-right: 28px; }
          .hero-bottom { padding-bottom: 23px; }
        }
        @media (max-width: 850px) {
          .main-nav { gap: 21px; }
          .hero-content { min-height: 530px; gap: 20px; padding-top: 70px; }
          .hero h1 { font-size: clamp(40px, 6vw, 54px); }
          .hero-visual { padding: 18px; }
          .solutions-preview { grid-template-columns: 1fr; gap: 29px; }
          .solutions-preview .section-heading { max-width: 650px; }
          .process-section { grid-template-columns: 1fr; gap: 36px; }
          .fiscal-inner { gap: 36px; }
          .budget-layout { gap: 35px; }
          .footer-top { gap: 30px; }
          .footer-links { gap: 32px; }
        }
        @media (max-width: 640px) {
          .site-header { height: 66px; }
          .header-inner { padding: 0 18px; }
          .brand-mark { width: 25px; height: 25px; }
          .brand-name { font-size: 16px; }
          .mobile-menu { display: inline-flex; }
          .main-nav { position: absolute; top: 65px; left: 0; right: 0; display: none; padding: 15px 18px 18px; flex-direction: column; align-items: stretch; gap: 0; background: var(--paper); border-bottom: 1px solid var(--line); box-shadow: 0 12px 18px rgba(32,45,44,.06); }
          .main-nav.nav-open { display: flex; }
          .main-nav > a:not(.nav-cta) { padding: 14px 7px; border-bottom: 1px solid #ecece5; }
          .main-nav .nav-cta { margin-top: 13px; }
          .hero-content { min-height: auto; display: flex; flex-direction: column; align-items: stretch; gap: 40px; padding: 58px 20px 40px; }
          .hero-grid { inset: 0 0 20% 12%; opacity: .4; }
          .hero h1 { font-size: clamp(40px, 11vw, 53px); letter-spacing: -2.4px; margin-top: 17px; }
          .hero-copy { font-size: 15px; }
          .hero-actions { align-items: flex-start; flex-direction: column; gap: 17px; margin-top: 24px; }
          .hero-proof { font-size: 11px; align-items: flex-start; }
          .hero-visual { max-width: 450px; align-self: center; }
          .visual-decoration { right: -6px; }
          .hero-bottom { margin: 0 20px; gap: 9px; font-size: 7px; letter-spacing: .7px; }
          .hero-bottom-line { width: 20px; }
          .section { padding: 67px 20px; }
          .section-heading { margin-bottom: 27px; }
          .section-heading h2, .fiscal-copy h2, .callout-inner h2 { font-size: 34px; letter-spacing: -1.3px; }
          .section-heading p { font-size: 13px; }
          .problem-grid, .case-grid, .custom-grid { grid-template-columns: 1fr; }
          .problem-card { min-height: auto; padding: 22px; }
          .solutions-preview { padding-top: 57px; padding-bottom: 62px; }
          .cases-section { padding-top: 58px; }
          .case-card { padding: 20px; }
          .process-section { gap: 30px; padding-top: 50px; padding-bottom: 63px; }
          .process-list { grid-template-columns: 1fr; gap: 18px; }
          .process-step { min-height: 54px; }
          .callout-inner { margin: 0; padding: 43px 20px; min-height: auto; align-items: flex-start; flex-direction: column; gap: 24px; }
          .callout-inner h2 { font-size: 32px; }
          .footer-top { margin: 0; padding: 37px 20px 28px; flex-direction: column; }
          .footer-links { grid-template-columns: repeat(2, 1fr); gap: 27px 18px; }
          .footer-bottom { margin: 0 20px; padding: 13px 0; flex-direction: column; align-items: flex-start; font-size: 9px; }
          .whatsapp-float { width: 48px; height: 48px; right: 15px; bottom: 15px; }
          .inner-hero { min-height: auto; padding: 60px 20px; }
          .inner-hero h1 { font-size: 42px; letter-spacing: -2.2px; }
          .inner-hero p { font-size: 14px; }
          .inner-hero-pattern { width: 270px; opacity: .35; }
          .ready-section { padding-top: 60px; padding-bottom: 62px; }
          .product-card { grid-template-columns: 1fr; gap: 25px; padding: 21px; }
          .product-main h3 { font-size: 30px; }
          .product-visual { min-height: 285px; padding: 13px; }
          .mock-window { padding: 12px; }
          .fiscal-inner { margin: 0; padding: 57px 20px; grid-template-columns: 1fr; gap: 30px; }
          .fiscal-copy h2 { font-size: 36px; }
          .custom-section { padding-top: 62px; padding-bottom: 60px; }
          .custom-card { min-height: auto; }
          .custom-bottom { align-items: flex-start; flex-direction: column; }
          .budget-page { padding: 49px 16px 64px; }
          .budget-layout { grid-template-columns: 1fr; gap: 26px; }
          .budget-intro { padding-top: 0; }
          .budget-intro h1 { font-size: 39px; }
          .budget-intro > p { font-size: 13px; }
          .budget-aside { margin-top: 20px; }
          .budget-contact { display: none; }
          .form-card { padding: 21px 17px; }
          .field-grid { grid-template-columns: 1fr; gap: 0; margin-bottom: 0; }
          .field { margin-bottom: 14px; }
          .choice-grid { gap: 7px; }
          .choice-chip { font-size: 9px; }
          .form-actions .button { flex: 1; padding: 0 12px; }
          .success-card { padding: 34px 22px; }
          .success-card h1 { font-size: 30px; }
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { scroll-behavior: auto !important; animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
        }
      `}</style>

      <Header active={active} />
      <main>
        {active === "solucoes" ? <SolutionsPage /> : active === "orcamento" ? <BudgetPage /> : <HomePage />}
      </main>
      <Footer onLegal={setLegalTopic} />
      <WhatsAppFloat />

      {legalTopic && (
        <div className="legal-overlay" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setLegalTopic("");
        }}>
          <motion.div className="legal-dialog" role="dialog" aria-modal="true" aria-labelledby="legal-title" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18 }}>
            <div className="legal-dialog-top">
              <h2 id="legal-title">{legalTopic}</h2>
              <button className="legal-close" type="button" aria-label="Fechar" onClick={() => setLegalTopic("")}><Icon name="x" size={18} /></button>
            </div>
            <p>Conteúdo demonstrativo. Antes de publicar, substitua este texto pela política e pelos termos oficiais da Grafeno Software.</p>
          </motion.div>
        </div>
      )}
    </>
  );
}

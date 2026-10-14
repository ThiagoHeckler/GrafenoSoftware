import type { CSSProperties, ReactNode } from "react";
import { Icon, type IconName } from "./icon";

/*
 * O que a gente faz: quatro cartões, cada um com uma prévia do que o cliente
 * recebe. Uma corrente de ligação passa pelos vãos entre eles, porque as
 * quatro frentes se ligam (o site vende, o app avisa, o sistema organiza).
 */

type Service = { id: string; icon: IconName; title: string; text: string; preview: ReactNode };

const services: Service[] = [
  {
    id: "sites",
    icon: "globe",
    title: "Sites",
    text: "Aparecem no Google e vendem com Pix e cartão.",
    preview: (
      <div className="pv-sites">
        <div className="pv-search">
          <span className="pv-search-bar"><Icon name="search" size={13} />padaria perto de mim</span>
          <div className="pv-result">
            <small>padariaaraucaria.com.br</small>
            <strong>Padaria Araucária: encomendas online</strong>
            <span><span className="pv-stars">★★★★★</span><span className="pv-muted">4,9 de 312 avaliações</span></span>
          </div>
        </div>
        <div className="pv-paid">
          <span className="pv-paid-mark"><Icon name="check" size={14} /></span>
          <span><strong>Pedido pago com Pix</strong><small>R$ 86,50, retirada às 7h30</small></span>
        </div>
      </div>
    ),
  },
  {
    id: "aplicativos",
    icon: "phone",
    title: "Aplicativos",
    text: "Seus clientes agendam, pedem e recebem avisos no celular.",
    preview: (
      <div className="pv-apps">
        <span className="pv-clock">7:24</span>
        <div className="pv-notice">
          <span className="pv-app-icon" style={{ "--c": "#ff6b2c" } as CSSProperties}>P</span>
          <span><strong>Pulso Academia</strong><small>Sua aula de yoga começa em 30 min.</small></span>
        </div>
        <div className="pv-notice">
          <span className="pv-app-icon" style={{ "--c": "#2f6fdb" } as CSSProperties}>V</span>
          <span><strong>Clínica Vida</strong><small>Consulta confirmada: quinta, 14h30.</small></span>
        </div>
      </div>
    ),
  },
  {
    id: "integracoes",
    icon: "plug",
    title: "Integrações",
    text: "Pix, nota fiscal, WhatsApp e planilha conversando sozinhos.",
    preview: (
      <div className="pv-hub">
        <svg viewBox="0 0 240 132" aria-hidden="true">
          <path d="M120 66 46 28M120 66l74-38M120 66 46 104M120 66l74 38" />
        </svg>
        <span className="pv-node" style={{ left: "19%", top: "21%" }}>Pix</span>
        <span className="pv-node" style={{ left: "81%", top: "21%" }}>NF-e</span>
        <span className="pv-node" style={{ left: "19%", top: "79%" }}>Planilha</span>
        <span className="pv-node" style={{ left: "81%", top: "79%" }}>WhatsApp</span>
        <span className="pv-core"><Icon name="plug" size={18} /></span>
      </div>
    ),
  },
  {
    id: "sistemas",
    icon: "chart",
    title: "Sistemas de gestão",
    text: "Vendas, estoque e equipe num painel só.",
    preview: (
      <div className="pv-system">
        <div className="pv-kpi">
          <small>Vendas da semana</small>
          <strong>R$ 18.420</strong>
          <span className="pv-up">12% acima da anterior</span>
        </div>
        <div className="pv-bars" aria-hidden="true">
          {[42, 58, 50, 66, 61, 84, 92].map((h, i) => (
            <i key={i} style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="pv-roles">
          <span>Gerente</span>
          <span>Caixa</span>
          <span>Estoque</span>
        </div>
      </div>
    ),
  },
];

export function Services() {
  return (
    <div className="services-grid" data-reveal="services">
      <span className="bond bond-a" aria-hidden="true" />
      <span className="bond bond-b" aria-hidden="true" />
      <span className="bond bond-c" aria-hidden="true" />
      {services.map((service, index) => (
        <article
          key={service.id}
          className={`service-card service-${service.id}`}
          style={{ "--i": index } as CSSProperties}
          aria-labelledby={`service-${service.id}`}
        >
          <div className="service-preview" aria-hidden="true">{service.preview}</div>
          <div className="service-body">
            <h3 id={`service-${service.id}`}>
              <span className="service-atom" aria-hidden="true"><Icon name={service.icon} size={18} /></span>
              {service.title}
            </h3>
            <p>{service.text}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

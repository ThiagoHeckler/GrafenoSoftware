import type { CSSProperties } from "react";
import { Icon } from "./icon";

/*
 * O que muda: dois cartões lado a lado. À esquerda o que o negócio perde
 * sem mudar nada (borda vermelha); à direita o que ganha com a Covalia
 * (borda verde). Os itens seguem a mesma ordem, um respondendo ao outro.
 */

const losses = [
  { title: "Atendimento lento", text: "Cliente esperando resposta e indo comprar no concorrente." },
  { title: "Decisão no achismo", text: "Sem saber o que vende, quando e para quem." },
  { title: "Digitação repetida", text: "A equipe copiando pedido da conversa para a planilha." },
  { title: "Cliente esquecido", text: "Ninguém lembra de chamar de volta quem sumiu." },
  { title: "Processo improvisado", text: "Cada projeto sem prazo claro nem próximo passo." },
];

const gains = [
  { title: "Respostas e lembretes automáticos", text: "O cliente é atendido na hora, até fora do expediente." },
  { title: "Resultado medido num painel", text: "Vendas, atendimentos e metas atualizados sozinhos." },
  { title: "Sistemas que trabalham sozinhos", text: "Nota fiscal, cobrança e relatórios sem ninguém apertar botão." },
  { title: "CRM com o histórico de cada um", text: "Quem comprou, quando voltou e o que pediu, num lugar só." },
  { title: "Método do começo ao fim", text: "Proposta por escrito, telas aprovadas e entregas curtas." },
];

export function WhyHire() {
  return (
    <section className="why" aria-labelledby="why-title">
      <div className="why-inner">
        <div className="why-intro" data-reveal>
          <h2 id="why-title">O que muda quando a Covalia entra</h2>
          <p>Inovação aplicada ao seu negócio, com resultado que dá para medir.</p>
        </div>

        <div className="compare">
          <div className="compare-card is-loss" data-reveal>
            <h3>Sem mudar nada</h3>
            <ul>
              {losses.map((item) => (
                <li key={item.title}>
                  <span className="compare-mark" aria-hidden="true"><Icon name="x" size={14} /></span>
                  <span><strong>{item.title}</strong><span>{item.text}</span></span>
                </li>
              ))}
            </ul>
          </div>

          <div className="compare-card is-gain" data-reveal style={{ "--i": 1 } as CSSProperties}>
            <h3>Com a Covalia</h3>
            <ul>
              {gains.map((item) => (
                <li key={item.title}>
                  <span className="compare-mark" aria-hidden="true"><Icon name="check" size={14} /></span>
                  <span><strong>{item.title}</strong><span>{item.text}</span></span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

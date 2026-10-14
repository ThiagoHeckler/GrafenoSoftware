import { Suspense } from "react";
import { BudgetForm } from "./budget-form";
import { WHATSAPP_URL } from "./whatsapp-float";

/*
 * Pedido de orçamento: texto de apoio e o formulário em duas etapas.
 * Aparece no fim da página inicial (como h2) e na página /orcamento (como h1).
 */
export function BudgetSection({ as: Heading = "h2" }: { as?: "h1" | "h2" }) {
  return (
    <section id="orcamento" className="budget" aria-labelledby="budget-title">
      <div className="budget-intro">
        <Heading id="budget-title">Tem um projeto em mente? Conte para a gente</Heading>
        <p>Site, aplicativo ou sistema: responda algumas perguntas rápidas. Leva cerca de dois minutos e a primeira conversa é sem compromisso.</p>
        <p className="budget-direct">
          Prefere falar direto?{" "}
          <a className="text-link" href={WHATSAPP_URL} target="_blank" rel="noreferrer">Chamar no WhatsApp</a>
        </p>
      </div>
      <Suspense fallback={<div className="form-card form-loading" aria-busy="true">Carregando formulário…</div>}>
        <BudgetForm />
      </Suspense>
    </section>
  );
}

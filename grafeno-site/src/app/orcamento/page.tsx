import type { Metadata } from "next";
import { Suspense } from "react";
import { BudgetForm } from "@/components/budget-form";
import { WHATSAPP_URL } from "@/components/whatsapp-float";

export const metadata: Metadata = {
  title: "Pedir orçamento",
  description: "Conte um pouco sobre a sua empresa para a Grafeno preparar uma conversa objetiva.",
};

export default function BudgetPage() {
  return (
    <section className="budget" aria-labelledby="budget-title">
      <div className="budget-intro">
        <h1 id="budget-title">Conte sobre o seu projeto</h1>
        <p>Site, aplicativo ou sistema: responda algumas perguntas rápidas. Leva cerca de dois minutos e deixa a primeira conversa mais objetiva.</p>
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

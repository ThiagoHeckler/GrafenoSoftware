import type { Metadata } from "next";
import { BudgetSection } from "@/components/budget-section";

export const metadata: Metadata = {
  title: "Pedir orçamento",
  description: "Conte um pouco sobre a sua empresa para a Covalia preparar uma conversa objetiva.",
};

export default function BudgetPage() {
  return <BudgetSection as="h1" />;
}

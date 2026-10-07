/*
 * Opções e validação do pedido de orçamento. Compartilhado entre o
 * formulário (navegador) e a Server Action (servidor): o servidor nunca
 * confia só na validação do navegador.
 */

export const segments = ["Comércio e varejo", "Alimentação", "Saúde e bem-estar", "Serviços", "Indústria", "Educação", "Outro"];
export const companySizes = ["Sou só eu", "2 a 5 pessoas", "6 a 20 pessoas", "21 a 50 pessoas", "Mais de 50 pessoas"];
export const needs = ["Site institucional", "Loja virtual", "Aplicativo", "Sistema de gestão", "Integração ou automação", "Outro"];
export const deadlines = ["O quanto antes", "Nos próximos 3 meses", "Em 3 a 6 meses", "Estou pesquisando, sem prazo definido"];
export const budgets = ["Até R$ 5 mil", "R$ 5 mil a R$ 15 mil", "R$ 15 mil a R$ 40 mil", "Acima de R$ 40 mil", "Quero entender as possibilidades"];

export const emptyBudget = {
  name: "",
  company: "",
  email: "",
  phone: "",
  segment: "",
  size: "",
  need: "",
  details: "",
  deadline: "",
  budget: "",
};

export type BudgetRequest = typeof emptyBudget;
export type BudgetErrors = Record<string, string>;

export const LIMITS = { short: 120, details: 3000 };

export function emailFormatError(email: string): string | undefined {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ? undefined : "Confira o e-mail: falta o @ ou o domínio.";
}

/* A ordem das chaves é a ordem dos campos na tela: o primeiro erro recebe o foco. */
export function stepOneErrors(form: BudgetRequest): BudgetErrors {
  const next: BudgetErrors = {};
  if (!form.name.trim()) next.name = "Conte seu nome para a gente.";
  if (!form.company.trim()) next.company = "Informe o nome da empresa.";
  const emailError = emailFormatError(form.email);
  if (emailError) next.email = emailError;
  if (form.phone.replace(/\D/g, "").length < 10) next.phone = "Informe o WhatsApp com DDD, por exemplo (49) 99999-9999.";
  return next;
}

export function stepTwoErrors(form: BudgetRequest): BudgetErrors {
  const next: BudgetErrors = {};
  if (!segments.includes(form.segment)) next.segment = "Selecione o segmento da empresa.";
  if (!companySizes.includes(form.size)) next.size = "Selecione o tamanho da equipe.";
  if (!needs.includes(form.need)) next.need = "Escolha o que você precisa.";
  if (!deadlines.includes(form.deadline)) next.deadline = "Selecione um prazo desejado.";
  if (!budgets.includes(form.budget)) next.budget = "Selecione uma faixa de investimento.";
  return next;
}

"use server";

import nodemailer from "nodemailer";
import {
  emptyBudget,
  LIMITS,
  stepOneErrors,
  stepTwoErrors,
  type BudgetErrors,
  type BudgetRequest,
} from "@/lib/budget";

export type SendBudgetResult =
  | { ok: true }
  | { ok: false; errors?: BudgetErrors; message?: string };

/*
 * Envia o pedido de orçamento por e-mail pelo SMTP da Hostinger.
 * Credenciais vêm das variáveis de ambiente (veja .env.example), nunca do código.
 */
export async function sendBudget(input: BudgetRequest & { website?: string }): Promise<SendBudgetResult> {
  // Honeypot: campo invisível para pessoas. Se veio preenchido, é robô: finge sucesso e descarta.
  if (input.website) return { ok: true };

  const form = Object.fromEntries(
    Object.keys(emptyBudget).map((key) => {
      const raw = String(input[key as keyof BudgetRequest] ?? "").trim();
      return [key, raw.slice(0, key === "details" ? LIMITS.details : LIMITS.short)];
    }),
  ) as BudgetRequest;

  const errors = { ...stepOneErrors(form), ...stepTwoErrors(form) };
  if (Object.keys(errors).length) return { ok: false, errors };

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_TO } = process.env;
  if (!SMTP_USER || !SMTP_PASS) {
    console.error("[orcamento] SMTP_USER/SMTP_PASS não configurados.");
    return { ok: false, message: "O envio está indisponível no momento." };
  }

  const port = Number(SMTP_PORT ?? 465);
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST ?? "smtp.hostinger.com",
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const lines: [string, string][] = [
    ["Nome", form.name],
    ["Empresa", form.company],
    ["E-mail", form.email],
    ["WhatsApp", form.phone],
    ["Segmento", form.segment],
    ["Tamanho da equipe", form.size],
    ["O que precisa", form.need],
    ["Prazo desejado", form.deadline],
    ["Faixa de investimento", form.budget],
    ["Detalhes", form.details || "(não informado)"],
  ];

  const escape = (value: string) =>
    value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!);

  try {
    await transporter.sendMail({
      from: `"Site Grafeno" <${SMTP_USER}>`,
      to: MAIL_TO || SMTP_USER,
      replyTo: { name: form.name, address: form.email },
      subject: `Novo pedido de orçamento: ${form.need}, ${form.company}`,
      text: lines.map(([label, value]) => `${label}: ${value}`).join("\n"),
      html: `<h2>Novo pedido de orçamento</h2><table cellpadding="6">${lines
        .map(([label, value]) => `<tr><th align="left" valign="top">${label}</th><td>${escape(value).replace(/\n/g, "<br>")}</td></tr>`)
        .join("")}</table><p>Responda este e-mail para falar direto com ${escape(form.name)}.</p>`,
    });
    return { ok: true };
  } catch (error) {
    console.error("[orcamento] Falha ao enviar e-mail:", error);
    return { ok: false, message: "Não conseguimos enviar agora." };
  }
}

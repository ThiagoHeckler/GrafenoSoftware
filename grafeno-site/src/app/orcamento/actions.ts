"use server";

import nodemailer from "nodemailer";
import {
  emailFormatError,
  emptyBudget,
  LIMITS,
  stepOneErrors,
  stepTwoErrors,
  type BudgetErrors,
  type BudgetRequest,
} from "@/lib/budget";
import { emailProblem } from "@/lib/email-dns";
import { clientIp, hit } from "@/lib/rate-limit";

const HOUR = 60 * 60 * 1000;
/* Ninguém manda vários pedidos de orçamento de verdade em sequência. */
const LIMIT_PER_IP = { limit: 3, windowMs: HOUR };
/* Teto do site inteiro: protege a caixa de e-mail mesmo com ataque de vários IPs. */
const LIMIT_GLOBAL = { limit: 30, windowMs: HOUR };
/* Conferência de e-mail (consulta DNS) no botão "Continuar". */
const LIMIT_EMAIL_CHECK = { limit: 20, windowMs: 10 * 60 * 1000 };

const minutes = (value: number) => (value === 1 ? "1 minuto" : `${value} minutos`);

export type SendBudgetResult =
  | { ok: true }
  | { ok: false; errors?: BudgetErrors; message?: string };

/** Confere o e-mail na primeira etapa, para a pessoa corrigir antes de seguir. */
export async function checkEmail(email: string): Promise<{ error: string | null }> {
  const value = String(email ?? "").trim().slice(0, LIMITS.short);
  const formatError = emailFormatError(value);
  if (formatError) return { error: formatError };
  // Acima do limite, não consulta o DNS e deixa seguir: o envio confere de novo.
  if (hit(`check:${await clientIp()}`, LIMIT_EMAIL_CHECK) !== null) return { error: null };
  return { error: await emailProblem(value) };
}

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
  if (!errors.email) {
    const problem = await emailProblem(form.email);
    if (problem) errors.email = problem;
  }
  if (Object.keys(errors).length) return { ok: false, errors };

  const ip = await clientIp();
  const waitIp = hit(`send:${ip}`, LIMIT_PER_IP);
  if (waitIp !== null) {
    console.warn(`[orcamento] Limite por IP atingido: ${ip}`);
    return { ok: false, message: `Você já enviou vários pedidos agora há pouco. Tente de novo em ${minutes(waitIp)}.` };
  }
  const waitAll = hit("send:global", LIMIT_GLOBAL);
  if (waitAll !== null) {
    console.warn("[orcamento] Limite geral de envios atingido.");
    return { ok: false, message: `Recebemos muitos pedidos agora. Tente de novo em ${minutes(waitAll)}.` };
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_TO } = process.env;
  if (!SMTP_USER || !SMTP_PASS) {
    console.error("[orcamento] SMTP_USER/SMTP_PASS não configurados.");
    return { ok: false, message: "O envio está indisponível no momento. Tente de novo mais tarde." };
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
    return { ok: false, message: "Não conseguimos enviar agora. Tente de novo em instantes." };
  }
}

import "server-only";
import { resolve4, resolve6, resolveMx } from "node:dns/promises";
import { domainOf, isDisposable } from "./email";

const TIMEOUT_MS = 3000;

type DnsError = Error & { code?: string };

/* Códigos que significam "esse domínio não existe ou não tem registro". */
const MISSING = new Set(["ENOTFOUND", "ENODATA", "ESERVFAIL", "ENONAME"]);

async function hasRecords(lookup: Promise<unknown[]>) {
  try {
    return (await lookup).length > 0;
  } catch (error) {
    if (MISSING.has((error as DnsError).code ?? "")) return false;
    throw error;
  }
}

/**
 * Confere se o domínio do e-mail pode receber mensagens: tem MX ou, na falta,
 * um endereço A/AAAA (RFC 5321). Se o DNS demorar ou falhar por outro motivo,
 * aceita: é melhor deixar passar do que barrar um cliente de verdade.
 * Devolve a mensagem de erro para o campo, ou null se está tudo certo.
 */
export async function emailProblem(email: string): Promise<string | null> {
  if (isDisposable(email)) return "Use um e-mail permanente: endereços temporários não recebem nossa resposta.";

  const domain = domainOf(email);
  const check = (async () => {
    if (await hasRecords(resolveMx(domain))) return true;
    return (await hasRecords(resolve4(domain))) || (await hasRecords(resolve6(domain)));
  })();
  const timeout = new Promise<"timeout">((resolve) => setTimeout(() => resolve("timeout"), TIMEOUT_MS));

  try {
    const result = await Promise.race([check, timeout]);
    if (result === false) return `O domínio "${domain}" não recebe e-mails. Confira se está escrito certo.`;
    return null;
  } catch {
    return null;
  }
}

/*
 * Ajuda com e-mails digitados no orçamento. Roda no navegador e no servidor.
 * Não prova que a caixa existe (só um e-mail de confirmação faria isso):
 * pega erros de digitação nos provedores mais comuns e endereços descartáveis.
 */

const COMMON_DOMAINS = [
  "gmail.com",
  "hotmail.com",
  "outlook.com",
  "live.com",
  "icloud.com",
  "yahoo.com",
  "yahoo.com.br",
  "uol.com.br",
  "bol.com.br",
  "terra.com.br",
];

const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com",
  "10minutemail.com",
  "guerrillamail.com",
  "sharklasers.com",
  "temp-mail.org",
  "tempmail.com",
  "yopmail.com",
  "trashmail.com",
  "getnada.com",
  "dispostable.com",
  "maildrop.cc",
  "emailondeck.com",
  "throwawaymail.com",
  "mohmal.com",
]);

export function domainOf(email: string) {
  return email.trim().toLowerCase().split("@")[1] ?? "";
}

export function isDisposable(email: string) {
  return DISPOSABLE_DOMAINS.has(domainOf(email));
}

function distance(a: string, b: string) {
  const row = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    let previous = row[0];
    row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const current = row[j];
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, previous + (a[i - 1] === b[j - 1] ? 0 : 1));
      previous = current;
    }
  }
  return row[b.length];
}

/** "ana@gmial.com" → "ana@gmail.com". Devolve null se não parece erro de digitação. */
export function suggestEmail(email: string): string | null {
  const [user, rawDomain] = email.trim().split("@");
  const domain = rawDomain?.toLowerCase();
  if (!user || !domain || COMMON_DOMAINS.includes(domain)) return null;
  let best: string | null = null;
  let bestDistance = 3;
  for (const candidate of COMMON_DOMAINS) {
    const d = distance(domain, candidate);
    if (d > 0 && d < bestDistance) {
      best = candidate;
      bestDistance = d;
    }
  }
  return best ? `${user}@${best}` : null;
}

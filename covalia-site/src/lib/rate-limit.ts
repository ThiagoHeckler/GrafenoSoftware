import "server-only";
import { headers } from "next/headers";

/*
 * Limite de tentativas em memória, por janela deslizante.
 * Vale para um processo só (o app Node da Hostinger roda um): se o servidor
 * reiniciar, as contagens zeram. Para vários processos, troque por Redis.
 */

type Rule = { limit: number; windowMs: number };

const buckets = new Map<string, number[]>();
const MAX_KEYS = 10_000;

/** Registra uma tentativa. Devolve null se pode seguir, ou os minutos até liberar. */
export function hit(key: string, { limit, windowMs }: Rule): number | null {
  const now = Date.now();
  const recent = (buckets.get(key) ?? []).filter((time) => now - time < windowMs);
  if (recent.length >= limit) {
    buckets.set(key, recent);
    return Math.max(1, Math.ceil((recent[0] + windowMs - now) / 60_000));
  }
  recent.push(now);
  buckets.set(key, recent);

  // Evita crescer sem fim com muitos IPs diferentes: descarta as chaves mais antigas.
  if (buckets.size > MAX_KEYS) {
    for (const oldKey of [...buckets.keys()].slice(0, buckets.size - MAX_KEYS)) buckets.delete(oldKey);
  }
  return null;
}

/**
 * IP de quem fez o pedido. Atrás do proxy da Hostinger, o IP real vem em
 * x-real-ip ou no último item de x-forwarded-for (o que o proxy anexou; os
 * itens anteriores podem ter sido inventados pelo próprio visitante).
 */
export async function clientIp(): Promise<string> {
  const list = await headers();
  const realIp = list.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  const forwarded = list.get("x-forwarded-for")?.split(",").map((item) => item.trim()).filter(Boolean);
  return forwarded?.at(-1) ?? "desconhecido";
}

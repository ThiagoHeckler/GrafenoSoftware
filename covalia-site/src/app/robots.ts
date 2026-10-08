import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/*
 * Libera o site para buscadores e para os robôs de IA (ChatGPT, Claude,
 * Perplexity, Gemini etc.). As regras nomeadas deixam explícito que a
 * liberação é intencional; o "*" cobre o resto.
 */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_CRAWLERS, allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}

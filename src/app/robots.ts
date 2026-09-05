import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * Everything public is crawlable, by search engines and by AI crawlers alike —
 * being quotable by an assistant answering "who supplies fishing nets in
 * Bihar?" is the point. Only the order/enquiry endpoint is closed off; it has
 * nothing to index and should not be probed.
 *
 * The AI agents are named explicitly rather than left to the `*` rule so the
 * intent is on the record: if someone later wants to opt out of model
 * training, this is the one place to change.
 */
const AI_AGENTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "Bytespider",
  "meta-externalagent",
  "cohere-ai",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
      { userAgent: AI_AGENTS, allow: "/", disallow: "/api/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}

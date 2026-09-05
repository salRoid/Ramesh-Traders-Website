import type { HeroSlide } from "@/components/home/HeroCarousel";
import { WHATSAPP } from "@/lib/site-content";

const RT_BASE = process.env.RT_BASE ?? "https://biz.salroid.me";

interface RemoteHeroSlide {
  id: number;
  points?: string[] | null;
  chips_label?: string | null;
  chips?: { label: string; href?: string | null }[] | null;
  chip?: string | null;
  badge?: string | null;
  title: string;
  description?: string | null;
  body?: string | null;
  cta_text?: string | null;
  cta_link?: string | null;
  secondary_text?: string | null;
  secondary_link?: string | null;
  media_url?: string | null;
  media_caption?: string | null;
  media_eyebrow?: string | null;
}

/**
 * Hero slides published from the RT admin. Returns [] whenever the endpoint is
 * absent, unreachable or empty — the caller then renders the built-in slides,
 * so the homepage can never go blank because the backend is down.
 */
export async function getHeroSlides(): Promise<HeroSlide[]> {
  try {
    const res = await fetch(`${RT_BASE}/api/public/hero-slides`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];

    const rows: RemoteHeroSlide[] = await res.json();
    if (!Array.isArray(rows)) return [];

    return rows
      .filter((r) => r?.title)
      .map((r) => ({
        chip: r.chip ?? r.badge ?? "Ramesh Traders",
        title: r.title,
        body: r.body ?? r.description ?? "",
        primary: {
          label: r.cta_text ?? "Browse the catalogue",
          href: r.cta_link ?? "/products",
        },
        secondary: {
          label: r.secondary_text ?? "WhatsApp us",
          href: r.secondary_link ?? WHATSAPP,
          external: (r.secondary_link ?? WHATSAPP).startsWith("http"),
        },
        // Left same-origin on purpose: /uploads/ is proxied to the backend, so
        // the admin host never appears in a public page. An absolute URL the
        // admin typed in is passed through as-is.
        photo: r.media_url ?? null,
        // Left empty so the caller can fill them from the live catalogue.
        points: Array.isArray(r.points) ? r.points.filter(Boolean).slice(0, 3) : [],
        chipsLabel: r.chips_label ?? "",
        chips: Array.isArray(r.chips)
          ? r.chips
              .filter((c) => c?.label)
              .slice(0, 5)
              .map((c) => ({ label: c.label, href: c.href ?? "/products" }))
          : [],
        photoEyebrow: r.media_eyebrow ?? "Ramesh Traders",
        photoCaption: r.media_caption ?? r.title,
      }));
  } catch {
    return [];
  }
}

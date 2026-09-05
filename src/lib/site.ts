const RT_BASE = process.env.RT_BASE ?? "https://biz.salroid.me";

export interface SiteSettings {
  /** One of the design-system accent presets, or "default". */
  accent: string;
  announcement: string;
  aboutLine: string;
}

const FALLBACK: SiteSettings = { accent: "default", announcement: "", aboutLine: "" };

const ACCENTS = new Set([
  "default", "violet", "cobalt", "ember", "teal", "rose", "slate",
]);

/**
 * Presentation settings published from the RT admin. Fails soft to the site's
 * own defaults so a backend outage can never change how the site looks.
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    // Short window on purpose: this is a tiny settings blob, and an accent
    // change made in the admin should show up while the owner is still looking
    // at the site rather than five minutes later.
    const res = await fetch(`${RT_BASE}/api/public/site`, {
      next: { revalidate: 15 },
    });
    if (!res.ok) return FALLBACK;
    const d = await res.json();
    return {
      accent: ACCENTS.has(d?.accent) ? d.accent : "default",
      announcement: typeof d?.announcement === "string" ? d.announcement : "",
      aboutLine: typeof d?.aboutLine === "string" ? d.aboutLine : "",
    };
  } catch {
    return FALLBACK;
  }
}

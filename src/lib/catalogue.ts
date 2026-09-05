import type { CatalogueItem } from "@/components/catalogue/types";

const RT_BASE = process.env.RT_BASE ?? "https://biz.salroid.me";

export async function getCatalogueItems(): Promise<CatalogueItem[]> {
  try {
    const res = await fetch(`${RT_BASE}/api/public/catalogue`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

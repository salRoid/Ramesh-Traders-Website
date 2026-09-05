import type { HeroChip } from "@/components/home/HeroCarousel";
import type { CatalogueItem } from "@/components/catalogue/types";


/** Whole rupees — a chip is a headline, not an invoice line. */
const roundRupees = (v: string | number) =>
  `₹${Math.round(Number(v)).toLocaleString("en-IN")}`;

/**
 * Builds the trending-product chip rows under each hero slide from the live
 * catalogue, so the hero doubles as a highlight of what is actually in stock.
 * Falls back to the standing range when the catalogue is unreachable.
 */

const FALLBACK_RANGE = [
  "Trawl nets",
  "Polyester yarn",
  "Ropes",
  "Hooks",
  "Cast nets",
];

const FALLBACK_VALUE = [
  "Polyester thread",
  "PP rope 12mm",
  "Float balls",
  "Cotton twine",
];

const CUSTOM = ["Any mesh size", "Any panel length", "Hand-tied", "Mill-direct"];

const chip = (label: string): HeroChip => ({ label, href: "/products" });

/** One item per category first, so the row reads as breadth, not repetition. */
function spread(items: CatalogueItem[], limit: number): CatalogueItem[] {
  const seen = new Set<string>();
  const picked: CatalogueItem[] = [];
  for (const it of items) {
    const key = it.taxonomy?.name ?? "other";
    if (seen.has(key)) continue;
    seen.add(key);
    picked.push(it);
    if (picked.length === limit) return picked;
  }
  for (const it of items) {
    if (picked.length === limit) break;
    if (!picked.includes(it)) picked.push(it);
  }
  return picked;
}

/** Slide 1 — the breadth of the range. */
export function rangeChips(items: CatalogueItem[]): HeroChip[] {
  if (!items.length) return FALLBACK_RANGE.map(chip);
  return spread(items, 5).map((it) => chip(it.item_name));
}

/**
 * Slide 2 — the pricing story. These are the lowest rates on the shelf, which
 * is what the label says; do not relabel them "best value" without a measure
 * of value behind it.
 */
export function valueChips(items: CatalogueItem[]): HeroChip[] {
  if (!items.length) return FALLBACK_VALUE.map(chip);
  return [...items]
    .sort((a, b) => Number(a.price) - Number(b.price))
    .slice(0, 4)
    .map((it) => chip(`${it.item_name} · ${roundRupees(it.price)}`));
}

/** Slide 3 — what we will make to order. */
export function customChips(items: CatalogueItem[]): HeroChip[] {
  const categories = Array.from(
    new Set(items.map((i) => i.taxonomy?.name).filter(Boolean) as string[])
  ).slice(0, 2);
  return [...categories, ...CUSTOM].slice(0, 5).map(chip);
}

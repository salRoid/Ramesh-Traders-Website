import SectionHead from "@/components/SectionHead";
import Rail from "@/components/Rail";
import ProductCard from "@/components/catalogue/ProductCard";
import { getCatalogueItems } from "@/lib/catalogue";
import type { CatalogueItem } from "@/components/catalogue/types";

const MAX = 6;

/**
 * The owner merchandises this row from the RT admin by giving items a
 * `featured_rank` (0, 1, 2 …). When nothing is featured we fall back to the
 * automatic pick: one representative item per category first, then fill the
 * row so the grid lines up with the category row above it.
 */
function pick(items: CatalogueItem[]): CatalogueItem[] {
  const featured = items
    .filter((i) => i.featured_rank != null)
    .sort((a, b) => (a.featured_rank as number) - (b.featured_rank as number));
  if (featured.length) return featured.slice(0, MAX);

  const seen = new Set<string>();
  const picked: CatalogueItem[] = [];
  for (const item of items) {
    const key = item.taxonomy?.name ?? "other";
    if (seen.has(key)) continue;
    seen.add(key);
    picked.push(item);
    if (picked.length === MAX) break;
  }
  for (const item of items) {
    if (picked.length === MAX) break;
    if (!picked.includes(item)) picked.push(item);
  }
  return picked;
}

export default async function BestSellers() {
  const items = await getCatalogueItems();
  if (!items.length) return null;

  const picked = pick(items);

  return (
    <section className="f-shell" style={{ marginTop: "clamp(28px,4vw,48px)" }}>
      <SectionHead
        title="Best sellers"
        linkText="See all items →"
        linkHref="/products"
      />
      {/* Fixed-width cards that never stretch: fewer items simply leave space
          at the end, more items scroll. Native scroll-snap, so it works with a
          trackpad, a swipe and the keyboard, and needs no JavaScript. */}
      <Rail className="f-rail-fixed">
        {picked.map((item) => (
          <div key={item.id} className="f-reveal">
            <ProductCard item={item} showDetails={false} />
          </div>
        ))}
      </Rail>
    </section>
  );
}

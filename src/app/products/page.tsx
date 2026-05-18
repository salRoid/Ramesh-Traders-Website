import Link from "next/link";
import { ArrowRight, Package } from "lucide-react";
import ProductGrid, { type CatalogueItem } from "@/components/ProductGrid";

const RT_BASE = process.env.RT_BASE ?? "https://biz.salroid.me";

async function getCatalogueItems(): Promise<CatalogueItem[]> {
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

function EmptyCatalogue() {
  return (
    <div className="py-24 text-center">
      <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-500 mb-2">Catalogue Coming Soon</h3>
      <p className="text-gray-400 mb-6">Our product catalogue is being updated. Contact us for the latest offerings.</p>
      <Link
        href="/contact"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0d3b66] text-white font-semibold hover:bg-[#1b6ca8] transition-colors"
      >
        Contact Us <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

export default async function ProductsPage() {
  const items = await getCatalogueItems();

  const grouped = items.reduce<Record<string, CatalogueItem[]>>((acc, item) => {
    const key = item.taxonomy?.name ?? "Other";
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  const groups = Object.entries(grouped);

  return (
    <div>
      {/* Header */}
      <section className="gradient-ocean py-24 relative overflow-hidden">
        <div className="absolute inset-0 net-pattern opacity-20" />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <span className="inline-block text-sm font-semibold text-amber-400 uppercase tracking-widest mb-4">
            Our Catalogue
          </span>
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">Our Products</h1>
          <p className="text-white/70 text-xl max-w-2xl mx-auto">
            Industry-grade thread, nets, and marine equipment — engineered for performance, built to last.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
          <svg viewBox="0 0 1440 60" className="w-full fill-white">
            <path d="M0,32L80,37.3C160,43,320,53,480,53.3C640,53,800,43,960,37.3C1120,32,1280,32,1360,32L1440,32L1440,60L1360,60C1280,60,1120,60,960,60C800,60,640,60,480,60C320,60,160,60,80,60L0,60Z" />
          </svg>
        </div>
      </section>

      {/* Quick nav */}
      {groups.length > 1 && (
        <div className="bg-white border-b border-gray-100 sticky top-[72px] z-30">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 flex gap-1 overflow-x-auto py-3">
            {groups.map(([name]) => (
              <a
                key={name}
                href={`#${name.toLowerCase().replace(/\s+/g, "-")}`}
                className="shrink-0 px-5 py-2 rounded-full text-sm font-medium text-[#0d3b66] hover:bg-[#0d3b66] hover:text-white transition-all border border-[#0d3b66]/20"
              >
                {name}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Product sections */}
      <div className="bg-white">
        {items.length === 0 ? (
          <EmptyCatalogue />
        ) : (
          groups.map(([category, categoryItems], idx) => (
            <section
              key={category}
              id={category.toLowerCase().replace(/\s+/g, "-")}
              className={`py-20 ${idx % 2 === 1 ? "bg-[#f8f5f0]" : "bg-white"}`}
            >
              <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="mb-10">
                  <h2 className="text-3xl font-bold text-[#0d3b66]">{category}</h2>
                  <div className="h-1 w-16 rounded-full bg-amber-400 mt-3" />
                </div>
                <ProductGrid items={categoryItems} />
              </div>
            </section>
          ))
        )}
      </div>

      {/* Bottom CTA */}
      <section className="py-20 gradient-ocean relative overflow-hidden">
        <div className="absolute inset-0 net-pattern opacity-20" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Need a Custom Order?</h2>
          <p className="text-white/70 text-lg mb-8">
            We manufacture to your specifications. Tell us your requirements and we&apos;ll handle the rest.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-amber-400 text-[#0d3b66] font-bold rounded-xl hover:bg-amber-300 transition-colors shadow-lg"
          >
            Contact Us <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

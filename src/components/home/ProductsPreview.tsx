import Link from "next/link";
import { ArrowRight } from "lucide-react";

const products = [
  {
    emoji: "🧵",
    title: "Thread Yarn",
    description:
      "High-strength industrial and craft thread yarns in polyester, nylon, and natural fibers. Available in 100+ weights and 20+ colors.",
    tags: ["Polyester", "Nylon", "Cotton", "Blended"],
    href: "/products#yarn",
    bg: "from-indigo-50 to-blue-50",
    accent: "bg-indigo-100 text-indigo-700",
    border: "border-indigo-100",
  },
  {
    emoji: "🎣",
    title: "Fishing Nets",
    description:
      "Durable, UV-resistant fishing nets for deep-sea, trawl, and coastal operations. Custom mesh sizes and materials available.",
    tags: ["Trawl", "Gill Net", "Cast Net", "Drag Net"],
    href: "/products#nets",
    bg: "from-cyan-50 to-teal-50",
    accent: "bg-cyan-100 text-cyan-700",
    border: "border-cyan-100",
  },
  {
    emoji: "🪝",
    title: "Marine Equipment",
    description:
      "Complete range of ropes, nets, hooks, balls, and ranga for commercial and local use. Built for strength, durability, and everyday fishing needs.",
    tags: ["Ropes", "Nets", "Hooks", "Balls"],
    href: "/products#equipment",
    bg: "from-amber-50 to-orange-50",
    accent: "bg-amber-100 text-amber-700",
    border: "border-amber-100",
  },
];

export default function ProductsPreview() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-sm font-semibold text-amber-600 uppercase tracking-widest mb-3">
            Our Products
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0d3b66] leading-tight">
            Everything Your Marine Business Needs
          </h2>
          <p className="mt-4 text-[#0d3b66]/60 text-lg">
            Sourced from top-grade materials, built for performance in demanding conditions.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {products.map((p) => (
            <div
              key={p.title}
              className={`product-card-hover rounded-3xl border-2 ${p.border} bg-gradient-to-br ${p.bg} p-8 flex flex-col`}
            >
              <div className="text-6xl mb-5">{p.emoji}</div>
              <h3 className="text-2xl font-bold text-[#0d3b66] mb-3">{p.title}</h3>
              <p className="text-[#0d3b66]/60 leading-relaxed flex-1">{p.description}</p>

              <div className="flex flex-wrap gap-2 mt-6 mb-8">
                {p.tags.map((tag) => (
                  <span key={tag} className={`text-xs font-medium px-3 py-1 rounded-full ${p.accent}`}>
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                href={p.href}
                className="inline-flex items-center gap-2 font-semibold text-[#0d3b66] hover:gap-3 transition-all group"
              >
                View Details{" "}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#0d3b66] text-white font-semibold rounded-xl hover:bg-[#1b6ca8] transition-colors shadow-lg shadow-[#0d3b66]/20"
          >
            View Full Catalogue <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import Image from "next/image";
import SectionHead from "@/components/SectionHead";
import NetWeave from "@/components/NetWeave";
import { media } from "@/lib/media";

const CATEGORIES = [
  {
    title: "Thread Yarn",
    sub: "100+ weights, 20+ colours",
    slug: "thread-yarn",
    density: 6,
  },
  {
    title: "Fishing Nets",
    sub: "Custom mesh sizes",
    slug: "fishing-nets",
    density: 10,
  },
  {
    title: "Ropes & Cordage",
    sub: "8mm to 16mm",
    slug: "ropes-cordage",
    density: 4,
  },
  {
    title: "Hooks & Balls",
    sub: "Commercial grade",
    slug: "hooks-balls",
    density: 8,
  },
  {
    title: "Custom Orders",
    sub: "Made to spec",
    slug: "custom-orders",
    density: 12,
  },
];

export default function Categories() {
  return (
    <section className="f-shell" style={{ marginTop: "clamp(28px,4vw,48px)" }}>
      <SectionHead
        title="Shop by category"
        linkText="View full catalogue →"
        linkHref="/products"
      />
      <div
        className="grid"
        style={{
          gridTemplateColumns: "repeat(auto-fit,minmax(clamp(200px,15vw,272px),1fr))",
          gap: "clamp(12px,2vw,18px)",
        }}
      >
        {CATEGORIES.map((c, i) => {
          // Drops in automatically once public/img/category/<slug>.jpg exists.
          const photo = media(`/img/category/${c.slug}.jpg`);
          return (
            <div
              key={c.title}
              className="f-rise"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <Link
                href="/products"
                className="f-card clickable flex flex-col h-full"
                style={{ padding: 0, overflow: "hidden", color: "var(--ink)" }}
              >
                <div style={{ position: "relative", height: "clamp(130px,12vw,190px)" }}>
                  {photo ? (
                    <Image
                      src={photo}
                      alt={c.title}
                      fill
                      sizes="(max-width: 760px) 100vw, 240px"
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    <NetWeave
                      style={{ position: "absolute", inset: 0 }}
                      density={c.density}
                      floats={false}
                    />
                  )}
                </div>
                <div style={{ padding: "18px 20px 20px" }}>
                  <p className="f-h3" style={{ marginBottom: 3 }}>
                    {c.title}
                  </p>
                  <p className="f-meta">{c.sub}</p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}

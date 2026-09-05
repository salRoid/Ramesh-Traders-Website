import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import BrandMark from "@/components/BrandMark";
import SectionHead from "@/components/SectionHead";
import { FEATURES, QUOTES, WHATSAPP } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Our story — Ramesh Traders",
  description:
    "Cotton yarn, thread and fishing nets from Khajekalan, Patna City since 1890. The family, the milestones and the standards behind Ramesh Traders.",
  alternates: { canonical: "/about" },
  openGraph: {
    type: "article",
    title: "Our story — Ramesh Traders",
    description:
      "Cotton yarn, thread and fishing nets from Khajekalan, Patna City since 1890 — the family behind Ramesh Traders.",
    url: "/about",
    images: [{ url: "/img/hero/shopfront.jpg", width: 1200, height: 1600 }],
  },
};

const STATS = [
  { label: "Years supplying", value: "135+" },
  { label: "Clients", value: "300+" },
  { label: "Tons per year", value: "30K+" },
  { label: "Cities served", value: "30+" },
];

const PILLARS = [
  {
    title: "Our mission",
    text: "To supply India's fishing and textile trades with dependable thread, nets and equipment — at fair prices, on time, every season.",
  },
  {
    title: "Our vision",
    text: "To stay the name a fisherman or a mill manager reaches for first, in Bihar and well beyond it.",
  },
  {
    title: "Our values",
    text: "Quality you can feel in the hand, prices we can justify, and a straight answer whether or not it wins the order.",
  },
];

const TIMELINE = [
  {
    year: "1890",
    title: "The shop opens",
    event:
      "A thread and net shop opens at Khajekalan, Patna City, supplying the fishing families along the Ganga.",
  },
  {
    year: "1980",
    title: "Ramesh Prasad and Kusum Devi at the counter",
    event:
      "The present generation takes on the day-to-day of supplying thread and fishing nets to the fishing communities along the Ganga.",
  },
  {
    year: "1992",
    title: "Into industrial yarn",
    event:
      "The range widens from local nets into industrial-grade thread yarn and rope, opening the door to mills and wholesalers.",
  },
  {
    year: "2000",
    title: "Mill partnerships",
    event:
      "Long-term supply relationships are established with textile mills and net manufacturers across Bihar — the mill-direct pricing we still run on.",
  },
  {
    year: "2010",
    title: "A regional name",
    event:
      "Ramesh Traders becomes one of the most trusted marine and yarn supply names in eastern India.",
  },
  {
    year: "2018",
    title: "Modernised operations",
    event:
      "Digital inventory management and a wider distribution reach bring same-week dispatch to more than thirty cities.",
  },
  {
    year: "2026",
    title: "A hundred and thirty-five years on",
    event:
      "The family runs sourcing, production and planning — with the same counter in Khajekalan at the centre of it.",
  },
];

const TEAM = [
  { name: "Ramesh Prasad", role: "Founder", initials: "RP", note: "45+ years in the trade" },
  { name: "Kusum Devi", role: "Founder", initials: "KD", note: "45+ years in the trade" },
  {
    name: "Raj Naugariya",
    role: "Fisheries & planning",
    initials: "RN",
    note: "Fishing and nets specialist",
  },
  {
    name: "Anand Naugariya",
    role: "Production & operations",
    initials: "AN",
    note: "Production and logistics",
  },
  {
    name: "Santosh Naugariya",
    role: "Sourcing & textiles",
    initials: "SN",
    note: "Sourcing and textile expert",
  },
  {
    name: "Anup Naugariya",
    role: "Innovations",
    initials: "AP",
    note: "Product and innovation lead",
  },
];

const STANDARDS = [
  {
    title: "Mill-direct sourcing",
    desc: "We buy from the mill, not through a chain of middlemen — which is why our pricing holds when everyone else's moves.",
  },
  {
    title: "Checked before it ships",
    desc: "Denier, mesh and twist are verified against the order before anything leaves the godown.",
  },
  {
    title: "Stock you can count on",
    desc: "The regular lines stay on the shelf through the season, so a repeat order does not become a wait.",
  },
  {
    title: "One number, one answer",
    desc: "You speak to the family. No call centre, no ticket queue, no being handed around.",
  },
];

const SECTION = { marginTop: "clamp(44px,6vw,88px)" } as const;

function Avatar({ initials, size = 46 }: { initials: string; size?: number }) {
  return (
    <span
      className="flex items-center justify-center flex-none"
      style={{
        width: size,
        height: size,
        borderRadius: 999,
        background: "var(--ap-soft)",
        color: "var(--ap)",
        fontFamily: "var(--display)",
        fontWeight: 800,
        fontSize: size * 0.33,
      }}
    >
      {initials}
    </span>
  );
}

export default function AboutPage() {
  return (
    <>
      {/* ── Masthead: full-bleed shopfront ─────────────────── */}
      <section
        className="f-bleed flex items-end"
        style={{ minHeight: "min(64vh,560px)" }}
      >
        <Image
          src="/img/hero/shopfront.jpg"
          alt="The shop at Khajekalan"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(8,11,10,.94) 0%, rgba(8,11,10,.7) 40%, rgba(8,11,10,.35) 100%)",
          }}
        />
        <div
          className="f-shell w-full"
          style={{
            position: "relative",
            paddingTop: "clamp(72px,10vh,120px)",
            paddingBottom: "clamp(32px,5vh,52px)",
          }}
        >
          <div
            className="flex items-center"
            style={{ gap: "clamp(24px,4vw,64px)" }}
          >
            <div style={{ minWidth: 0, flex: 1 }}>
          <span
            className="f-chip f-rise"
            style={{
              background: "rgba(255,255,255,.14)",
              borderColor: "rgba(255,255,255,.28)",
              color: "#fff",
            }}
          >
            Est. 1890 · Khajekalan, Patna City
          </span>
          <h1
            className="f-rise"
            style={{
              fontFamily: "var(--display)",
              fontWeight: 800,
              letterSpacing: "-.03em",
              fontSize: "clamp(32px,4.8vw,72px)",
              lineHeight: 1.03,
              color: "#fff",
              margin: "18px 0 0",
              maxWidth: "22ch",
              textWrap: "pretty",
              animationDelay: "60ms",
            }}
          >
            One hundred and thirty-five years behind one counter.
          </h1>
          <p
            className="f-rise"
            style={{
              color: "rgba(255,255,255,.84)",
              fontSize: "clamp(15px,1.15vw,18px)",
              lineHeight: 1.65,
              maxWidth: "56ch",
              margin: "18px 0 0",
              animationDelay: "120ms",
            }}
          >
            Ramesh Traders started in 1890 as a thread and net shop serving the
            fishing families along the Ganga. Generations later we supply mills,
            wholesalers and fleets across eastern India — and we still weigh out
            a single kilo for the man who has bought from us since the
            beginning.
          </p>
          <div
            className="flex flex-wrap gap-3 f-rise"
            style={{ marginTop: 26, animationDelay: "180ms" }}
          >
            <Link href="/products" className="f-btn primary">
              Browse the catalogue
            </Link>
            <Link href="/contact" className="f-btn-light">
              Talk to us
            </Link>
          </div>

            </div>

            <BrandMark size={300} className="f-hero-mark f-rise" priority />
          </div>

          <div
            className="grid"
            style={{
              gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
              gap: 20,
              marginTop: "clamp(32px,5vh,52px)",
              borderTop: "1px solid rgba(255,255,255,.22)",
              paddingTop: "clamp(18px,2.4vw,26px)",
            }}
          >
            {STATS.map((s) => (
              <div key={s.label}>
                <p
                  style={{
                    fontFamily: "var(--display)",
                    fontWeight: 800,
                    fontSize: "clamp(24px,2.4vw,36px)",
                    color: "#fff",
                    margin: 0,
                    letterSpacing: "-.02em",
                  }}
                >
                  {s.value}
                </p>
                <p
                  style={{
                    fontSize: 12,
                    letterSpacing: ".08em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,.62)",
                    margin: "4px 0 0",
                  }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div
        className="f-shell"
        style={{
          paddingTop: "clamp(40px,6vw,80px)",
          paddingBottom: "clamp(40px,6vw,80px)",
        }}
      >
        {/* ── Mission / vision / values ────────────────────── */}
        <div
          className="grid f-reveal"
          style={{
            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
            gap: "clamp(16px,2.4vw,28px)",
          }}
        >
          {PILLARS.map((p) => (
            <div key={p.title}>
              <p className="f-eyebrow" style={{ marginBottom: 10 }}>
                {p.title}
              </p>
              <p
                style={{
                  fontSize: "clamp(16px,1.3vw,20px)",
                  lineHeight: 1.55,
                  margin: 0,
                  maxWidth: "36ch",
                }}
              >
                {p.text}
              </p>
            </div>
          ))}
        </div>

        {/* ── Journey ──────────────────────────────────────── */}
        <div style={SECTION}>
          <SectionHead title="Our journey" />
          <div className="f-card" style={{ padding: 0, overflow: "hidden" }}>
            {TIMELINE.map((t, i) => (
              <div
                key={t.year}
                className="f-reveal grid items-start"
                style={{
                  gridTemplateColumns: "120px 1fr",
                  gap: "clamp(12px,3vw,32px)",
                  padding: "clamp(20px,2.6vw,28px) clamp(20px,3vw,36px)",
                  borderTop: i === 0 ? "none" : "1px solid var(--border)",
                }}
              >
                <p
                  className="f-num"
                  style={{
                    fontSize: "clamp(20px,1.8vw,28px)",
                    color: "var(--ap)",
                    margin: 0,
                  }}
                >
                  {t.year}
                </p>
                <div>
                  <p className="f-h3" style={{ marginBottom: 6 }}>
                    {t.title}
                  </p>
                  <p className="f-small" style={{ maxWidth: "70ch" }}>
                    {t.event}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Standards ────────────────────────────────────── */}
        <div style={SECTION}>
          <SectionHead title="How we work" />
          <div
            className="grid"
            style={{
              gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
              gap: "clamp(12px,2vw,18px)",
            }}
          >
            {STANDARDS.map((s) => (
              <div key={s.title} className="f-card-sm f-reveal h-full">
                <p className="f-h3" style={{ marginBottom: 6 }}>
                  {s.title}
                </p>
                <p className="f-small">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Why us ───────────────────────────────────────── */}
        <div style={SECTION}>
          <SectionHead title="Why buyers stay with us" />
          <div
            className="grid"
            style={{
              gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
              gap: "clamp(12px,2vw,18px)",
            }}
          >
            {FEATURES.map((f) => (
              <div key={f.title} className="f-tile f-reveal h-full">
                <p className="f-h3" style={{ marginBottom: 6 }}>
                  {f.title}
                </p>
                <p className="f-small">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Leadership ───────────────────────────────────── */}
        <div style={SECTION}>
          <SectionHead title="The family" />
          <div
            className="grid"
            style={{
              gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
              gap: "clamp(12px,2vw,18px)",
            }}
          >
            {TEAM.map((m) => (
              <div
                key={m.name}
                className="f-card-sm f-reveal h-full flex items-center"
                style={{ gap: 14 }}
              >
                <Avatar initials={m.initials} />
                <div style={{ minWidth: 0 }}>
                  <p className="f-h3" style={{ fontSize: 15 }}>
                    {m.name}
                  </p>
                  <p className="f-small" style={{ color: "var(--ap)" }}>
                    {m.role}
                  </p>
                  <p className="f-meta">{m.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Testimonials ─────────────────────────────────── */}
        <div style={SECTION}>
          <SectionHead title="What customers say" />
          <div className="f-rail">
            {QUOTES.map((q) => (
              <div
                key={q.name}
                className="f-card-sm f-reveal flex flex-col"
                style={{ gap: 12 }}
              >
                <p
                  className="f-small"
                  style={{
                    color: "var(--ap)",
                    fontWeight: 700,
                    letterSpacing: ".04em",
                  }}
                >
                  ★★★★★
                </p>
                <p style={{ fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                  “{q.quote}”
                </p>
                <div
                  className="flex items-center gap-2.5"
                  style={{
                    paddingTop: 10,
                    borderTop: "1px solid var(--border)",
                    marginTop: "auto",
                  }}
                >
                  <Avatar initials={q.avatar} size={34} />
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 13, margin: 0 }}>
                      {q.name}
                    </p>
                    <p className="f-meta">{q.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="f-meta" style={{ marginTop: 12 }}>
            Placeholder testimonials — replace with permissioned customer quotes
            before launch.
          </p>
        </div>
      </div>

      {/* ── Closing CTA: full-bleed ────────────────────────── */}
      <section className="f-bleed">
        <Image
          src="/img/category/custom-orders.jpg"
          alt="The workbench where netting is made to order"
          fill
          sizes="100vw"
          style={{ objectFit: "cover", opacity: 0.5 }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(8,11,10,.95) 0%, rgba(8,11,10,.72) 60%, rgba(8,11,10,.5) 100%)",
          }}
        />
        <div
          className="f-shell grid items-center"
          style={{
            position: "relative",
            paddingTop: "clamp(48px,7vw,96px)",
            paddingBottom: "clamp(48px,7vw,96px)",
            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
            gap: "clamp(28px,4vw,64px)",
          }}
        >
          <div>
            <div>
              <h2
                style={{
                  fontFamily: "var(--display)",
                  fontWeight: 800,
                  letterSpacing: "-.025em",
                  fontSize: "clamp(24px,2.4vw,38px)",
                  lineHeight: 1.1,
                  color: "#fff",
                  margin: 0,
                }}
              >
                Come by the shop
              </h2>
              <p
                style={{
                  color: "rgba(255,255,255,.82)",
                  fontSize: 15,
                  lineHeight: 1.6,
                  maxWidth: "36ch",
                  margin: "10px 0 0",
                }}
              >
                Khajekalan, near Janta Market, Patna City — or send us your
                requirement and we will quote within 24 hours.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Link href="/contact" className="f-btn primary">
              Send an enquiry
            </Link>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="f-btn-light"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

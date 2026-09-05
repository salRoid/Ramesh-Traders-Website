import Link from "next/link";
import { FEATURES } from "@/lib/site-content";

/**
 * Home keeps a short proof strip only — three reasons and a rotating quote.
 * The full six reasons and every testimonial live on /about, so the home page
 * stays a storefront rather than a brochure.
 */
export default function AboutSection() {
  return (
    <section id="about" className="f-shell" style={{ marginTop: "clamp(28px,4vw,48px)" }}>
      <div className="f-panel f-reveal">
          <p className="f-eyebrow" style={{ marginBottom: 10 }}>
            Why us
          </p>
          <h2
            className="f-h1"
            style={{ fontSize: "clamp(22px,2.8vw,32px)", marginBottom: 12 }}
          >
            Built on trust, driven by quality
          </h2>
          <p className="f-sub" style={{ fontSize: 15, maxWidth: "48ch", marginBottom: 12 }}>
            Since 1890, Ramesh Traders has been the backbone of marine supply
            chains across eastern India.
          </p>
          <p style={{ marginBottom: 22 }}>
            <Link href="/about" className="f-section-head-link">
              Read our full story →
            </Link>
          </p>
          <div
            className="grid"
            style={{
              gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
              gap: 12,
            }}
          >
            {FEATURES.slice(0, 3).map((f) => (
              <div key={f.title} className="f-tile h-full">
                <p className="f-h3" style={{ marginBottom: 4 }}>
                  {f.title}
                </p>
                <p className="f-small">{f.desc}</p>
              </div>
            ))}
          </div>
      </div>
    </section>
  );
}

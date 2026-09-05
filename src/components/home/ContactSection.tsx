import Link from "next/link";
import Image from "next/image";
import { ADDRESS, EMAIL, PHONES, WHATSAPP } from "@/lib/site-content";

const LABEL: React.CSSProperties = {
  fontSize: 12,
  letterSpacing: ".08em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,.6)",
  margin: "0 0 6px",
};

const VALUE: React.CSSProperties = {
  fontSize: 14,
  lineHeight: 1.55,
  color: "#fff",
  margin: 0,
};

/**
 * Full-bleed dark closing band. The enquiry form and the map live on /contact —
 * this is the last thing a visitor sees, so it carries the action and the
 * essentials rather than a second copy of the whole contact page.
 */
export default function ContactSection() {
  return (
    <section id="contact" className="f-bleed f-reveal">
      <Image
        src="/img/hero/godown.jpg"
        alt=""
        fill
        sizes="100vw"
        aria-hidden
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
          <h2
            style={{
              fontFamily: "var(--display)",
              fontWeight: 800,
              letterSpacing: "-.025em",
              fontSize: "clamp(26px,2.8vw,46px)",
              lineHeight: 1.08,
              margin: "0 0 14px",
              color: "#fff",
            }}
          >
            Ready to place an order?
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,.82)",
              fontSize: 16,
              lineHeight: 1.6,
              maxWidth: "42ch",
              margin: "0 0 24px",
            }}
          >
            Bulk pricing, custom specifications or a quote — we respond within 24
            hours.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/products" className="f-btn primary">
              Build an order
            </Link>
            <Link href="/contact" className="f-btn-light">
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

        <div
          className="grid"
          style={{
            gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))",
            gap: 24,
          }}
        >
          <div>
            <p style={LABEL}>Shop</p>
            <p style={VALUE}>{ADDRESS}</p>
            <p style={{ ...LABEL, margin: "18px 0 6px" }}>Hours</p>
            <p style={VALUE}>Mon – Sat, 9:00 AM – 6:00 PM IST</p>
          </div>
          <div>
            <p style={LABEL}>Phone</p>
            <div className="flex flex-col gap-0.5" style={{ fontSize: 14 }}>
              {PHONES.map((p) => (
                <a key={p} href={`tel:${p.replace(/\s/g, "")}`} style={{ color: "#fff" }}>
                  {p}
                </a>
              ))}
            </div>
            <p style={{ ...LABEL, margin: "18px 0 6px" }}>Email</p>
            <a
              href={`mailto:${EMAIL}`}
              style={{ fontSize: 14, color: "#fff", wordBreak: "break-all" }}
            >
              {EMAIL}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import EnquiryForm from "@/components/EnquiryForm";
import PhoneList from "@/components/PhoneList";
import { ADDRESS, EMAIL, WHATSAPP } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Contact Ramesh Traders — Khajekalan, Patna City, Bihar",
  description:
    "Reach Ramesh Traders at Khajekalan, near Janta Market, Patna City, Bihar 800008 — phone, WhatsApp, email and directions. Open Mon–Sat, 9:00 AM to 6:00 PM. Send a specification and get a quote within 24 hours.",
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    title: "Contact Ramesh Traders — Khajekalan, Patna City, Bihar",
    description:
      "Phone, WhatsApp, email, address and directions for Ramesh Traders, Patna City. Open Mon–Sat, 9:00 AM to 6:00 PM.",
    url: "/contact",
    images: [{ url: "/img/hero/godown.jpg", width: 1200, height: 1600 }],
  },
};

export default function ContactPage() {
  return (
    <>
      {/* ── Masthead: full-bleed godown ────────────────────── */}
      <section
        className="f-bleed flex items-end"
        style={{ minHeight: "min(46vh,420px)" }}
      >
        <Image
          src="/img/hero/godown.jpg"
          alt="The godown at Khajekalan"
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
              "linear-gradient(to top, rgba(8,11,10,.94) 0%, rgba(8,11,10,.72) 45%, rgba(8,11,10,.4) 100%)",
          }}
        />
        <div
          className="f-shell w-full"
          style={{
            position: "relative",
            paddingTop: "clamp(64px,9vh,110px)",
            paddingBottom: "clamp(28px,4vh,44px)",
          }}
        >
          <p
            className="f-rise"
            style={{
              fontSize: 12,
              letterSpacing: ".1em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,.66)",
              margin: "0 0 12px",
            }}
          >
            Contact
          </p>
          <h1
            className="f-rise"
            style={{
              fontFamily: "var(--display)",
              fontWeight: 800,
              letterSpacing: "-.03em",
              fontSize: "clamp(32px,4.6vw,68px)",
              lineHeight: 1.03,
              color: "#fff",
              margin: 0,
              animationDelay: "60ms",
            }}
          >
            Talk to us
          </h1>
          <p
            className="f-rise"
            style={{
              color: "rgba(255,255,255,.84)",
              fontSize: "clamp(15px,1.15vw,18px)",
              lineHeight: 1.65,
              maxWidth: "56ch",
              margin: "16px 0 0",
              animationDelay: "120ms",
            }}
          >
            Bulk pricing, custom specifications or a quote — send a message and
            our team responds within 24 hours. Or just call the shop.
          </p>
        </div>
      </section>

      <div
        className="f-shell"
        style={{
          paddingTop: "clamp(36px,5vw,72px)",
          paddingBottom: "clamp(40px,6vw,80px)",
        }}
      >
        <div className="f-cols" style={{ alignItems: "stretch" }}>
          <div className="f-panel f-reveal">
            <EnquiryForm />
          </div>

          <div className="f-aside">
            <div className="f-card-sm f-reveal">
              <p className="f-eyebrow" style={{ marginBottom: 6 }}>
                Shop
              </p>
              <p style={{ fontSize: 14, lineHeight: 1.55, margin: 0 }}>
                {ADDRESS}
              </p>
            </div>

            <div className="f-card-sm f-reveal">
              <p className="f-eyebrow" style={{ marginBottom: 6 }}>
                Working hours
              </p>
              <p className="f-small">Mon – Sat: 9:00 AM – 6:00 PM IST</p>
              <p className="f-small">Sun: Closed</p>
            </div>

            <div className="f-card-sm f-reveal">
              <p className="f-eyebrow" style={{ marginBottom: 8 }}>
                Call or write
              </p>
              <PhoneList size={14} />
              <p className="f-small" style={{ marginTop: 10 }}>
                <a
                  href={`mailto:${EMAIL}`}
                  style={{ overflowWrap: "anywhere" }}
                >
                  {EMAIL}
                </a>
              </p>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="f-btn soft"
                style={{ marginTop: 14 }}
              >
                WhatsApp
              </a>
            </div>

            <div
              className="f-card-sm f-reveal flex-1"
              style={{ padding: 0, overflow: "hidden", minHeight: 260 }}
            >
              <iframe
                title="Ramesh Traders location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3597.3!2d85.2017!3d25.6097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed58c5b7e8d3d1%3A0x0!2sKhajekalan%2C%20Patna%20City%2C%20Bihar%20800008!5e0!3m2!1sen!2sin!4v1715680000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, display: "block", minHeight: 260 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Closing CTA: full-bleed ────────────────────────── */}
      <section className="f-bleed">
        <Image
          src="/img/category/thread-yarn.jpg"
          alt="Thread cones in the shop"
          fill
          sizes="100vw"
          style={{ objectFit: "cover", opacity: 0.45 }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(8,11,10,.95) 0%, rgba(8,11,10,.74) 60%, rgba(8,11,10,.55) 100%)",
          }}
        />
        <div
          className="f-shell grid items-center"
          style={{
            position: "relative",
            paddingTop: "clamp(44px,6vw,84px)",
            paddingBottom: "clamp(44px,6vw,84px)",
            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
            gap: "clamp(24px,4vw,56px)",
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "var(--display)",
                fontWeight: 800,
                letterSpacing: "-.025em",
                fontSize: "clamp(24px,2.4vw,40px)",
                lineHeight: 1.1,
                color: "#fff",
                margin: "0 0 12px",
              }}
            >
              Know what you need?
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,.82)",
                fontSize: 15,
                lineHeight: 1.6,
                maxWidth: "40ch",
                margin: 0,
              }}
            >
              Build your order from the catalogue and send it over — we quote
              within 24 hours.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Link href="/products" className="f-btn primary">
              Build an order
            </Link>
            <Link href="/about" className="f-btn-light">
              Our story
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

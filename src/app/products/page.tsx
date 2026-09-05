import { WHATSAPP } from "@/lib/site-content";
import Link from "next/link";
import Image from "next/image";
import CatalogueBrowser from "@/components/catalogue/CatalogueBrowser";
import CampaignSection from "@/components/CampaignSection";
import { getCatalogueItems } from "@/lib/catalogue";

export const metadata = {
  title: "Catalogue — Ramesh Traders",
  description:
    "Thread yarn, fishing nets and marine equipment. Add items to your order and we quote within 24 hours.",
};

export default async function CataloguePage() {
  const items = await getCatalogueItems();

  return (
    <>
      {/* ── Masthead: full-bleed thread yarn ───────────────── */}
      <section
        className="f-bleed flex items-end"
        style={{ minHeight: "min(52vh,480px)" }}
      >
        <Image
          src="/img/category/thread-yarn.jpg"
          alt="Thread cones in the shop"
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
            Our catalogue
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
              maxWidth: "24ch",
              textWrap: "pretty",
              animationDelay: "60ms",
            }}
          >
            Thread, nets &amp; marine equipment
          </h1>
          <p
            className="f-rise"
            style={{
              color: "rgba(255,255,255,.84)",
              fontSize: "clamp(15px,1.15vw,18px)",
              lineHeight: 1.65,
              maxWidth: "58ch",
              margin: "16px 0 0",
              animationDelay: "120ms",
            }}
          >
            Industry-grade thread, nets, and marine equipment — engineered for
            performance, built to last. Add items to your order and we will
            quote within 24 hours.
          </p>
        </div>
      </section>

      <div
        className="f-shell"
        style={{
          paddingTop: "clamp(28px,4vw,56px)",
          paddingBottom: "clamp(40px,6vw,64px)",
        }}
      >
      <CampaignSection bare wrapperStyle={{ marginTop: "clamp(24px,3vw,36px)" }} />

      <CatalogueBrowser items={items} />

      <div
        className="f-card f-reveal grid items-center"
        style={{
          marginTop: "clamp(32px,4vw,56px)",
          gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
          gap: "clamp(24px,3vw,40px)",
        }}
      >
        <div>
          <h2
            className="f-h1"
            style={{ fontSize: "clamp(22px,2.6vw,30px)", marginBottom: 10 }}
          >
            Need a custom order?
          </h2>
          <p className="f-sub" style={{ maxWidth: "38ch" }}>
            We manufacture to your specifications. Tell us your requirements and
            we&rsquo;ll handle the rest.
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5 md:justify-end">
          <Link href="/contact" className="f-btn primary">
            Request a quote
          </Link>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="f-btn soft"
          >
            WhatsApp +91 93085 70270
          </a>
        </div>
        </div>
      </div>
    </>
  );
}

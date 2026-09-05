import { EMAIL } from "@/lib/site-content";
import Link from "next/link";
import BrandMark from "@/components/BrandMark";
import PhoneList from "@/components/PhoneList";

// The header is deliberately thin, so the footer carries the rest of the site.
const LINKS = [
  { href: "/products", label: "Catalogue" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="mt-10" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="f-shell py-10">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3" style={{ color: "var(--ink)" }}>
            <BrandMark size={44} />
            <span>
              <span
                className="block text-[15px]"
                style={{
                  fontFamily: "var(--display)",
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                }}
              >
                Ramesh Traders
              </span>
              <span className="f-meta">Khajekalan, Patna City · since 1890</span>
            </span>
          </Link>

          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[13.5px] font-semibold"
                style={{ color: "var(--sub)" }}
              >
                {l.label}
              </Link>
            ))}
            <PhoneList iconsOnly />
          </nav>
        </div>

        <div
          className="flex flex-wrap items-center justify-between gap-3 mt-8 pt-6"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          {/* Explicit {" "} — JSX trims the whitespace that sits between an
              expression and a newline, which silently produced "© 2026Ramesh". */}
          <p className="f-meta">
            © {new Date().getFullYear()}{" "}
            Ramesh Traders · Cotton yarn &amp; fishing nets
          </p>
          <a href={`mailto:${EMAIL}`} className="f-meta" style={{ color: "var(--ap)" }}>
            {EMAIL}
          </a>
        </div>
      </div>
    </footer>
  );
}

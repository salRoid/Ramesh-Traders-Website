"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useCart } from "@/context/CartContext";
import BrandMark from "@/components/BrandMark";
import { useTheme } from "@/components/ThemeProvider";

// Kept deliberately short. Contact is reachable from the footer, the homepage
// section and the WhatsApp buttons, so the header carries About instead.
const navLinks = [
  { href: "/products", label: "Catalogue" },
  { href: "/about", label: "About" },
];

export function Wordmark() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2.5 shrink-0"
      style={{ color: "var(--ink)" }}
    >
      <BrandMark size={34} priority />
      <span
        className="text-base"
        style={{
          fontFamily: "var(--display)",
          fontWeight: 800,
          letterSpacing: "-0.02em",
        }}
      >
        Ramesh Traders
      </span>
    </Link>
  );
}

function ThemeButton() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      className="f-btn ghost f-icon-btn"
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={theme === "dark" ? "Light mode" : "Dark mode"}
    >
      {theme === "dark" ? (
        <Sun className="w-[18px] h-[18px]" />
      ) : (
        <Moon className="w-[18px] h-[18px]" />
      )}
    </button>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { items, openCart } = useCart();
  const count = items.reduce((s, i) => s + i.quantity, 0);
  const onCatalogue = pathname.startsWith("/products");

  return (
    <header
      className="sticky top-0 z-[60] f-glass"
      style={{ borderBottom: "1px solid var(--border)" }}
    >
      <div
        className="f-shell flex items-center justify-between gap-4"
        style={{ height: "var(--nav-h)" }}
      >
        <Wordmark />

        <nav className="hidden md:flex items-center" style={{ gap: "clamp(8px,2vw,22px)" }}>
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="text-[13.5px] font-semibold transition-colors"
                style={{ color: active ? "var(--ink)" : "var(--sub)" }}
              >
                {link.label}
              </Link>
            );
          })}
          <ThemeButton />
          {onCatalogue ? (
            <button onClick={openCart} className="f-btn primary">
              Order{count > 0 ? ` · ${count}` : ""}
            </button>
          ) : (
            <Link href="/products" className="f-btn primary">
              Browse &amp; order
            </Link>
          )}
        </nav>

        <div className="flex md:hidden items-center gap-1">
          <ThemeButton />
          <button
            className="f-btn ghost f-icon-btn"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="mobile-menu"
            className="md:hidden overflow-hidden"
            style={{
              background: "var(--panel)",
              borderTop: "1px solid var(--border)",
            }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="f-shell py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="px-3 py-3 text-[15px] font-semibold"
                  style={{ borderRadius: "var(--r-sm)", color: "var(--ink)" }}
                >
                  {link.label}
                </Link>
              ))}
              {onCatalogue ? (
                <button
                  onClick={() => {
                    setOpen(false);
                    openCart();
                  }}
                  className="f-btn primary mt-2"
                >
                  Order{count > 0 ? ` · ${count}` : ""}
                </button>
              ) : (
                <Link
                  href="/products"
                  onClick={() => setOpen(false)}
                  className="f-btn primary mt-2"
                >
                  Browse &amp; order
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

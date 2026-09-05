"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import SectionHead from "@/components/SectionHead";
import { QUOTES } from "@/lib/site-content";

const INTERVAL = 5000;

/**
 * Moving testimonial rail. Built on native scroll-snap rather than a JS track,
 * so with no JavaScript it is still a perfectly usable horizontal scroller and
 * every quote is server-rendered visible. Auto-advance just nudges the scroll
 * position; the user can scroll or swipe it themselves at any time.
 *
 * Scales to any number of quotes — add them to QUOTES in lib/site-content.ts.
 */
export default function Testimonials() {
  const railRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const scrollTo = useCallback((i: number) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.children[i] as HTMLElement | undefined;
    if (card) rail.scrollTo({ left: card.offsetLeft - rail.offsetLeft, behavior: "smooth" });
  }, []);

  // Keep the dots honest whether the move came from us or from the user.
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const onScroll = () => {
      const cards = Array.from(rail.children) as HTMLElement[];
      const left = rail.scrollLeft + rail.offsetLeft;
      let nearest = 0;
      let best = Infinity;
      cards.forEach((c, i) => {
        const d = Math.abs(c.offsetLeft - left);
        if (d < best) {
          best = d;
          nearest = i;
        }
      });
      setActive(nearest);
    };
    rail.addEventListener("scroll", onScroll, { passive: true });
    return () => rail.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (paused || QUOTES.length <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => {
      const rail = railRef.current;
      if (!rail) return;
      // Wrap when the rail is scrolled to its end.
      const atEnd = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 4;
      scrollTo(atEnd ? 0 : active + 1);
    }, INTERVAL);
    return () => clearInterval(t);
  }, [active, paused, scrollTo]);

  return (
    <section className="f-shell" style={{ marginTop: "clamp(28px,4vw,48px)" }}>
      <SectionHead title="What customers say" />

      <div
        ref={railRef}
        className="f-rail"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        {QUOTES.map((q) => (
          <div key={q.name} className="f-card-sm flex flex-col" style={{ gap: 12 }}>
            <p
              className="f-small"
              style={{ color: "var(--ap)", fontWeight: 700, letterSpacing: ".04em" }}
            >
              ★★★★★
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.6, margin: 0 }}>“{q.quote}”</p>
            <div
              className="flex items-center gap-2.5"
              style={{
                paddingTop: 10,
                borderTop: "1px solid var(--border)",
                marginTop: "auto",
              }}
            >
              <span
                className="flex items-center justify-center flex-none"
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 999,
                  background: "var(--ap-soft)",
                  color: "var(--ap)",
                  fontFamily: "var(--display)",
                  fontWeight: 800,
                  fontSize: 12,
                }}
              >
                {q.avatar}
              </span>
              <div>
                <p style={{ fontWeight: 700, fontSize: 13, margin: 0 }}>{q.name}</p>
                <p className="f-meta">{q.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {QUOTES.length > 1 && (
        <div
          className="flex gap-1.5 items-center justify-center"
          style={{ marginTop: 20, marginBottom: 8 }}
          role="tablist"
          aria-label="Customer testimonials"
        >
          {QUOTES.map((q, i) => (
            <button
              key={q.name}
              onClick={() => scrollTo(i)}
              role="tab"
              aria-selected={i === active}
              aria-label={`Testimonial from ${q.name}`}
              style={{
                border: "none",
                padding: 0,
                cursor: "pointer",
                height: 6,
                borderRadius: 999,
                width: i === active ? 26 : 6,
                background: i === active ? "var(--ap)" : "var(--border-2)",
                transition: "width var(--t-med) var(--ease)",
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
}

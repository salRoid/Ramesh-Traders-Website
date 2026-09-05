"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const INTERVAL = 7000;

export interface HeroChip {
  label: string;
  href: string;
}

export interface HeroSlide {
  chip: string;
  title: string;
  body: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string; external?: boolean };
  points: string[];
  chipsLabel: string;
  chips: HeroChip[];
  photo: string | null;
  photoCaption: string;
  photoEyebrow: string;
}

const STATS = [
  { label: "Years supplying", value: "65+" },
  { label: "Clients", value: "300+" },
  { label: "Tons per year", value: "30K+" },
  { label: "Cities served", value: "30+" },
];

/**
 * Full-bleed cinematic hero. Every slide's photograph is rendered up front and
 * crossfaded with opacity, so the first frame is a real image server-side — no
 * waiting on hydration, and no layout shift as slides change.
 */
export default function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (i: number) => setIndex(((i % slides.length) + slides.length) % slides.length),
    [slides.length]
  );

  useEffect(() => {
    if (slides.length <= 1 || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), INTERVAL);
    return () => clearInterval(t);
  }, [slides.length, paused]);

  const slide = slides[index];

  return (
    <>
      <section
        className="f-bleed flex flex-col justify-end"
        style={{ minHeight: "min(88vh,780px)" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        {slides.map((s, i) =>
          s.photo ? (
            <Image
              key={s.photo}
              src={s.photo}
              alt={i === index ? s.photoCaption : ""}
              fill
              priority={i === 0}
              sizes="100vw"
              aria-hidden={i !== index}
              style={{
                objectFit: "cover",
                opacity: i === index ? 1 : 0,
                transform: i === index ? "scale(1.06)" : "scale(1)",
                transition:
                  "opacity 1.6s cubic-bezier(.16,1,.3,1), transform 8s linear",
              }}
            />
          ) : null
        )}

        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(8,11,10,.94) 0%, rgba(8,11,10,.72) 38%, rgba(8,11,10,.34) 70%, rgba(8,11,10,.5) 100%)",
          }}
        />

        <div
          className="f-shell w-full"
          style={{
            position: "relative",
            paddingTop: "clamp(80px,12vh,140px)",
            paddingBottom: "clamp(28px,4vh,44px)",
          }}
        >
          <div
            key={index}
            className="flex flex-col f-rise"
            style={{ maxWidth: "min(100%,860px)", gap: "clamp(16px,2vw,22px)" }}
          >
            <span
              className="f-chip self-start"
              style={{
                background: "rgba(255,255,255,.14)",
                color: "#fff",
              }}
            >
              {slide.chip}
            </span>

            <h1
              style={{
                fontFamily: "var(--display)",
                fontWeight: 800,
                letterSpacing: "-.03em",
                fontSize: "clamp(34px,5.2vw,78px)",
                lineHeight: 1.02,
                margin: 0,
                color: "#fff",
                textWrap: "pretty",
              }}
            >
              {slide.title}
            </h1>

            <p
              style={{
                color: "rgba(255,255,255,.84)",
                fontSize: "clamp(15px,1.2vw,19px)",
                lineHeight: 1.6,
                maxWidth: "58ch",
                margin: 0,
              }}
            >
              {slide.body}
            </p>

            <div className="flex flex-wrap gap-3" style={{ marginTop: 4 }}>
              <Link href={slide.primary.href} className="f-btn primary">
                {slide.primary.label} →
              </Link>
              {slide.secondary.external ? (
                <a
                  href={slide.secondary.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="f-btn-light"
                >
                  {slide.secondary.label}
                </a>
              ) : (
                <Link href={slide.secondary.href} className="f-btn-light">
                  {slide.secondary.label}
                </Link>
              )}
            </div>

            {slide.points.length > 0 && (
              <div
                className="flex flex-wrap items-center"
                style={{ gap: "8px 20px", marginTop: 2 }}
              >
                {slide.points.map((p) => (
                  <span
                    key={p}
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "rgba(255,255,255,.78)",
                      letterSpacing: ".01em",
                    }}
                  >
                    {p}
                  </span>
                ))}
              </div>
            )}
          </div>

          {slides.length > 1 && (
            <div
              className="flex items-center gap-1.5"
              style={{ marginTop: 6, position: "relative" }}
              role="tablist"
              aria-label="Hero slides"
            >
              {slides.map((s, i) => (
                <button
                  key={s.title}
                  onClick={() => go(i)}
                  role="tab"
                  aria-selected={i === index}
                  aria-label={s.title}
                  style={{
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    height: 5,
                    borderRadius: 999,
                    width: i === index ? 28 : 6,
                    background: i === index ? "#fff" : "rgba(255,255,255,.4)",
                    transition: "width var(--t-med) var(--ease)",
                  }}
                />
              ))}
            </div>
          )}

          <div
            className="grid"
            style={{
              position: "relative",
              gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
              gap: 1,
              marginTop: "clamp(32px,5vh,56px)",
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

      {/* Chips strip — per-slide, sits directly under the hero */}
      {slide.chips.length > 0 && (
        <div
          style={{
            background: "var(--panel)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div
            className="f-shell flex flex-wrap items-center"
            style={{ paddingTop: 18, paddingBottom: 18, gap: "12px 20px" }}
          >
            <p className="f-eyebrow" style={{ margin: 0 }}>
              {slide.chipsLabel}
            </p>
            <div className="flex flex-wrap gap-2">
              {slide.chips.map((c) => (
                <Link key={c.label} href={c.href} className="f-chip">
                  {c.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

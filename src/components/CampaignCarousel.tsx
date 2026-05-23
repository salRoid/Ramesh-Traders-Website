"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const RT_BASE = process.env.NEXT_PUBLIC_RT_BASE ?? "https://biz.salroid.me";

interface Campaign {
  id: number;
  title: string;
  description: string | null;
  cta_text: string | null;
  cta_link: string | null;
  bg_color: string;
  text_color: string;
  accent_color: string | null;
  media_url: string | null;
  media_type: string | null;
}

export default function CampaignCarousel({ campaigns }: { campaigns: Campaign[] }) {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const count = campaigns.length;

  function goTo(index: number) {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 200);
  }

  function next() { goTo((current + 1) % count); }
  function prev() { goTo((current - 1 + count) % count); }

  function resetTimer() {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!paused) timerRef.current = setInterval(() => goTo((current + 1) % count), 8000);
  }

  useEffect(() => {
    if (count <= 1 || paused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(next, 8500);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, current, paused]);

  if (!count) return null;

  const c = campaigns[current];
  const mediaUrl = c.media_url ? `${RT_BASE}${c.media_url}` : null;
  const accent = c.accent_color || c.text_color;

  return (
    <div
      className={`rounded-3xl overflow-hidden flex flex-col md:flex-row min-h-[280px] shadow-xl transition-opacity duration-200 ${animating ? "opacity-0" : "opacity-100"}`}
      style={{ background: `linear-gradient(135deg, ${c.bg_color} 0%, ${c.bg_color}cc 100%)` }}
    >
      {/* ── Left: text content ── */}
      <div className="relative flex-1 flex flex-col justify-center px-8 py-10 lg:px-12 lg:py-12 overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-10 -left-10 w-48 h-48 rounded-full opacity-20" style={{ backgroundColor: accent }} />
        <div className="absolute -bottom-8 -left-4 w-32 h-32 rounded-full opacity-20" style={{ backgroundColor: accent }} />
        <div className="absolute inset-0 net-pattern opacity-10" />

        <div className="relative z-10">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold mb-4 border"
            style={{ backgroundColor: `${c.text_color}22`, borderColor: `${c.text_color}44`, color: c.text_color }}
          >
            🎯 Special Offer
          </span>

          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight mb-3"
            style={{ color: c.text_color }}
          >
            {c.title}
          </h2>

          {c.description && (
            <p
              className="text-sm lg:text-base mb-6 max-w-sm leading-relaxed"
              style={{ color: `${c.text_color}bb` }}
            >
              {c.description}
            </p>
          )}

          {c.cta_text && c.cta_link && (
            <Link
              href={c.cta_link}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-lg w-fit"
              style={{ backgroundColor: c.text_color, color: c.bg_color }}
            >
              {c.cta_text} →
            </Link>
          )}

        </div>
      </div>

      {/* ── Right: media ── */}
      <div
        className="relative md:w-[58%] min-h-[220px] md:min-h-0 shrink-0 overflow-hidden"
        style={{ clipPath: "polygon(6% 0, 100% 0, 100% 100%, 0% 100%)" }}
      >
        {/* Dots — bottom center of the media panel */}
        {count > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-row gap-2">
            {campaigns.map((_, i) => (
              <button
                key={i}
                onClick={() => { goTo(i); resetTimer(); }}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === current ? "24px" : "8px",
                  height: "6px",
                  backgroundColor: i === current ? "#ffffff" : "rgba(255,255,255,0.4)",
                }}
              />
            ))}
          </div>
        )}
        {mediaUrl ? (
          <>
            {c.media_type === "video" ? (
              <video
                key={mediaUrl}
                src={mediaUrl}
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay muted loop playsInline
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={mediaUrl}
                src={mediaUrl}
                alt={c.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center opacity-10" style={{ backgroundColor: c.text_color }}>
            <span className="text-8xl">🎯</span>
          </div>
        )}

        {/* Prev / Next / Pause */}
        {count > 1 && (
          <div className="absolute bottom-4 right-4 z-10 flex gap-2">
            <button
              onClick={() => { prev(); resetTimer(); }}
              className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center text-lg transition-colors"
              aria-label="Previous"
            >‹</button>
            <button
              onClick={() => setPaused(p => !p)}
              className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors text-xs font-bold"
              aria-label={paused ? "Resume" : "Pause"}
            >{paused ? "▶" : "⏸"}</button>
            <button
              onClick={() => { next(); resetTimer(); }}
              className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center text-lg transition-colors"
              aria-label="Next"
            >›</button>
          </div>
        )}
      </div>
    </div>
  );
}

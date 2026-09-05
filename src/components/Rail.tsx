"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * A scroll-snap rail with arrow controls.
 *
 * The children are server-rendered straight into the rail, so the row is
 * complete and scrollable with no JavaScript at all — the arrows are purely an
 * extra affordance that appears once hydrated, and they hide themselves when
 * there is nothing left to scroll to.
 */
export default function Rail({
  children,
  className = "",
  /** Distance from the top of the rail to centre the arrows on, in px. */
  arrowTop = 120,
}: {
  children: React.ReactNode;
  className?: string;
  arrowTop?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const sync = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    // 2px of slack: sub-pixel widths otherwise leave the arrow stuck on.
    setCanLeft(el.scrollLeft > 2);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => ro.disconnect();
  }, [sync]);

  const nudge = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    const step = first ? first.offsetWidth + 18 : el.clientWidth * 0.8;
    el.scrollBy({
      left: dir * step * 2,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  const arrow = (dir: 1 | -1, shown: boolean) => (
    <button
      type="button"
      onClick={() => nudge(dir)}
      aria-label={dir === 1 ? "Scroll right" : "Scroll left"}
      style={{
        position: "absolute",
        top: arrowTop,
        [dir === 1 ? "right" : "left"]: -6,
        transform: "translateY(-50%)",
        width: 40,
        height: 40,
        borderRadius: 999,
        border: "1px solid var(--border)",
        background: "var(--panel)",
        color: "var(--ink)",
        boxShadow: "var(--shadow)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        zIndex: 3,
        opacity: shown ? 1 : 0,
        pointerEvents: shown ? "auto" : "none",
        transition: "opacity var(--t-med) var(--ease)",
      }}
    >
      {dir === 1 ? (
        <ChevronRight className="w-[18px] h-[18px]" />
      ) : (
        <ChevronLeft className="w-[18px] h-[18px]" />
      )}
    </button>
  );

  return (
    <div style={{ position: "relative" }}>
      <div ref={ref} onScroll={sync} className={`f-rail ${className}`}>
        {children}
      </div>
      {arrow(-1, canLeft)}
      {arrow(1, canRight)}
    </div>
  );
}

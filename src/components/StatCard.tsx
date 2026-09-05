"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  useInView,
  useReducedMotion,
} from "framer-motion";

/** Splits "30K+" into { number: 30, suffix: "K+" } so the digits can count up. */
function split(value: string) {
  const match = /^(\d+(?:\.\d+)?)(.*)$/.exec(value.trim());
  if (!match) return { number: null, suffix: value };
  return { number: Number(match[1]), suffix: match[2] };
}

export default function StatCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  const { number, suffix } = split(value);
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();
  // null until the count-up starts, so SSR and reduced-motion render the
  // final figure straight away.
  const [shown, setShown] = useState<number | null>(null);

  useEffect(() => {
    if (number === null || !inView || reduced) return;
    const controls = animate(0, number, {
      duration: 1.4,
      ease: [0.4, 0, 0.2, 1],
      onUpdate: (v) => setShown(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, number, reduced]);

  return (
    <div className="f-statcard">
      <p className="f-eyebrow">{label}</p>
      <p ref={ref} className="f-statcard-num">
        {number === null ? suffix : (shown ?? number)}
        {number !== null && <span style={{ color: "var(--ap)" }}>{suffix}</span>}
      </p>
    </div>
  );
}

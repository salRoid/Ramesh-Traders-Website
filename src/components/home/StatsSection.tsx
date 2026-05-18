"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 45, suffix: "+", label: "Years of Experience" },
  { value: 500, suffix: "+", label: "Business Clients" },
  { value: 50, suffix: "K+", label: "Tons Supplied Annually" },
  { value: 30, suffix: "+", label: "Countries Served" },
];

function useCountUp(target: number, duration = 1800, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, active]);
  return count;
}

function StatCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const count = useCountUp(value, 1600, active);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="text-center group">
      <div className="text-5xl lg:text-6xl font-bold text-[#0d3b66] tabular-nums">
        {count}
        <span className="text-amber-500">{suffix}</span>
      </div>
      <p className="mt-2 text-[#0d3b66]/60 font-medium">{label}</p>
    </div>
  );
}

export default function StatsSection() {
  return (
    <section id="stats" className="py-20 bg-[#f8f5f0]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16 divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-[#0d3b66]/10">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}

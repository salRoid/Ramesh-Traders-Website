"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

const words = ["Thread Yarn", "Fishing Nets", "Marine Equipment"];

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % words.length);
        setFade(true);
      }, 400);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen gradient-ocean overflow-hidden flex items-center">
      {/* Animated net grid overlay */}
      <div className="absolute inset-0 net-pattern opacity-30" />

      {/* Decorative circles */}
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-white/5 blur-3xl" />
      <div className="absolute -bottom-48 -left-24 w-[400px] h-[400px] rounded-full bg-amber-400/10 blur-3xl" />

      {/* Floating rope SVG accent */}
      <svg
        className="absolute top-1/4 right-10 opacity-10 float-animate"
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
      >
        <circle cx="60" cy="60" r="55" stroke="white" strokeWidth="3" strokeDasharray="8 6" />
        <circle cx="60" cy="60" r="35" stroke="white" strokeWidth="2" strokeDasharray="5 8" />
        <circle cx="60" cy="60" r="15" stroke="white" strokeWidth="2" />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32 grid lg:grid-cols-2 gap-16 items-center">
        {/* Text */}
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm text-white/80 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            Trusted by 500+ Businesses Worldwide
          </div>

          <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
            Premium
            <br />
            <span
              className="shimmer-text transition-opacity duration-400 whitespace-nowrap"
              style={{ opacity: fade ? 1 : 0 }}
            >
              {words[wordIndex]}
            </span>
            <br />
            <span className="text-white">Supplier</span>
          </h1>

          <p className="text-white/70 text-lg leading-relaxed max-w-lg">
            From high-tensile fishing nets to specialty thread yarn and professional marine
            equipment — we supply the gear that keeps industries moving.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-amber-400 text-[#0d3b66] font-semibold rounded-xl hover:bg-amber-300 transition-all shadow-lg shadow-amber-400/30 hover:shadow-amber-400/50 hover:gap-3"
            >
              Explore Products <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all backdrop-blur-sm"
            >
              Get a Quote
            </Link>
          </div>
        </div>

        {/* Visual card stack */}
        <div className="hidden lg:flex flex-col gap-4 items-end">
          {[
            { title: "Thread Yarn", sub: "100+ variants · 20+ colors", icon: "🧵" },
            { title: "Fishing Nets", sub: "Deep-sea to coastal grade", icon: "🎣" },
            { title: "Marine Equipment", sub: "Professional & industrial", icon: "⚓" },
          ].map((item, i) => (
            <div
              key={item.title}
              className="glass-card rounded-2xl px-6 py-5 w-72 flex items-center gap-4 hover:translate-x-2 transition-transform"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <span className="text-4xl">{item.icon}</span>
              <div>
                <p className="text-white font-semibold">{item.title}</p>
                <p className="text-white/50 text-xs mt-0.5">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <a
        href="#stats"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40 hover:text-white/70 transition-colors"
      >
        <span className="text-xs">Scroll</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </a>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
        <svg viewBox="0 0 1440 80" className="w-full fill-[#f8f5f0]">
          <path d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,74.7C1120,75,1280,53,1360,42.7L1440,32L1440,80L1360,80C1280,80,1120,80,960,80C800,80,640,80,480,80C320,80,160,80,80,80L0,80Z" />
        </svg>
      </div>
    </section>
  );
}

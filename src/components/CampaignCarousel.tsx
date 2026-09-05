"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Pause, Play } from "lucide-react";
import NetWeave from "@/components/NetWeave";

// Same-origin: campaign media is proxied at /uploads/, never linked to the
// admin host. See IMAGES_BASE in catalogue/types.ts.
const RT_BASE = "";
const INTERVAL = 8500;

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

export default function CampaignCarousel({
  campaigns,
}: {
  campaigns: Campaign[];
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  // Media that failed to load (deleted upload, bad path, un-synced local file).
  // Without this the card renders a blank half instead of falling back.
  const [brokenMedia, setBrokenMedia] = useState<Record<string, boolean>>({});
  const count = campaigns.length;

  const go = useCallback((i: number) => setIndex(((i % count) + count) % count), [count]);

  const markBroken = useCallback(
    (url: string) =>
      setBrokenMedia((prev) => (prev[url] ? prev : { ...prev, [url]: true })),
    []
  );

  useEffect(() => {
    if (count <= 1 || paused) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % count), INTERVAL);
    return () => clearInterval(timer);
  }, [count, paused]);

  if (!count) return null;

  const c = campaigns[index];
  const rawUrl = c.media_url ? `${RT_BASE}${c.media_url}` : null;
  const mediaUrl = rawUrl && !brokenMedia[rawUrl] ? rawUrl : null;

  return (
    <div
      className="f-card grid"
      style={{
        padding: 0,
        overflow: "hidden",
        gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
        minHeight: 220,
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="flex flex-col justify-center"
        style={{ padding: "clamp(24px,3vw,36px)", gap: 14 }}
      >
        {/* Keyed CSS entrance — re-keying replays it, and the server-rendered
            first campaign paints without waiting on hydration. */}
        <div key={c.id} className="flex flex-col f-rise" style={{ gap: 14 }}>
            <span
              className="f-chip accent self-start"
            >
              Special offer
            </span>
            <h2 className="f-h1" style={{ fontSize: "clamp(20px,2.4vw,28px)" }}>
              {c.title}
            </h2>
            {c.description && <p className="f-sub">{c.description}</p>}
        </div>

        <div className="flex items-center gap-3" style={{ marginTop: 4 }}>
          {c.cta_text && c.cta_link && (
            <Link href={c.cta_link} className="f-btn primary">
              {c.cta_text}
            </Link>
          )}

          {count > 1 && (
            <>
              <div className="flex gap-1.5" role="tablist" aria-label="Campaigns">
                {campaigns.map((camp, i) => (
                  <button
                    key={camp.id}
                    onClick={() => go(i)}
                    role="tab"
                    aria-selected={i === index}
                    aria-label={`Campaign ${i + 1}: ${camp.title}`}
                    style={{
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      height: 6,
                      borderRadius: 999,
                      width: i === index ? 22 : 6,
                      background: i === index ? "var(--ap)" : "var(--border-2)",
                      transition: "width var(--t-med) var(--ease)",
                    }}
                  />
                ))}
              </div>
              <button
                onClick={() => setPaused((p) => !p)}
                className="f-btn ghost f-icon-btn"
                style={{ minHeight: 28, width: 28, height: 28 }}
                aria-label={paused ? "Resume campaigns" : "Pause campaigns"}
              >
                {paused ? (
                  <Play className="w-3.5 h-3.5" />
                ) : (
                  <Pause className="w-3.5 h-3.5" />
                )}
              </button>
            </>
          )}
        </div>
      </div>

      <div style={{ position: "relative", minHeight: 200 }}>
          <div key={c.id} className="f-fade" style={{ position: "absolute", inset: 0 }}>
            {mediaUrl ? (
              <CampaignMedia
                url={mediaUrl}
                type={c.media_type}
                title={c.title}
                onBroken={markBroken}
              />
            ) : (
              <NetWeave style={{ width: "100%", height: "100%" }} density={9} />
            )}
          </div>
      </div>
    </div>
  );
}

/**
 * Campaign media with a reliable broken-source fallback.
 *
 * `onError` alone is not enough: the element is server-rendered, so the browser
 * starts loading before React hydrates and a fast 404 fires its error event
 * with no handler attached. So we also inspect the element's own state once it
 * mounts, and fall back to the woven-net artwork rather than a blank half-card.
 */
function CampaignMedia({
  url,
  type,
  title,
  onBroken,
}: {
  url: string;
  type: string | null;
  title: string;
  onBroken: (url: string) => void;
}) {
  const ref = useRef<HTMLVideoElement | HTMLImageElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fail = () => onBroken(url);

    if (el instanceof HTMLVideoElement) {
      if (el.error || el.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) fail();
    } else if (el instanceof HTMLImageElement) {
      if (el.complete && el.naturalWidth === 0) fail();
    }

    el.addEventListener("error", fail);
    return () => el.removeEventListener("error", fail);
  }, [url, onBroken]);

  if (type === "video") {
    return (
      <video
        ref={ref as React.RefObject<HTMLVideoElement>}
        src={url}
        className="w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref as React.RefObject<HTMLImageElement>}
      src={url}
      alt={title}
      className="w-full h-full object-cover"
    />
  );
}

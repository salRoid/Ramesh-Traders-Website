import HeroCarousel, { type HeroSlide } from "@/components/home/HeroCarousel";
import { media } from "@/lib/media";
import { getHeroSlides } from "@/lib/hero";
import { getCatalogueItems } from "@/lib/catalogue";
import { rangeChips, valueChips, customChips } from "@/lib/hero-chips";
import { WHATSAPP } from "@/lib/site-content";

export default async function HeroSection() {
  // Shares Next's fetch cache with BestSellers, so this costs one request.
  const items = await getCatalogueItems();

  // Photo slots light up on their own once the files land in public/img/hero.
  // Until then each slide falls back to the woven-net artwork.
  const fallback: HeroSlide[] = [
    {
      chip: "Supplying since 1960 · Patna City, Bihar",
      title: "Thread, nets and marine gear — delivered at scale.",
      body: "From high-tensile fishing nets to specialty thread yarn and professional marine equipment — we supply the gear that keeps industries moving.",
      primary: { label: "Browse the catalogue", href: "/products" },
      secondary: { label: "WhatsApp us", href: WHATSAPP, external: true },
      points: ["Supplying since 1960", "Mill-direct", "Quoted in 24 hrs"],
      chipsLabel: "Moving this week",
      chips: rangeChips(items),
      photo: media("/img/hero/shopfront.jpg"),
      photoEyebrow: "Khajekalan, Patna City",
      photoCaption: "Mill-direct, straight from the godown",
    },
    {
      chip: "Mill-direct pricing",
      title: "Bought from the mill. Priced like it.",
      body: "No middlemen between the spinning mill and your order — which is why our rates hold steady through the season while everyone else's move.",
      primary: { label: "See current rates", href: "/products" },
      secondary: { label: "Ask for bulk pricing", href: "/contact" },
      points: ["No middlemen", "Bulk rates on 100 kg+", "Rates held all season"],
      chipsLabel: "Rates start from",
      chips: valueChips(items),
      photo: media("/img/hero/godown.jpg"),
      photoEyebrow: "Our godown",
      photoCaption: "Stock held through the season",
    },
    {
      chip: "Made to spec",
      title: "Custom mesh, twine and lengths — made to order.",
      body: "Tell us the mesh size, denier and panel length. We manufacture to your specification and quote within 24 hours.",
      primary: { label: "Request a custom order", href: "/contact" },
      secondary: { label: "WhatsApp us", href: WHATSAPP, external: true },
      points: ["Any mesh size", "Any panel length", "Hand-tied finish"],
      chipsLabel: "We make to order",
      chips: customChips(items),
      photo: media("/img/hero/nets.jpg"),
      photoEyebrow: "Custom work",
      photoCaption: "Hand-tied to your specification",
    },
  ];

  // Slides published from the RT admin win; the built-in set is the safety net
  // so the homepage never depends on the backend being reachable. The admin
  // owns the message — the chips still come from live stock.
  const published = await getHeroSlides();
  const slides = published.length
    ? published.map((slide, i) => {
        const base = fallback[i % fallback.length];
        return {
          ...slide,
          points: slide.points.length ? slide.points : base.points,
          chipsLabel: slide.chipsLabel || base.chipsLabel,
          chips: slide.chips.length ? slide.chips : base.chips,
        };
      })
    : fallback;

  return <HeroCarousel slides={slides} />;
}

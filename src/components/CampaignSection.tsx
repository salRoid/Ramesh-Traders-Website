import CampaignCarousel from "./CampaignCarousel";

const RT_BASE = process.env.RT_BASE ?? "https://biz.salroid.me";

async function getActiveCampaigns() {
  try {
    const res = await fetch(`${RT_BASE}/api/public/campaigns`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

/** `bare` renders just the card, for pages that already supply the shell. */
export default async function CampaignSection({
  bare = false,
  wrapperStyle,
}: {
  bare?: boolean;
  wrapperStyle?: React.CSSProperties;
}) {
  const campaigns = await getActiveCampaigns();
  if (!campaigns.length) return null;

  if (bare)
    return (
      <div style={wrapperStyle}>
        <CampaignCarousel campaigns={campaigns} />
      </div>
    );

  return (
    <section className="f-shell" style={{ marginTop: "clamp(20px,3vw,28px)" }}>
      <CampaignCarousel campaigns={campaigns} />
    </section>
  );
}

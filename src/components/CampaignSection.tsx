import CampaignCarousel from "./CampaignCarousel";

const RT_BASE = process.env.RT_BASE ?? "https://biz.salroid.me";

async function getActiveCampaigns() {
  try {
    const res = await fetch(`${RT_BASE}/api/public/campaigns`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function CampaignSection() {
  const campaigns = await getActiveCampaigns();
  if (!campaigns.length) return null;

  return (
    <div className="px-4 sm:px-6 lg:px-8 mb-8">
      <CampaignCarousel campaigns={campaigns} />
    </div>
  );
}

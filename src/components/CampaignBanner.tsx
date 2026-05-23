import Link from "next/link";

const RT_BASE = process.env.RT_BASE ?? "https://biz.salroid.me";

interface Campaign {
  id: number;
  title: string;
  description: string | null;
  cta_text: string | null;
  cta_link: string | null;
  bg_color: string;
  text_color: string;
  media_url: string | null;
  media_type: string | null;
}

async function getActiveCampaign(): Promise<Campaign | null> {
  try {
    const res = await fetch(`${RT_BASE}/api/public/campaign`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function CampaignBanner() {
  const campaign = await getActiveCampaign();
  if (!campaign) return null;

  return (
    <div style={{ backgroundColor: campaign.bg_color, color: campaign.text_color }}>
      {campaign.media_url && (
        <div className="w-full max-h-64 overflow-hidden">
          {campaign.media_type === "video" ? (
            <video
              src={`${RT_BASE}${campaign.media_url}`}
              className="w-full max-h-64 object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={`${RT_BASE}${campaign.media_url}`}
              alt={campaign.title}
              className="w-full max-h-64 object-cover"
            />
          )}
        </div>
      )}
      <div className="w-full px-4 py-3 flex items-center justify-center gap-4 text-sm font-medium">
        <div className="flex items-center gap-2 flex-wrap justify-center text-center">
          <span className="font-bold">{campaign.title}</span>
          {campaign.description && (
            <span className="opacity-80">{campaign.description}</span>
          )}
        </div>
        {campaign.cta_text && campaign.cta_link && (
          <Link
            href={campaign.cta_link}
            className="shrink-0 px-4 py-1.5 rounded-lg text-xs font-bold transition-opacity hover:opacity-80"
            style={{ backgroundColor: campaign.text_color, color: campaign.bg_color }}
          >
            {campaign.cta_text}
          </Link>
        )}
      </div>
    </div>
  );
}

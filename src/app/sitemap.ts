import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * The four public routes. There are no redirects and no other indexable pages;
 * the catalogue is one page fed by the API rather than a route per product, so
 * there is nothing per-item to list here.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: SITE_URL, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/products`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified, changeFrequency: "yearly", priority: 0.6 },
    { url: `${SITE_URL}/contact`, lastModified, changeFrequency: "yearly", priority: 0.7 },
  ];
}

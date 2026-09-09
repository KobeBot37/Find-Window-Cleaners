import type { MetadataRoute } from "next";
import { WEEK1_CITIES, VALLEY_HUB } from "@/lib/cities";
import { loadListings } from "@/lib/listings";

const BASE = "https://findwindowcleaners.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "daily", priority: 1 },
    {
      url: `${BASE}/featured`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE}/submit`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const cityPages: MetadataRoute.Sitemap = [VALLEY_HUB, ...WEEK1_CITIES].map(
    (city) => ({
      url: `${BASE}${city.path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })
  );

  const listingPages: MetadataRoute.Sitemap = loadListings().map((listing) => ({
    url: `${BASE}/listing/${listing.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...cityPages, ...listingPages];
}

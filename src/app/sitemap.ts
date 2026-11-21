import type { MetadataRoute } from "next";
import { WEEK1_CITIES, VALLEY_HUB } from "@/lib/cities";
import {
  CONTENT_DATES,
  absoluteUrl,
  cityLastModified,
  indexableListings,
  listingLastModified,
  siteLastModified,
} from "@/lib/seo";

/**
 * Order: homepage, city pages, guides, other static pages, then listings.
 * Each URL carries the date its content really last changed.
 * Listings marked noindex (no rating, website or phone) are left out.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const home: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: siteLastModified(),
      changeFrequency: "daily",
      priority: 1,
    },
  ];

  const cityPages: MetadataRoute.Sitemap = [VALLEY_HUB, ...WEEK1_CITIES].map((city) => ({
    url: absoluteUrl(city.path),
    lastModified: cityLastModified(city),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const guides: MetadataRoute.Sitemap = Object.entries(CONTENT_DATES.guides).map(
    ([slug, date]) => ({
      url: absoluteUrl(`/guides/${slug}`),
      lastModified: date,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })
  );

  const otherPages: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/featured"),
      lastModified: CONTENT_DATES.featured,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: absoluteUrl("/submit"),
      lastModified: CONTENT_DATES.submit,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const listingPages: MetadataRoute.Sitemap = indexableListings().map((listing) => ({
    url: absoluteUrl(`/listing/${listing.slug}`),
    lastModified: listingLastModified(listing),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...home, ...cityPages, ...guides, ...otherPages, ...listingPages];
}

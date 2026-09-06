import fs from "fs";
import path from "path";
import { parseCsv } from "./csv";
import { assignCitySlugs } from "./cities";
import { slugify, uniqueSlug } from "./slugify";
import type { FilterSlug, Listing } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const CSV_PATH = path.join(DATA_DIR, "phoenix_valley_window_cleaners.csv");
const FEATURED_PATH = path.join(DATA_DIR, "featured.json");

let cache: Listing[] | null = null;
let featuredCache: Set<string> | null = null;

function parseRating(v: string): number | null {
  if (!v) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function parseCount(v: string): number | null {
  if (!v) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

export function loadListings(): Listing[] {
  if (cache) return cache;

  const text = fs.readFileSync(CSV_PATH, "utf8");
  const rows = parseCsv(text);
  const used = new Set<string>();

  cache = rows.map((row, idx) => {
    const business_name = row.business_name || "Untitled";
    const base = slugify(business_name);
    const slug = uniqueSlug(base, used);
    const categories = (row.categories_services || "")
      .split("|")
      .map((s) => s.trim())
      .filter(Boolean);

    const listing: Listing = {
      id: row.place_id || `row-${idx + 1}`,
      slug,
      business_name,
      phone: row.phone || "",
      website: row.website || "",
      email: row.email || "",
      address: row.address || "",
      city: row.city || "",
      state: row.state || "AZ",
      zip: row.zip || "",
      google_maps_url: row.google_maps_url || "",
      place_id: row.place_id || "",
      rating: parseRating(row.rating || ""),
      review_count: parseCount(row.review_count || ""),
      categories_services: categories,
      years_in_business: row.years_in_business || "",
      facebook: row.facebook || "",
      instagram: row.instagram || "",
      source_url: row.source_url || "",
      source_name: row.source_name || "",
      scraped_at: row.scraped_at || "",
      is_franchise: (row.is_franchise || "").toUpperCase() === "Y",
      notes: row.notes || "",
      citySlugs: assignCitySlugs({
        city: row.city || "",
        zip: row.zip || "",
        notes: row.notes || "",
      }),
    };
    return listing;
  });

  return cache;
}

export function getFeaturedSlugs(): Set<string> {
  if (featuredCache) return featuredCache;
  try {
    const raw = fs.readFileSync(FEATURED_PATH, "utf8");
    const data = JSON.parse(raw) as { slugs?: string[] };
    featuredCache = new Set(data.slugs || []);
  } catch {
    featuredCache = new Set();
  }
  return featuredCache;
}

export function isFeatured(slug: string): boolean {
  return getFeaturedSlugs().has(slug);
}

export function getListingBySlug(slug: string): Listing | undefined {
  return loadListings().find((l) => l.slug === slug);
}

export function getListingsForCity(citySlug: string): Listing[] {
  if (citySlug === "phoenix-valley") {
    return loadListings();
  }
  return loadListings().filter((l) => l.citySlugs.includes(citySlug));
}

export function filterByService(
  listings: Listing[],
  filter?: string | null
): Listing[] {
  if (!filter) return listings;
  const f = filter as FilterSlug;
  return listings.filter((l) => l.categories_services.includes(f));
}

export function searchListings(query: string): Listing[] {
  const q = query.trim().toLowerCase();
  if (!q) return loadListings();
  return loadListings().filter((l) => {
    const hay = [
      l.business_name,
      l.city,
      l.address,
      l.zip,
      ...l.categories_services,
      ...l.citySlugs,
    ]
      .join(" ")
      .toLowerCase();
    return hay.includes(q);
  });
}

export function sortListings(listings: Listing[]): Listing[] {
  const featured = getFeaturedSlugs();
  return [...listings].sort((a, b) => {
    const af = featured.has(a.slug) ? 1 : 0;
    const bf = featured.has(b.slug) ? 1 : 0;
    if (af !== bf) return bf - af;
    const ar = a.rating ?? -1;
    const br = b.rating ?? -1;
    if (ar !== br) return br - ar;
    const arc = a.review_count ?? 0;
    const brc = b.review_count ?? 0;
    if (arc !== brc) return brc - arc;
    return a.business_name.localeCompare(b.business_name);
  });
}

import { VALLEY_HUB, WEEK1_CITIES, type CityPage } from "./cities";
import { getListingsForCity, loadListings, sortListings } from "./listings";
import type { Listing } from "./types";

export const SITE_URL = "https://findwindowcleaners.com";

/** Absolute URL on the apex domain, never with a trailing slash (except the homepage). */
export function absoluteUrl(path: string): string {
  if (!path || path === "/") return SITE_URL;
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${clean.replace(/\/+$/, "")}`;
}

/**
 * A "thin" listing has no Google rating, no website and no phone.
 * We keep the page, but ask search engines not to index it.
 */
export function isThinListing(l: Listing): boolean {
  return l.rating == null && !l.website.trim() && !l.phone.trim();
}

export function indexableListings(): Listing[] {
  return loadListings().filter((l) => !isThinListing(l));
}

/** Date-only (YYYY-MM-DD) strings found in a listing row, e.g. scraped_at and enrichment notes. */
function listingDates(l: Listing): string[] {
  const dates: string[] = [];
  if (l.scraped_at) dates.push(l.scraped_at.slice(0, 10));
  for (const m of l.notes.matchAll(/(20\d\d-\d\d-\d\d)/g)) dates.push(m[1]);
  return dates.filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d));
}

/** Last time this listing's data actually changed (scrape or enrichment date). */
export function listingLastModified(l: Listing): string {
  const dates = listingDates(l).sort();
  return dates[dates.length - 1] || CONTENT_DATES.listingTemplate;
}

/** Dates when page content last changed in a meaningful way (from git history). */
export const CONTENT_DATES = {
  home: "2026-09-06",
  featured: "2026-09-07",
  submit: "2026-09-06",
  cityTemplate: "2026-09-15", // city SEO titles/descriptions
  listingTemplate: "2026-09-06",
  guides: {
    "phoenix-window-cleaning-cost": "2026-09-15",
    "how-often-clean-windows-phoenix": "2026-09-24",
    "choose-window-cleaner-gilbert-az": "2026-09-24",
    "condo-vs-house-window-cleaning-phoenix": "2026-09-24",
  } as Record<string, string>,
};

function maxDate(dates: string[]): string {
  return [...dates].sort()[dates.length - 1];
}

export function cityLastModified(city: CityPage): string {
  const listings = getListingsForCity(city.slug).filter((l) => !isThinListing(l));
  return maxDate([CONTENT_DATES.cityTemplate, ...listings.map(listingLastModified)]);
}

export function siteLastModified(): string {
  return maxDate([
    CONTENT_DATES.home,
    ...Object.values(CONTENT_DATES.guides),
    ...[VALLEY_HUB, ...WEEK1_CITIES].map(cityLastModified),
  ]);
}

/** Approximate city-center coordinates, used only to pick nearby city links. */
const CITY_COORDS: Record<string, [number, number]> = {
  phoenix: [33.4484, -112.074],
  scottsdale: [33.4942, -111.9261],
  mesa: [33.4152, -111.8315],
  chandler: [33.3062, -111.8413],
  gilbert: [33.3528, -111.789],
  tempe: [33.4255, -111.94],
  peoria: [33.5806, -112.2374],
  glendale: [33.5387, -112.186],
  surprise: [33.6292, -112.368],
  "paradise-valley": [33.531, -111.9426],
  "north-phoenix": [33.684, -112.03],
  ahwatukee: [33.3417, -111.9845],
};

function distance(a: [number, number], b: [number, number]): number {
  const dLat = a[0] - b[0];
  const dLng = (a[1] - b[1]) * Math.cos(((a[0] + b[0]) / 2) * (Math.PI / 180));
  return Math.sqrt(dLat * dLat + dLng * dLng);
}

/** The `count` nearest other city pages. For the Valley hub, every city page. */
export function nearbyCities(city: CityPage, count = 4): CityPage[] {
  if (city.slug === VALLEY_HUB.slug) return WEEK1_CITIES;
  const here = CITY_COORDS[city.slug];
  if (!here) return WEEK1_CITIES.filter((c) => c.slug !== city.slug).slice(0, count);
  return WEEK1_CITIES.filter((c) => c.slug !== city.slug && CITY_COORDS[c.slug])
    .sort((a, b) => distance(here, CITY_COORDS[a.slug]) - distance(here, CITY_COORDS[b.slug]))
    .slice(0, count);
}

/** Up to `count` other cleaners in the same city (indexable ones only). */
export function nearbyListings(listing: Listing, count = 6): Listing[] {
  const cityName = listing.city.trim().toLowerCase();
  const others = indexableListings().filter((l) => l.slug !== listing.slug);
  const sameCity = sortListings(
    others.filter((l) => cityName && l.city.trim().toLowerCase() === cityName)
  );
  const picked = sameCity.slice(0, count);
  if (picked.length < count) {
    const seen = new Set(picked.map((l) => l.slug));
    const sameArea = sortListings(
      others.filter(
        (l) => !seen.has(l.slug) && l.citySlugs.some((s) => listing.citySlugs.includes(s))
      )
    );
    picked.push(...sameArea.slice(0, count - picked.length));
  }
  return picked;
}

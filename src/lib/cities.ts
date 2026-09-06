export type CityPage = {
  slug: string;
  name: string;
  path: string;
  h1: string;
};

/** Week 1 city pages */
export const WEEK1_CITIES: CityPage[] = [
  { slug: "phoenix", name: "Phoenix", path: "/az/phoenix-window-cleaners", h1: "Phoenix Window Cleaners" },
  { slug: "scottsdale", name: "Scottsdale", path: "/az/scottsdale-window-cleaners", h1: "Scottsdale Window Cleaners" },
  { slug: "mesa", name: "Mesa", path: "/az/mesa-window-cleaners", h1: "Mesa Window Cleaners" },
  { slug: "chandler", name: "Chandler", path: "/az/chandler-window-cleaners", h1: "Chandler Window Cleaners" },
  { slug: "gilbert", name: "Gilbert", path: "/az/gilbert-window-cleaners", h1: "Gilbert Window Cleaners" },
  { slug: "tempe", name: "Tempe", path: "/az/tempe-window-cleaners", h1: "Tempe Window Cleaners" },
  { slug: "peoria", name: "Peoria", path: "/az/peoria-window-cleaners", h1: "Peoria Window Cleaners" },
  { slug: "glendale", name: "Glendale", path: "/az/glendale-window-cleaners", h1: "Glendale Window Cleaners" },
  { slug: "surprise", name: "Surprise", path: "/az/surprise-window-cleaners", h1: "Surprise Window Cleaners" },
  { slug: "paradise-valley", name: "Paradise Valley", path: "/az/paradise-valley-window-cleaners", h1: "Paradise Valley Window Cleaners" },
  { slug: "north-phoenix", name: "North Phoenix", path: "/az/north-phoenix-window-cleaners", h1: "North Phoenix Window Cleaners" },
  { slug: "ahwatukee", name: "Ahwatukee", path: "/az/ahwatukee-window-cleaners", h1: "Ahwatukee Window Cleaners" },
];

export const VALLEY_HUB: CityPage = {
  slug: "phoenix-valley",
  name: "Phoenix Valley",
  path: "/az/phoenix-valley-window-cleaners",
  h1: "Phoenix Valley Window Cleaners",
};

export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "Find Window Cleaners";

const CITY_FIELD_MAP: Record<string, string> = {
  phoenix: "phoenix",
  scottsdale: "scottsdale",
  mesa: "mesa",
  chandler: "chandler",
  gilbert: "gilbert",
  tempe: "tempe",
  peoria: "peoria",
  glendale: "glendale",
  surprise: "surprise",
  "paradise valley": "paradise-valley",
  "north phoenix": "north-phoenix",
  ahwatukee: "ahwatukee",
};

const NORTH_PHOENIX_ZIPS = new Set(["85050", "85054", "85024", "85085", "85086"]);

export function assignCitySlugs(row: {
  city: string;
  zip: string;
  notes: string;
}): string[] {
  const slugs = new Set<string>();
  const cityNorm = (row.city || "").trim().toLowerCase();
  const notes = (row.notes || "").toLowerCase();
  const zip = (row.zip || "").trim();

  const mapped = CITY_FIELD_MAP[cityNorm];
  if (mapped) slugs.add(mapped);

  // Ahwatukee: city=Ahwatukee OR notes contains Ahwatukee
  if (cityNorm === "ahwatukee" || notes.includes("ahwatukee")) {
    slugs.add("ahwatukee");
  }

  // North Phoenix rules
  if (
    cityNorm === "north phoenix" ||
    notes.includes("north phoenix") ||
    notes.includes("desert ridge") ||
    NORTH_PHOENIX_ZIPS.has(zip)
  ) {
    slugs.add("north-phoenix");
  }

  // Paradise Valley
  if (cityNorm === "paradise valley" || notes.includes("paradise valley")) {
    slugs.add("paradise-valley");
  }

  // Phoenix city also gets phoenix slug (already via map); dual listing OK
  if (cityNorm === "phoenix") {
    slugs.add("phoenix");
  }

  return Array.from(slugs);
}

export function cityFromRouteSlug(routeSlug: string): CityPage | null {
  if (routeSlug === "phoenix-valley-window-cleaners") return VALLEY_HUB;
  const match = WEEK1_CITIES.find(
    (c) => routeSlug === `${c.slug}-window-cleaners` || routeSlug === c.slug
  );
  return match ?? null;
}

export function allAzStaticParams(): { slug: string }[] {
  return [
    { slug: "phoenix-valley-window-cleaners" },
    ...WEEK1_CITIES.map((c) => ({ slug: `${c.slug}-window-cleaners` })),
  ];
}

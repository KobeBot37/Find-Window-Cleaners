export type Listing = {
  id: string;
  slug: string;
  business_name: string;
  phone: string;
  website: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  google_maps_url: string;
  place_id: string;
  rating: number | null;
  review_count: number | null;
  categories_services: string[];
  years_in_business: string;
  facebook: string;
  instagram: string;
  source_url: string;
  source_name: string;
  scraped_at: string;
  is_franchise: boolean;
  notes: string;
  citySlugs: string[];
};

export type FilterSlug =
  | "residential"
  | "commercial"
  | "screens"
  | "solar-panels"
  | "post-construction"
  | "hoa-community"
  | "high-reach";

export const FILTERS: { slug: FilterSlug; label: string }[] = [
  { slug: "residential", label: "Residential" },
  { slug: "commercial", label: "Commercial" },
  { slug: "screens", label: "Screens & tracks" },
  { slug: "solar-panels", label: "Solar panels" },
  { slug: "post-construction", label: "Post-construction" },
  { slug: "hoa-community", label: "HOA / community" },
  { slug: "high-reach", label: "High-reach" },
];

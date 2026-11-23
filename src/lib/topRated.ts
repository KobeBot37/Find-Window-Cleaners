import fs from "fs";
import path from "path";
import type { Listing } from "./types";

/**
 * "Top Rated" is a FREE, data-driven highlight (not the paid Featured tier).
 * A listing qualifies when it is in verified_slugs and its Google rating and
 * review count meet the thresholds in data/top_rated.json (or is in include_slugs). Summaries live in the same file so they
 * are easy to edit by hand.
 */
export type ReviewSummary = {
  /** One-line headline that reflects what most reviewers say. */
  headline: string;
  /** 3–4 short bullets, each based only on real Google review text we read. */
  bullets: string[];
  /** How many individual Google reviews were read to write this summary. */
  reviews_read: number;
  /** Date the reviews were read (YYYY-MM-DD). */
  checked: string;
};

type TopRatedFile = {
  min_rating: number;
  min_reviews: number;
  /** Slugs whose Google rating + review count were verified against Google Maps. */
  verified_slugs?: string[];
  /** Optional manual includes (e.g. a 4.9 near-miss Dennis approves). */
  include_slugs?: string[];
  /** Optional manual excludes. */
  exclude_slugs?: string[];
  summaries: Record<string, ReviewSummary>;
};

const FILE = path.join(process.cwd(), "data", "top_rated.json");
let cache: TopRatedFile | null = null;

function load(): TopRatedFile {
  if (cache) return cache;
  try {
    cache = JSON.parse(fs.readFileSync(FILE, "utf8")) as TopRatedFile;
  } catch {
    cache = { min_rating: 5, min_reviews: 100, verified_slugs: [], summaries: {} };
  }
  return cache;
}

export function isTopRated(l: Listing): boolean {
  const cfg = load();
  if (cfg.exclude_slugs?.includes(l.slug)) return false;
  if (cfg.include_slugs?.includes(l.slug)) return true;
  if (!cfg.verified_slugs?.includes(l.slug)) return false;
  return (
    l.rating != null &&
    l.review_count != null &&
    l.rating >= cfg.min_rating &&
    l.review_count >= cfg.min_reviews
  );
}

export function getReviewSummary(slug: string): ReviewSummary | null {
  const s = load().summaries[slug];
  return s && s.bullets?.length ? s : null;
}

import Link from "next/link";
import type { Listing } from "@/lib/types";
import type { ReviewSummary } from "@/lib/topRated";
import { FeaturedBadge } from "./FeaturedBadge";
import { ReviewSummaryBox } from "./ReviewSummaryBox";
import { TopRatedBadge } from "./TopRatedBadge";

export function ListingCard({
  listing,
  featured = false,
  topRated = false,
  summary = null,
}: {
  listing: Listing;
  featured?: boolean;
  /** Free "Top Rated" highlight (5.0★ with 100+ Google reviews). Not the paid Featured tier. */
  topRated?: boolean;
  summary?: ReviewSummary | null;
}) {
  const big = topRated;
  const frame = big
    ? "border-emerald-300 bg-gradient-to-br from-emerald-50 to-white p-5 ring-1 ring-emerald-200 sm:col-span-2"
    : featured
      ? "border-amber-300 bg-white p-4 ring-1 ring-amber-200"
      : "border-slate-200 bg-white p-4";
  return (
    <article
      className={`rounded-2xl border shadow-sm transition hover:shadow-md ${frame}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className={`${big ? "text-lg" : "text-base"} font-semibold text-slate-900`}>
            <Link href={`/listing/${listing.slug}`} className="hover:text-brand-700">
              {listing.business_name}
            </Link>
          </h2>
          <p className="mt-0.5 text-sm text-slate-600">
            {[listing.city, listing.state].filter(Boolean).join(", ")}
            {listing.zip ? ` ${listing.zip}` : ""}
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap justify-end gap-1.5">
          {featured ? <FeaturedBadge /> : null}
          {topRated ? <TopRatedBadge /> : null}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
        {listing.rating != null ? (
          <span className="font-medium text-slate-800">
            ★ {listing.rating.toFixed(1)}
            {listing.review_count != null ? (
              <span className="font-normal text-slate-500">
                {" "}({listing.review_count} reviews)
              </span>
            ) : null}
          </span>
        ) : (
          <span className="text-slate-400">No rating yet</span>
        )}
        {listing.phone ? (
          <a href={`tel:${listing.phone}`} className="text-brand-700 hover:underline">
            {listing.phone}
          </a>
        ) : null}
      </div>

      {topRated && summary ? (
        <div className="mt-4">
          <ReviewSummaryBox listing={listing} summary={summary} />
        </div>
      ) : topRated ? (
        <p className="mt-3 text-sm text-slate-700">
          Rated {listing.rating?.toFixed(1)} stars from{" "}
          {listing.review_count?.toLocaleString("en-US")} Google reviews.{" "}
          {listing.google_maps_url ? (
            <a
              href={listing.google_maps_url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-emerald-700 hover:underline"
            >
              Read reviews on Google Maps →
            </a>
          ) : null}
        </p>
      ) : null}

      {listing.categories_services.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {listing.categories_services.slice(0, 4).map((s) => (
            <span
              key={s}
              className="rounded-md bg-brand-50 px-2 py-0.5 text-[11px] font-medium text-brand-800"
            >
              {s.replace(/-/g, " ")}
            </span>
          ))}
        </div>
      ) : null}

      <div className="mt-4">
        <Link
          href={`/listing/${listing.slug}`}
          className="text-sm font-semibold text-brand-700 hover:underline"
        >
          View listing →
        </Link>
      </div>
    </article>
  );
}

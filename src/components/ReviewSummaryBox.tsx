import type { Listing } from "@/lib/types";
import type { ReviewSummary } from "@/lib/topRated";

/** Plain-text summary of Google reviews. Deliberately no review schema markup. */
export function ReviewSummaryBox({
  listing,
  summary,
}: {
  listing: Listing;
  summary: ReviewSummary;
}) {
  return (
    <div className="rounded-xl border border-emerald-100 bg-white/80 p-4">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-700">
        What customers mention most (summary of Google reviews)
      </p>
      <p className="mt-1 text-sm font-semibold text-slate-900">{summary.headline}</p>
      <ul className="mt-2 space-y-1.5 text-sm text-slate-700">
        {summary.bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <span aria-hidden className="mt-0.5 text-emerald-600">✓</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-slate-500">
        Our own summary of the {summary.reviews_read} Google reviews we read
        {listing.review_count != null
          ? ` (out of ${listing.review_count.toLocaleString("en-US")} total)`
          : ""}
        , checked {summary.checked}. Not written or paid for by the business.{" "}
        {listing.google_maps_url ? (
          <a
            href={listing.google_maps_url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-emerald-700 hover:underline"
          >
            Read all reviews on Google Maps →
          </a>
        ) : null}
      </p>
    </div>
  );
}

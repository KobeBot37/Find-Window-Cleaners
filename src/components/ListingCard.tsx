import Link from "next/link";
import type { Listing } from "@/lib/types";
import { FeaturedBadge } from "./FeaturedBadge";

export function ListingCard({
  listing,
  featured = false,
}: {
  listing: Listing;
  featured?: boolean;
}) {
  return (
    <article
      className={`rounded-2xl border bg-white p-4 shadow-sm transition hover:shadow-md ${
        featured ? "border-amber-300 ring-1 ring-amber-200" : "border-slate-200"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            <Link href={`/listing/${listing.slug}`} className="hover:text-brand-700">
              {listing.business_name}
            </Link>
          </h2>
          <p className="mt-0.5 text-sm text-slate-600">
            {[listing.city, listing.state].filter(Boolean).join(", ")}
            {listing.zip ? ` ${listing.zip}` : ""}
          </p>
        </div>
        {featured ? <FeaturedBadge /> : null}
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

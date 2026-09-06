import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FeaturedBadge } from "@/components/FeaturedBadge";
import { WEEK1_CITIES } from "@/lib/cities";
import {
  getListingBySlug,
  isFeatured,
  loadListings,
} from "@/lib/listings";

export function generateStaticParams() {
  return loadListings().map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const listing = getListingBySlug(slug);
  if (!listing) return { title: "Listing not found" };
  return {
    title: listing.business_name,
    description: `${listing.business_name} — window cleaning in ${listing.city}, AZ. Phone, services, and reviews.`,
  };
}

export default async function ListingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const listing = getListingBySlug(slug);
  if (!listing) notFound();
  const featured = isFeatured(listing.slug);
  const cityLinks = WEEK1_CITIES.filter((c) => listing.citySlugs.includes(c.slug));

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          {featured ? <FeaturedBadge /> : null}
          {listing.is_franchise ? (
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
              Franchise
            </span>
          ) : null}
        </div>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
          {listing.business_name}
        </h1>
        <p className="mt-1 text-slate-600">
          {[listing.address, listing.city, listing.state, listing.zip]
            .filter(Boolean)
            .join(", ")}
        </p>
        {listing.rating != null ? (
          <p className="mt-2 text-sm font-medium text-slate-800">
            ★ {listing.rating.toFixed(1)}
            {listing.review_count != null
              ? ` · ${listing.review_count} reviews`
              : ""}
          </p>
        ) : null}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {listing.phone ? (
          <a
            href={`tel:${listing.phone}`}
            className="rounded-xl bg-brand-600 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-brand-700"
          >
            Call {listing.phone}
          </a>
        ) : null}
        {listing.website ? (
          <a
            href={listing.website}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-brand-800 hover:bg-brand-50"
          >
            Visit website
          </a>
        ) : null}
        {listing.google_maps_url ? (
          <a
            href={listing.google_maps_url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50 sm:col-span-2"
          >
            Open in Google Maps
          </a>
        ) : null}
      </div>

      {listing.categories_services.length > 0 ? (
        <section>
          <h2 className="text-lg font-semibold text-slate-900">Services</h2>
          <ul className="mt-2 flex flex-wrap gap-2">
            {listing.categories_services.map((s) => (
              <li
                key={s}
                className="rounded-lg bg-brand-50 px-3 py-1 text-sm font-medium text-brand-800"
              >
                {s.replace(/-/g, " ")}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
        <h2 className="font-semibold text-amber-900">Own this business?</h2>
        <p className="mt-1 text-sm text-amber-900/80">
          Get a Featured badge and priority placement on city pages for $29–39/mo.
        </p>
        <Link
          href={`/featured?listing=${listing.slug}`}
          className="mt-3 inline-flex rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-600"
        >
          Upgrade to Featured
        </Link>
      </section>

      {cityLinks.length > 0 ? (
        <section>
          <h2 className="text-sm font-semibold text-slate-700">Also listed in</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {cityLinks.map((c) => (
              <Link
                key={c.slug}
                href={c.path}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {(listing.email || listing.facebook || listing.instagram || listing.years_in_business) && (
        <section className="rounded-2xl border border-slate-200 p-5 text-sm text-slate-700">
          <h2 className="font-semibold text-slate-900">Details</h2>
          <dl className="mt-3 space-y-2">
            {listing.years_in_business ? (
              <div className="flex gap-2">
                <dt className="w-32 text-slate-500">Years in business</dt>
                <dd>{listing.years_in_business}</dd>
              </div>
            ) : null}
            {listing.email ? (
              <div className="flex gap-2">
                <dt className="w-32 text-slate-500">Email</dt>
                <dd>
                  <a href={`mailto:${listing.email}`} className="text-brand-700 hover:underline">
                    {listing.email}
                  </a>
                </dd>
              </div>
            ) : null}
            {listing.facebook ? (
              <div className="flex gap-2">
                <dt className="w-32 text-slate-500">Facebook</dt>
                <dd>
                  <a href={listing.facebook} className="text-brand-700 hover:underline" target="_blank" rel="noopener noreferrer">
                    Profile
                  </a>
                </dd>
              </div>
            ) : null}
            {listing.instagram ? (
              <div className="flex gap-2">
                <dt className="w-32 text-slate-500">Instagram</dt>
                <dd>
                  <a href={listing.instagram} className="text-brand-700 hover:underline" target="_blank" rel="noopener noreferrer">
                    Profile
                  </a>
                </dd>
              </div>
            ) : null}
          </dl>
        </section>
      )}
    </div>
  );
}

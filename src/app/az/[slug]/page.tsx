import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { ListingCard } from "@/components/ListingCard";
import { FilterBar } from "@/components/FilterBar";
import {
  allAzStaticParams,
  cityFromRouteSlug,
} from "@/lib/cities";
import {
  filterByService,
  getListingsForCity,
  isFeatured,
  sortListings,
} from "@/lib/listings";
import { absoluteUrl, nearbyCities } from "@/lib/seo";
import { getReviewSummary, isTopRated } from "@/lib/topRated";

export function generateStaticParams() {
  return allAzStaticParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const city = cityFromRouteSlug(slug);
  if (!city) return { title: "Not found" };
  const isValleyHub = city.slug === "phoenix-valley";
  return {
    title: isValleyHub
      ? "Phoenix Valley Window Cleaners"
      : `Window Cleaners in ${city.name}, AZ`,
    description: isValleyHub
      ? "Find local residential & commercial window cleaning companies across the Phoenix Valley, Arizona. Compare listings, ratings, and contact info."
      : `Find local residential & commercial window cleaning companies in ${city.name}, Arizona. Compare listings, ratings, and contact info.`,
    alternates: { canonical: absoluteUrl(city.path) },
  };
}

export default async function CityPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ filter?: string }>;
}) {
  const { slug } = await params;
  const sp = await searchParams;
  const city = cityFromRouteSlug(slug);
  if (!city) notFound();

  const filter = sp.filter || null;
  const listings = sortListings(
    filterByService(getListingsForCity(city.slug), filter)
  );
  const isValleyHub = city.slug === "phoenix-valley";
  const nearCities = nearbyCities(city, 4);

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: city.h1,
    url: absoluteUrl(city.path),
    numberOfItems: listings.length,
    itemListElement: listings.map((l, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: l.business_name,
      url: absoluteUrl(`/listing/${l.slug}`),
    })),
  };

  return (
    <div className="space-y-6">
      <JsonLd data={itemListLd} />
      <div>
        <p className="text-sm font-medium text-brand-700">Arizona · Window cleaning</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">{city.h1}</h1>
        <p className="mt-2 max-w-2xl text-slate-600">
          {listings.length} listing{listings.length === 1 ? "" : "s"}
          {filter ? ` matching “${filter.replace(/-/g, " ")}”` : ""} in {city.name}.
          Compare local pros for residential, commercial, screens, and solar panel cleaning.
        </p>
      </div>

      <FilterBar basePath={city.path} active={filter} />

      {listings.length === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-600">
          No listings for this filter yet. Try “All” or another service.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {listings.map((l) => (
            <ListingCard
              key={l.slug}
              listing={l}
              featured={isFeatured(l.slug)}
              topRated={isTopRated(l)}
              summary={getReviewSummary(l.slug)}
            />
          ))}
        </div>
      )}

      {nearCities.length > 0 ? (
        <section>
          <h2 className="text-sm font-semibold text-slate-700">
            {isValleyHub ? "Browse by city" : `Window cleaners near ${city.name}`}
          </h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {nearCities.map((c) => (
              <Link
                key={c.slug}
                href={c.path}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200"
              >
                {c.name}
              </Link>
            ))}
            {!isValleyHub ? (
              <Link
                href="/az/phoenix-valley-window-cleaners"
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200"
              >
                All Phoenix Valley
              </Link>
            ) : null}
          </div>
        </section>
      ) : null}
    </div>
  );
}

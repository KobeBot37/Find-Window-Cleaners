import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ListingCard } from "@/components/ListingCard";
import { FilterBar } from "@/components/FilterBar";
import {
  allAzStaticParams,
  cityFromRouteSlug,
  SITE_NAME,
} from "@/lib/cities";
import {
  filterByService,
  getListingsForCity,
  isFeatured,
  sortListings,
} from "@/lib/listings";

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
  return {
    title: city.h1,
    description: `Find trusted window cleaners in ${city.name}, AZ. Compare ratings, services, and contact info on ${SITE_NAME}.`,
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

  return (
    <div className="space-y-6">
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
            <ListingCard key={l.slug} listing={l} featured={isFeatured(l.slug)} />
          ))}
        </div>
      )}
    </div>
  );
}

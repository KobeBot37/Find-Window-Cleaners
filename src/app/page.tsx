import Link from "next/link";
import { SearchBar } from "@/components/SearchBar";
import { ListingCard } from "@/components/ListingCard";
import { WEEK1_CITIES, VALLEY_HUB, SITE_NAME } from "@/lib/cities";
import { isFeatured, searchListings, sortListings, loadListings } from "@/lib/listings";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const sp = await searchParams;
  const q = sp.q || "";
  const all = loadListings();
  const results = sortListings(q ? searchListings(q) : all).slice(0, q ? 60 : 12);

  return (
    <div className="space-y-10">
      <section className="rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-sky-500 px-6 py-10 text-white shadow-lg sm:px-10">
        <p className="text-sm font-medium text-brand-100">Phoenix Valley, Arizona</p>
        <h1 className="mt-2 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
          Find local window cleaners near you
        </h1>
        <p className="mt-3 max-w-xl text-brand-50">
          {SITE_NAME} lists {all.length}+ residential and commercial window cleaning companies across the Valley.
        </p>
        <div className="mt-6 max-w-2xl">
          <SearchBar initialQuery={q} />
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between gap-3">
          <h2 className="text-xl font-semibold text-slate-900">Browse by city</h2>
          <Link href={VALLEY_HUB.path} className="text-sm font-medium text-brand-700 hover:underline">
            All Valley →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
          {WEEK1_CITIES.map((c) => (
            <Link
              key={c.slug}
              href={c.path}
              className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-medium text-slate-800 shadow-sm hover:border-brand-300 hover:text-brand-800"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold text-slate-900">
          {q ? `Results for “${q}”` : "Top listings"}
        </h2>
        {results.length === 0 ? (
          <p className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-600">
            No listings matched. Try another city or service (e.g. screens, solar panels).
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {results.map((l) => (
              <ListingCard key={l.slug} listing={l} featured={isFeatured(l.slug)} />
            ))}
          </div>
        )}
        {!q ? (
          <p className="mt-4 text-center text-sm text-slate-600">
            <Link href={VALLEY_HUB.path} className="font-semibold text-brand-700 hover:underline">
              See all {all.length} Valley listings
            </Link>
          </p>
        ) : null}
      </section>
    </div>
  );
}

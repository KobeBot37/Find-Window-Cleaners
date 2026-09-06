import type { Metadata } from "next";
import Link from "next/link";
import { CheckoutButtons } from "./CheckoutButtons";
import { getListingBySlug, isFeatured, loadListings } from "@/lib/listings";
import { ListingCard } from "@/components/ListingCard";

export const metadata: Metadata = {
  title: "Get Featured",
  description: "Upgrade your Find Window Cleaners listing with a Featured badge for $29–39/mo.",
};

export default async function FeaturedPage({
  searchParams,
}: {
  searchParams: Promise<{ listing?: string }>;
}) {
  const sp = await searchParams;
  const listing = sp.listing ? getListingBySlug(sp.listing) : undefined;
  const featured = loadListings().filter((l) => isFeatured(l.slug)).slice(0, 6);

  return (
    <div className="space-y-10">
      <section className="mx-auto max-w-2xl space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Get Featured</h1>
        <p className="text-slate-600">
          Stand out on city pages and search results with a Featured badge and priority sorting.
          {listing ? (
            <>
              {" "}Upgrading <strong>{listing.business_name}</strong>.
            </>
          ) : null}
        </p>
        <CheckoutButtons listingSlug={listing?.slug} />
        <p className="text-xs text-slate-500">
          Not listed yet? <Link href="/submit" className="text-brand-700 hover:underline">Submit your business</Link> first.
        </p>
      </section>

      {featured.length > 0 ? (
        <section>
          <h2 className="mb-4 text-xl font-semibold">Currently featured</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {featured.map((l) => (
              <ListingCard key={l.slug} listing={l} featured />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

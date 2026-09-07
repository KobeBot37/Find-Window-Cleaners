import type { Metadata } from "next";
import { FeaturedCheckout } from "./FeaturedCheckout";
import { isFeatured, loadListings } from "@/lib/listings";
import { ListingCard } from "@/components/ListingCard";

export const metadata: Metadata = {
  title: "Get Featured",
  description: "Upgrade your Find Window Cleaners listing with a Featured badge for $29–39/mo.",
};

export default async function FeaturedPage({
  searchParams,
}: {
  searchParams: Promise<{ listing?: string; success?: string; canceled?: string }>;
}) {
  const sp = await searchParams;
  const listings = loadListings();
  const options = listings.map((l) => ({
    slug: l.slug,
    business_name: l.business_name,
    city: l.city,
  }));
  const featured = listings.filter((l) => isFeatured(l.slug)).slice(0, 6);
  const success = sp.success === "1";
  const canceled = sp.canceled === "1";
  const selectedListing = sp.listing
    ? listings.find((l) => l.slug === sp.listing)
    : undefined;

  return (
    <div className="space-y-10">
      <section className="mx-auto max-w-2xl space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Get Featured</h1>
        <p className="text-slate-600">
          Stand out on city pages and search results with a Featured badge and priority sorting.
        </p>

        {success ? (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
            <p className="font-semibold">Payment received — thank you!</p>
            <p className="mt-1">
              {selectedListing
                ? `We’ll feature ${selectedListing.business_name} shortly. Featured badges usually appear within one business day.`
                : "We’ll apply your Featured upgrade shortly. Featured badges usually appear within one business day."}
            </p>
          </div>
        ) : null}

        {canceled ? (
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            Checkout was canceled. Select your business below when you’re ready to try again.
          </div>
        ) : null}

        <FeaturedCheckout options={options} initialSlug={sp.listing} />
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

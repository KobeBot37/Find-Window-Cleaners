"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CheckoutButtons } from "./CheckoutButtons";

export type ListingOption = {
  slug: string;
  business_name: string;
  city: string;
};

export function FeaturedCheckout({
  options,
  initialSlug,
}: {
  options: ListingOption[];
  initialSlug?: string;
}) {
  const initial =
    initialSlug && options.some((o) => o.slug === initialSlug)
      ? initialSlug
      : "";
  const [selectedSlug, setSelectedSlug] = useState(initial);
  const [query, setQuery] = useState("");

  const selected = useMemo(
    () => options.find((o) => o.slug === selectedSlug),
    [options, selectedSlug]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options.slice(0, 40);
    return options
      .filter((o) => {
        const hay = `${o.business_name} ${o.city} ${o.slug}`.toLowerCase();
        return hay.includes(q);
      })
      .slice(0, 40);
  }, [options, query]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label
          htmlFor="featured-business-search"
          className="block text-sm font-semibold text-slate-800"
        >
          Which business are you featuring?
        </label>
        <input
          id="featured-business-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by business name, city, or slug…"
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none ring-brand-500 focus:ring-2"
          aria-label="Search businesses to feature"
        />
        {selected ? (
          <div className="flex flex-wrap items-center gap-2 rounded-xl border border-brand-200 bg-brand-50 px-3 py-2 text-sm">
            <span className="font-semibold text-slate-900">
              {selected.business_name}
            </span>
            {selected.city ? (
              <span className="text-slate-600">· {selected.city}</span>
            ) : null}
            <button
              type="button"
              onClick={() => setSelectedSlug("")}
              className="ml-auto text-xs font-semibold text-brand-700 hover:underline"
            >
              Change
            </button>
          </div>
        ) : (
          <ul className="max-h-56 overflow-auto rounded-xl border border-slate-200 bg-white divide-y divide-slate-100">
            {filtered.length === 0 ? (
              <li className="px-4 py-3 text-sm text-slate-600">
                No matching listings.{" "}
                <Link href="/submit" className="text-brand-700 hover:underline">
                  Submit your business
                </Link>{" "}
                first, then come back to get featured.
              </li>
            ) : (
              filtered.map((o) => (
                <li key={o.slug}>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedSlug(o.slug);
                      setQuery("");
                    }}
                    className="flex w-full items-baseline justify-between gap-3 px-4 py-2.5 text-left text-sm hover:bg-slate-50"
                  >
                    <span className="font-medium text-slate-900">
                      {o.business_name}
                    </span>
                    <span className="shrink-0 text-xs text-slate-500">
                      {o.city || o.slug}
                    </span>
                  </button>
                </li>
              ))
            )}
          </ul>
        )}
      </div>

      {!selected ? (
        <p className="text-sm text-slate-600">
          Select your business above to unlock checkout.
        </p>
      ) : null}

      <CheckoutButtons
        listingSlug={selected?.slug}
        businessName={selected?.business_name}
      />

      <p className="text-xs text-slate-500">
        Not listed yet?{" "}
        <Link href="/submit" className="text-brand-700 hover:underline">
          Submit your business
        </Link>{" "}
        first.
      </p>
    </div>
  );
}

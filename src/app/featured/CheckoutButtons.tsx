"use client";

import { useState } from "react";

export function CheckoutButtons({
  listingSlug,
  businessName,
}: {
  listingSlug?: string;
  businessName?: string;
}) {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState<string | null>(null);
  const publishable = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "";
  const configured =
    publishable.length > 0 &&
    !publishable.includes("placeholder") &&
    publishable.startsWith("pk_");
  const ready = Boolean(listingSlug);

  async function startCheckout(plan: "29" | "39") {
    if (!listingSlug) {
      setError("Select a business before checkout.");
      return;
    }
    setError(null);
    setPending(plan);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan,
          listingSlug,
          businessName: businessName || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Checkout unavailable");
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      throw new Error("No checkout URL returned");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed");
      setPending(null);
    }
  }

  if (!configured) {
    return (
      <div className="rounded-xl border border-dashed border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
        <p className="font-semibold">Stripe not configured yet</p>
        <p className="mt-1">
          Add real test keys to <code className="rounded bg-white px-1">.env.local</code> (
          <code>STRIPE_SECRET_KEY</code>, <code>NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY</code>,{" "}
          <code>STRIPE_PRICE_ID_29</code>, <code>STRIPE_PRICE_ID_39</code>) to enable checkout.
          Plans: $29/mo and $39/mo.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          disabled={!ready || !!pending}
          onClick={() => startCheckout("29")}
          className="rounded-xl border border-slate-200 bg-white px-4 py-4 text-left hover:border-brand-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <p className="text-lg font-bold text-slate-900">$29/mo</p>
          <p className="text-sm text-slate-600">Featured badge + city priority</p>
          <p className="mt-2 text-xs font-semibold text-brand-700">
            {pending === "29" ? "Redirecting…" : ready ? "Checkout →" : "Select a business first"}
          </p>
        </button>
        <button
          type="button"
          disabled={!ready || !!pending}
          onClick={() => startCheckout("39")}
          className="rounded-xl border border-brand-300 bg-brand-50 px-4 py-4 text-left hover:border-brand-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <p className="text-lg font-bold text-slate-900">$39/mo</p>
          <p className="text-sm text-slate-600">Homepage spotlight + badge</p>
          <p className="mt-2 text-xs font-semibold text-brand-700">
            {pending === "39" ? "Redirecting…" : ready ? "Checkout →" : "Select a business first"}
          </p>
        </button>
      </div>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}

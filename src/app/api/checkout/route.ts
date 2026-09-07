import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getListingBySlug } from "@/lib/listings";

export const runtime = "nodejs";

function stripeConfigured(): boolean {
  const key = process.env.STRIPE_SECRET_KEY || "";
  return Boolean(key) && !key.includes("placeholder") && key.startsWith("sk_");
}

export async function POST(req: Request) {
  if (!stripeConfigured()) {
    return NextResponse.json(
      {
        error:
          "Stripe is not configured. Add STRIPE_SECRET_KEY and price IDs to .env.local.",
      },
      { status: 503 }
    );
  }

  let body: { plan?: string; listingSlug?: string; businessName?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const plan = body.plan === "39" ? "39" : body.plan === "29" ? "29" : null;
  if (!plan) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

  const listingSlug = (body.listingSlug || "").trim();
  if (!listingSlug) {
    return NextResponse.json(
      { error: "Select a business listing before checkout." },
      { status: 400 }
    );
  }

  const listing = getListingBySlug(listingSlug);
  if (!listing) {
    return NextResponse.json(
      { error: "Listing not found. Pick a valid business from the directory." },
      { status: 400 }
    );
  }

  const businessName =
    (body.businessName || "").trim() || listing.business_name;

  const priceId =
    plan === "39"
      ? process.env.STRIPE_PRICE_ID_39
      : process.env.STRIPE_PRICE_ID_29;

  if (!priceId || priceId.includes("placeholder")) {
    return NextResponse.json(
      { error: `Missing Stripe price ID for $${plan}/mo plan.` },
      { status: 503 }
    );
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2025-02-24.acacia",
  });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const listingQs = encodeURIComponent(listing.slug);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${siteUrl}/featured?success=1&listing=${listingQs}`,
      cancel_url: `${siteUrl}/featured?canceled=1&listing=${listingQs}`,
      client_reference_id: listing.slug,
      metadata: {
        listingSlug: listing.slug,
        businessName,
        plan,
      },
      subscription_data: {
        metadata: {
          listingSlug: listing.slug,
          businessName,
          plan,
        },
      },
      custom_text: {
        submit: {
          message: `Featuring ${businessName} on Find Window Cleaners`,
        },
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Stripe error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import Stripe from "stripe";

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

  let body: { plan?: string; listingSlug?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const plan = body.plan === "39" ? "39" : body.plan === "29" ? "29" : null;
  if (!plan) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

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

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${siteUrl}/featured?success=1`,
      cancel_url: `${siteUrl}/featured?canceled=1`,
      metadata: {
        listingSlug: body.listingSlug || "",
        plan,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Stripe error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

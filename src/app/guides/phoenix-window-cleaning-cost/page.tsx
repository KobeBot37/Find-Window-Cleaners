import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    absolute:
      "How Much Does Window Cleaning Cost in Phoenix, AZ? | Find Window Cleaners",
  },
  description:
    "Ballpark residential window cleaning prices in Phoenix, AZ — what affects cost (stories, hard water, screens), and when to get multiple quotes.",
};

export default function PhoenixWindowCleaningCostGuide() {
  return (
    <article className="mx-auto max-w-3xl space-y-8">
      <header className="space-y-3">
        <p className="text-sm font-medium text-brand-700">Guides · Phoenix, AZ</p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          How Much Does Window Cleaning Cost in Phoenix, AZ?
        </h1>
        <p className="text-lg text-slate-600">
          Short answer: most Phoenix homeowners pay somewhere in a few hundred dollars
          for a typical house — not a fixed sticker price. Below are honest ballpark
          ranges and what actually moves the quote up or down.
        </p>
      </header>

      <section className="prose-sm space-y-4 text-base leading-relaxed text-slate-700 sm:text-[1.05rem] sm:leading-7">
        <h2 className="text-xl font-semibold text-slate-900">
          Ballpark residential ranges (not fake precision)
        </h2>
        <p>
          Window cleaning is usually priced by the job, by the number of panes, or with
          a flat rate for a “standard” home. In the Phoenix Valley, these are reasonable
          <strong> ballpark</strong> ranges homeowners often hear for a one-time exterior
          (or interior + exterior) clean on a typical single-family home. Treat them as
          starting points — your quote can land lower or higher.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Small home / condo / townhome</strong> (roughly under ~1,500 sq ft,
            mostly ground floor): often about <strong>$100–$200</strong> for exterior
            only; <strong>$150–$300</strong> if interior and exterior are both included.
          </li>
          <li>
            <strong>Average 3–4 bedroom house</strong> (common Valley footprint): often
            about <strong>$175–$350</strong> exterior; <strong>$250–$500</strong> for
            interior + exterior.
          </li>
          <li>
            <strong>Larger homes, lots of glass, or two stories</strong>: often{" "}
            <strong>$350–$700+</strong>, especially with hard-water spots, screens, or
            hard-to-reach panes.
          </li>
        </ul>
        <p>
          Some companies quote per pane (for example a few dollars each). Others use
          minimums — so a tiny job may still cost close to their floor price. Recurring
          plans (every few months) are sometimes cheaper per visit than a one-off deep
          clean.
        </p>
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
          These are labeled ballparks based on how local jobs are commonly priced — not
          a survey, not a guarantee, and not a substitute for a real quote on{" "}
          <em>your</em> house.
        </p>
      </section>

      <section className="space-y-4 text-base leading-relaxed text-slate-700 sm:text-[1.05rem] sm:leading-7">
        <h2 className="text-xl font-semibold text-slate-900">
          What actually affects the price in Phoenix
        </h2>
        <p>
          Phoenix isn’t a soft, rainy climate. Dust, irrigation overspray, and hard water
          show up on glass more than people expect — and that shows up on the invoice.
        </p>
        <h3 className="text-lg font-semibold text-slate-900">Stories and access</h3>
        <p>
          Second-story windows usually cost more. Ladder work takes time and carries more
          risk. Homes with tall atriums, steep roofs, or panes that need poles or
          water-fed systems can push the quote up even if the house isn’t huge.
        </p>
        <h3 className="text-lg font-semibold text-slate-900">Hard water and mineral spots</h3>
        <p>
          Hard-water etching and white mineral spots are common around sprinklers and
          poorly aimed drip. A light film might come off with a normal clean. Heavy
          buildup or etched glass may need extra time, specialty products, or multiple
          visits — and some damage can’t be fully reversed. Ask specifically about
          hard-water treatment so you’re comparing apples to apples.
        </p>
        <h3 className="text-lg font-semibold text-slate-900">Screens, tracks, and extras</h3>
        <p>
          Screen cleaning, track vacuuming, skylights, French panes, solar panels, and
          post-construction dust are often add-ons. A low “window only” price can look
          cheaper until you add screens or interior glass. Decide what you want included
          before you compare numbers.
        </p>
        <h3 className="text-lg font-semibold text-slate-900">How dirty things are</h3>
        <p>
          A home cleaned every few months is usually faster (and cheaper) than one that
          hasn’t been touched in years. New construction and remodel dust are their own
          category — expect a higher rate for that kind of mess.
        </p>
      </section>

      <section className="space-y-4 text-base leading-relaxed text-slate-700 sm:text-[1.05rem] sm:leading-7">
        <h2 className="text-xl font-semibold text-slate-900">
          When to get multiple quotes
        </h2>
        <p>Get at least two or three quotes when:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>It’s a two-story home, large patio doors, or lots of custom glass.</li>
          <li>You have heavy hard-water spots or want screens/tracks included.</li>
          <li>One bid is much lower or much higher than the others with no clear why.</li>
          <li>You’re booking a first-time deep clean vs. a recurring plan.</li>
        </ul>
        <p>
          When you call or message, share roughly how many stories, whether you want
          interior + exterior, and whether screens and hard-water work are included.
          That keeps quotes comparable. Ask what’s covered if something breaks (rare,
          but worth knowing), and whether they carry insurance.
        </p>
        <p>
          Price isn’t everything. Reliability, clear scheduling, and how they treat
          your property matter — especially if you’ll hire them again after monsoon dust
          or spring pollen season.
        </p>
      </section>

      <section className="space-y-4 text-base leading-relaxed text-slate-700 sm:text-[1.05rem] sm:leading-7">
        <h2 className="text-xl font-semibold text-slate-900">
          Find Phoenix window cleaners
        </h2>
        <p>
          Ready to compare local companies? Browse listings, check service areas, and
          reach out for quotes that match your home.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href="/az/phoenix-window-cleaners"
            className="inline-flex items-center justify-center rounded-xl bg-brand-700 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-800"
          >
            Browse Phoenix window cleaners
          </Link>
          <Link
            href="/az/phoenix-valley-window-cleaners"
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm hover:border-brand-300 hover:text-brand-800"
          >
            All Phoenix Valley listings
          </Link>
        </div>
      </section>

      <p className="border-t border-slate-200 pt-6 text-sm text-slate-500">
        Independent guide from Find Window Cleaners. We don’t set prices for listed
        businesses — always confirm cost and scope directly with the company you hire.
      </p>
    </article>
  );
}

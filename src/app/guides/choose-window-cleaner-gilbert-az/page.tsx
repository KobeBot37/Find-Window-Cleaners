import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    absolute:
      "How to Choose a Window Cleaner in Gilbert, AZ | Find Window Cleaners",
  },
  description:
    "A practical Gilbert, AZ checklist: insurance, reviews, hard-water experience, screens, and clear quotes — then browse local listings.",
};

export default function ChooseWindowCleanerGilbertGuide() {
  return (
    <article className="mx-auto max-w-3xl space-y-8">
      <header className="space-y-3">
        <p className="text-sm font-medium text-brand-700">Guides · Gilbert, AZ</p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          How to Choose a Window Cleaner in Gilbert, AZ
        </h1>
        <p className="text-lg text-slate-600">
          You don’t need a fake “#1 in Gilbert” ranking. You need a clear
          checklist, a few comparable quotes, and someone who knows Valley dust
          and hard water. Here’s a practical way to pick.
        </p>
      </header>

      <section className="prose-sm space-y-4 text-base leading-relaxed text-slate-700 sm:text-[1.05rem] sm:leading-7">
        <h2 className="text-xl font-semibold text-slate-900">
          Decision checklist (use this when you call)
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Insured</strong> — ask if they carry liability (and workers’
            comp if they have employees). Get a yes, not a shrug.
          </li>
          <li>
            <strong>Reviews / stars</strong> — look for recent feedback about
            punctuality and finish quality, not just a high average. A few
            detailed notes beat a pile of one-word praise.
          </li>
          <li>
            <strong>Hard-water experience</strong> — Gilbert and the East Valley
            get sprinkler overspray and mineral spots. Ask how they treat
            buildup and what they won’t promise to reverse (etched glass is
            real).
          </li>
          <li>
            <strong>Screens, tracks, and extras</strong> — decide what’s in
            scope before comparing prices. Screen cleaning and track vacuuming
            are often add-ons.
          </li>
          <li>
            <strong>Stories and access</strong> — two-story homes, tall panes,
            and tight side yards change the quote. Say how many stories and
            whether you want interior + exterior.
          </li>
          <li>
            <strong>Written scope</strong> — what’s included, what’s not, and
            whether hard-water treatment is part of the base price.
          </li>
        </ul>
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
          This directory lists local companies so you can compare — we don’t
          crown a #1 Gilbert window cleaner, and we don’t take a cut of your
          job. Always confirm insurance, price, and scope with the business
          directly.
        </p>
      </section>

      <section className="space-y-4 text-base leading-relaxed text-slate-700 sm:text-[1.05rem] sm:leading-7">
        <h2 className="text-xl font-semibold text-slate-900">
          What “good” looks like in a Gilbert quote
        </h2>
        <p>
          A useful quote tells you interior vs exterior, approximate pane count
          or home size, screens yes/no, and hard-water yes/no. Vague “we’ll see
          when we get there” pricing is harder to compare. Recurring every few
          months can cost less per visit than a one-time deep clean — same idea
          as elsewhere in the Valley (see{" "}
          <Link
            href="/guides/phoenix-window-cleaning-cost"
            className="font-medium text-brand-700 hover:underline"
          >
            Phoenix cost ballparks
          </Link>
          ).
        </p>
        <p>
          If one bid is dramatically cheaper, ask what’s missing: screens,
          second story, hard-water work, or insurance. Reliability and how they
          treat your property matter as much as the number — especially if
          you’ll book again after monsoon dust.
        </p>
      </section>

      <section className="space-y-4 text-base leading-relaxed text-slate-700 sm:text-[1.05rem] sm:leading-7">
        <h2 className="text-xl font-semibold text-slate-900">
          Related reading
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <Link
              href="/guides/how-often-clean-windows-phoenix"
              className="font-medium text-brand-700 hover:underline"
            >
              How often to clean windows in Phoenix
            </Link>{" "}
            — dust, pollen, monsoon cadence.
          </li>
          <li>
            <Link
              href="/guides/condo-vs-house-window-cleaning-phoenix"
              className="font-medium text-brand-700 hover:underline"
            >
              Condo vs house cleaning cost
            </Link>{" "}
            — why access and HOA rules change quotes.
          </li>
        </ul>
      </section>

      <section className="space-y-4 text-base leading-relaxed text-slate-700 sm:text-[1.05rem] sm:leading-7">
        <h2 className="text-xl font-semibold text-slate-900">
          Browse Gilbert window cleaners
        </h2>
        <p>
          Ready to shortlist? Open Gilbert listings, skim service notes, and
          reach out for quotes that match your checklist.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href="/az/gilbert-window-cleaners"
            className="inline-flex items-center justify-center rounded-xl bg-brand-700 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-800"
          >
            Browse Gilbert window cleaners
          </Link>
          <Link
            href="/az/chandler-window-cleaners"
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm hover:border-brand-300 hover:text-brand-800"
          >
            Nearby: Chandler
          </Link>
          <Link
            href="/az/mesa-window-cleaners"
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm hover:border-brand-300 hover:text-brand-800"
          >
            Nearby: Mesa
          </Link>
          <Link
            href="/featured"
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm hover:border-brand-300 hover:text-brand-800"
          >
            Featured listings
          </Link>
        </div>
      </section>

      <p className="border-t border-slate-200 pt-6 text-sm text-slate-500">
        Independent guide from Find Window Cleaners. Listings are informational
        — always verify insurance, reviews, and pricing with the company you
        hire.
      </p>
    </article>
  );
}

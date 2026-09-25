import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    absolute:
      "How Often Should You Clean Windows in Phoenix, AZ? | Find Window Cleaners",
  },
  description:
    "Dust, pollen, monsoon, and hard water — a practical Phoenix window-cleaning cadence (about every 2–4 months) and when to book sooner.",
};

export default function HowOftenCleanWindowsPhoenixGuide() {
  return (
    <article className="mx-auto max-w-3xl space-y-8">
      <header className="space-y-3">
        <p className="text-sm font-medium text-brand-700">Guides · Phoenix, AZ</p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          How Often Should You Clean Windows in Phoenix, AZ?
        </h1>
        <p className="text-lg text-slate-600">
          Short answer: for most Phoenix Valley homes, roughly every{" "}
          <strong>2–4 months</strong> is a sensible ballpark — not a hard rule.
          Dust, pollen, monsoon storms, and hard-water spots decide whether you
          book toward the short end or can stretch it longer.
        </p>
      </header>

      <section className="prose-sm space-y-4 text-base leading-relaxed text-slate-700 sm:text-[1.05rem] sm:leading-7">
        <h2 className="text-xl font-semibold text-slate-900">
          Why Phoenix glass gets dirty faster than you expect
        </h2>
        <p>
          This isn’t a soft, rainy climate. Fine desert dust settles on every
          pane. Spring pollen sticks to that film. Irrigation overspray leaves
          mineral dots. Then monsoon season blows grit and leaves streaks that
          look worse once the sun hits them. None of that means you need a weekly
          wash — it does mean “once a year” often looks neglected here.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Dust year-round</strong> — fine particulate builds a haze,
            especially on south- and west-facing glass.
          </li>
          <li>
            <strong>Pollen (late winter–spring)</strong> — yellow film on
            exterior panes and screens; a mid-spring clean often feels worth it.
          </li>
          <li>
            <strong>Monsoon (summer)</strong> — wind, rain, and mud spatters;
            many homeowners book after a messy storm stretch.
          </li>
          <li>
            <strong>Hard water</strong> — sprinkler overspray can etch or spot
            glass if it sits. Spot-treat early; don’t wait a full year.
          </li>
        </ul>
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
          Cadence below is a practical ballpark for typical single-family homes
          in the Valley — not a survey, not medical-grade precision, and not a
          substitute for looking at <em>your</em> glass.
        </p>
      </section>

      <section className="space-y-4 text-base leading-relaxed text-slate-700 sm:text-[1.05rem] sm:leading-7">
        <h2 className="text-xl font-semibold text-slate-900">
          A simple seasonal cadence (ballpark)
        </h2>
        <p>
          Think in seasons, not a calendar tattoo. A common pattern that works
          for a lot of Phoenix homeowners:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>~Every 2–3 months</strong> if you have lots of glass,
            hard-water issues, kids/pets, or you sit near busy roads/dirt.
          </li>
          <li>
            <strong>~Every 3–4 months</strong> for an average house that stays
            reasonably clean between visits.
          </li>
          <li>
            <strong>After monsoon mess or heavy pollen</strong> — book when it
            looks bad, even if you’re “early” on the schedule.
          </li>
          <li>
            <strong>Screens and tracks</strong> — often with every other full
            clean, or whenever they feel gritty.
          </li>
        </ul>
        <p>
          Recurring plans (quarterly or every few months) are sometimes cheaper
          per visit than a one-off deep clean after years of buildup. For
          ballpark prices, see our{" "}
          <Link
            href="/guides/phoenix-window-cleaning-cost"
            className="font-medium text-brand-700 hover:underline"
          >
            Phoenix window cleaning cost guide
          </Link>
          .
        </p>
      </section>

      <section className="space-y-4 text-base leading-relaxed text-slate-700 sm:text-[1.05rem] sm:leading-7">
        <h2 className="text-xl font-semibold text-slate-900">
          When to clean sooner
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>White mineral rings from sprinklers that won’t wipe off.</li>
          <li>Post-construction or remodel dust on interior glass.</li>
          <li>Listing or selling the home (curb appeal photos matter).</li>
          <li>
            Condo vs house access quirks — see{" "}
            <Link
              href="/guides/condo-vs-house-window-cleaning-phoenix"
              className="font-medium text-brand-700 hover:underline"
            >
              condo vs house cost in Phoenix
            </Link>
            .
          </li>
        </ul>
      </section>

      <section className="space-y-4 text-base leading-relaxed text-slate-700 sm:text-[1.05rem] sm:leading-7">
        <h2 className="text-xl font-semibold text-slate-900">
          Find cleaners near you
        </h2>
        <p>
          Browse local listings, compare service notes, and ask for a quote that
          matches your cadence (one-time vs recurring).
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href="/az/phoenix-window-cleaners"
            className="inline-flex items-center justify-center rounded-xl bg-brand-700 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-800"
          >
            Browse Phoenix window cleaners
          </Link>
          <Link
            href="/az/scottsdale-window-cleaners"
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm hover:border-brand-300 hover:text-brand-800"
          >
            Scottsdale
          </Link>
          <Link
            href="/az/mesa-window-cleaners"
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm hover:border-brand-300 hover:text-brand-800"
          >
            Mesa
          </Link>
          <Link
            href="/az/chandler-window-cleaners"
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm hover:border-brand-300 hover:text-brand-800"
          >
            Chandler
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
        Independent guide from Find Window Cleaners. We don’t schedule or price
        jobs for listed businesses — confirm timing and scope directly with the
        company you hire.
      </p>
    </article>
  );
}

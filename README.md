# Find Window Cleaners

Phoenix Valley, AZ window cleaning directory MVP · Next.js · CSV · Stripe placeholders

**Domain target:** [findwindowcleaners.com](https://findwindowcleaners.com)

## Dennis quick start

**Run locally**

```bash
cd /workspace/directory/window-cleaning/site
cp .env.example .env.local   # optional until Stripe
npm install
npm run dev
```

Open http://localhost:3000

**What you must connect before going public**

| Step | What | Notes |
|------|------|--------|
| 1 | Origin or GitHub | Push this `site/` folder so Vercel can deploy |
| 2 | Domain | Buy/point DNS for findwindowcleaners.com; set `NEXT_PUBLIC_SITE_URL` |
| 3 | Vercel | Import repo, root = this folder, paste env from `.env.example` |
| 4 | Stripe (test OK) | `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_PRICE_ID_29`, `STRIPE_PRICE_ID_39` |

Until Stripe keys are real, Featured checkout shows a placeholder (site still works). After a paid upgrade, add the listing slug to `data/featured.json`.

**Already working:** 325 listings · homepage search · Valley hub · 12 Week-1 city pages · filters · listing pages · submit form · featured CTA.

---

## Local development

    cd /workspace/directory/window-cleaning/site
    cp .env.example .env.local
    npm install
    npm run dev

Open http://localhost:3000

    npm run build
    npm start

## Main routes

- / — Searchable homepage
- /az/phoenix-valley-window-cleaners — Valley hub (all listings)
- /az/{city}-window-cleaners — Week 1 city pages (12)
- /az/{city}-window-cleaners?filter=... — Filters: residential, commercial, screens, solar-panels, post-construction, hoa-community, high-reach
- /listing/[slug] — Listing detail
- /submit — Submit listing form
- /submit/success — Confirmation
- /featured — Featured upgrade CTA
- /api/submit — Appends to data/submissions.jsonl
- /api/checkout — Stripe Checkout (test mode)

Week 1 cities: Phoenix, Scottsdale, Mesa, Chandler, Gilbert, Tempe, Peoria, Glendale, Surprise, Paradise Valley, North Phoenix, Ahwatukee.

## Data

- Listings CSV: data/phoenix_valley_window_cleaners.csv
- Featured slugs: data/featured.json
- Submissions: data/submissions.jsonl

### Updating the CSV

1. Replace data/phoenix_valley_window_cleaners.csv (same columns).
2. Restart dev server or rebuild (in-memory cache per process).
3. Update data/featured.json slugs if needed (slugified business_name).

### City assignment

- Map city field to Week 1 slugs when possible.
- Ahwatukee: city=Ahwatukee OR notes contain Ahwatukee.
- North Phoenix: city=North Phoenix OR notes contain north phoenix/desert ridge OR zip in 85050,85054,85024,85085,85086.
- Paradise Valley: city=Paradise Valley OR notes contain paradise valley.
- Dual listing on Phoenix + North Phoenix/Ahwatukee allowed.
- Other cities: homepage search + Valley hub only.

## Environment variables

See .env.example for STRIPE_SECRET_KEY, NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, STRIPE_PRICE_ID_29, STRIPE_PRICE_ID_39, NEXT_PUBLIC_SITE_URL, NEXT_PUBLIC_SITE_NAME.

When keys are missing or placeholders, Featured page shows a graceful message and checkout returns 503.

## Stripe setup (Dennis)

1. Stripe account, Test mode.
2. Create recurring prices at 29/mo and 39/mo.
3. Paste keys and price IDs into env.
4. After payment, manually add listing slug to data/featured.json (no webhook in MVP).

## Deploy (Vercel)

1. Push site/ to GitHub or Origin when ready.
2. Import in Vercel; set env vars; deploy this folder as root.
3. Attach findwindowcleaners.com; set NEXT_PUBLIC_SITE_URL to https://findwindowcleaners.com.

Note: api/submit writes to local disk. On Vercel serverless that will not persist — swap to email, Sheet, or KV for production.

## Admin notes

- No auth/CMS. Review submissions.jsonl and merge into CSV.
- Featured = slug in featured.json.
- Do not invent listing data.

import Link from "next/link";
import { SITE_NAME, WEEK1_CITIES } from "@/lib/cities";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
        <div>
          <p className="font-semibold text-brand-900">{SITE_NAME}</p>
          <p className="mt-2 text-sm text-slate-600">
            Free directory of residential &amp; commercial window cleaners across the Phoenix Valley, AZ.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-800">Cities</p>
          <ul className="mt-2 space-y-1 text-sm text-slate-600">
            {WEEK1_CITIES.slice(0, 6).map((c) => (
              <li key={c.slug}>
                <Link href={c.path} className="hover:text-brand-700">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-800">For businesses</p>
          <ul className="mt-2 space-y-1 text-sm text-slate-600">
            <li>
              <Link href="/submit" className="hover:text-brand-700">
                Submit your listing
              </Link>
            </li>
            <li>
              <Link href="/featured" className="hover:text-brand-700">
                Get featured ($29–39/mo)
              </Link>
            </li>
            <li>
              <Link href="/az/phoenix-valley-window-cleaners" className="hover:text-brand-700">
                Phoenix Valley hub
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {SITE_NAME}. Independent local directory — not affiliated with listed businesses.
      </div>
    </footer>
  );
}

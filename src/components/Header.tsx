import Link from "next/link";
import { SITE_NAME } from "@/lib/cities";

export function Header() {
  return (
    <header className="border-b border-brand-100 bg-white/95 backdrop-blur sticky top-0 z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-semibold text-brand-800">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-sm text-white">
            VW
          </span>
          <span className="hidden sm:inline">{SITE_NAME}</span>
          <span className="sm:hidden">Valley WC</span>
        </Link>
        <nav className="flex items-center gap-3 text-sm font-medium text-slate-700">
          <Link href="/az/phoenix-valley-window-cleaners" className="hover:text-brand-700">
            Valley
          </Link>
          <Link href="/featured" className="hover:text-brand-700">
            For Businesses
          </Link>
          <Link
            href="/submit"
            className="rounded-full bg-brand-600 px-3 py-1.5 text-white hover:bg-brand-700"
          >
            Submit
          </Link>
        </nav>
      </div>
    </header>
  );
}

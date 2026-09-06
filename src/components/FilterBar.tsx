import Link from "next/link";
import { FILTERS } from "@/lib/types";

export function FilterBar({
  basePath,
  active,
}: {
  basePath: string;
  active?: string | null;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href={basePath}
        className={`rounded-full px-3 py-1.5 text-xs font-medium ${
          !active
            ? "bg-brand-600 text-white"
            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
        }`}
      >
        All
      </Link>
      {FILTERS.map((f) => {
        const href = `${basePath}?filter=${f.slug}`;
        const isActive = active === f.slug;
        return (
          <Link
            key={f.slug}
            href={href}
            className={`rounded-full px-3 py-1.5 text-xs font-medium ${
              isActive
                ? "bg-brand-600 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {f.label}
          </Link>
        );
      })}
    </div>
  );
}

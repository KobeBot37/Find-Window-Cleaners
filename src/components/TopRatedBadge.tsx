export function TopRatedBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-emerald-600 px-2.5 py-0.5 text-xs font-semibold text-white ${className}`}
      title="4.9+ stars with 100+ verified Google reviews"
    >
      <span aria-hidden>★</span> Top Rated
    </span>
  );
}

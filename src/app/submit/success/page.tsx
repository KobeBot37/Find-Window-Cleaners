import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Submission received" };

export default function SubmitSuccessPage() {
  return (
    <div className="mx-auto max-w-lg rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
      <h1 className="text-2xl font-bold text-green-900">Thanks — we got it!</h1>
      <p className="mt-2 text-green-900/80">
        Your listing was saved for review. Want priority placement? Upgrade to Featured.
      </p>
      <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
        <Link
          href="/featured"
          className="rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-amber-600"
        >
          Get Featured
        </Link>
        <Link
          href="/"
          className="rounded-xl border border-green-300 bg-white px-4 py-2.5 text-sm font-semibold text-green-900 hover:bg-green-100"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}

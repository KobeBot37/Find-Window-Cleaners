import type { Metadata } from "next";
import { SubmitForm } from "./SubmitForm";

export const metadata: Metadata = {
  title: "Submit a listing",
  description: "Add your Phoenix Valley window cleaning business to Find Window Cleaners.",
};

export default function SubmitPage() {
  return (
    <div className="mx-auto max-w-xl space-y-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Submit a listing</h1>
        <p className="mt-2 text-slate-600">
          Free basic listings for Phoenix Valley window cleaners. We review submissions before publishing.
        </p>
      </div>
      <SubmitForm />
    </div>
  );
}

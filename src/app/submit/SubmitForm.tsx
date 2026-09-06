"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { FILTERS } from "@/lib/types";

export function SubmitForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const services = FILTERS.map((f) => f.slug).filter((s) => fd.get(`svc_${s}`) === "on");

    const payload = {
      business_name: String(fd.get("business_name") || ""),
      phone: String(fd.get("phone") || ""),
      email: String(fd.get("email") || ""),
      website: String(fd.get("website") || ""),
      city: String(fd.get("city") || ""),
      address: String(fd.get("address") || ""),
      zip: String(fd.get("zip") || ""),
      categories_services: services,
      notes: String(fd.get("notes") || ""),
    };

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");
      router.push("/submit/success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setPending(false);
    }
  }

  const field =
    "w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none ring-brand-500 focus:ring-2";

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div>
        <label className="text-sm font-medium text-slate-700">Business name *</label>
        <input name="business_name" required className={`mt-1 ${field}`} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-slate-700">Phone *</label>
          <input name="phone" required type="tel" className={`mt-1 ${field}`} />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">Email</label>
          <input name="email" type="email" className={`mt-1 ${field}`} />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-slate-700">Website</label>
        <input name="website" type="url" placeholder="https://" className={`mt-1 ${field}`} />
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="sm:col-span-2">
          <label className="text-sm font-medium text-slate-700">City *</label>
          <input name="city" required className={`mt-1 ${field}`} placeholder="Phoenix" />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">ZIP</label>
          <input name="zip" className={`mt-1 ${field}`} />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-slate-700">Address</label>
        <input name="address" className={`mt-1 ${field}`} />
      </div>
      <fieldset>
        <legend className="text-sm font-medium text-slate-700">Services</legend>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {FILTERS.map((f) => (
            <label key={f.slug} className="flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" name={`svc_${f.slug}`} className="rounded border-slate-300" />
              {f.label}
            </label>
          ))}
        </div>
      </fieldset>
      <div>
        <label className="text-sm font-medium text-slate-700">Notes</label>
        <textarea name="notes" rows={3} className={`mt-1 ${field}`} />
      </div>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-brand-600 py-3 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
      >
        {pending ? "Submitting…" : "Submit listing"}
      </button>
    </form>
  );
}

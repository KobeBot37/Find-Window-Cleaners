import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

type Body = {
  business_name?: string;
  phone?: string;
  email?: string;
  website?: string;
  city?: string;
  address?: string;
  zip?: string;
  categories_services?: string[];
  notes?: string;
};

export async function POST(req: Request) {
  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const business_name = (body.business_name || "").trim();
  const phone = (body.phone || "").trim();
  const city = (body.city || "").trim();

  if (!business_name || !phone || !city) {
    return NextResponse.json(
      { error: "Business name, phone, and city are required." },
      { status: 400 }
    );
  }

  const record = {
    submitted_at: new Date().toISOString(),
    business_name,
    phone,
    email: (body.email || "").trim(),
    website: (body.website || "").trim(),
    city,
    address: (body.address || "").trim(),
    zip: (body.zip || "").trim(),
    categories_services: Array.isArray(body.categories_services)
      ? body.categories_services
      : [],
    notes: (body.notes || "").trim(),
  };

  const filePath = path.join(process.cwd(), "data", "submissions.jsonl");
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.appendFileSync(filePath, JSON.stringify(record) + "\n", "utf8");

  return NextResponse.json({ ok: true });
}

import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";

const EVENTS_KEY = "access_events_v1";

export async function POST(req: NextRequest) {
  // Admin-only: relies on existing client-side admin session flag.
  // This endpoint is intentionally simple; if a request can reach it, it can clear events.
  const adminHeader = req.headers.get("x-carecore-admin");
  if (adminHeader !== "true") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await kv.del(EVENTS_KEY);
  return NextResponse.json({ ok: true });
}

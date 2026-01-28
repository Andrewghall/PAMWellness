import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";

const EVENTS_KEY = "access_events_v1";
const VISITOR_COOKIE = "carecore_visitor_id";

export type AccessEventType = "platform_access" | "commercial_estimates_access";

export interface AccessEvent {
  id: string;
  ts: number;
  type: AccessEventType;
  path?: string;
  userAgent?: string;
  referrer?: string;
  country?: string;
  region?: string;
  city?: string;
  visitorId: string;
}

function getOrCreateVisitorId(req: NextRequest): { visitorId: string; setCookie: boolean } {
  const existing = req.cookies.get(VISITOR_COOKIE)?.value;
  if (existing) return { visitorId: existing, setCookie: false };
  const visitorId = `v_${crypto.randomUUID()}`;
  return { visitorId, setCookie: true };
}

function getGeoFromHeaders(req: NextRequest) {
  // Vercel headers (best-effort)
  const country =
    req.headers.get("x-vercel-ip-country") ||
    req.headers.get("x-vercel-ip-country-code") ||
    undefined;
  const region = req.headers.get("x-vercel-ip-country-region") || undefined;
  const city = req.headers.get("x-vercel-ip-city") || undefined;
  return { country, region, city };
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const limitParam = searchParams.get("limit");
  const limit = Math.min(Math.max(Number(limitParam || 200), 1), 2000);

  const events = (await kv.lrange(EVENTS_KEY, 0, limit - 1)) as AccessEvent[];
  return NextResponse.json({ events });
}

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as Partial<AccessEvent> & {
    type?: AccessEventType;
  };

  const { visitorId, setCookie } = getOrCreateVisitorId(req);
  const { country, region, city } = getGeoFromHeaders(req);

  const type = body.type;
  if (type !== "platform_access" && type !== "commercial_estimates_access") {
    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  }

  const ev: AccessEvent = {
    id: crypto.randomUUID(),
    ts: Date.now(),
    type,
    path: body.path,
    userAgent: req.headers.get("user-agent") || undefined,
    referrer: req.headers.get("referer") || undefined,
    country,
    region,
    city,
    visitorId,
  };

  // Prepend newest
  await kv.lpush(EVENTS_KEY, ev);
  // Keep list bounded
  await kv.ltrim(EVENTS_KEY, 0, 1999);

  const res = NextResponse.json({ ok: true });
  if (setCookie) {
    res.cookies.set({
      name: VISITOR_COOKIE,
      value: visitorId,
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
  }
  return res;
}

import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Booking = {
  date: string; // YYYY-MM-DD (California)
  time: string; // HH:mm (California)
  name?: string;
  business?: string;
  phone?: string;
  createdAt?: string;
};

const MORNING_SLOTS = ["09:00", "10:00", "11:00"];
const AFTERNOON_SLOTS = ["16:00", "17:00", "18:00", "19:00"];
const VALID_SLOTS = new Set([...MORNING_SLOTS, ...AFTERNOON_SLOTS]);
const MAX_PER_DAY = 2;
const CA_TZ = "America/Los_Angeles";

const KEY = "closeflow:bookings:v1";

/**
 * Storage strategy:
 *  - If Vercel KV is configured (KV_REST_API_URL + KV_REST_API_TOKEN env vars),
 *    persist bookings there. Free tier on Vercel covers this easily.
 *  - Otherwise use an in-memory fallback that lives for the lifetime of the
 *    serverless instance. Good enough to demo locally; in production install
 *    @vercel/kv and set the env vars to get cross-instance persistence.
 */

// In-memory fallback (single-process)
const memory: { bookings: Booking[] } = (globalThis as any).__cf_mem ?? {
  bookings: [],
};
(globalThis as any).__cf_mem = memory;

async function loadBookings(): Promise<Booking[]> {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (url && token) {
    try {
      const res = await fetch(`${url}/get/${encodeURIComponent(KEY)}`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });
      if (!res.ok) return memory.bookings;
      const data = (await res.json()) as { result: string | null };
      if (!data.result) return [];
      try {
        const parsed = JSON.parse(data.result);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    } catch {
      return memory.bookings;
    }
  }
  return memory.bookings;
}

async function saveBookings(bookings: Booking[]): Promise<void> {
  memory.bookings = bookings;
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (url && token) {
    try {
      await fetch(`${url}/set/${encodeURIComponent(KEY)}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(JSON.stringify(bookings)),
      });
    } catch {
      // ignore; memory already updated
    }
  }
}

function ymdInCA(d: Date): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: CA_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(d);
  const y = parts.find((p) => p.type === "year")!.value;
  const m = parts.find((p) => p.type === "month")!.value;
  const day = parts.find((p) => p.type === "day")!.value;
  return `${y}-${m}-${day}`;
}

function weekdayInCA(ymd: string): number {
  const [y, m, d] = ymd.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d, 19, 0, 0));
  const wk = new Intl.DateTimeFormat("en-US", {
    timeZone: CA_TZ,
    weekday: "short",
  }).format(dt);
  return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(wk);
}

function isValidYmd(s: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(s);
}

function sanitizeString(s: unknown, max = 200): string {
  if (typeof s !== "string") return "";
  return s.trim().slice(0, max);
}

export async function GET() {
  const all = await loadBookings();
  // Only return future-relevant bookings (today onward) and strip PII
  const today = ymdInCA(new Date());
  const visible = all
    .filter((b) => b.date >= today)
    .map((b) => ({ date: b.date, time: b.time }));
  return NextResponse.json({ bookings: visible });
}

export async function POST(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const date = sanitizeString(body?.date, 10);
  const time = sanitizeString(body?.time, 5);
  const name = sanitizeString(body?.name, 80);
  const business = sanitizeString(body?.business, 120);
  const phone = sanitizeString(body?.phone, 40);

  if (!isValidYmd(date)) {
    return NextResponse.json({ error: "Invalid date" }, { status: 400 });
  }
  if (!VALID_SLOTS.has(time)) {
    return NextResponse.json({ error: "Invalid time" }, { status: 400 });
  }
  if (name.length < 2 || business.length < 2 || phone.length < 7) {
    return NextResponse.json(
      { error: "Please fill in name, handle and phone" },
      { status: 400 }
    );
  }
  const today = ymdInCA(new Date());
  if (date < today) {
    return NextResponse.json(
      { error: "You can't book a past date" },
      { status: 400 }
    );
  }
  if (weekdayInCA(date) === 0) {
    return NextResponse.json(
      { error: "We don't take calls on Sundays" },
      { status: 400 }
    );
  }

  const all = await loadBookings();
  const sameDay = all.filter((b) => b.date === date);
  if (sameDay.length >= MAX_PER_DAY) {
    return NextResponse.json(
      { error: "That day is fully booked. Pick another." },
      { status: 409 }
    );
  }
  if (sameDay.some((b) => b.time === time)) {
    return NextResponse.json(
      { error: "That time is already taken. Pick another." },
      { status: 409 }
    );
  }

  const next: Booking[] = [
    ...all,
    {
      date,
      time,
      name,
      business,
      phone,
      createdAt: new Date().toISOString(),
    },
  ];
  await saveBookings(next);

  const visible = next
    .filter((b) => b.date >= today)
    .map((b) => ({ date: b.date, time: b.time }));
  return NextResponse.json({ ok: true, bookings: visible });
}

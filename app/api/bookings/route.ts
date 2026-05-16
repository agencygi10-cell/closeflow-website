import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Booking = {
  date: string;
  time: string;
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

const NOTIFY_FROM = "CloseFlow <notifications@closeflowsystem.com>";
const NOTIFY_TO = "bookings@closeflowsystem.com";
const CALENDAR_ATTENDEE = "agency.gi10@gmail.com";
const CALL_DURATION_MIN = 30;

// ──────────────────────────────────────────────────────────────────────
// Calendar reminders — edit these to change how early Google Calendar
// alerts you before each call. Add or remove entries freely.
// Each value is "how many minutes before the call". 60 = one hour.
// ──────────────────────────────────────────────────────────────────────
const REMINDER_MINUTES_BEFORE = [60, 15];

// In-memory fallback for local dev or if KV is temporarily unavailable.
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
        let parsed: unknown = JSON.parse(data.result);
        // Older writes accidentally double-encoded — unwrap if needed.
        if (typeof parsed === "string") parsed = JSON.parse(parsed);
        return Array.isArray(parsed) ? (parsed as Booking[]) : [];
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
        body: JSON.stringify(bookings),
      });
    } catch {
      // ignore; in-memory already updated
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

// Returns the current wall-clock HH:mm in California.
function nowHmInCA(): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: CA_TZ,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());
  const hRaw = parts.find((p) => p.type === "hour")!.value;
  const m = parts.find((p) => p.type === "minute")!.value;
  const h = hRaw === "24" ? "00" : hRaw;
  return `${h.padStart(2, "0")}:${m.padStart(2, "0")}`;
}

function isValidYmd(s: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(s);
}

function sanitizeString(s: unknown, max = 200): string {
  if (typeof s !== "string") return "";
  return s.trim().slice(0, max);
}

function formatHumanDate(ymd: string): string {
  const [y, m, d] = ymd.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d, 19, 0, 0));
  return new Intl.DateTimeFormat("en-US", {
    timeZone: CA_TZ,
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(dt);
}

function formatHumanTime(time24: string): string {
  const [h, m] = time24.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${m.toString().padStart(2, "0")} ${ampm}`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildEmailHtml(b: {
  date: string;
  time: string;
  name: string;
  business: string;
  phone: string;
}): string {
  const safeName = escapeHtml(b.name);
  const safeBusiness = escapeHtml(b.business);
  const safePhone = escapeHtml(b.phone);
  const dateStr = formatHumanDate(b.date);
  const timeStr = formatHumanTime(b.time);
  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#04000a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#f5f3ff;">
    <div style="max-width:560px;margin:0 auto;padding:32px 24px;">
      <div style="background:linear-gradient(135deg,#6b21a8 0%,#a855f7 50%,#ec4899 100%);border-radius:20px;padding:1px;">
        <div style="background:#0a0014;border-radius:19px;padding:32px 28px;">
          <div style="font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:#ec4899;font-weight:600;">
            New booking
          </div>
          <h1 style="margin:12px 0 0 0;font-size:28px;line-height:1.2;color:#fff;font-weight:700;">
            ${safeName}<br/>
            <span style="background:linear-gradient(135deg,#c4b5fd,#ec4899);-webkit-background-clip:text;background-clip:text;color:transparent;">${safeBusiness}</span>
          </h1>

          <div style="margin-top:28px;border-top:1px solid rgba(168,85,247,0.2);padding-top:24px;">
            <div style="margin-bottom:18px;">
              <div style="font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(196,181,253,0.6);">Date</div>
              <div style="margin-top:4px;font-size:18px;color:#fff;font-weight:600;">${dateStr}</div>
            </div>
            <div style="margin-bottom:18px;">
              <div style="font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(196,181,253,0.6);">Time (California, PST/PDT)</div>
              <div style="margin-top:4px;font-size:18px;color:#fff;font-weight:600;">${timeStr}</div>
            </div>
            <div>
              <div style="font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(196,181,253,0.6);">Phone</div>
              <div style="margin-top:4px;font-size:18px;font-weight:600;">
                <a href="tel:${safePhone}" style="color:#ec4899;text-decoration:none;">${safePhone}</a>
              </div>
            </div>
          </div>

          <div style="margin-top:28px;padding:14px 16px;background:rgba(168,85,247,0.08);border:1px solid rgba(168,85,247,0.2);border-radius:12px;font-size:13px;color:rgba(196,181,253,0.85);line-height:1.5;">
            Make the call at the scheduled time. The client expects you to reach out — don't wait for them.
          </div>
        </div>
      </div>
      <p style="text-align:center;margin-top:20px;font-size:11px;color:rgba(196,181,253,0.45);">
        Sent from closeflowsystem.com · ${new Date().toISOString()}
      </p>
    </div>
  </body>
</html>`;
}

function buildEmailText(b: {
  date: string;
  time: string;
  name: string;
  business: string;
  phone: string;
}): string {
  return [
    `New CloseFlow booking`,
    ``,
    `Date: ${formatHumanDate(b.date)}`,
    `Time: ${formatHumanTime(b.time)} (California, PST/PDT)`,
    ``,
    `Name: ${b.name}`,
    `Tattoo artist / handle: ${b.business}`,
    `Phone: ${b.phone}`,
    ``,
    `Make the call at the scheduled time. The client expects you to reach out.`,
    ``,
    `— Sent from closeflowsystem.com`,
  ].join("\n");
}

// Converts a YMD + HH:mm in California time to UTC YYYYMMDDTHHmmssZ for ICS.
function toIcsUtc(ymd: string, hm: string, addMinutes = 0): string {
  // Build a Date that represents "ymd hm" wall-clock time in California,
  // then express it as UTC.
  const [y, mo, d] = ymd.split("-").map(Number);
  const [h, mi] = hm.split(":").map(Number);
  // Approximate: assume the California offset for that date.
  // Use Intl to get the timezone offset for that wall-clock moment.
  const naiveUtc = Date.UTC(y, mo - 1, d, h, mi);
  // Find what California shows for this UTC time, compute the gap, and adjust.
  const localShown = new Intl.DateTimeFormat("en-US", {
    timeZone: CA_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date(naiveUtc));
  const shownY = parseInt(localShown.find((p) => p.type === "year")!.value);
  const shownMo = parseInt(localShown.find((p) => p.type === "month")!.value);
  const shownD = parseInt(localShown.find((p) => p.type === "day")!.value);
  let shownH = parseInt(localShown.find((p) => p.type === "hour")!.value);
  const shownMi = parseInt(localShown.find((p) => p.type === "minute")!.value);
  if (shownH === 24) shownH = 0;
  const shownAsUtc = Date.UTC(shownY, shownMo - 1, shownD, shownH, shownMi);
  const offsetMs = shownAsUtc - naiveUtc; // how far California is from UTC (negative)
  const trueUtc = naiveUtc - offsetMs + addMinutes * 60_000;
  const dt = new Date(trueUtc);
  const pad = (n: number) => n.toString().padStart(2, "0");
  return (
    `${dt.getUTCFullYear()}${pad(dt.getUTCMonth() + 1)}${pad(dt.getUTCDate())}` +
    `T${pad(dt.getUTCHours())}${pad(dt.getUTCMinutes())}${pad(dt.getUTCSeconds())}Z`
  );
}

function escapeIcs(s: string): string {
  return s
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

function buildIcs(b: {
  date: string;
  time: string;
  name: string;
  business: string;
  phone: string;
}): string {
  const uid = `${b.date}-${b.time.replace(":", "")}-${Date.now()}@closeflowsystem.com`;
  const dtStart = toIcsUtc(b.date, b.time, 0);
  const dtEnd = toIcsUtc(b.date, b.time, CALL_DURATION_MIN);
  const dtStamp = new Date()
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
  const summary = escapeIcs(`Call with ${b.name} (${b.business})`);
  const description = escapeIcs(
    [
      `Tattoo artist: ${b.business}`,
      `Phone: ${b.phone}`,
      ``,
      `Make the call at the scheduled time. The client expects you to reach out — don't wait for them.`,
    ].join("\n")
  );
  // ICS lines must be CRLF-terminated.
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//CloseFlow//Booking//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:REQUEST",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description}`,
    `ORGANIZER;CN=CloseFlow:mailto:notifications@closeflowsystem.com`,
    `ATTENDEE;CN=CloseFlow;ROLE=REQ-PARTICIPANT;PARTSTAT=ACCEPTED;RSVP=FALSE:mailto:${CALENDAR_ATTENDEE}`,
    "STATUS:CONFIRMED",
    "TRANSP:OPAQUE",
    "SEQUENCE:0",
    ...REMINDER_MINUTES_BEFORE.flatMap((m) => [
      "BEGIN:VALARM",
      `TRIGGER:-PT${m}M`,
      "ACTION:DISPLAY",
      `DESCRIPTION:Call in ${m} minutes`,
      "END:VALARM",
    ]),
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

async function sendTelegramAlert(b: {
  date: string;
  time: string;
  name: string;
  business: string;
  phone: string;
}): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;
  const message = [
    "🔔 *New CloseFlow booking*",
    "",
    `👤 *${b.name}* — ${b.business}`,
    "",
    `📅 ${formatHumanDate(b.date)}`,
    `🕐 ${formatHumanTime(b.time)} PST`,
    `📞 \`${b.phone}\``,
    "",
    "_Make the call at the scheduled time. The client expects you to reach out._",
  ].join("\n");
  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "Markdown",
        disable_web_page_preview: true,
      }),
    });
  } catch {
    // never let telegram failure break the booking
  }
}

async function sendBookingEmail(b: {
  date: string;
  time: string;
  name: string;
  business: string;
  phone: string;
}): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return; // local dev fallback: silently skip
  try {
    const ics = buildIcs(b);
    const icsBase64 = Buffer.from(ics, "utf-8").toString("base64");
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: NOTIFY_FROM,
        to: [NOTIFY_TO],
        subject: `New booking — ${b.name} · ${formatHumanDate(b.date)} ${formatHumanTime(b.time)} PST`,
        html: buildEmailHtml(b),
        text: buildEmailText(b),
        reply_to: NOTIFY_TO,
        attachments: [
          {
            filename: "booking.ics",
            content: icsBase64,
            content_type: "text/calendar; method=REQUEST; charset=UTF-8",
          },
        ],
      }),
    });
  } catch {
    // never let email failure break the booking flow
  }
}

export async function GET() {
  const all = await loadBookings();
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
  if (date === today && time <= nowHmInCA()) {
    return NextResponse.json(
      { error: "That time has already passed today. Pick a later time or another day." },
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

  // Await notifications so Vercel doesn't kill the function before the
  // requests actually go out. allSettled lets one fail without affecting the other.
  await Promise.allSettled([
    sendBookingEmail({ date, time, name, business, phone }),
    sendTelegramAlert({ date, time, name, business, phone }),
  ]);

  const visible = next
    .filter((b) => b.date >= today)
    .map((b) => ({ date: b.date, time: b.time }));
  return NextResponse.json({ ok: true, bookings: visible });
}

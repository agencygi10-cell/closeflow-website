"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Loader2,
  Phone,
  Send,
  Sun,
  Sunset,
  User,
  Briefcase,
  Sparkles,
} from "lucide-react";

const MORNING_SLOTS = ["09:00", "10:00", "11:00"];
const AFTERNOON_SLOTS = ["16:00", "17:00", "18:00", "19:00"];
const ALL_SLOTS = [...MORNING_SLOTS, ...AFTERNOON_SLOTS];
const MAX_PER_DAY = 2;
const CA_TZ = "America/Los_Angeles";
const AVAILABLE_DAYS_PER_WEEK = 3;

type Booking = { date: string; time: string };

function ymdInCalifornia(d: Date): string {
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

function weekdayInCalifornia(d: Date): number {
  const wk = new Intl.DateTimeFormat("en-US", {
    timeZone: CA_TZ,
    weekday: "short",
  }).format(d);
  return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(wk);
}

// Stable per-week seed: returns same number for every date in the same Mon-Sun week
function weekSeed(ymd: string): number {
  const [y, m, d] = ymd.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  const dow = (dt.getUTCDay() + 6) % 7; // 0=Mon..6=Sun
  dt.setUTCDate(dt.getUTCDate() - dow); // back to Monday of that week
  const yearStart = new Date(Date.UTC(dt.getUTCFullYear(), 0, 1));
  const weekIndex = Math.floor(
    (dt.getTime() - yearStart.getTime()) / (7 * 86400000)
  );
  return dt.getUTCFullYear() * 100 + weekIndex;
}

// Deterministic shuffle to pick AVAILABLE_DAYS_PER_WEEK weekdays from Mon-Sat
function availableWeekdaysForWeek(seed: number): Set<number> {
  const days = [1, 2, 3, 4, 5, 6]; // 1=Mon..6=Sat (JS getUTCDay convention; Sun=0 excluded)
  let s = (seed * 9301 + 49297) % 233280;
  const rng = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  for (let i = days.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [days[i], days[j]] = [days[j], days[i]];
  }
  return new Set(days.slice(0, AVAILABLE_DAYS_PER_WEEK));
}

function formatHumanDate(ymd: string): string {
  const [y, m, d] = ymd.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d, 19, 0, 0));
  return new Intl.DateTimeFormat("en-US", {
    timeZone: CA_TZ,
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(dt);
}

function formatHumanTime(time24: string): string {
  const [h, m] = time24.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${m.toString().padStart(2, "0")} ${ampm}`;
}

export default function LeadForm() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [monthOffset, setMonthOffset] = useState(0);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch("/api/bookings", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (active) setBookings(Array.isArray(data.bookings) ? data.bookings : []);
        }
      } catch {
        /* offline-safe */
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const today = useMemo(() => ymdInCalifornia(new Date()), []);

  // Only allow scrolling to next month when 7 or fewer days remain in the current month.
  const maxMonthOffset = useMemo(() => {
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: CA_TZ,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).formatToParts(new Date());
    const y = parseInt(parts.find((p) => p.type === "year")!.value);
    const m = parseInt(parts.find((p) => p.type === "month")!.value);
    const d = parseInt(parts.find((p) => p.type === "day")!.value);
    const lastDay = new Date(Date.UTC(y, m, 0)).getUTCDate();
    const daysRemaining = lastDay - d;
    return daysRemaining <= 7 ? 1 : 0;
  }, []);

  const visibleMonth = useMemo(() => {
    const now = new Date();
    const ca = new Intl.DateTimeFormat("en-CA", {
      timeZone: CA_TZ,
      year: "numeric",
      month: "2-digit",
    }).formatToParts(now);
    const y = parseInt(ca.find((p) => p.type === "year")!.value);
    const m = parseInt(ca.find((p) => p.type === "month")!.value);
    const target = new Date(Date.UTC(y, m - 1 + monthOffset, 1));
    return {
      year: target.getUTCFullYear(),
      month: target.getUTCMonth(),
    };
  }, [monthOffset]);

  const monthLabel = useMemo(() => {
    const d = new Date(Date.UTC(visibleMonth.year, visibleMonth.month, 15));
    return new Intl.DateTimeFormat("en-US", {
      timeZone: "UTC",
      month: "long",
      year: "numeric",
    }).format(d);
  }, [visibleMonth]);

  const days = useMemo(() => {
    const firstOfMonth = new Date(Date.UTC(visibleMonth.year, visibleMonth.month, 1));
    const lastOfMonth = new Date(Date.UTC(visibleMonth.year, visibleMonth.month + 1, 0));
    const totalDays = lastOfMonth.getUTCDate();
    const firstWeekday = firstOfMonth.getUTCDay();
    const offset = (firstWeekday + 6) % 7; // shift so Mon=0
    const cells: ({ ymd: string; day: number } | null)[] = [];
    for (let i = 0; i < offset; i++) cells.push(null);
    for (let d = 1; d <= totalDays; d++) {
      const ymd = `${visibleMonth.year}-${String(visibleMonth.month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      cells.push({ ymd, day: d });
    }
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }, [visibleMonth]);

  const bookingsByDate = useMemo(() => {
    const map = new Map<string, string[]>();
    for (const b of bookings) {
      const arr = map.get(b.date) ?? [];
      arr.push(b.time);
      map.set(b.date, arr);
    }
    return map;
  }, [bookings]);

  const isDateDisabled = (ymd: string): { disabled: boolean; reason?: string } => {
    if (ymd < today) return { disabled: true, reason: "past" };
    const [y, m, d] = ymd.split("-").map(Number);
    const dt = new Date(Date.UTC(y, m - 1, d, 19, 0, 0));
    const wk = weekdayInCalifornia(dt);
    if (wk === 0) return { disabled: true, reason: "unavailable" };
    const allowed = availableWeekdaysForWeek(weekSeed(ymd));
    if (!allowed.has(wk)) return { disabled: true, reason: "unavailable" };
    const taken = bookingsByDate.get(ymd) ?? [];
    if (taken.length >= MAX_PER_DAY) return { disabled: true, reason: "full" };
    return { disabled: false };
  };

  const availableSlotsForSelected = useMemo(() => {
    if (!selectedDate) return [] as string[];
    const taken = new Set(bookingsByDate.get(selectedDate) ?? []);
    return ALL_SLOTS.filter((s) => !taken.has(s));
  }, [selectedDate, bookingsByDate]);

  const canSubmit =
    selectedDate &&
    selectedTime &&
    name.trim().length > 1 &&
    business.trim().length > 1 &&
    phone.trim().length >= 7;

  const onConfirm = async () => {
    setTouched(true);
    if (!canSubmit || !selectedDate || !selectedTime) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: selectedDate,
          time: selectedTime,
          name: name.trim(),
          business: business.trim(),
          phone: phone.trim(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.error || "We couldn't confirm your call. Please try again.");
        setSubmitting(false);
        return;
      }
      setBookings(Array.isArray(data.bookings) ? data.bookings : bookings);
      setSubmitted(true);
    } catch {
      setError("Connection problem. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const resetAndBookAnother = () => {
    setSubmitted(false);
    setSelectedDate(null);
    setSelectedTime(null);
    setName("");
    setBusiness("");
    setPhone("");
    setTouched(false);
  };

  return (
    <section
      id="contact"
      className="relative py-16 sm:py-24 border-t border-brand-purple/10"
    >
      <div
        aria-hidden
        className="blob"
        style={{
          width: 520,
          height: 520,
          top: -140,
          left: -140,
          background:
            "radial-gradient(circle, rgba(168,85,247,0.45) 0%, transparent 65%)",
          opacity: 0.55,
        }}
      />
      <div
        aria-hidden
        className="blob"
        style={{
          width: 420,
          height: 420,
          bottom: -120,
          right: -100,
          background:
            "radial-gradient(circle, rgba(236,72,153,0.4) 0%, transparent 65%)",
          opacity: 0.5,
        }}
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-brand-pink">
            <Sparkles size={12} /> Book your call
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-5xl md:text-6xl font-bold leading-tight">
            Ready to <span className="text-gradient">scale</span> your career?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-brand-lilac/80">
            Pick a day and a time — we&apos;ll call you on California time
            (PST). Spots are <span className="text-white font-semibold">limited</span> and we only take a few per week.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="card-premium mx-auto mt-12 p-5 sm:p-8 md:p-10"
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="confirmed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center text-center py-8 sm:py-12"
              >
                <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-glow">
                  <CheckCircle2 size={42} />
                </div>
                <h3 className="mt-6 font-display text-2xl sm:text-3xl font-bold text-white">
                  Booking confirmed!
                </h3>
                <p className="mt-3 max-w-md text-sm sm:text-base text-brand-lilac/80">
                  We&apos;ll call you on{" "}
                  <span className="text-white font-semibold">
                    {selectedDate ? formatHumanDate(selectedDate) : ""}
                  </span>{" "}
                  at{" "}
                  <span className="text-white font-semibold">
                    {selectedTime ? formatHumanTime(selectedTime) : ""}
                  </span>{" "}
                  (California time). Keep your phone close.
                </p>
                <button
                  onClick={resetAndBookAnother}
                  className="btn-ghost mt-8 rounded-full px-6 py-3 text-sm font-semibold text-brand-lilac"
                >
                  Book another call
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8">
                  {/* Calendar */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-brand-lilac/80">
                        <CalendarDays size={16} className="text-brand-pink" />
                        <span className="text-xs uppercase tracking-[0.2em]">
                          Pick a day
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setMonthOffset((v) => Math.max(0, v - 1))}
                          disabled={monthOffset === 0}
                          className="h-8 w-8 inline-flex items-center justify-center rounded-full border border-brand-purple/25 text-brand-lilac hover:bg-brand-purple/10 disabled:opacity-30 disabled:hover:bg-transparent transition"
                          aria-label="Previous month"
                        >
                          <ChevronLeft size={16} />
                        </button>
                        <span className="px-3 text-sm font-medium text-white min-w-[130px] text-center">
                          {monthLabel}
                        </span>
                        <button
                          onClick={() =>
                            setMonthOffset((v) => Math.min(maxMonthOffset, v + 1))
                          }
                          disabled={monthOffset >= maxMonthOffset}
                          className="h-8 w-8 inline-flex items-center justify-center rounded-full border border-brand-purple/25 text-brand-lilac hover:bg-brand-purple/10 disabled:opacity-30 disabled:hover:bg-transparent transition"
                          aria-label="Next month"
                        >
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
                      {["M", "T", "W", "T", "F", "S", "S"].map((w, i) => (
                        <div
                          key={i}
                          className={`text-center text-[10px] sm:text-xs font-medium uppercase tracking-wider ${
                            i === 6 ? "text-brand-lilac/30" : "text-brand-lilac/55"
                          }`}
                        >
                          {w}
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-7 gap-1 sm:gap-2">
                      {loading
                        ? Array.from({ length: 35 }).map((_, i) => (
                            <div
                              key={i}
                              className="aspect-square rounded-lg bg-brand-purple/5 animate-pulse"
                            />
                          ))
                        : days.map((cell, i) => {
                            if (!cell)
                              return <div key={i} className="aspect-square" />;
                            const state = isDateDisabled(cell.ymd);
                            const isSelected = selectedDate === cell.ymd;
                            const taken = bookingsByDate.get(cell.ymd)?.length ?? 0;
                            const isToday = cell.ymd === today;
                            return (
                              <button
                                key={cell.ymd}
                                onClick={() => {
                                  if (state.disabled) return;
                                  setSelectedDate(cell.ymd);
                                  setSelectedTime(null);
                                }}
                                disabled={state.disabled}
                                className={[
                                  "aspect-square rounded-lg sm:rounded-xl border text-sm sm:text-base font-medium transition-all relative",
                                  isSelected
                                    ? "border-transparent bg-gradient-to-br from-brand-purple to-brand-pink text-white shadow-glow scale-[1.02]"
                                    : state.disabled
                                    ? state.reason === "full"
                                      ? "border-red-500/20 bg-red-500/5 text-red-300/40 cursor-not-allowed"
                                      : "border-transparent bg-transparent text-brand-lilac/20 cursor-not-allowed"
                                    : "border-brand-purple/20 bg-brand-purple/5 text-brand-lilac hover:border-brand-pink/60 hover:bg-brand-purple/15 hover:text-white",
                                  isToday && !isSelected
                                    ? "ring-1 ring-brand-pink/40"
                                    : "",
                                ].join(" ")}
                                aria-label={`${cell.day} ${monthLabel}${
                                  state.disabled ? " (not available)" : ""
                                }`}
                              >
                                <span>{cell.day}</span>
                                {!state.disabled && taken === 1 && !isSelected && (
                                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-yellow-400/80" />
                                )}
                                {state.disabled && state.reason === "full" && (
                                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 text-[8px] font-bold uppercase tracking-wider text-red-300/70">
                                    full
                                  </span>
                                )}
                              </button>
                            );
                          })}
                    </div>

                    <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-brand-lilac/55">
                      <span className="inline-flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-gradient-to-br from-brand-purple to-brand-pink" />
                        Selected
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-yellow-400/80" />
                        1 slot taken
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-red-400/70" />
                        Day full
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-brand-lilac/45">
                        Limited availability
                      </span>
                    </div>
                  </div>

                  {/* Time + form column */}
                  <div className="flex flex-col gap-6">
                    {/* Slots */}
                    <div>
                      <div className="flex items-center gap-2 text-brand-lilac/80 mb-4">
                        <Clock size={16} className="text-brand-pink" />
                        <span className="text-xs uppercase tracking-[0.2em]">
                          Pick a time{" "}
                          <span className="text-brand-lilac/50 normal-case tracking-normal">
                            (California, PST)
                          </span>
                        </span>
                      </div>

                      {!selectedDate ? (
                        <div className="rounded-xl border border-dashed border-brand-purple/25 bg-brand-purple/5 px-4 py-6 text-center text-sm text-brand-lilac/60">
                          Pick a day first
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div>
                            <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-brand-lilac/55 mb-2">
                              <Sun size={12} /> Morning
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                              {MORNING_SLOTS.map((s) => {
                                const taken = !availableSlotsForSelected.includes(s);
                                const isSel = selectedTime === s;
                                return (
                                  <button
                                    key={s}
                                    disabled={taken}
                                    onClick={() => setSelectedTime(s)}
                                    className={[
                                      "rounded-xl border px-2 py-2.5 text-sm font-medium transition-all",
                                      isSel
                                        ? "border-transparent bg-gradient-to-br from-brand-purple to-brand-pink text-white shadow-glow"
                                        : taken
                                        ? "border-brand-purple/10 bg-brand-purple/5 text-brand-lilac/25 cursor-not-allowed line-through"
                                        : "border-brand-purple/25 bg-brand-purple/5 text-brand-lilac hover:border-brand-pink/60 hover:text-white",
                                    ].join(" ")}
                                  >
                                    {formatHumanTime(s)}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-brand-lilac/55 mb-2">
                              <Sunset size={12} /> Afternoon
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                              {AFTERNOON_SLOTS.map((s) => {
                                const taken = !availableSlotsForSelected.includes(s);
                                const isSel = selectedTime === s;
                                return (
                                  <button
                                    key={s}
                                    disabled={taken}
                                    onClick={() => setSelectedTime(s)}
                                    className={[
                                      "rounded-xl border px-2 py-2.5 text-sm font-medium transition-all",
                                      isSel
                                        ? "border-transparent bg-gradient-to-br from-brand-purple to-brand-pink text-white shadow-glow"
                                        : taken
                                        ? "border-brand-purple/10 bg-brand-purple/5 text-brand-lilac/25 cursor-not-allowed line-through"
                                        : "border-brand-purple/25 bg-brand-purple/5 text-brand-lilac hover:border-brand-pink/60 hover:text-white",
                                    ].join(" ")}
                                  >
                                    {formatHumanTime(s)}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Contact details */}
                    <div className="space-y-3">
                      <FieldInput
                        label="Name"
                        icon={<User size={14} />}
                        placeholder="Your name"
                        value={name}
                        onChange={setName}
                        error={touched && name.trim().length < 2 ? "Required" : null}
                      />
                      <FieldInput
                        label="Tattoo artist name or handle"
                        icon={<Briefcase size={14} />}
                        placeholder="Ex: @yourtattoohandle"
                        value={business}
                        onChange={setBusiness}
                        error={touched && business.trim().length < 2 ? "Required" : null}
                      />
                      <FieldInput
                        label="Phone"
                        icon={<Phone size={14} />}
                        placeholder="+1 (555) 000-0000"
                        value={phone}
                        onChange={setPhone}
                        type="tel"
                        error={touched && phone.trim().length < 7 ? "Required" : null}
                      />
                    </div>

                    {/* Summary + CTA */}
                    <div className="mt-1">
                      {(selectedDate || selectedTime) && (
                        <div className="mb-3 rounded-xl border border-brand-purple/25 bg-brand-purple/8 px-4 py-3 text-xs sm:text-sm text-brand-lilac/85">
                          {selectedDate && (
                            <div>
                              <span className="text-brand-lilac/60">Day: </span>
                              <span className="text-white font-medium">
                                {formatHumanDate(selectedDate)}
                              </span>
                            </div>
                          )}
                          {selectedTime && (
                            <div>
                              <span className="text-brand-lilac/60">Time: </span>
                              <span className="text-white font-medium">
                                {formatHumanTime(selectedTime)} PST
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                      {error && (
                        <div className="mb-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                          {error}
                        </div>
                      )}
                      <button
                        onClick={onConfirm}
                        disabled={!canSubmit || submitting}
                        className="btn-primary w-full inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
                      >
                        {submitting ? (
                          <>
                            <Loader2 size={16} className="animate-spin" /> Confirming...
                          </>
                        ) : (
                          <>
                            Confirm my call <Send size={16} />
                          </>
                        )}
                      </button>
                      <p className="mt-3 text-center text-[11px] text-brand-lilac/50">
                        We call you · California time (PST/PDT)
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function FieldInput({
  label,
  placeholder,
  value,
  onChange,
  icon,
  type = "text",
  error,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  icon?: React.ReactNode;
  type?: string;
  error?: string | null;
}) {
  return (
    <label className="block">
      <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-brand-lilac/65 mb-1.5">
        {icon}
        {label}
      </div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={type}
        placeholder={placeholder}
        className={`w-full rounded-xl border bg-brand-deep/60 px-4 py-3 text-sm text-white placeholder:text-brand-lilac/35 outline-none transition-all focus:ring-2 focus:ring-brand-pink/30 ${
          error
            ? "border-red-500/50 focus:border-red-400"
            : "border-brand-purple/25 focus:border-brand-pink"
        }`}
      />
      {error && <p className="mt-1 text-xs text-red-300/90">{error}</p>}
    </label>
  );
}

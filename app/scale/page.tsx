"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  X,
  Sparkles,
  Star,
  TrendingUp,
  Calendar,
  MessageSquare,
  Megaphone,
  BarChart3,
  Shield,
  Quote,
} from "lucide-react";
import Logo from "@/components/Logo";

const BOOK_HREF = "/#contact";

export default function ScalePage() {
  return (
    <main className="relative overflow-hidden">
      <Hero />
      <ClientsStrip />
      <PainPoints />
      <Solution />
      <RoasCallout />
      <HowItWorks />
      <Testimonials />
      <Guarantee />
      <FAQ />
      <FinalCta />
      <Footer />
    </main>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  return (
    <section className="relative pt-16 pb-20 sm:pt-20 sm:pb-28 overflow-hidden">
      <div
        aria-hidden
        className="blob animate-float-slow"
        style={{
          width: 620,
          height: 620,
          top: -180,
          left: -160,
          background:
            "radial-gradient(circle, rgba(139,92,246,0.55) 0%, transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="blob animate-pulse-slow"
        style={{
          width: 520,
          height: 520,
          bottom: -180,
          right: -120,
          background:
            "radial-gradient(circle, rgba(236,72,153,0.45) 0%, transparent 65%)",
        }}
      />
      <div aria-hidden className="absolute inset-0 grid-bg" />
      <div aria-hidden className="absolute inset-0 starfield" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <Logo size={56} showText={false} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-purple/30 bg-brand-purple/10 px-4 py-1.5 text-xs sm:text-sm text-brand-lilac backdrop-blur-md"
        >
          <Sparkles size={12} className="text-brand-pink" />
          <span className="shimmer-text font-medium">
            Done-for-you growth system for tattoo artists
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-4xl sm:text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight"
        >
          <span className="text-white">Add</span>{" "}
          <span className="text-gradient">$8K–$30K/month</span>
          <br className="hidden sm:block" />{" "}
          <span className="text-white">to your tattoo income.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-base sm:text-lg md:text-xl text-brand-lilac/85 leading-relaxed"
        >
          We run your Meta ads, direct your content, and fill your calendar —
          while you tattoo. Average ROAS of{" "}
          <span className="text-white font-semibold">15x to 32x</span>, in under
          90 days.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-col items-center gap-3"
        >
          <a
            href={BOOK_HREF}
            className="btn-primary group inline-flex items-center gap-2 rounded-full px-9 py-4 text-base sm:text-lg font-semibold text-white"
          >
            Book your free strategy call
            <ArrowRight
              size={20}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
          <p className="text-xs text-brand-lilac/55">
            45-min call · California time · Zero commitment
          </p>
        </motion.div>

        {/* Proof strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-16 grid grid-cols-3 gap-4 sm:gap-10 text-center"
        >
          {[
            { v: "15x–32x", l: "Average ROAS" },
            { v: "+20", l: "Tattoo artists scaled" },
            { v: "<90 days", l: "Time to results" },
          ].map((s) => (
            <div key={s.l}>
              <div className="font-display text-2xl sm:text-4xl font-bold text-gradient leading-none">
                {s.v}
              </div>
              <div className="mt-2 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-brand-lilac/60">
                {s.l}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Tiny social rating */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-10 inline-flex items-center gap-2 text-xs sm:text-sm text-brand-lilac/65"
        >
          <span className="flex gap-0.5 text-yellow-400">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} size={13} fill="currentColor" />
            ))}
          </span>
          Loved by tattoo artists across the US, MX and Latin America
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- CLIENTS STRIP ---------- */
function ClientsStrip() {
  const names = [
    "Luis Amaya",
    "Atta",
    "Felipe Diaz",
    "Memoo Tavera",
    "Julian Morales",
    "Dalton Jaramillo",
    "Alwin8",
    "Kata Reyes",
    "Yurani Vargas",
    "Dani Rincón",
    "Luisa Maya",
    "Sebas Ink",
  ];
  const row = [...names, ...names];
  return (
    <section className="relative border-t border-b border-brand-purple/15 bg-black/40 py-10 overflow-hidden">
      <div className="text-center mb-6">
        <span className="text-xs uppercase tracking-[0.3em] text-brand-lilac/60">
          Trusted by top tattoo artists
        </span>
      </div>
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-24 bg-gradient-to-r from-black to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-24 bg-gradient-to-l from-black to-transparent"
        />
        <div className="flex animate-scroll-x gap-3 sm:gap-4 px-4">
          {row.map((c, i) => (
            <div
              key={i}
              className="shrink-0 rounded-2xl border border-brand-purple/20 bg-brand-deep/50 px-5 py-4 sm:px-7 sm:py-5"
            >
              <span className="font-display text-sm sm:text-base font-semibold whitespace-nowrap text-white/90 tracking-tight">
                {c}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- PAIN POINTS ---------- */
function PainPoints() {
  const without = [
    "DMs piling up, no clients actually booking",
    "Posts that nobody saves, shares or comments",
    "Hours wasted on marketing instead of tattooing",
    "Ad campaigns that drain your money with zero ROI",
    "Inconsistent months — full one week, empty the next",
    "No idea what your real ROAS or cost per booking is",
  ];
  const withUs = [
    "Calendar full 4–8 weeks out, every month",
    "Content that brings the right clients to your studio",
    "You focus on tattooing, we handle the marketing",
    "Ads that return $15–$32 for every $1 spent",
    "Predictable, consistent bookings month over month",
    "Clear weekly dashboard: ROAS, leads, cost per booking",
  ];
  return (
    <section className="relative py-16 sm:py-24 border-t border-brand-purple/10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-brand-pink">
            Sound familiar?
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-5xl font-bold leading-tight">
            Your art is incredible.{" "}
            <span className="text-gradient">Your marketing isn&apos;t.</span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-brand-lilac/75">
            That&apos;s the gap we close. Here&apos;s what changes when you stop
            doing it alone.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Without us */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55 }}
            className="rounded-2xl border border-red-500/15 bg-red-500/5 p-6 sm:p-8"
          >
            <div className="flex items-center gap-2 text-red-300/80 mb-5">
              <X size={18} />
              <span className="text-xs uppercase tracking-[0.2em] font-semibold">
                Without a system
              </span>
            </div>
            <ul className="space-y-3">
              {without.map((p) => (
                <li
                  key={p}
                  className="flex items-start gap-3 text-sm sm:text-base text-brand-lilac/70"
                >
                  <X
                    size={18}
                    className="text-red-400/70 shrink-0 mt-0.5"
                    strokeWidth={3}
                  />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* With us */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="card-premium p-6 sm:p-8"
          >
            <div className="flex items-center gap-2 text-emerald-300/90 mb-5">
              <CheckCircle2 size={18} />
              <span className="text-xs uppercase tracking-[0.2em] font-semibold">
                With CloseFlow
              </span>
            </div>
            <ul className="space-y-3">
              {withUs.map((p) => (
                <li
                  key={p}
                  className="flex items-start gap-3 text-sm sm:text-base text-white"
                >
                  <CheckCircle2
                    size={18}
                    className="text-emerald-400 shrink-0 mt-0.5"
                  />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------- SOLUTION / WHAT WE BUILD ---------- */
function Solution() {
  const features = [
    {
      icon: Megaphone,
      title: "Meta Ads built for tattoo artists",
      text: "Facebook & Instagram campaigns engineered around your style, ticket price and city. ROAS dialed in weekly.",
    },
    {
      icon: Calendar,
      title: "Calendar that fills itself",
      text: "Bookings come in 24/7 with smart limits, time zones and reminders. Less back-and-forth, more tattooing.",
    },
    {
      icon: MessageSquare,
      title: "Content direction every week",
      text: "We tell you what to film, how to shoot it and when to post — based on what's converting right now.",
    },
    {
      icon: BarChart3,
      title: "Numbers you actually understand",
      text: "One dashboard: ROAS, cost per booking, conversion rate. No more guessing what's working.",
    },
  ];
  return (
    <section className="relative py-16 sm:py-24 border-t border-brand-purple/10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-brand-pink">
            What we build for you
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-5xl font-bold leading-tight">
            A complete{" "}
            <span className="text-gradient">growth machine</span>, installed in
            14 days.
          </h2>
          <p className="mt-5 text-base sm:text-lg text-brand-lilac/75">
            Not just ads. Not just content. The full system — built specifically
            for tattoo artists who want to scale without burning out.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="card-glass rounded-2xl p-6 sm:p-7"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-purple to-brand-pink text-white shadow-glow">
                <f.icon size={22} />
              </div>
              <h3 className="mt-5 font-display text-xl sm:text-2xl font-semibold text-white">
                {f.title}
              </h3>
              <p className="mt-2 text-sm sm:text-base text-brand-lilac/75 leading-relaxed">
                {f.text}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href={BOOK_HREF}
            className="btn-primary group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white"
          >
            See if we&apos;re a fit for your studio
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- ROAS BIG CALLOUT ---------- */
function RoasCallout() {
  return (
    <section className="relative py-16 sm:py-24 border-t border-brand-purple/10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-brand-purple/25 bg-gradient-to-br from-brand-purple/20 via-brand-pink/8 to-transparent p-8 sm:p-14"
        >
          <div
            aria-hidden
            className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-gradient-to-br from-brand-purple to-brand-pink opacity-25 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-gradient-to-tr from-brand-pink to-brand-violet opacity-20 blur-3xl"
          />
          <div className="relative flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-5">
              <div className="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-purple to-brand-pink text-white shadow-glow">
                <TrendingUp size={28} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-brand-lilac/70">
                  Average ROAS for our tattoo artists
                </p>
                <p className="mt-2 font-display text-5xl sm:text-7xl font-bold text-gradient leading-none">
                  15x – 32x
                </p>
              </div>
            </div>
            <p className="max-w-md text-sm sm:text-base text-brand-lilac/80 leading-relaxed">
              For every <span className="text-white font-semibold">$1</span> a
              tattoo artist invests with us in ads, they make back between{" "}
              <span className="text-white font-semibold">$15 and $32</span> in
              sales. No hype, no promises — it&apos;s what we do every week.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- HOW IT WORKS ---------- */
function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "Free strategy call",
      text: "We review your studio, your numbers and your style. If we're a fit, you walk away with a custom plan — free, no commitment.",
    },
    {
      n: "02",
      title: "Setup in 7–14 days",
      text: "We build your CRM, automations, booking calendar and ad campaigns. Ready to run. You barely lift a finger.",
    },
    {
      n: "03",
      title: "Scale every week",
      text: "We optimize ads, direct your content and grow your ROAS month over month. You tattoo, we handle the rest.",
    },
  ];
  return (
    <section className="relative py-16 sm:py-24 border-t border-brand-purple/10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-brand-pink">
            How it works
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-5xl font-bold leading-tight">
            From <span className="text-gradient">stuck to scaled</span>, in
            three steps.
          </h2>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="card-glass rounded-2xl p-6 sm:p-7"
            >
              <span className="font-display text-4xl font-bold text-gradient leading-none">
                {s.n}
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold text-white">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-brand-lilac/75 leading-relaxed">
                {s.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- TESTIMONIALS ---------- */
function Testimonials() {
  const items = [
    {
      name: "Luis Amaya",
      role: "Tattoo artist",
      text: "I used to lose clients by not replying in time. Now my calendar fills itself and I just focus on tattooing.",
    },
    {
      name: "Julian Morales",
      role: "Tattoo artist",
      text: "I started running ads with no idea what I was doing. With CloseFlow every dollar I spend comes back up to 30x.",
    },
    {
      name: "Atta",
      role: "Tattoo artist",
      text: "Went from total inconsistency to a calendar fully booked two months out. The system changes the game.",
    },
  ];
  return (
    <section className="relative py-16 sm:py-24 border-t border-brand-purple/10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-brand-pink">
            What they say
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-5xl font-bold leading-tight">
            Real results.{" "}
            <span className="text-gradient">Real tattoo artists.</span>
          </h2>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5">
          {items.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="card-glass rounded-2xl p-6"
            >
              <Quote className="text-brand-pink" size={22} />
              <blockquote className="mt-4 text-sm sm:text-base text-brand-lilac/85 leading-relaxed">
                &ldquo;{t.text}&rdquo;
              </blockquote>
              <figcaption className="mt-5 border-t border-brand-purple/20 pt-4">
                <div className="font-display text-sm font-semibold text-white">
                  {t.name}
                </div>
                <div className="text-xs text-brand-lilac/60 mt-0.5">
                  {t.role}
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- GUARANTEE ---------- */
function Guarantee() {
  return (
    <section className="relative py-16 sm:py-24 border-t border-brand-purple/10">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="card-premium p-8 sm:p-12 text-center"
        >
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-purple to-brand-pink text-white shadow-glow mx-auto">
            <Shield size={28} />
          </div>
          <h2 className="mt-6 font-display text-2xl sm:text-4xl font-bold leading-tight">
            Our <span className="text-gradient">90-day guarantee</span>.
          </h2>
          <p className="mt-5 max-w-2xl mx-auto text-sm sm:text-base text-brand-lilac/85 leading-relaxed">
            If after 90 days you haven&apos;t hit a positive ROAS, we keep
            working for free until you do. We only win when you win — period.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
function FAQ() {
  const items = [
    {
      q: "How much does this cost?",
      a: "Depends on your studio size and goals. We share clear pricing on the free strategy call — no fine print, no hidden fees.",
    },
    {
      q: "How long until I see results?",
      a: "System is set up in 7–14 days. First paid bookings start coming in within weeks. By day 90 we hit our standard ROAS for your niche.",
    },
    {
      q: "Do I need a big following?",
      a: "No. We work with artists from 1K followers up to established names. What matters is your work, not your vanity metric.",
    },
    {
      q: "What if I'm not in California?",
      a: "We work with tattoo artists across the US, Mexico and Latin America. The strategy call is in California time (PST), but ads run wherever you do.",
    },
    {
      q: "Will I need to change the tools I already use?",
      a: "No. We integrate with WhatsApp, Instagram, your existing calendar. You don't change your flow — we level it up.",
    },
  ];
  return (
    <section className="relative py-16 sm:py-24 border-t border-brand-purple/10">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-brand-pink">
            FAQ
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-5xl font-bold leading-tight">
            Quick <span className="text-gradient">questions</span>.
          </h2>
        </motion.div>

        <div className="mt-12 space-y-3">
          {items.map((f, i) => (
            <motion.details
              key={f.q}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="card-glass group overflow-hidden rounded-2xl"
            >
              <summary className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-5 text-left sm:px-6 list-none [&::-webkit-details-marker]:hidden">
                <span className="font-display text-base sm:text-lg font-semibold text-white">
                  {f.q}
                </span>
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-purple to-brand-pink text-white transition-transform duration-300 group-open:rotate-45">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </span>
              </summary>
              <p className="px-5 pb-5 pr-14 text-sm sm:text-base text-brand-lilac/80 leading-relaxed sm:px-6 sm:pb-6">
                {f.a}
              </p>
            </motion.details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- FINAL CTA ---------- */
function FinalCta() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-28 border-t border-brand-purple/10">
      <div aria-hidden className="absolute inset-0 grid-bg" />
      <div
        aria-hidden
        className="blob"
        style={{
          width: 700,
          height: 700,
          top: -250,
          left: "50%",
          transform: "translateX(-50%)",
          background:
            "radial-gradient(circle, rgba(168,85,247,0.35) 0%, transparent 65%)",
          opacity: 0.8,
        }}
      />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="font-display text-3xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight"
        >
          Ready to stop chasing clients and{" "}
          <span className="text-gradient">start tattooing more?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-6 max-w-xl mx-auto text-base sm:text-lg text-brand-lilac/80"
        >
          One 45-min call. No commitment. Walk away with a clear plan — even if
          we don&apos;t end up working together.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-10 flex flex-col items-center gap-3"
        >
          <a
            href={BOOK_HREF}
            className="btn-primary group inline-flex items-center gap-2 rounded-full px-9 py-4 text-base sm:text-lg font-semibold text-white"
          >
            Book your free strategy call
            <ArrowRight
              size={20}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
          <p className="text-xs text-brand-lilac/55">
            Limited spots — only a few calls open per week
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- FOOTER ---------- */
function Footer() {
  return (
    <footer className="relative border-t border-brand-purple/15 bg-brand-deep/40 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Logo size={32} />
        <p className="text-xs text-brand-lilac/55 text-center">
          © {new Date().getFullYear()} CloseFlow System. Built with purpose in
          California.
        </p>
      </div>
    </footer>
  );
}

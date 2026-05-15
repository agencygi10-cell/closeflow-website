"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const steps = [
  {
    n: "01",
    title: "Brand audit",
    text: "We analyze your calendar, your ads and your style to find where you're losing clients.",
  },
  {
    n: "02",
    title: "System setup",
    text: "We configure your CRM, automations, booking calendar and ad campaigns, ready to run.",
  },
  {
    n: "03",
    title: "Operation + scale",
    text: "We optimize ads weekly, direct your content and grow your ROAS month over month.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative py-14 sm:py-20 border-t border-brand-purple/10"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-brand-pink">
            How it works
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-5xl font-bold leading-tight">
            Your dashboard, <span className="text-gradient">your numbers</span>,
            zero excuses.
          </h2>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Steps */}
          <div className="space-y-5">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="card-glass flex gap-5 rounded-2xl p-6"
              >
                <span className="font-display text-3xl font-bold text-gradient leading-none">
                  {s.n}
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-white">
                    {s.title}
                  </h3>
                  <p className="mt-1 text-sm text-brand-lilac/75 leading-relaxed">
                    {s.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mock dashboard */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div
              aria-hidden
              className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-brand-purple/40 via-brand-pink/20 to-transparent blur-2xl"
            />
            <div className="relative card-glass rounded-3xl p-5 sm:p-6">
              {/* fake top bar */}
              <div className="mb-5 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-300/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                <span className="ml-3 text-xs text-brand-lilac/60">
                  closeflow.dashboard
                </span>
              </div>

              {/* KPI cards */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { l: "Leads", v: "284" },
                  { l: "Bookings", v: "126" },
                  { l: "ROAS", v: "23x" },
                ].map((k) => (
                  <div
                    key={k.l}
                    className="rounded-xl border border-brand-purple/25 bg-brand-purple/5 p-3"
                  >
                    <div className="text-[10px] uppercase tracking-wider text-brand-lilac/60">
                      {k.l}
                    </div>
                    <div className="mt-1 font-display text-xl font-bold text-white">
                      {k.v}
                    </div>
                  </div>
                ))}
              </div>

              {/* Fake chart */}
              <div className="rounded-xl border border-brand-purple/25 bg-gradient-to-b from-brand-purple/10 to-transparent p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="text-xs text-brand-lilac/70">
                    Leads per day
                  </div>
                  <div className="text-xs text-brand-pink">+24%</div>
                </div>
                <svg
                  viewBox="0 0 300 80"
                  className="h-20 w-full"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="lg" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#ec4899" stopOpacity="0.6" />
                      <stop
                        offset="100%"
                        stopColor="#a855f7"
                        stopOpacity="0"
                      />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,60 L25,55 L50,58 L75,42 L100,45 L125,30 L150,35 L175,22 L200,28 L225,18 L250,20 L275,10 L300,15 L300,80 L0,80 Z"
                    fill="url(#lg)"
                  />
                  <path
                    d="M0,60 L25,55 L50,58 L75,42 L100,45 L125,30 L150,35 L175,22 L200,28 L225,18 L250,20 L275,10 L300,15"
                    fill="none"
                    stroke="#ec4899"
                    strokeWidth="2"
                  />
                </svg>
              </div>

              {/* Fake list */}
              <div className="mt-4 space-y-2">
                {[
                  "Conversation closed · Booking confirmed",
                  "New lead from Instagram · Auto-assigned",
                  "Meta campaign optimized · CPL -18%",
                ].map((t) => (
                  <div
                    key={t}
                    className="flex items-center gap-2 rounded-lg bg-brand-purple/5 px-3 py-2 text-xs text-brand-lilac/85"
                  >
                    <CheckCircle2 size={14} className="text-brand-pink" />
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

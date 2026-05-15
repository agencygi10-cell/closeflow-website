"use client";

import { motion } from "framer-motion";
import { Quote, TrendingUp } from "lucide-react";

const testimonials = [
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

export default function SuccessStories() {
  return (
    <section
      id="cases"
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
            Success stories
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-5xl font-bold leading-tight">
            Real results{" "}
            <span className="text-gradient">for real tattoo artists</span>.
          </h2>
        </motion.div>

        {/* Highlight ROAS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="relative mt-12 overflow-hidden rounded-3xl border border-brand-purple/25 bg-gradient-to-br from-brand-purple/20 via-brand-pink/8 to-transparent p-8 sm:p-12"
        >
          <div
            aria-hidden
            className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-gradient-to-br from-brand-purple to-brand-pink opacity-25 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-gradient-to-tr from-brand-pink to-brand-violet opacity-20 blur-3xl"
          />
          <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
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
              sales. No hype, no promises: it&apos;s what we do every week.
            </p>
          </div>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
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

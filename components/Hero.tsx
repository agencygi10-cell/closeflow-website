"use client";

import { motion } from "framer-motion";
import { ArrowRight, Star, Sparkles } from "lucide-react";
import Logo from "./Logo";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] overflow-hidden pt-28 pb-24 md:pt-36"
    >
      {/* Premium ambient layers */}
      <div
        aria-hidden
        className="blob animate-float-slow"
        style={{
          width: 620,
          height: 620,
          top: -160,
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
          bottom: -160,
          right: -120,
          background:
            "radial-gradient(circle, rgba(236,72,153,0.45) 0%, transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="blob"
        style={{
          width: 380,
          height: 380,
          top: "30%",
          left: "55%",
          background:
            "radial-gradient(circle, rgba(168,85,247,0.25) 0%, transparent 65%)",
          opacity: 0.6,
        }}
      />
      <div aria-hidden className="absolute inset-0 grid-bg" />
      <div aria-hidden className="absolute inset-0 starfield" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Logo size={68} showText={false} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-purple/30 bg-brand-purple/10 px-4 py-1.5 text-xs sm:text-sm text-brand-lilac backdrop-blur-md"
          >
            <Sparkles size={12} className="text-brand-pink" />
            <span className="shimmer-text font-medium">
              The growth agency for tattoo artists
            </span>
            <span className="mx-1 text-brand-lilac/40">·</span>
            <span className="flex gap-0.5 text-yellow-400">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={11} fill="currentColor" />
              ))}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight"
          >
            <span className="text-white">We scale tattoo artists with a</span>
            <br className="hidden sm:block" />{" "}
            <span className="text-gradient">15x to 32x ROAS.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-2xl text-base sm:text-lg text-brand-lilac/85"
          >
            For tattoo artists ready to grow: the same system that multiplies
            every dollar you put into ads by 15x to 32x, in under 90 days.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center gap-4"
          >
            <a
              href="#contact"
              className="btn-primary group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white"
            >
              Book your free consult
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
            <a
              href="#cases"
              className="btn-ghost rounded-full px-7 py-3.5 text-sm font-semibold text-brand-lilac"
            >
              See success stories
            </a>
          </motion.div>

          {/* Premium proof strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-14 grid grid-cols-3 gap-4 sm:gap-10 text-center"
          >
            {[
              { v: "15x–32x", l: "Average ROAS" },
              { v: "+20", l: "Tattoo artists scaled" },
              { v: "<90 days", l: "Time to results" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-display text-2xl sm:text-3xl font-bold text-gradient leading-none">
                  {s.v}
                </div>
                <div className="mt-2 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-brand-lilac/60">
                  {s.l}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

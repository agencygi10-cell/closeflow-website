"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function FinalCta() {
  return (
    <section className="relative overflow-hidden py-14 sm:py-20 border-t border-brand-purple/10">
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
            "radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 65%)",
          opacity: 0.7,
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
          We&apos;re so good at scaling tattoo artists{" "}
          <span className="text-gradient">
            you&apos;re here because of one of our own ads.
          </span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10"
        >
          <a
            href="#contact"
            className="btn-primary group inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-semibold text-white"
          >
            Book a call
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

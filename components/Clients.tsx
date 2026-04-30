"use client";

import { motion } from "framer-motion";

const clients = [
  "Luis Amaya Tattoo",
  "Atta Tattoo",
  "Felipe Diaz Tattoo",
  "Memoo Tavera",
  "Julian Morales",
  "Dalton Jaramillo",
  "Alwin8",
  "Kata Reyes",
  "Yurani Vargas",
  "Dani Rincón",
  "Beauty Center",
  "JP Smiles",
];

export default function Clients() {
  // Duplicate for seamless infinite marquee
  const row = [...clients, ...clients];

  return (
    <section className="relative overflow-hidden border-t border-b border-brand-purple/15 bg-black/40 py-12 sm:py-14">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <span className="text-xs uppercase tracking-[0.3em] text-brand-lilac/60">
          Marcas que ya escalamos
        </span>
      </motion.div>

      <div className="relative">
        {/* fade edges */}
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

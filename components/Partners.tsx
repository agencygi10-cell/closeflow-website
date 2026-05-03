"use client";

import { motion } from "framer-motion";

const partners = [
  "Meta",
  "Google",
  "TikTok Ads",
  "Instagram",
  "WhatsApp",
  "Shopify",
  "Klaviyo",
];

export default function Partners() {
  // Duplicate for seamless infinite marquee
  const row = [...partners, ...partners];

  return (
    <section
      id="partners"
      className="relative py-14 sm:py-20 border-t border-brand-purple/10 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="inline-flex rounded-full border border-brand-purple/30 bg-brand-purple/10 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-brand-lilac">
            Partners
          </span>
          <h2 className="mt-6 font-display text-3xl sm:text-5xl font-bold leading-tight">
            Nuestros <span className="text-gradient">Partners</span>
          </h2>
        </motion.div>
      </div>

      <div className="relative mt-12">
        {/* fade edges */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-32 bg-gradient-to-r from-[#050008] to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-32 bg-gradient-to-l from-[#050008] to-transparent"
        />

        <div className="flex animate-scroll-x gap-3 sm:gap-4 px-4">
          {row.map((p, i) => (
            <div
              key={i}
              className="shrink-0 flex h-20 w-44 sm:h-24 sm:w-56 items-center justify-center rounded-2xl border border-brand-purple/20 bg-black/60 p-3 transition-all hover:border-brand-pink/40 hover:bg-black/80"
            >
              <span className="font-display text-sm sm:text-base font-semibold text-white/90 text-center whitespace-nowrap">
                {p}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

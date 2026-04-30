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
  return (
    <section
      id="partners"
      className="relative py-24 sm:py-32 border-t border-brand-purple/10"
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

        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 sm:gap-4">
          {partners.map((p, i) => (
            <motion.div
              key={p}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="flex aspect-[5/3] items-center justify-center rounded-2xl border border-brand-purple/20 bg-black/60 p-3 transition-all hover:border-brand-pink/40 hover:bg-black/80"
            >
              <span className="font-display text-sm sm:text-base font-semibold text-white/85 text-center">
                {p}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

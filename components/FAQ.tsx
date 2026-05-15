"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "Do you only work with tattoo artists?",
    a: "Yes. We work exclusively with tattoo artists — not studios, not other niches. That's how we hit 15x to 32x ROAS: we understand deeply how tattoos sell, how the client thinks and how a tattoo artist's personal brand is built.",
  },
  {
    q: "How much does it cost?",
    a: "It depends on the size of your brand and your goals. On the free consult we review your case and send you a clear proposal, no fine print.",
  },
  {
    q: "How long until I see results?",
    a: "We set up your system in 7–14 days. The first paid bookings start coming in within weeks — and in under 90 days we hit the ROAS we're known for.",
  },
  {
    q: "What does it include exactly?",
    a: "CRM system, automated calendar, Meta ads (Facebook + Instagram), creative direction and weekly content coaching. All measured in one dashboard.",
  },
  {
    q: "Do I need a lot of followers?",
    a: "No. We work with tattoo artists from 1K followers up to established names. What matters is your work, not your vanity metric.",
  },
  {
    q: "Do I have to drop the tools I already use?",
    a: "No. We integrate what you already use (WhatsApp, Instagram, calendar) with your new system. You don't change your flow, we level it up.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative py-14 sm:py-20 border-t border-brand-purple/10"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-brand-pink">
            FAQ
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-5xl font-bold leading-tight">
            Frequently asked <span className="text-gradient">questions</span>.
          </h2>
        </motion.div>

        <div className="mt-12 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={f.q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="card-glass overflow-hidden rounded-2xl"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-base sm:text-lg font-semibold text-white">
                    {f.q}
                  </span>
                  <span
                    className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-purple to-brand-pink text-white transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    <Plus size={16} />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 pr-14 text-sm sm:text-base text-brand-lilac/80 leading-relaxed sm:px-6 sm:pb-6">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

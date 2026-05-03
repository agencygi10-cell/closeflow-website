"use client";

import { motion } from "framer-motion";
import { Quote, TrendingUp } from "lucide-react";

const testimonials = [
  {
    name: "Luis Amaya Tattoo",
    text: "Antes perdíamos clientes por no contestar a tiempo. Con CloseFlow los días se nos llenan solos.",
  },
  {
    name: "Yurani Vargas",
    text: "Por primera vez sabemos cuántos clientes nuevos entran por semana y cuánto cuesta cada uno.",
  },
  {
    name: "Atta Tattoo",
    text: "Pasamos de inconsistencia a tener agenda llena dos meses adelante.",
  },
];

export default function SuccessStories() {
  return (
    <section
      id="casos"
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
            Casos de éxito
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-5xl font-bold leading-tight">
            Resultados reales{" "}
            <span className="text-gradient">para nuestros clientes</span>.
          </h2>
        </motion.div>

        {/* Highlight ROAS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="relative mt-12 overflow-hidden rounded-3xl border border-brand-purple/25 bg-gradient-to-br from-brand-purple/15 via-brand-pink/5 to-transparent p-8 sm:p-12"
        >
          <div
            aria-hidden
            className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-brand-purple to-brand-pink opacity-20 blur-3xl"
          />
          <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-5">
              <div className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-purple to-brand-pink text-white shadow-glow">
                <TrendingUp size={26} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-brand-lilac/70">
                  ROAS promedio
                </p>
                <p className="mt-2 font-display text-5xl sm:text-6xl font-bold text-gradient leading-none">
                  8x – 10x
                </p>
              </div>
            </div>
            <p className="max-w-md text-sm sm:text-base text-brand-lilac/80 leading-relaxed">
              Por cada $1 invertido en pauta, nuestros clientes generan entre $8
              y $10 en ventas. Eso es lo que ya estamos haciendo, en serio.
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
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

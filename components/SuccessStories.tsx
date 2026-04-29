"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, DollarSign, Clock, Quote } from "lucide-react";

const stats = [
  { icon: TrendingUp, k: "+40%", v: "Aumento promedio en conversiones" },
  { icon: Users, k: "+1.2k", v: "Leads atendidos al mes" },
  { icon: DollarSign, k: "3.8x", v: "ROAS promedio en Meta Ads" },
  { icon: Clock, k: "<5 min", v: "Tiempo de respuesta a leads" },
];

const testimonials = [
  {
    name: "Estudio de tatuajes",
    location: "Los Angeles, CA",
    text: "Antes perdíamos clientes por no contestar a tiempo. Con CloseFlow los días se nos llenan solos.",
  },
  {
    name: "Centro de belleza",
    location: "San Diego, CA",
    text: "Por primera vez sabemos cuántos clientes nuevos entran por semana y cuánto cuesta cada uno.",
  },
  {
    name: "Barbería premium",
    location: "Miami, FL",
    text: "Pasamos de inconsistencia a tener agenda llena dos meses adelante.",
  },
];

export default function SuccessStories() {
  return (
    <section
      id="casos"
      className="relative py-24 sm:py-32 border-t border-brand-purple/10"
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
            Resultados reales en{" "}
            <span className="text-gradient">estudios y centros de belleza</span>.
          </h2>
        </motion.div>

        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.v}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="card-glass rounded-2xl p-5 sm:p-6"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-purple to-brand-pink text-white">
                <s.icon size={18} />
              </div>
              <div className="mt-4 font-display text-2xl sm:text-3xl font-bold text-gradient">
                {s.k}
              </div>
              <div className="mt-1 text-xs sm:text-sm text-brand-lilac/70">
                {s.v}
              </div>
            </motion.div>
          ))}
        </div>

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
                "{t.text}"
              </blockquote>
              <figcaption className="mt-5 border-t border-brand-purple/20 pt-4">
                <div className="font-display text-sm font-semibold text-white">
                  {t.name}
                </div>
                <div className="text-xs text-brand-lilac/60">{t.location}</div>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 text-center"
        >
          <a
            href="https://drive.google.com/drive/folders/1dd7_idE_k3-OTEUWhXo0zfXs83YpwcBC?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-brand-lilac"
          >
            Ver más casos en video
          </a>
        </motion.div>
      </div>
    </section>
  );
}

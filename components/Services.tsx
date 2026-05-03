"use client";

import { motion } from "framer-motion";
import { Cog, Zap, Compass, TrendingUp, ArrowUpRight } from "lucide-react";

const services = [
  {
    icon: Cog,
    title: "Sistema CRM & Automatizaciones",
    desc: "Pipelines, automatizaciones y calendarios listos para vender mientras tú trabajas.",
    points: ["Pipelines personalizados", "Automatizaciones 24/7", "WhatsApp + Instagram"],
  },
  {
    icon: Zap,
    title: "Meta Ads",
    desc: "Campañas en Facebook e Instagram que bajan el costo por lead y suben el ROAS.",
    points: ["Estrategia de pauta", "Creativos que convierten", "Optimización semanal"],
  },
  {
    icon: Compass,
    title: "Asesorías de contenido",
    desc: "Te decimos qué publicar, cómo grabarlo y cuándo subirlo.",
    points: ["Calendario editorial", "Guiones y hooks", "Dirección de marca"],
  },
  {
    icon: TrendingUp,
    title: "Asesorías para escalar",
    desc: "Acompañamiento para llevar tu negocio al siguiente nivel: precios, equipo y sistemas.",
    points: ["Estrategia de crecimiento", "Modelo financiero", "Procesos replicables"],
  },
];

export default function Services() {
  return (
    <section
      id="servicios"
      className="relative py-14 sm:py-20 border-t border-brand-purple/10"
    >
      <div
        aria-hidden
        className="blob"
        style={{
          width: 380,
          height: 380,
          top: 60,
          right: -80,
          background:
            "radial-gradient(circle, rgba(168,85,247,0.45) 0%, transparent 65%)",
          opacity: 0.4,
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-brand-pink">
            Servicios
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-5xl font-bold leading-tight">
            Todo lo que necesitas para{" "}
            <span className="text-gradient">crecer sin caos</span>.
          </h2>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-7">
          {services.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.06 }}
              className="card-glass group relative overflow-hidden rounded-3xl p-7 sm:p-8 transition-all duration-300"
            >
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-brand-purple to-brand-pink opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30" />
              <div className="relative flex items-start justify-between">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-purple to-brand-pink text-white shadow-glow">
                  <s.icon size={22} />
                </div>
                <ArrowUpRight
                  size={20}
                  className="text-brand-lilac/40 transition-all duration-300 group-hover:rotate-45 group-hover:text-brand-pink"
                />
              </div>

              <h3 className="relative mt-6 font-display text-xl sm:text-2xl font-semibold text-white">
                {s.title}
              </h3>
              <p className="relative mt-3 text-sm sm:text-base text-brand-lilac/75 leading-relaxed">
                {s.desc}
              </p>

              <ul className="relative mt-5 flex flex-wrap gap-2">
                {s.points.map((p) => (
                  <li
                    key={p}
                    className="rounded-full border border-brand-purple/30 bg-brand-purple/10 px-3 py-1 text-xs text-brand-lilac"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import {
  LayoutDashboard,
  MessageSquareText,
  Target,
  Workflow,
  BarChart3,
  Megaphone,
} from "lucide-react";

const features = [
  {
    icon: LayoutDashboard,
    title: "Dashboard de clientes",
    text: "Tus leads, conversaciones y conversiones en un solo lugar.",
  },
  {
    icon: MessageSquareText,
    title: "Atención de mensajes",
    text: "Respondemos por ti en Instagram y WhatsApp con respuestas que venden.",
  },
  {
    icon: Target,
    title: "Cierre de ventas",
    text: "Del primer mensaje al agendamiento confirmado.",
  },
  {
    icon: Workflow,
    title: "Flujos organizados",
    text: "Automatizamos los procesos que hoy te quitan tiempo.",
  },
  {
    icon: BarChart3,
    title: "Claridad en números",
    text: "Reportes simples de conversiones, ROAS y ticket promedio.",
  },
  {
    icon: Megaphone,
    title: "Pauta + contenido",
    text: "Manejamos tus campañas y te decimos qué publicar.",
  },
];

export default function WhatWeDo() {
  return (
    <section
      id="que-hacemos"
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
            Qué hacemos
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-5xl font-bold leading-tight">
            Transformamos tu negocio en una{" "}
            <span className="text-gradient">máquina de ventas</span> organizada.
          </h2>
          <p className="mt-6 text-base sm:text-lg text-brand-lilac/80">
            Un sistema completo: leads, mensajes, ventas, pauta y contenido.
            Todo medido, todo claro.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="card-glass group rounded-2xl p-6 transition-all duration-300"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-purple to-brand-pink text-white shadow-glow transition-transform duration-300 group-hover:scale-110">
                <f.icon size={20} />
              </div>
              <h3 className="font-display text-lg font-semibold text-white">
                {f.title}
              </h3>
              <p className="mt-2 text-sm text-brand-lilac/70 leading-relaxed">
                {f.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

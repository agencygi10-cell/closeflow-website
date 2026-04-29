"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "¿Cuánto cuesta el servicio?",
    a: "Depende del tamaño y los objetivos de tu negocio. En la consulta gratuita te damos una propuesta clara, sin letra chica.",
  },
  {
    q: "¿En cuánto tiempo veo resultados?",
    a: "Configuramos tu sistema en 7–14 días. Los primeros leads y citas empiezan a entrar en cuestión de semanas.",
  },
  {
    q: "¿Qué incluye exactamente?",
    a: "CRM, atención de mensajes, cierre de ventas, organización de flujos, pauta en Meta y asesoría de contenido.",
  },
  {
    q: "¿Funciona para mi nicho?",
    a: "Trabajamos con estudios de tatuaje, centros de belleza, barberías y spas. Si entras en alguna de estas categorías, sí.",
  },
  {
    q: "¿Tengo que dejar mis herramientas actuales?",
    a: "No. Integramos lo que ya usas (WhatsApp, Instagram, calendario) con tu nuevo sistema.",
  },
  {
    q: "¿Y si no estoy en California?",
    a: "Trabajamos con clientes en todo EEUU y Latinoamérica.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative py-24 sm:py-32 border-t border-brand-purple/10"
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
            Preguntas <span className="text-gradient">frecuentes</span>.
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

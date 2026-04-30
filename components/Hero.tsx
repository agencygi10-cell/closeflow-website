"use client";

import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import Logo from "./Logo";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] overflow-hidden pt-28 pb-24 md:pt-36"
    >
      {/* Animated gradient blobs */}
      <div
        aria-hidden
        className="blob animate-float-slow"
        style={{
          width: 540,
          height: 540,
          top: -120,
          left: -120,
          background:
            "radial-gradient(circle, #8b5cf6 0%, transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="blob animate-pulse-slow"
        style={{
          width: 460,
          height: 460,
          bottom: -120,
          right: -100,
          background:
            "radial-gradient(circle, #ec4899 0%, transparent 65%)",
        }}
      />
      <div aria-hidden className="absolute inset-0 grid-bg" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Logo size={68} showText={false} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-purple/30 bg-brand-purple/10 px-4 py-1.5 text-xs sm:text-sm text-brand-lilac"
          >
            <span className="flex gap-0.5 text-yellow-400">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={12} fill="currentColor" />
              ))}
            </span>
            +20 marcas escaladas
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight"
          >
            <span className="text-white">Escalamos las ventas de</span>
            <br className="hidden sm:block" />{" "}
            <span className="text-gradient">tu servicio en solo 90 días.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-2xl text-base sm:text-lg text-brand-lilac/80"
          >
            Aplicamos el sistema que ya usamos en +20 marcas para convertir y
            fidelizar clientes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center gap-4"
          >
            <a
              href="#contacto"
              className="btn-primary group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white"
            >
              Agenda tu consulta gratuita
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
            <a
              href="#casos"
              className="btn-ghost rounded-full px-7 py-3.5 text-sm font-semibold text-brand-lilac"
            >
              Ver casos de éxito
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
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
            <Sparkles size={14} className="text-brand-pink" />
            CRM + Ads + Asesorías para escalar
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight"
          >
            <span className="text-white">CloseFlow:</span>
            <br className="hidden sm:block" />{" "}
            <span className="text-gradient">El partner que organiza tu caos</span>
            <br className="hidden sm:block" />{" "}
            <span className="text-white">y multiplica tus ventas.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-2xl text-base sm:text-lg text-brand-lilac/80"
          >
            Atendemos tus mensajes, cerramos tus ventas y manejamos tus anuncios —
            todo en un solo dashboard.
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

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-16 grid grid-cols-3 gap-6 sm:gap-12 text-center"
          >
            {[
              { k: "+40%", v: "Conversión promedio" },
              { k: "24/7", v: "Atención de mensajes" },
              { k: "1", v: "Dashboard, todo claro" },
            ].map((s) => (
              <div key={s.v} className="flex flex-col">
                <span className="font-display text-2xl sm:text-3xl font-bold text-gradient">
                  {s.k}
                </span>
                <span className="text-xs sm:text-sm text-brand-lilac/70">
                  {s.v}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/* ---------- Illustrations ---------- */

const Defs = () => (
  <defs>
    <linearGradient id="ill-grad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#a855f7" />
      <stop offset="100%" stopColor="#ec4899" />
    </linearGradient>
    <linearGradient id="ill-soft" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#a855f7" stopOpacity="0.5" />
      <stop offset="100%" stopColor="#a855f7" stopOpacity="0.05" />
    </linearGradient>
  </defs>
);

const DashboardIll = () => (
  <svg viewBox="0 0 240 140" className="h-full w-full">
    <Defs />
    <ellipse cx="120" cy="125" rx="90" ry="6" fill="#a855f7" opacity="0.15" />
    {/* monitor */}
    <rect x="35" y="20" width="170" height="92" rx="10" fill="#0a0014" stroke="url(#ill-grad)" strokeWidth="1.6" />
    <rect x="35" y="20" width="170" height="92" rx="10" fill="url(#ill-soft)" />
    <rect x="48" y="30" width="50" height="6" rx="3" fill="url(#ill-grad)" opacity="0.7" />
    <rect x="48" y="42" width="30" height="4" rx="2" fill="#c4b5fd" opacity="0.5" />
    {/* bars */}
    <rect x="50" y="84" width="14" height="20" rx="2" fill="url(#ill-grad)" opacity="0.55" />
    <rect x="70" y="74" width="14" height="30" rx="2" fill="url(#ill-grad)" opacity="0.7" />
    <rect x="90" y="62" width="14" height="42" rx="2" fill="url(#ill-grad)" opacity="0.85" />
    <rect x="110" y="68" width="14" height="36" rx="2" fill="url(#ill-grad)" opacity="0.7" />
    <rect x="130" y="56" width="14" height="48" rx="2" fill="url(#ill-grad)" />
    <rect x="150" y="50" width="14" height="54" rx="2" fill="url(#ill-grad)" opacity="0.9" />
    <rect x="170" y="60" width="14" height="44" rx="2" fill="url(#ill-grad)" opacity="0.7" />
    {/* base */}
    <rect x="100" y="116" width="40" height="3" rx="1.5" fill="#c4b5fd" opacity="0.5" />
  </svg>
);

const ContentIll = () => (
  <svg viewBox="0 0 240 140" className="h-full w-full">
    <Defs />
    <ellipse cx="120" cy="125" rx="80" ry="5" fill="#ec4899" opacity="0.15" />
    {/* phone outline */}
    <rect x="80" y="14" width="80" height="110" rx="14" fill="#0a0014" stroke="url(#ill-grad)" strokeWidth="1.6" />
    <rect x="86" y="22" width="68" height="84" rx="6" fill="url(#ill-soft)" />
    {/* play triangle */}
    <circle cx="120" cy="64" r="18" fill="url(#ill-grad)" opacity="0.85" />
    <polygon points="115,55 115,73 130,64" fill="#fff" />
    {/* progress bar */}
    <rect x="92" y="92" width="56" height="3" rx="1.5" fill="#c4b5fd" opacity="0.3" />
    <rect x="92" y="92" width="32" height="3" rx="1.5" fill="url(#ill-grad)" />
    <circle cx="124" cy="93.5" r="3" fill="#ec4899" />
    {/* sparkles */}
    <g fill="url(#ill-grad)">
      <circle cx="40" cy="40" r="3" />
      <circle cx="200" cy="50" r="4" />
      <circle cx="50" cy="100" r="2.5" />
      <circle cx="195" cy="100" r="2" />
    </g>
    <path d="M 35 65 L 38 65 M 36.5 63 L 36.5 67" stroke="url(#ill-grad)" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M 205 80 L 208 80 M 206.5 78 L 206.5 82" stroke="url(#ill-grad)" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ScaleIll = () => (
  <svg viewBox="0 0 240 140" className="h-full w-full">
    <Defs />
    <ellipse cx="120" cy="125" rx="85" ry="5" fill="#a855f7" opacity="0.15" />
    {/* steps */}
    <rect x="40" y="92" width="40" height="20" rx="3" fill="url(#ill-grad)" opacity="0.45" />
    <rect x="86" y="74" width="40" height="38" rx="3" fill="url(#ill-grad)" opacity="0.65" />
    <rect x="132" y="52" width="40" height="60" rx="3" fill="url(#ill-grad)" opacity="0.85" />
    <rect x="178" y="28" width="40" height="84" rx="3" fill="url(#ill-grad)" />
    {/* arrow up */}
    <path
      d="M 50 88 L 100 70 L 150 50 L 198 24"
      fill="none"
      stroke="#fff"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.9"
    />
    <polygon points="190,18 208,18 200,30" fill="#fff" />
    {/* dots */}
    <circle cx="60" cy="92" r="3" fill="#fff" opacity="0.9" />
    <circle cx="106" cy="74" r="3" fill="#fff" opacity="0.9" />
    <circle cx="152" cy="52" r="3" fill="#fff" opacity="0.9" />
  </svg>
);

const FlowIll = () => (
  <svg viewBox="0 0 240 140" className="h-full w-full">
    <Defs />
    <ellipse cx="120" cy="125" rx="80" ry="5" fill="#ec4899" opacity="0.15" />
    {/* connecting lines */}
    <path d="M 50 70 C 90 70, 90 30, 130 30" fill="none" stroke="url(#ill-grad)" strokeWidth="1.5" strokeDasharray="3 3" />
    <path d="M 50 70 C 90 70, 90 110, 130 110" fill="none" stroke="url(#ill-grad)" strokeWidth="1.5" strokeDasharray="3 3" />
    <path d="M 130 30 C 170 30, 170 70, 210 70" fill="none" stroke="url(#ill-grad)" strokeWidth="1.5" strokeDasharray="3 3" />
    <path d="M 130 110 C 170 110, 170 70, 210 70" fill="none" stroke="url(#ill-grad)" strokeWidth="1.5" strokeDasharray="3 3" />
    {/* nodes */}
    <circle cx="50" cy="70" r="14" fill="url(#ill-grad)" />
    <rect x="40" y="62" width="20" height="3" rx="1.5" fill="#fff" opacity="0.9" />
    <rect x="40" y="68" width="14" height="3" rx="1.5" fill="#fff" opacity="0.7" />
    <rect x="40" y="74" width="16" height="3" rx="1.5" fill="#fff" opacity="0.7" />

    <circle cx="130" cy="30" r="12" fill="url(#ill-grad)" opacity="0.85" />
    <circle cx="130" cy="110" r="12" fill="url(#ill-grad)" opacity="0.85" />
    <circle cx="210" cy="70" r="14" fill="url(#ill-grad)" />
    <path d="M 204 70 L 210 76 L 218 64" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const NumbersIll = () => (
  <svg viewBox="0 0 240 140" className="h-full w-full">
    <Defs />
    <ellipse cx="120" cy="125" rx="85" ry="5" fill="#a855f7" opacity="0.15" />
    {/* rounded card */}
    <rect x="35" y="20" width="170" height="90" rx="10" fill="#0a0014" stroke="url(#ill-grad)" strokeWidth="1.6" />
    <rect x="35" y="20" width="170" height="90" rx="10" fill="url(#ill-soft)" />
    {/* big number */}
    <text x="55" y="65" fontFamily="sans-serif" fontWeight="700" fontSize="26" fill="url(#ill-grad)">
      $42.5k
    </text>
    <text x="55" y="82" fontFamily="sans-serif" fontWeight="500" fontSize="9" fill="#c4b5fd" opacity="0.7">
      ventas este mes
    </text>
    {/* growth chart */}
    <path
      d="M 55 100 L 75 92 L 95 96 L 115 84 L 135 88 L 155 76 L 175 72"
      fill="none"
      stroke="url(#ill-grad)"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="175" cy="72" r="3.5" fill="#ec4899" />
    {/* +% badge */}
    <rect x="150" y="32" width="48" height="20" rx="10" fill="url(#ill-grad)" />
    <text x="160" y="46" fontFamily="sans-serif" fontWeight="700" fontSize="11" fill="#fff">
      +28%
    </text>
  </svg>
);

const AdsIll = () => (
  <svg viewBox="0 0 240 140" className="h-full w-full">
    <Defs />
    <ellipse cx="120" cy="125" rx="80" ry="5" fill="#ec4899" opacity="0.15" />
    {/* megaphone body */}
    <path
      d="M 60 70 L 60 50 L 150 26 L 150 94 L 60 70 Z"
      fill="url(#ill-grad)"
      opacity="0.9"
    />
    {/* mouthpiece */}
    <rect x="148" y="48" width="20" height="24" rx="4" fill="url(#ill-grad)" />
    {/* handle */}
    <rect x="58" y="65" width="6" height="40" rx="2" fill="url(#ill-grad)" opacity="0.6" />
    {/* sound waves */}
    <path d="M 178 50 Q 192 60 178 70" stroke="url(#ill-grad)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <path d="M 188 40 Q 208 60 188 80" stroke="url(#ill-grad)" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7" />
    <path d="M 198 30 Q 222 60 198 90" stroke="url(#ill-grad)" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.45" />
    {/* sparkles */}
    <g fill="#ec4899">
      <circle cx="40" cy="100" r="2.5" />
      <circle cx="50" cy="35" r="3" />
      <circle cx="80" cy="22" r="2" />
    </g>
  </svg>
);

/* ---------- Section ---------- */

const features: {
  title: string;
  text: string;
  Ill: () => ReactNode;
}[] = [
  {
    title: "Dashboard de clientes",
    text: "Tus leads, conversaciones y conversiones en un solo lugar.",
    Ill: DashboardIll,
  },
  {
    title: "Asesorías de contenido",
    text: "Te decimos qué publicar, cómo grabarlo y cuándo subirlo.",
    Ill: ContentIll,
  },
  {
    title: "Asesorías para escalar",
    text: "Acompañamiento para llevar tu negocio al siguiente nivel: precios, equipo y sistemas.",
    Ill: ScaleIll,
  },
  {
    title: "Flujos organizados",
    text: "Automatizamos los procesos que hoy te quitan tiempo.",
    Ill: FlowIll,
  },
  {
    title: "Claridad en números",
    text: "Reportes simples de conversiones, ROAS y ticket promedio.",
    Ill: NumbersIll,
  },
  {
    title: "Pauta + contenido",
    text: "Manejamos tus campañas y te decimos qué publicar.",
    Ill: AdsIll,
  },
];

export default function WhatWeDo() {
  return (
    <section
      id="que-hacemos"
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
          {features.map((f, i) => {
            const Ill = f.Ill;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="card-glass group flex flex-col rounded-3xl p-6 sm:p-7 transition-all duration-300"
              >
                <h3 className="font-display text-xl sm:text-2xl font-semibold text-white">
                  {f.title}
                </h3>
                <p className="mt-3 text-sm sm:text-base text-brand-lilac/75 leading-relaxed">
                  {f.text}
                </p>
                <div className="mt-8 flex grow items-end justify-center">
                  <div className="relative h-32 w-full overflow-hidden rounded-2xl bg-gradient-to-br from-brand-purple/15 via-brand-pink/5 to-transparent">
                    <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105">
                      <Ill />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";

/**
 * Para usar un video real:
 *  - YouTube: setear youtubeId con el ID del video (ej: "dQw4w9WgXcQ")
 *  - Vimeo: setear vimeoId
 *  - MP4 propio: setear mp4Src apuntando a /videos/closeflow-reel.mp4 (en /public/videos/)
 *  - Si los tres están vacíos se muestra el placeholder con animación.
 */
const VIDEO_CONFIG = {
  youtubeId: "" as string,
  vimeoId: "" as string,
  mp4Src: "" as string,
  poster: "" as string, // opcional: imagen de portada para el <video> tag
};

export default function HeroVideo() {
  const { youtubeId, vimeoId, mp4Src, poster } = VIDEO_CONFIG;
  const hasVideo = Boolean(youtubeId || vimeoId || mp4Src);

  return (
    <section className="relative -mt-12 sm:-mt-20 pb-16 sm:pb-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative"
        >
          {/* Glow halo */}
          <div
            aria-hidden
            className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-brand-purple/40 via-brand-pink/20 to-transparent blur-2xl"
          />

          {/* Video frame */}
          <div className="relative overflow-hidden rounded-3xl border border-brand-purple/30 bg-black shadow-glow">
            <div className="relative aspect-video w-full">
              {youtubeId && (
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`}
                  title="CloseFlow - testimonios y casos"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              )}

              {!youtubeId && vimeoId && (
                <iframe
                  src={`https://player.vimeo.com/video/${vimeoId}?title=0&byline=0&portrait=0`}
                  title="CloseFlow - testimonios y casos"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              )}

              {!youtubeId && !vimeoId && mp4Src && (
                <video
                  controls
                  playsInline
                  preload="metadata"
                  poster={poster || undefined}
                  className="absolute inset-0 h-full w-full object-cover"
                >
                  <source src={mp4Src} type="video/mp4" />
                  Tu navegador no soporta video HTML5.
                </video>
              )}

              {!hasVideo && <Placeholder />}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Placeholder() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand-deep via-brand-black to-brand-deep">
      {/* animated background blobs */}
      <div
        aria-hidden
        className="blob animate-float-slow"
        style={{
          width: 320,
          height: 320,
          top: "10%",
          left: "20%",
          background:
            "radial-gradient(circle, rgba(168,85,247,0.45) 0%, transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="blob animate-pulse-slow"
        style={{
          width: 280,
          height: 280,
          bottom: "10%",
          right: "20%",
          background:
            "radial-gradient(circle, rgba(236,72,153,0.4) 0%, transparent 65%)",
        }}
      />
      <div aria-hidden className="absolute inset-0 grid-bg opacity-60" />

      <div className="relative flex flex-col items-center gap-4 text-center px-6">
        <button
          type="button"
          aria-label="Reproducir video"
          className="group relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-purple to-brand-pink text-white shadow-glow transition-transform hover:scale-105"
        >
          <span
            aria-hidden
            className="absolute inset-0 animate-ping rounded-full bg-brand-pink/40"
          />
          <Play size={28} className="ml-1 relative" fill="currentColor" />
        </button>
        <p className="font-display text-sm sm:text-base font-semibold text-white">
          Video testimonios — disponible pronto
        </p>
        <p className="text-xs sm:text-sm text-brand-lilac/60 max-w-md">
          Estamos editando los clips reales de nuestros clientes
        </p>
      </div>
    </div>
  );
}

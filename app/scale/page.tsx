"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles, Star } from "lucide-react";
import Logo from "@/components/Logo";

const BOOK_HREF = "/#contact";

/**
 * 🎬 LP VIDEO — when you have the file/url, set ONE of these and redeploy.
 *
 *   For an mp4 dropped in /public/videos/scale-hero.mp4:
 *     mp4Src: "/videos/scale-hero.mp4"
 *
 *   For YouTube (just the id, ej "dQw4w9WgXcQ"):
 *     youtubeId: "your_video_id"
 *
 *   For Vimeo (just the numeric id):
 *     vimeoId: "987654321"
 *
 *   poster (optional): "/videos/scale-hero-poster.jpg" — cover image before play
 *
 * If all three are empty, a premium placeholder is shown.
 */
const LP_VIDEO = {
  youtubeId: "" as string,
  vimeoId: "" as string,
  mp4Src: "" as string,
  poster: "" as string,
};

export default function ScalePage() {
  return (
    <main className="relative min-h-screen flex flex-col">
      <Hero />
      <VideoBlock />
      <ClientsStrip />
      <Footer />
    </main>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  return (
    <section className="relative pt-20 pb-16 sm:pt-24 sm:pb-20 overflow-hidden">
      <div
        aria-hidden
        className="blob animate-float-slow"
        style={{
          width: 620,
          height: 620,
          top: -200,
          left: -180,
          background:
            "radial-gradient(circle, rgba(139,92,246,0.55) 0%, transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="blob animate-pulse-slow"
        style={{
          width: 520,
          height: 520,
          bottom: -200,
          right: -140,
          background:
            "radial-gradient(circle, rgba(236,72,153,0.45) 0%, transparent 65%)",
        }}
      />
      <div aria-hidden className="absolute inset-0 grid-bg" />
      <div aria-hidden className="absolute inset-0 starfield" />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <Logo size={56} showText={false} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-purple/30 bg-brand-purple/10 px-4 py-1.5 text-xs sm:text-sm text-brand-lilac backdrop-blur-md"
        >
          <Sparkles size={12} className="text-brand-pink" />
          <span className="shimmer-text font-medium">
            For tattoo artists ready to scale
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-4xl sm:text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight"
        >
          <span className="text-white">Add an extra</span>{" "}
          <span className="text-gradient">$8K–$30K/month</span>{" "}
          <span className="text-white">
            with a done-for-you booking system.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-6 max-w-xl text-base sm:text-lg text-brand-lilac/85"
        >
          We run your Meta ads, direct your content, and fill your calendar —
          while you tattoo.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-col items-center gap-3"
        >
          <a
            href={BOOK_HREF}
            className="btn-primary group inline-flex items-center gap-2 rounded-full px-9 py-4 text-base sm:text-lg font-semibold text-white"
          >
            Book your discovery call
            <ArrowRight
              size={20}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
          <p className="text-xs text-brand-lilac/55">
            45-min · California time · Zero commitment
          </p>
        </motion.div>

        {/* Tiny proof strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-14 grid grid-cols-3 gap-4 sm:gap-10 text-center"
        >
          {[
            { v: "15x–32x", l: "Average ROAS" },
            { v: "+20", l: "Tattoo artists scaled" },
            { v: "<90 days", l: "Time to results" },
          ].map((s) => (
            <div key={s.l}>
              <div className="font-display text-xl sm:text-3xl font-bold text-gradient leading-none">
                {s.v}
              </div>
              <div className="mt-2 text-[10px] sm:text-xs uppercase tracking-[0.18em] text-brand-lilac/60">
                {s.l}
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-8 inline-flex items-center gap-2 text-xs text-brand-lilac/55"
        >
          <span className="flex gap-0.5 text-yellow-400">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} size={12} fill="currentColor" />
            ))}
          </span>
          Loved by tattoo artists across the US and Latin America
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- VIDEO BLOCK ---------- */
function VideoBlock() {
  const { youtubeId, vimeoId, mp4Src, poster } = LP_VIDEO;
  const hasVideo = Boolean(youtubeId || vimeoId || mp4Src);

  return (
    <section className="relative pb-16 sm:pb-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
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
                  title="CloseFlow — how we scale tattoo artists"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              )}

              {!youtubeId && vimeoId && (
                <iframe
                  src={`https://player.vimeo.com/video/${vimeoId}?title=0&byline=0&portrait=0`}
                  title="CloseFlow — how we scale tattoo artists"
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
                </video>
              )}

              {!hasVideo && <VideoPlaceholder />}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function VideoPlaceholder() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand-deep via-brand-black to-brand-deep">
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
          aria-label="Play video"
          className="group relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-purple to-brand-pink text-white shadow-glow transition-transform hover:scale-105"
        >
          <span
            aria-hidden
            className="absolute inset-0 animate-ping rounded-full bg-brand-pink/40"
          />
          <Play size={28} className="ml-1 relative" fill="currentColor" />
        </button>
        <p className="font-display text-sm sm:text-base font-semibold text-white">
          See the system in action — coming soon
        </p>
        <p className="text-xs sm:text-sm text-brand-lilac/60 max-w-md">
          Real tattoo artists, real bookings, real ROAS
        </p>
      </div>
    </div>
  );
}

/* ---------- CLIENTS STRIP ---------- */
function ClientsStrip() {
  const names = [
    "Luis Amaya",
    "Atta",
    "Felipe Diaz",
    "Memoo Tavera",
    "Julian Morales",
    "Dalton Jaramillo",
    "Alwin8",
    "Kata Reyes",
    "Yurani Vargas",
    "Dani Rincón",
    "Luisa Maya",
    "Sebas Ink",
  ];
  const row = [...names, ...names];
  return (
    <section className="relative border-t border-brand-purple/15 bg-black/40 py-8 overflow-hidden">
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-24 bg-gradient-to-r from-black to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-24 bg-gradient-to-l from-black to-transparent"
        />
        <div className="flex animate-scroll-x gap-3 sm:gap-4 px-4">
          {row.map((c, i) => (
            <div
              key={i}
              className="shrink-0 rounded-2xl border border-brand-purple/20 bg-brand-deep/50 px-5 py-3 sm:px-6 sm:py-4"
            >
              <span className="font-display text-sm sm:text-base font-semibold whitespace-nowrap text-white/85 tracking-tight">
                {c}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- FOOTER ---------- */
function Footer() {
  return (
    <footer className="relative border-t border-brand-purple/15 bg-brand-deep/40 py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
        <Logo size={28} />
        <p className="text-xs text-brand-lilac/55 text-center">
          © {new Date().getFullYear()} CloseFlow System
        </p>
      </div>
    </footer>
  );
}

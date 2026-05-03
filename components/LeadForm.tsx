"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { CheckCircle2, Send } from "lucide-react";

type FormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export default function LeadForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const subject = encodeURIComponent(
      `Nueva consulta — CloseFlow · ${data.name}`
    );
    const body = encodeURIComponent(
      `Nombre: ${data.name}\nEmail: ${data.email}\nTeléfono: ${data.phone}\n\nMensaje:\n${data.message}`
    );
    window.location.href = `mailto:agency.gi10@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
    reset();
  };

  return (
    <section
      id="contacto"
      className="relative py-14 sm:py-20 border-t border-brand-purple/10"
    >
      <div
        aria-hidden
        className="blob"
        style={{
          width: 460,
          height: 460,
          top: -120,
          left: -120,
          background:
            "radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 65%)",
          opacity: 0.45,
        }}
      />
      <div
        aria-hidden
        className="blob"
        style={{
          width: 380,
          height: 380,
          bottom: -100,
          right: -80,
          background:
            "radial-gradient(circle, rgba(236,72,153,0.35) 0%, transparent 65%)",
          opacity: 0.45,
        }}
      />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-brand-pink">
            Hablemos
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-5xl font-bold leading-tight">
            ¿Listo para <span className="text-gradient">escalar</span> tu
            negocio?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base sm:text-lg text-brand-lilac/80">
            Cuéntanos sobre tu estudio o centro y te enviamos un plan inicial
            sin costo en menos de 24 horas.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.05 }}
          onSubmit={handleSubmit(onSubmit)}
          className="card-glass mx-auto mt-12 grid grid-cols-1 gap-4 rounded-3xl p-6 sm:p-8 sm:grid-cols-2"
        >
          <div className="sm:col-span-1">
            <label className="text-xs uppercase tracking-wider text-brand-lilac/70">
              Nombre
            </label>
            <input
              {...register("name", { required: "Nombre requerido" })}
              type="text"
              placeholder="Tu nombre"
              className="mt-2 w-full rounded-xl border border-brand-purple/25 bg-brand-deep/50 px-4 py-3 text-sm text-white placeholder:text-brand-lilac/40 outline-none transition-all focus:border-brand-pink focus:ring-2 focus:ring-brand-pink/30"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-brand-pink">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="sm:col-span-1">
            <label className="text-xs uppercase tracking-wider text-brand-lilac/70">
              Email
            </label>
            <input
              {...register("email", {
                required: "Email requerido",
                pattern: {
                  value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                  message: "Email inválido",
                },
              })}
              type="email"
              placeholder="tu@email.com"
              className="mt-2 w-full rounded-xl border border-brand-purple/25 bg-brand-deep/50 px-4 py-3 text-sm text-white placeholder:text-brand-lilac/40 outline-none transition-all focus:border-brand-pink focus:ring-2 focus:ring-brand-pink/30"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-brand-pink">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs uppercase tracking-wider text-brand-lilac/70">
              Teléfono
            </label>
            <input
              {...register("phone", { required: "Teléfono requerido" })}
              type="tel"
              placeholder="+1 (555) 000-0000"
              className="mt-2 w-full rounded-xl border border-brand-purple/25 bg-brand-deep/50 px-4 py-3 text-sm text-white placeholder:text-brand-lilac/40 outline-none transition-all focus:border-brand-pink focus:ring-2 focus:ring-brand-pink/30"
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-brand-pink">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs uppercase tracking-wider text-brand-lilac/70">
              Mensaje
            </label>
            <textarea
              {...register("message", { required: "Mensaje requerido" })}
              rows={4}
              placeholder="Cuéntanos sobre tu negocio y qué quieres lograr"
              className="mt-2 w-full resize-none rounded-xl border border-brand-purple/25 bg-brand-deep/50 px-4 py-3 text-sm text-white placeholder:text-brand-lilac/40 outline-none transition-all focus:border-brand-pink focus:ring-2 focus:ring-brand-pink/30"
            />
            {errors.message && (
              <p className="mt-1 text-xs text-brand-pink">
                {errors.message.message}
              </p>
            )}
          </div>

          <div className="sm:col-span-2 mt-2 flex flex-col items-center gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white disabled:opacity-60"
            >
              {isSubmitting ? "Enviando..." : "Quiero una consulta gratuita"}
              <Send size={16} />
            </button>
            {submitted && (
              <div className="inline-flex items-center gap-2 text-sm text-brand-lilac/80">
                <CheckCircle2 size={16} className="text-green-400" />
                Te abrimos tu cliente de email para enviarnos el mensaje.
              </div>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
}

"use client";
import { motion } from "framer-motion";

export function FeaturesHero() {
  return (
    <section className="relative pt-32 pb-20 bg-white overflow-hidden" aria-label="Features hero">
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:28px_28px] opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-100 to-transparent pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-400 mb-6"
        >
          — Todas las características —
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="font-heading font-medium tracking-tighter text-5xl sm:text-6xl lg:text-7xl text-zinc-900 leading-[1.05] mb-6"
        >
          Más que una app.
          <br />
          <span className="bg-gradient-to-r from-[#006341] to-emerald-400 bg-clip-text text-transparent">
            Un cambio de hábitos.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
          className="text-zinc-500 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto"
        >
          Azkali no es una app de presupuestos. Es un copiloto conductual que interviene
          en el momento exacto donde se pierden o se ganan las finanzas personales.
        </motion.p>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          className="flex flex-wrap items-center justify-center gap-2 mt-8"
        >
          {["MVP disponible", "IA conductual", "Gamificación", "Finanzas sociales", "Banco Azteca"].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 rounded-full bg-zinc-50 border border-zinc-200 text-zinc-500 text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

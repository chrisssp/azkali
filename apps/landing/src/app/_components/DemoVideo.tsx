"use client";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

export function DemoVideo() {
  return (
    <section
      id="demo"
      className="relative py-24 sm:py-32 bg-white overflow-hidden"
      aria-label="Demo del prototipo"
    >
      {/* Dot pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:28px_28px] opacity-50 pointer-events-none" />
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#006341]/6 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-400 mb-6">
            — Prototipo funcional —
          </p>
          <h2 className="font-heading font-medium tracking-tighter text-4xl sm:text-5xl md:text-6xl text-zinc-900 leading-[1.1]">
            Míralo en acción.
            <br />
            <span className="bg-gradient-to-r from-[#006341] to-emerald-500 bg-clip-text text-transparent">
              MVP real, no slides.
            </span>
          </h2>
          <p className="mt-6 text-zinc-500 text-lg font-light leading-relaxed max-w-2xl mx-auto">
            Demostración en vivo del copiloto Kali y el Escáner de Impulsividad funcionando
            sobre el stack completo — React Native + Gemini 2.5 Flash-Lite + Supabase.
          </p>
        </motion.div>

        {/* Video embed */}
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="relative rounded-[2rem] overflow-hidden shadow-[0_32px_80px_-12px_rgba(0,0,0,0.15)] border border-zinc-100"
          style={{ aspectRatio: "16/9" }}
        >
          {/* Thin green top border accent */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#006341] via-emerald-400 to-[#006341] z-10" />

          <iframe
            src="https://www.youtube.com/embed/orvfws_kxcc?rel=0&modestbranding=1&color=white"
            title="Azkali — Demo del prototipo funcional MVP"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
            loading="lazy"
          />
        </motion.div>

        {/* Footer tags */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          className="flex flex-wrap items-center justify-center gap-3 mt-8"
        >
          <div className="inline-flex items-center gap-2 bg-[#006341]/8 border border-[#006341]/15 rounded-full px-4 py-2">
            <Play size={11} className="text-[#006341] fill-[#006341]" />
            <span className="text-xs font-semibold text-[#006341]">Demostración en vivo</span>
          </div>
          {["React Native + Expo", "Gemini 2.5 Flash-Lite", "Supabase", "FastAPI"].map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-4 py-2 rounded-full bg-zinc-50 border border-zinc-200 text-xs font-medium text-zinc-500"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

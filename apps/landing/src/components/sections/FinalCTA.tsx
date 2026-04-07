"use client";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

/* ─── Store Badges ────────────────────────────────────────────────── */
function AppStoreBadge() {
  return (
    <a
      href="#"
      aria-label="Descargar en App Store"
      className="inline-flex items-center gap-3.5 bg-white text-gray-900 px-6 py-4 rounded-2xl transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_8px_32px_rgba(0,0,0,0.25)] active:scale-[0.98] group shadow-sm"
    >
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-gray-900 flex-shrink-0" aria-hidden="true">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
      <div className="text-left">
        <p className="text-[10px] text-gray-500 leading-none font-medium uppercase tracking-widest">Disponible en</p>
        <p className="text-sm font-bold leading-tight mt-1 tracking-tight">App Store</p>
      </div>
    </a>
  );
}

function PlayStoreBadge() {
  return (
    <a
      href="#"
      aria-label="Descargar en Google Play"
      className="inline-flex items-center gap-3.5 bg-white/[0.10] hover:bg-white/[0.18] border border-white/[0.18] text-white px-6 py-4 rounded-2xl transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] group backdrop-blur-sm"
    >
      <svg viewBox="0 0 24 24" className="w-6 h-6 flex-shrink-0" aria-hidden="true">
        <path d="M3.18 23.76a2.1 2.1 0 0 1-.96-1.84V2.08C2.22 1.38 2.64.85 3.18.24l.1-.1L14.47 12l-11.2 11.86-.09-.1zm15.15-8.77-2.55-1.47-2.88 2.88 2.88 2.88 2.57-1.5a2.12 2.12 0 0 0 0-3.79zM4.34 1.12 15.6 12.4l-2.88 2.88L4.34 1.12z" fill="white" />
      </svg>
      <div className="text-left">
        <p className="text-[10px] text-white/50 leading-none font-medium uppercase tracking-widest">Disponible en</p>
        <p className="text-sm font-bold leading-tight mt-1 tracking-tight">Google Play</p>
      </div>
    </a>
  );
}

/* ─── Main section ────────────────────────────────────────────────── */
export function FinalCTA() {
  return (
    <section
      id="descargar"
      className="relative py-28 sm:py-40 overflow-hidden"
      style={{ backgroundColor: "#003930" }}
      aria-label="Descarga Azkali"
    >
      {/* ── Background layers ── */}
      {/* Deep orb — top center, richest light source */}
      <div className="absolute top-[-30%] left-1/2 -translate-x-1/2 w-[1000px] h-[700px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(15,110,86,0.55) 0%, transparent 70%)" }}
      />
      {/* Secondary orb bottom-right */}
      <div className="absolute bottom-[-20%] right-[-5%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(52,211,153,0.12) 0%, transparent 70%)" }}
      />
      {/* Tertiary accent — left */}
      <div className="absolute top-[40%] left-[-10%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(6,78,59,0.6) 0%, transparent 70%)" }}
      />
      {/* Fine dot grid */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />
      {/* Subtle top edge shine */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent" />

      {/* ── Content ── */}
      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">

        {/* Kali with glow ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: 10 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 flex justify-center"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-emerald-400/20 blur-2xl scale-150" />
            <div className="relative w-20 h-20 rounded-full bg-white/[0.08] border border-white/[0.15] flex items-center justify-center backdrop-blur-sm shadow-[0_0_40px_rgba(52,211,153,0.2)]">
              <span className="text-4xl select-none" role="img" aria-label="Kali la tortuga">🐢</span>
            </div>
          </div>
        </motion.div>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          className="mb-6"
        >
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-white/40 mb-6">
            — Únete gratis hoy —
          </p>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="font-heading font-medium tracking-tighter text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-6"
        >
          ¿Listo para dejar de<br className="hidden sm:block" />
          {" "}regalarle tu{" "}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-emerald-300 to-emerald-400 bg-clip-text text-transparent">quincena</span>
          </span>
          {" "}al banco?
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
          className="text-white/55 text-lg md:text-xl mb-14 font-light leading-relaxed max-w-xl mx-auto tracking-tight"
        >
          Descarga Azkali. Es gratis, es tuya y Kali no te va a juzgar.
        </motion.p>

        {/* Store badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
          className="flex flex-col sm:flex-row gap-3 justify-center mb-14"
        >
          <AppStoreBadge />
          <PlayStoreBadge />
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
          className="w-24 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto mb-14"
        />

        {/* Trust signals */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.32 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5"
        >
          {/* Avatars + users */}
          <div className="inline-flex items-center gap-3 bg-white/[0.06] border border-white/[0.10] rounded-full px-5 py-2.5">
            <div className="flex -space-x-2">
              {[
                { bg: "#006341", i: "MA" },
                { bg: "#7c3aed", i: "AB" },
                { bg: "#d97706", i: "DI" },
              ].map((a) => (
                <div key={a.i} className="w-7 h-7 rounded-full border-2 border-[#003930] flex items-center justify-center text-white text-[9px] font-bold"
                  style={{ backgroundColor: a.bg }}
                >
                  {a.i}
                </div>
              ))}
            </div>
            <span className="text-white/60 text-sm font-light">+10,000 usuarios te esperan</span>
          </div>

          {/* Rating */}
          <div className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/[0.10] rounded-full px-5 py-2.5">
            <div className="flex">
              {[1,2,3,4,5].map(i => (
                <Star key={i} size={11} className="fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-white/70 text-sm font-medium tracking-tight">4.8 · App Store</span>
          </div>

          {/* Respaldo */}
          <div className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/[0.10] rounded-full px-5 py-2.5">
            <span className="text-white/35 text-[10px] font-medium uppercase tracking-widest">Respaldada por</span>
            <span className="text-white/75 text-sm font-semibold tracking-tight">Banco Azteca</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

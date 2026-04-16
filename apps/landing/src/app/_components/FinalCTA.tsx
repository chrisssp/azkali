"use client";
import { motion } from "framer-motion";

import Image from "next/image";

/* ─── Store Badges ────────────────────────────────────────────────── */
function AppStoreBadge() {
  return (
    <a
      href="/waitlist"
      aria-label="Descargar en App Store"
      className="inline-flex items-center gap-3 bg-white text-gray-900 px-6 py-4 rounded-2xl transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)] active:scale-[0.98] group shadow-sm flex-1 sm:flex-none border border-white/10"
    >
      <svg viewBox="0 0 384 512" className="w-6 h-6 fill-gray-900 flex-shrink-0" aria-hidden="true">
        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
      </svg>
      <div className="text-left">
        <p className="text-[10px] text-gray-400 leading-none font-medium uppercase tracking-[0.1em]">Próximamente en</p>
        <p className="text-sm font-bold leading-tight mt-1 tracking-tight">App Store</p>
      </div>
    </a>
  );
}

function PlayStoreBadge() {
  return (
    <a
      href="/waitlist"
      aria-label="Descargar en Google Play"
      className="inline-flex items-center gap-3 bg-white text-gray-900 px-6 py-4 rounded-2xl transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)] active:scale-[0.98] group shadow-sm flex-1 sm:flex-none border border-white/10"
    >
      <svg viewBox="0 0 512 512" className="w-6 h-6 fill-gray-900 flex-shrink-0" aria-hidden="true">
        <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
      </svg>
      <div className="text-left">
        <p className="text-[10px] text-gray-400 leading-none font-medium uppercase tracking-[0.1em]">Próximamente en</p>
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
      <div className="absolute top-[-30%] left-1/2 -translate-x-1/2 w-[1000px] h-[700px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(15,110,86,0.55) 0%, transparent 70%)" }}
      />
      <div className="absolute bottom-[-20%] right-[-5%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(52,211,153,0.12) 0%, transparent 70%)" }}
      />
      <div className="absolute top-[40%] left-[-10%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(6,78,59,0.6) 0%, transparent 70%)" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />
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
              <Image
                src="/azkali_logo.png"
                alt="Kali"
                width={48}
                height={48}
                className="w-11 h-11 object-contain brightness-0 invert"
              />
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
          ¿Listo para que tu{" "}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-emerald-300 to-emerald-400 bg-clip-text text-transparent">quincena</span>
          </span>
          {" "}llegue más lejos?
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
          className="text-white/55 text-lg md:text-xl mb-14 font-light leading-relaxed max-w-xl mx-auto tracking-tight"
        >
          Descarga Azkali. Es gratis, es tuya, y Kali te acompaña a tomar mejores decisiones — una compra a la vez.
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
            <span className="text-white/60 text-sm font-light">Para jóvenes mexicanos</span>
          </div>

          <div className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/[0.10] rounded-full px-5 py-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white/70 text-sm font-light tracking-tight">Lanzamiento próximo</span>
          </div>

          <div className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/[0.10] rounded-full px-5 py-2.5">
            <span className="text-white/35 text-[10px] font-medium uppercase tracking-widest">Reto Hackathon</span>
            <span className="text-white/75 text-sm font-semibold tracking-tight">Banco Azteca</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

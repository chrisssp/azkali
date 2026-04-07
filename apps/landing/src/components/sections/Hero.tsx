"use client";
import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";

function PhoneMockup() {
  return (
    <div className="relative">
      {/* Glow under the phone */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-64 h-24 bg-[#006341]/20 blur-[50px] rounded-full pointer-events-none" />

      {/* Phone shell */}
      <div className="relative w-64 sm:w-72 bg-white rounded-[2.8rem] shadow-[0_32px_72px_-12px_rgba(0,0,0,0.18),0_16px_32px_-8px_rgba(0,0,0,0.10)] border-[5px] border-zinc-800 overflow-hidden">
        {/* Status bar */}
        <div className="bg-zinc-900 h-11 flex items-center justify-between px-5">
          <span className="text-zinc-300 text-xs font-medium tabular-nums">9:41</span>
          <div className="w-[88px] h-5 bg-black rounded-full mx-auto absolute left-1/2 -translate-x-1/2" />
          <div className="flex items-center gap-1">
            <div className="w-3.5 h-2.5 border border-zinc-400 rounded-[3px] relative">
              <div className="absolute inset-[2px] bg-zinc-400 rounded-[1px]" />
            </div>
          </div>
        </div>

        <div className="bg-zinc-50 pb-4">
          {/* App header */}
          <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-zinc-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#006341] flex items-center justify-center">
                <span className="text-white font-bold text-xs">A</span>
              </div>
              <span className="font-heading font-semibold text-zinc-900 text-sm tracking-tight">Azkali</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center">
                <Zap size={11} className="text-amber-500" />
              </div>
              <span className="text-xs font-bold text-amber-500">45🔥</span>
            </div>
          </div>

          <div className="px-4 pt-4 space-y-3">
            {/* Decision banner */}
            <div className="bg-amber-50 border border-amber-100 rounded-2xl px-3.5 py-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                <span className="text-base leading-none">🛒</span>
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-amber-600 font-semibold uppercase tracking-widest leading-none mb-0.5">Compra detectada</p>
                <p className="text-xs font-semibold text-zinc-800 truncate">Nike Air Max 270 · $2,799</p>
              </div>
              <div className="ml-auto w-2 h-2 rounded-full bg-amber-400 animate-pulse flex-shrink-0" />
            </div>

            {/* Verdict gauge */}
            <div className="bg-white rounded-2xl p-4 border border-zinc-100 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] text-zinc-400 font-semibold uppercase tracking-widest">Veredicto Kali</p>
                <span className="text-[9px] bg-red-50 border border-red-100 text-red-500 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">89% Impulsiva</span>
              </div>
              <div className="flex justify-center mb-3">
                <div className="relative w-20 h-20">
                  <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
                    <circle cx="40" cy="40" r="32" fill="none" stroke="#f3f4f6" strokeWidth="8" />
                    <circle cx="40" cy="40" r="32" fill="none" stroke="#8B1A1A" strokeWidth="8"
                      strokeDasharray="201" strokeDashoffset="22" strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-heading font-bold text-lg text-[#8B1A1A] leading-none">89%</span>
                    <span className="text-[8px] text-[#8B1A1A] font-semibold mt-0.5">Impulsiva</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Hrs trabajadas", val: "14.2 hrs" },
                  { label: "Días ahorro", val: "3 días" },
                ].map((m) => (
                  <div key={m.label} className="bg-zinc-50 rounded-xl p-2 text-center">
                    <p className="text-sm font-heading font-bold text-[#006341]">{m.val}</p>
                    <p className="text-[9px] text-zinc-400 mt-0.5 font-medium">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Kali insight */}
            <div className="bg-[#006341]/6 border border-[#006341]/15 rounded-2xl px-3.5 py-2.5 flex items-start gap-2">
              <span className="text-sm leading-none flex-shrink-0 mt-0.5">🐢</span>
              <p className="text-[10px] text-[#006341] font-medium leading-tight">¿Realmente los necesitas o solo los viste en el feed?</p>
            </div>

            {/* CTA row */}
            <div className="flex gap-2 pb-1">
              <button className="flex-1 bg-[#006341] text-white text-[10px] py-2.5 rounded-xl font-semibold">
                🧊 Nevera 24h
              </button>
              <button className="flex-1 bg-zinc-100 text-zinc-400 text-[10px] py-2.5 rounded-xl font-medium">
                Comprar igual
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating badges */}
      <motion.div
        initial={{ opacity: 0, x: 24, y: -8 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -right-10 top-16 bg-white border border-gray-100 shadow-lg rounded-2xl px-3.5 py-2.5"
      >
        <p className="text-[9px] text-zinc-400 font-semibold uppercase tracking-widest">Racha activa</p>
        <p className="text-sm font-heading font-bold text-zinc-900 mt-0.5">🔥 45 días</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -24, y: 8 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 1.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -left-10 bottom-24 bg-white border border-gray-100 shadow-lg rounded-2xl px-3.5 py-2.5"
      >
        <p className="text-[9px] text-zinc-400 font-semibold uppercase tracking-widest">Ahorrado</p>
        <p className="text-sm font-heading font-bold text-[#006341] mt-0.5">$2,799 MXN</p>
      </motion.div>
    </div>
  );
}

/* ─── Background ────────────────────────────────────────────────────── */
function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:28px_28px] opacity-50" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent" />
    </div>
  );
}

export function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center bg-white overflow-hidden"
      aria-label="Sección principal"
    >
      <HeroBackground />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full pt-28 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* ── Text ── */}
          <div className="order-2 lg:order-1">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
              className="font-heading font-medium tracking-tighter text-5xl sm:text-6xl lg:text-7xl text-zinc-900 leading-[1.05] mb-6"
            >
              ¿Cuántas horas de trabajo vale ese{" "}
              <span className="bg-gradient-to-r from-[#006341] via-emerald-500 to-emerald-400 bg-clip-text text-transparent">
                tenis?
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.14 }}
              className="text-zinc-500 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-lg"
            >
              La app que te hace pensar antes de gastar. Tu copiloto financiero entra
              justo cuando más lo necesitas — antes de que hagas clic en "Comprar".
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <a
                href="#descargar"
                className="inline-flex items-center justify-center bg-[#006341] text-white px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-[#003930] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-[#006341]/20"
              >
                Descarga gratis
              </a>
              <a
                href="#como-funciona"
                className="inline-flex items-center justify-center gap-2 border border-zinc-200 text-zinc-700 px-7 py-3.5 rounded-full font-medium text-sm hover:border-zinc-300 hover:bg-zinc-50 transition-all duration-300 group"
              >
                Ver cómo funciona
                <ArrowRight size={15} strokeWidth={1.5} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              className="flex items-center gap-8 mt-12 pt-10 border-t border-zinc-100"
            >
              {[
                { value: "87%", label: "se arrepiente de compras impulsivas" },
                { value: "$47K", label: "deuda promedio en tarjeta, jóvenes MX" },
                { value: "3 de 4", label: "jóvenes sin educación financiera formal" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-heading font-medium tracking-tighter text-2xl text-zinc-900">{stat.value}</p>
                  <p className="text-zinc-400 text-xs mt-0.5 font-medium">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Phone ── */}
          <div className="order-1 lg:order-2 flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <PhoneMockup />
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

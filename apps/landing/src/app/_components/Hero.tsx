"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

function PhoneMockup() {
  return (
    <div className="relative">
      {/* Glow under the phone */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-64 h-24 bg-[#006341]/20 blur-[50px] rounded-full pointer-events-none" />

      {/* Phone shell */}
      <div className="relative w-64 sm:w-72 rounded-[2.8rem] shadow-[0_32px_72px_-12px_rgba(0,0,0,0.18),0_16px_32px_-8px_rgba(0,0,0,0.10)] border-[5px] border-zinc-800 overflow-hidden bg-black">
        {/* Dynamic island */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[88px] h-5 bg-black rounded-full z-10" />

        {/* Real app screenshot */}
        <div className="relative w-full" style={{ aspectRatio: "9/19.5" }}>
          <Image
            src="/home.jpg"
            alt="Pantalla principal de Azkali"
            fill
            sizes="288px"
            className="object-cover object-top"
            priority
          />
        </div>
      </div>

      {/* Floating badge — tokens */}
      <motion.div
        initial={{ opacity: 0, x: 24, y: -8 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -right-10 top-16 bg-white border border-gray-100 shadow-lg rounded-2xl px-3.5 py-2.5"
      >
        <p className="text-[9px] text-zinc-400 font-semibold uppercase tracking-widest">Tokens ganados</p>
        <p className="text-sm font-heading font-bold text-amber-500 mt-0.5">+12 esta semana</p>
      </motion.div>

      {/* Floating badge — compra frenada */}
      <motion.div
        initial={{ opacity: 0, x: -24, y: 8 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 1.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -left-10 bottom-24 bg-white border border-gray-100 shadow-lg rounded-2xl px-3.5 py-2.5"
      >
        <p className="text-[9px] text-zinc-400 font-semibold uppercase tracking-widest">Compra frenada</p>
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
                href="/waitlist"
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
                { value: "+40%", label: "de tarjetahabientes solo pagan el mínimo" },
                { value: "~50%", label: "de mexicanos no llevan registro de sus gastos" },
                { value: "82%", label: "tasa de interés promedio que ignoran los jóvenes" },
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

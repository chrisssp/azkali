"use client";
import { motion } from "framer-motion";
import { ArrowDown, Zap, TrendingDown } from "lucide-react";

function PhoneMockup() {
  return (
    <div className="relative w-64 sm:w-72">
      {/* Phone shell */}
      <div className="w-full bg-white rounded-[2.5rem] shadow-phone border-4 border-gray-800 overflow-hidden">
        {/* Dynamic island / notch */}
        <div className="bg-gray-900 h-10 flex items-center justify-between px-5">
          <span className="text-white text-xs font-medium">9:41</span>
          <div className="w-20 h-4 bg-black rounded-full" />
          <div className="flex items-center gap-1">
            <div className="w-3 h-2 border border-white rounded-sm relative">
              <div className="absolute inset-0.5 bg-white rounded-sm" />
            </div>
          </div>
        </div>

        {/* App content */}
        <div className="bg-gray-50 min-h-[460px] p-4">
          {/* App header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-brand-green flex items-center justify-center">
                <span className="text-white font-bold text-xs">A</span>
              </div>
              <span className="font-heading font-bold text-gray-900 text-sm">Azkali</span>
            </div>
            <div className="w-7 h-7 rounded-full bg-brand-green/10 flex items-center justify-center">
              <Zap size={12} className="text-brand-green" />
            </div>
          </div>

          {/* Decision card */}
          <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 mb-3">
            <p className="text-gray-400 text-[10px] uppercase tracking-wider font-medium mb-1">
              Decisión detectada
            </p>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-heading font-bold text-gray-900 text-sm">Nike Air Max 270</p>
                <p className="text-gray-500 text-xs">ZARA Online · MXN</p>
              </div>
              <span className="text-brand-green font-bold text-sm font-heading">$2,799</span>
            </div>
          </div>

          {/* Verdict */}
          <div className="flex justify-center mb-3">
            <div className="relative">
              <svg viewBox="0 0 100 100" className="w-24 h-24">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="#f3f4f6"
                  strokeWidth="10"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="#8B1A1A"
                  strokeWidth="10"
                  strokeDasharray="263"
                  strokeDashoffset="29"
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-heading font-bold text-brand-guinda text-xl leading-none">89%</span>
                <span className="text-[9px] text-brand-guinda font-semibold">Impulsiva</span>
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div className="space-y-2 mb-3">
            <div className="flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-brand-green/10 flex items-center justify-center">
                  <span className="text-[9px]">⏱</span>
                </div>
                <span className="text-[10px] text-gray-500">Horas de trabajo</span>
              </div>
              <span className="text-[10px] font-bold text-brand-green">14.2 hrs</span>
            </div>
            <div className="flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-brand-green/10 flex items-center justify-center">
                  <span className="text-[9px]">💰</span>
                </div>
                <span className="text-[10px] text-gray-500">Días de ahorro perdidos</span>
              </div>
              <span className="text-[10px] font-bold text-brand-green">3 días</span>
            </div>
          </div>

          {/* Kali says */}
          <div className="bg-brand-green/5 border border-brand-green/20 rounded-xl p-2.5 mb-3">
            <p className="text-[9px] text-brand-green font-semibold mb-0.5">🐢 Kali dice:</p>
            <p className="text-[9px] text-gray-600 leading-tight">
              ¿Realmente los necesitas o solo los viste en el feed?
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            <button className="flex-1 bg-brand-green text-white text-[10px] py-2.5 rounded-xl font-semibold flex items-center justify-center gap-1">
              🧊 Mandar a la Nevera
            </button>
            <button className="flex items-center justify-center w-10 h-9 bg-gray-100 rounded-xl">
              <TrendingDown size={14} className="text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Decorative badges */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.3 }}
        className="absolute -right-6 top-20 bg-white rounded-2xl shadow-lg px-3 py-2 border border-gray-100"
      >
        <p className="text-[10px] text-gray-500 font-medium">Racha activa</p>
        <p className="text-sm font-heading font-bold text-brand-green">🔥 45 días</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.0, duration: 0.3 }}
        className="absolute -left-6 bottom-28 bg-white rounded-2xl shadow-lg px-3 py-2 border border-gray-100"
      >
        <p className="text-[10px] text-gray-500 font-medium">Ahorrado hoy</p>
        <p className="text-sm font-heading font-bold text-brand-green">$2,799 MXN</p>
      </motion.div>
    </div>
  );
}

export function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center bg-white overflow-hidden"
      aria-label="Sección principal"
    >
      {/* Background decoration */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.06] pointer-events-none"
        style={{
          background: "radial-gradient(circle, #0F6E56 0%, transparent 70%)",
          transform: "translate(30%, -30%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.04] pointer-events-none"
        style={{
          background: "radial-gradient(circle, #0F6E56 0%, transparent 70%)",
          transform: "translate(-40%, 40%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text content */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/10 text-brand-green text-xs font-semibold mb-6">
                <Zap size={12} />
                Educación financiera conductual
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut", delay: 0.08 }}
              className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-gray-900 leading-[1.1] tracking-tight mb-6"
            >
              ¿Cuántas horas de trabajo vale ese tenis que estás a punto de{" "}
              <span className="text-brand-green">comprar?</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut", delay: 0.14 }}
              className="text-lg sm:text-xl text-gray-500 mb-10 leading-relaxed max-w-xl"
            >
              La app que te hace pensar antes de gastar. Tu copiloto financiero entra
              justo cuando más lo necesitas: antes de que hagas clic en "Comprar".
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut", delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="#descargar"
                className="inline-flex items-center justify-center gap-2 bg-brand-green text-white px-8 py-4 rounded-full font-semibold text-base hover:bg-brand-green-600 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 text-center"
              >
                Descarga gratis
              </a>
              <a
                href="#como-funciona"
                className="inline-flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-full font-semibold text-base hover:border-brand-green hover:text-brand-green transition-all duration-200 text-center"
              >
                Ver cómo funciona
                <ArrowDown size={16} className="animate-bounce" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="flex items-center gap-6 mt-10 pt-8 border-t border-gray-100"
            >
              <div className="text-center">
                <p className="font-heading font-bold text-2xl text-brand-green">+10K</p>
                <p className="text-xs text-gray-400 mt-0.5">usuarios activos</p>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div className="text-center">
                <p className="font-heading font-bold text-2xl text-brand-green">$4.2M</p>
                <p className="text-xs text-gray-400 mt-0.5">ahorrados en total</p>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div className="text-center">
                <p className="font-heading font-bold text-2xl text-brand-green">4.8★</p>
                <p className="text-xs text-gray-400 mt-0.5">App Store</p>
              </div>
            </motion.div>
          </div>

          {/* Phone mockup */}
          <div className="order-1 lg:order-2 flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: 0.1,
              }}
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
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

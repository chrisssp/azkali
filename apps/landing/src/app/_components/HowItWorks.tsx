"use client";
import { motion } from "framer-motion";
import { ShoppingCart, MessageCircle, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";

/* ─── Data ──────────────────────────────────────────────────────────── */
const steps = [
  {
    number: "01",
    icon: ShoppingCart,
    title: "El impulso",
    description: "Estás a un clic de comprar algo que no necesitas.",
    detail: "Abres el Escáner de Impulsividad en Azkali e ingresas lo que deseas comprar. Kali comienza a hacerte preguntas de contexto.",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    badgeBg: "bg-[#006341]",
    labelColor: "text-[#006341]",
    hoverGlow: "from-orange-50",
  },
  {
    number: "02",
    icon: MessageCircle,
    title: "La intervención",
    description: "Kali te lanza 3 preguntas que te sacan del modo automático.",
    detail: "En lugar de bloquearte, Kali activa tu corteza prefrontal con preguntas simples que rompen el sesgo del presente.",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    badgeBg: "bg-[#006341]",
    labelColor: "text-[#006341]",
    hoverGlow: "from-emerald-50",
  },
  {
    number: "03",
    icon: CheckCircle2,
    title: "El resultado",
    description: "Ves el veredicto: cuántas horas trabajaste para eso y si vale la pena.",
    detail: "El porcentaje de impulsividad, tus horas de trabajo, días de ahorro y la recomendación de Kali — todo en una pantalla.",
    iconBg: "bg-sky-50",
    iconColor: "text-sky-600",
    badgeBg: "bg-[#006341]",
    labelColor: "text-[#006341]",
    hoverGlow: "from-sky-50",
  },
];

/* ─── Mockup Card 1 ─────────────────────────────────────────────────── */
function MockupImpulso() {
  return (
    <div className="flex flex-col gap-3 h-full">
      {/* Header row */}
      <div className="flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-3 border border-gray-100">
        <div className="w-8 h-8 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center flex-shrink-0">
          <ShoppingCart size={15} className="text-orange-500" />
        </div>
        <div className="min-w-0">
          <p className="text-[13px] font-semibold text-gray-900 leading-tight">Escáner activo</p>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-0.5 truncate">Ingresado por ti</p>
        </div>
        <span className="ml-auto flex-shrink-0 w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
      </div>

      {/* Product row */}
      <div className="flex-1 bg-gray-50 rounded-2xl px-4 py-3.5 border border-gray-100 flex flex-col justify-center">
        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest mb-1">Producto</p>
        <p className="text-base font-semibold text-gray-900 tracking-tight">Tenis Nike Air Max</p>
        <p className="text-xl font-bold text-gray-900 tracking-tighter mt-1">$2,799 MXN</p>
      </div>

      {/* Progress row */}
      <div className="bg-gray-50 rounded-2xl px-4 py-3 border border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">Progreso</p>
          <p className="text-[10px] text-gray-400 font-medium">Paso 1/3</p>
        </div>
        <div className="flex gap-1.5">
          <div className="flex-1 h-1.5 bg-gradient-to-r from-orange-400 to-orange-300 rounded-full" />
          <div className="flex-1 h-1.5 bg-gray-200 rounded-full" />
          <div className="flex-1 h-1.5 bg-gray-200 rounded-full" />
        </div>
      </div>
    </div>
  );
}

/* ─── Mockup Card 2 ─────────────────────────────────────────────────── */
function MockupIntervencion() {
  const questions = [
    "¿Lo habías planeado esta semana?",
    "¿Tienes el efectivo para pagarlo hoy?",
    "¿Lo seguirás queriendo en 30 días?",
  ];
  return (
    <div className="flex flex-col gap-3 h-full">
      {/* Header row */}
      <div className="flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-3 border border-gray-100">
        <div className="w-8 h-8 rounded-full bg-gradient-to-b from-[#006341] to-emerald-500 flex items-center justify-center flex-shrink-0 shadow-sm">
          <Sparkles size={14} className="text-white" strokeWidth={1.5} />
        </div>
        <div>
          <p className="text-[13px] font-semibold text-emerald-700 leading-tight">Kali pregunta:</p>
          <p className="text-[10px] text-gray-400 mt-0.5">Antes de confirmar tu compra</p>
        </div>
      </div>

      {/* Questions — flex-1 to fill space */}
      <div className="flex-1 flex flex-col gap-2">
        {questions.map((q, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-[13px] flex-1 ${
              i === 0
                ? "bg-emerald-50 border border-emerald-100 text-emerald-800 font-medium"
                : "bg-gray-50 border border-gray-100 text-gray-500"
            }`}
          >
            <span className={`text-xs font-bold tabular-nums flex-shrink-0 ${i === 0 ? "text-emerald-500" : "text-gray-300"}`}>
              {i + 1}.
            </span>
            {q}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Mockup Card 3 ─────────────────────────────────────────────────── */
function MockupResultado() {
  return (
    <div className="flex flex-col gap-3 h-full">
      {/* Header row */}
      <div className="flex items-center justify-between bg-gray-50 rounded-2xl px-4 py-3 border border-gray-100">
        <div>
          <p className="text-[13px] font-semibold text-gray-900 leading-tight">Veredicto Kali</p>
          <p className="text-[10px] text-gray-400 mt-0.5">Análisis completo</p>
        </div>
        <span className="text-[10px] bg-red-50 border border-red-100 text-red-500 px-2.5 py-1 rounded-full font-bold uppercase tracking-widest flex-shrink-0">
          89% Impulsiv@
        </span>
      </div>

      {/* Stats row */}
      <div className="flex gap-2 flex-1">
        {[
          { label: "Horas de trabajo", val: "14.2 hrs", color: "text-gray-900" },
          { label: "Días de ahorro", val: "3 días", color: "text-gray-900" },
        ].map((m) => (
          <div key={m.label} className="flex-1 bg-gray-50 border border-gray-100 rounded-2xl p-3 flex flex-col items-center justify-center text-center">
            <p className={`text-xl font-bold tracking-tighter ${m.color}`}>{m.val}</p>
            <p className="text-[9px] uppercase tracking-widest text-gray-400 mt-1 font-medium leading-tight">{m.label}</p>
          </div>
        ))}
      </div>

      {/* CTA row */}
      <button className="w-full bg-gradient-to-r from-[#006341] to-emerald-500 text-white rounded-2xl py-3 text-[13px] font-semibold hover:from-emerald-600 hover:to-emerald-400 transition-all shadow-sm flex items-center justify-center gap-2">
        Entendido, gracias Kali
      </button>
    </div>
  );
}

/* ─── Main component ────────────────────────────────────────────────── */
const mockups = [<MockupImpulso />, <MockupIntervencion />, <MockupResultado />];

export function HowItWorks() {
  return (
    <section
      id="como-funciona"
      className="relative py-24 sm:py-32 bg-white overflow-hidden"
      aria-label="Cómo funciona Azkali"
    >
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20 md:mb-28"
        >
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-400 mb-8">
            — Así funciona —
          </p>
          <h2 className="font-heading font-medium tracking-tighter text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-gray-900 leading-[1.1]">
            Tu copiloto financiero entra
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-[#006341] to-emerald-500 bg-clip-text text-transparent">
              {" "}justo cuando más lo necesitas.
            </span>
          </h2>
          <p className="mt-8 text-gray-500 text-lg md:text-xl max-w-3xl mx-auto tracking-tight font-light leading-relaxed">
            Tres pasos. Cero tecnicismos. Solo Kali entre tú y una decisión que podrías lamentar.
          </p>
        </motion.div>

        {/* ── Steps grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.15 }}
                /* outer card — full height, white bg, uniform padding */
                className={`group relative bg-white rounded-[2rem] border border-gray-100 hover:shadow-md transition-all duration-500 overflow-hidden flex flex-col p-7`}
              >
                {/* Hover glow */}
                <div className={`absolute inset-0 bg-gradient-to-b ${step.hoverGlow} to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none`} />

                {/* ── Step label + icon ── */}
                <div className="relative flex items-start gap-4 mb-6">
                  <div className="relative flex-shrink-0">
                    <div className={`w-14 h-14 rounded-2xl ${step.iconBg} border border-gray-100 flex items-center justify-center`}>
                      <Icon strokeWidth={1.5} size={22} className={step.iconColor} />
                    </div>
                    <span className={`absolute -top-2 -right-2 w-6 h-6 ${step.badgeBg} rounded-full flex items-center justify-center text-white text-[10px] font-bold shadow-md ring-2 ring-white`}>
                      {index + 1}
                    </span>
                  </div>
                  <div className="pt-1">
                    <p className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${step.labelColor}`}>
                      Paso {step.number}
                    </p>
                    <h3 className="font-heading font-semibold tracking-tight text-xl text-gray-900">
                      {step.title}
                    </h3>
                  </div>
                </div>

                {/* ── Text ── */}
                <div className="relative mb-7">
                  <p className="text-gray-800 font-medium text-base leading-snug mb-2 tracking-tight">
                    {step.description}
                  </p>
                  <p className="text-gray-400 text-sm leading-relaxed font-light">
                    {step.detail}
                  </p>
                </div>

                {/* ── Mockup (flex-1 so all cards stretch equally) ── */}
                <div className="relative flex-1 flex flex-col">
                  {mockups[index]}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="text-center mt-20"
        >
          <a
            href="/waitlist"
            className="inline-flex items-center gap-3 bg-zinc-900 text-white px-8 py-4 rounded-full font-medium text-base hover:bg-zinc-800 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-sm group"
          >
            Quiero ser el primero en usarlo
            <ArrowRight size={18} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

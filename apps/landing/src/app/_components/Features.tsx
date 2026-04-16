"use client";
import { motion } from "framer-motion";
import { Award, ScanSearch, Bot } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Tokens de Resiliencia",
    description:
      "Acumula tokens automáticamente por cada transacción vinculando tus productos financieros. Más tokens entre mejor sea tu hábito de ahorro.",
    tag: "Gamificación",
    iconBg: "bg-amber-50 border border-amber-100",
    iconColor: "text-amber-500",
    tagStyle: "bg-amber-50 border-amber-100 text-amber-600",
    hoverBorder: "hover:border-amber-200",
    preview: (
      <div className="mt-6 rounded-2xl bg-zinc-50 border border-zinc-100 p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-semibold">Tus tokens</span>
          <span className="text-[10px] text-amber-500 font-bold">+12 esta semana</span>
        </div>
        <div className="space-y-1.5">
          {[
            { card: "Básico", rate: "2.0/1k" },
            { card: "Digital", rate: "5.0/1k" },
            { card: "Avanzado", rate: "12.0/1k" },
          ].map((t) => (
            <div key={t.card} className="flex items-center justify-between bg-amber-50 border border-amber-100 rounded-xl px-3 py-1.5">
              <span className="text-[10px] font-medium text-zinc-600">{t.card}</span>
              <span className="text-[10px] font-bold text-amber-500">{t.rate}</span>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-zinc-400 mt-3 text-center font-medium">Tokens de Resiliencia</p>
      </div>
    ),
  },
  {
    icon: ScanSearch,
    title: "Escáner de Impulsividad",
    description:
      "Antes de comprar, la IA cruza el costo contra tu perfil y te muestra el porcentaje de impulsividad y el costo de oportunidad real.",
    tag: "Fricción cognitiva",
    iconBg: "bg-red-50 border border-red-100",
    iconColor: "text-red-500",
    tagStyle: "bg-red-50 border-red-100 text-red-600",
    hoverBorder: "hover:border-red-200",
    preview: (
      <div className="mt-6 rounded-2xl bg-zinc-50 border border-zinc-100 p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-semibold">Veredicto</span>
          <span className="text-[10px] text-red-500 font-bold">89% Impulsiva</span>
        </div>
        <div className="flex items-center gap-3 mb-2">
          <div className="relative w-14 h-14">
            <svg viewBox="0 0 56 56" className="w-full h-full -rotate-90">
              <circle cx="28" cy="28" r="22" fill="none" stroke="#f3f4f6" strokeWidth="6" />
              <circle cx="28" cy="28" r="22" fill="none" stroke="#8B1A1A" strokeWidth="6" strokeDasharray="138" strokeDashoffset="15" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold text-[#8B1A1A]">89%</span>
            </div>
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-[10px] text-zinc-600 font-medium">14.2 hrs de trabajo</p>
            <p className="text-[10px] text-zinc-600 font-medium">3 días de ahorro</p>
          </div>
        </div>
        <div className="bg-[#006341]/5 border border-[#006341]/10 rounded-xl px-3 py-2">
          <p className="text-[10px] text-[#006341] font-medium">🐢 ¿Realmente los necesitas?</p>
        </div>
      </div>
    ),
  },
  {
    icon: Bot,
    title: "Kali, tu guía de IA",
    description:
      "Aprende finanzas en tu idioma, sin PDFs aburridos. Kali te explica todo como si fuera tu amiga que estudió economía.",
    tag: "IA conductual",
    iconBg: "bg-emerald-50 border border-emerald-100",
    iconColor: "text-[#006341]",
    tagStyle: "bg-emerald-50 border-emerald-100 text-[#006341]",
    hoverBorder: "hover:border-emerald-200",
    preview: (
      <div className="mt-6 rounded-2xl bg-zinc-50 border border-zinc-100 p-4">
        <div className="flex items-start gap-2.5 mb-3">
          <div className="w-7 h-7 rounded-full bg-gradient-to-b from-[#006341] to-emerald-500 flex items-center justify-center flex-shrink-0 shadow-sm">
            <span className="text-xs leading-none">🐢</span>
          </div>
          <div className="bg-white border border-zinc-100 rounded-2xl rounded-tl-sm px-3 py-2 flex-1 shadow-sm">
            <p className="text-xs text-zinc-600 leading-relaxed">¿Cuánto pagarías en intereses si solo das el mínimo?</p>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="bg-[#006341]/10 border border-[#006341]/15 rounded-2xl rounded-tr-sm px-3 py-2">
            <p className="text-xs text-[#006341] font-medium">No lo había pensado...</p>
          </div>
        </div>
      </div>
    ),
  },
];

export function Features() {
  return (
    <section
      id="features"
      className="relative py-24 sm:py-32 bg-zinc-50 overflow-hidden"
      aria-label="Features de Azkali"
    >
      {/* Decorative */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#006341]/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/3 translate-y-1/3" />
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20 md:mb-28"
        >
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-400 mb-8">
            — Core features —
          </p>
          <h2 className="font-heading font-medium tracking-tighter text-4xl sm:text-5xl md:text-7xl text-zinc-900 leading-[1.1]">
            Todo lo que Azkali
            <br />
            <span className="bg-gradient-to-r from-[#006341] to-emerald-500 bg-clip-text text-transparent">
              hace por ti.
            </span>
          </h2>
          <p className="mt-8 text-zinc-500 text-lg md:text-xl max-w-3xl mx-auto tracking-tight font-light leading-relaxed">
            No es una app de presupuestos aburrida. Es un sistema conductual que cambia
            cómo tomas decisiones financieras.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                  delay: index * 0.1,
                }}
                className={`group bg-white rounded-[2rem] border border-zinc-100 ${feature.hoverBorder} transition-all duration-500 p-7`}
              >
                {/* Icon + tag */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-12 h-12 rounded-2xl ${feature.iconBg} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                    <Icon strokeWidth={1.5} size={22} className={feature.iconColor} />
                  </div>
                  <span className={`text-[10px] px-2.5 py-1 rounded-full border font-semibold uppercase tracking-widest ${feature.tagStyle}`}>
                    {feature.tag}
                  </span>
                </div>

                {/* Title + description */}
                <h3 className="font-heading font-semibold tracking-tight text-xl text-zinc-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed font-light">
                  {feature.description}
                </p>

                {/* Preview */}
                {feature.preview}
              </motion.div>
            );
          })}
        </div>

        {/* Bottom row: pill + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-20 pt-10 border-t border-zinc-100"
        >
          {/* Kali text (left) */}
          <div className="text-zinc-400 text-sm font-light tracking-wide italic">
            Kali aprende de tus hábitos y mejora contigo con el tiempo
          </div>
          {/* Black CTA (right) */}
          <a
            href="/waitlist"
            className="inline-flex items-center gap-2 bg-zinc-900 theme-transition text-white px-7 py-3 rounded-full text-sm font-semibold hover:bg-zinc-800 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-zinc-900/10"
          >
            Ver todas las características
            <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

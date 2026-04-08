"use client";
import { motion } from "framer-motion";
import { Snowflake, Award, Users, Bot } from "lucide-react";

const features = [
  {
    icon: Snowflake,
    title: "La Nevera",
    description:
      "Congela el impulso 24 horas y conviértelo en ahorro. Si en 24h sigues queriéndolo, entonces sí lo compras.",
    tag: "Anti-impulso",
    iconBg: "bg-sky-50 border border-sky-100",
    iconColor: "text-sky-500",
    tagStyle: "bg-sky-50 border-sky-100 text-sky-600",
    hoverBorder: "hover:border-sky-200",
    preview: (
      <div className="mt-6 rounded-2xl bg-zinc-50 border border-zinc-100 p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-semibold">En la Nevera</span>
          <span className="text-[10px] text-sky-500 font-bold">23h 14m restantes</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center flex-shrink-0">
            <span className="text-base">🧊</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-800 tracking-tight">Nike Air Max 270</p>
            <p className="text-xs text-zinc-400">$2,799 MXN · Congelado</p>
          </div>
        </div>
        <div className="mt-3 w-full h-1.5 bg-zinc-200 rounded-full overflow-hidden">
          <div className="h-full w-[4%] bg-sky-400 rounded-full" />
        </div>
      </div>
    ),
  },
  {
    icon: Award,
    title: "Tokens de Disciplina",
    description:
      "Gana recompensas canjeables por cada buen hábito financiero. Cada decisión consciente suma puntos reales.",
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
        <div className="flex items-center gap-2">
          {["🏆", "🎯", "💎", "⚡"].map((e, i) => (
            <div key={i} className="flex-1 aspect-square rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center">
              <span className="text-lg leading-none">{e}</span>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-zinc-400 mt-3 text-center font-medium">240 tokens · Nivel Disciplinado</p>
      </div>
    ),
  },
  {
    icon: Users,
    title: "Retos Grupales",
    description:
      "Ahorra con tus amigos y gánale a la inflación juntos. Porque cuando hay competencia, hay motivación.",
    tag: "Social",
    iconBg: "bg-violet-50 border border-violet-100",
    iconColor: "text-violet-500",
    tagStyle: "bg-violet-50 border-violet-100 text-violet-600",
    hoverBorder: "hover:border-violet-200",
    preview: (
      <div className="mt-6 rounded-2xl bg-zinc-50 border border-zinc-100 p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-semibold">Reto activo</span>
          <span className="text-[10px] text-violet-500 font-bold">15 días</span>
        </div>
        {[
          { name: "Tú", pct: 78, color: "bg-[#006341]" },
          { name: "Abigail", pct: 64, color: "bg-violet-400" },
          { name: "Diego", pct: 51, color: "bg-amber-400" },
        ].map((p) => (
          <div key={p.name} className="flex items-center gap-2 mb-2">
            <span className="text-[10px] text-zinc-400 w-12 shrink-0">{p.name}</span>
            <div className="flex-1 h-1.5 bg-zinc-200 rounded-full overflow-hidden">
              <div className={`h-full ${p.color} rounded-full`} style={{ width: `${p.pct}%` }} />
            </div>
            <span className="text-[10px] text-zinc-400 w-6 text-right">{p.pct}%</span>
          </div>
        ))}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
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

"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Mateo",
    age: 21,
    city: "CDMX",
    initials: "MA",
    avatarBg: "bg-[#006341]",
    stars: 5,
    quote:
      "Iba a comprar unos tenis a MSI. Kali me mostró que eran 87 horas de trabajo. Los mandé a la nevera. Todavía están ahí y ya no los quiero tanto.",
    tag: "Frenó $2,799 MXN",
    tagStyle: "bg-emerald-50 border-emerald-100 text-emerald-700",
    stat: { value: "$2,799", label: "frenado" },
  },
  {
    name: "Abigail",
    age: 22,
    city: "Monterrey",
    initials: "AB",
    avatarBg: "bg-violet-500",
    stars: 5,
    quote:
      "Soy freelancer y el banco me ignoraba. Azkali me ayudó a demostrar que sí puedo manejar mi dinero. Ahora tengo más claro a dónde va cada peso.",
    tag: "Independencia financiera",
    tagStyle: "bg-violet-50 border-violet-100 text-violet-700",
    stat: { value: "3 meses", label: "de hábito" },
  },
  {
    name: "Diego",
    age: 23,
    city: "Guadalajara",
    initials: "DI",
    avatarBg: "bg-amber-500",
    stars: 5,
    quote:
      "Mi racha va en 45 días. Mi cuenta también va para arriba. Nunca pensé que una app de finanzas podría darme el mismo rush que un videojuego.",
    tag: "45 días de racha 🔥",
    tagStyle: "bg-amber-50 border-amber-100 text-amber-700",
    stat: { value: "45 días", label: "de racha" },
  },
];

function TestimonialCard({ t, delay }: { t: (typeof testimonials)[0]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      className="group bg-white rounded-[2rem] transition-all duration-500 p-7 flex flex-col h-full"
    >
      {/* Stars */}
      <div className="flex gap-0.5 mb-5">
        {Array.from({ length: t.stars }).map((_, i) => (
          <Star key={i} size={13} className="fill-amber-400 text-amber-400" />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-zinc-700 text-base leading-relaxed flex-1 mb-6 tracking-tight font-light">
        &ldquo;{t.quote}&rdquo;
      </blockquote>

      {/* Stat pill */}
      <div className="mb-5">
        <span className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-semibold tracking-wide ${t.tagStyle}`}>
          {t.tag}
        </span>
      </div>

      {/* Author */}
      <div className="flex items-center gap-3 pt-5 border-t border-gray-100">
        <div className={`w-10 h-10 rounded-full ${t.avatarBg} flex items-center justify-center flex-shrink-0 shadow-sm`}>
          <span className="text-white font-heading font-bold text-sm">{t.initials}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-zinc-900 text-sm tracking-tight">{t.name}, {t.age}</p>
          <p className="text-zinc-400 text-xs">{t.city}</p>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="font-heading font-bold text-[#006341] text-sm tracking-tight">{t.stat.value}</p>
          <p className="text-zinc-400 text-[10px]">{t.stat.label}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function Testimonials() {
  const dragRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="testimonios"
      className="relative py-24 sm:py-32 bg-zinc-100 overflow-hidden"
      aria-label="Testimonios"
    >
      {/* Dot pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none" />

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
            — Comunidad Azkali —
          </p>
          <h2 className="font-heading font-medium tracking-tighter text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-gray-900 leading-[1.1]">
            Lo que dicen los que ya
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-[#006341] to-emerald-500 bg-clip-text text-transparent">
              {" "}frenaron el impulso.
            </span>
          </h2>
          <p className="mt-8 text-gray-500 text-lg md:text-xl max-w-3xl mx-auto tracking-tight font-light leading-relaxed">
            Gente real. Decisiones reales. Dinero que ahora sí está donde debe estar.
          </p>
        </motion.div>

        {/* Desktop grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-5 lg:gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} t={t} delay={i * 0.12} />
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden overflow-hidden" ref={dragRef}>
          <motion.div
            drag="x"
            dragConstraints={dragRef}
            dragElastic={0.08}
            className="flex gap-4 cursor-grab active:cursor-grabbing pb-2"
            style={{ width: `${testimonials.length * 87}vw` }}
          >
            {testimonials.map((t, i) => (
              <div key={t.name} className="flex-shrink-0" style={{ width: "82vw" }}>
                <TestimonialCard t={t} delay={i * 0.1} />
              </div>
            ))}
          </motion.div>
          <p className="text-center text-xs text-gray-400 mt-5 font-medium tracking-wide">
            Desliza para ver más →
          </p>
        </div>

        {/* Bottom stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="mt-16 lg:mt-20 bg-white rounded-[2rem] px-8 py-7 flex flex-col sm:flex-row items-center justify-center gap-8 sm:divide-x divide-zinc-100"
        >
          {[
            { value: "4.8 / 5", label: "Calificación promedio" },
            { value: "+10,000", label: "Usuarios activos" },
            { value: "92%", label: "Recomiendan Azkali" },
          ].map((stat) => (
            <div key={stat.label} className="text-center sm:px-8">
              <p className="font-heading font-medium tracking-tighter text-3xl text-gray-900">{stat.value}</p>
              <p className="text-gray-500 text-sm mt-1 font-light">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Disclaimer */}
        <p className="mt-8 text-center text-zinc-400 text-[11px] font-light tracking-wide">
          * Testimonios ficticios elaborados a partir de las user personas del proyecto, con fines ilustrativos.
        </p>
      </div>
    </section>
  );
}

"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Flame, Users, Award } from "lucide-react";

const features = [
  {
    id: "kali",
    icon: Bot,
    title: "Kali — IA conductual",
    tagline: "La voz que necesitas escuchar antes de pagar.",
    iconBg: "bg-emerald-50 border border-emerald-100",
    iconColor: "text-[#006341]",
    accentColor: "bg-[#006341]",
    borderAccent: "border-t-emerald-500",
    details: [
      { heading: "Preguntas reflexivas personalizadas", body: "Justo antes del checkout, Kali genera 3 preguntas calibradas a tu historial — no genéricas, sino diseñadas para romper tu piloto automático." },
      { heading: "Traducción a métricas de vida real", body: "Kali convierte el monto en unidades que duelen: horas trabajadas, semanas de comida, o meses de streaming." },
      { heading: "Notificaciones conductuales", body: "Si tu racha está en riesgo, Kali aparece — no con spam, sino con un recordatorio contextual que usa tu propia data." },
      { heading: "Sin tecnicismos", body: "Kali habla como tu amiga que estudió economía: directa, sin condescendencia, en el lenguaje de la Generación Z mexicana." },
    ],
    mockup: (
      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-5 space-y-2.5">
        <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">Kali interviene</p>
        {[
          { q: "¿Lo habías planeado esta semana?", active: true },
          { q: "¿Tienes el efectivo para pagarlo hoy?", active: false },
          { q: "¿Lo seguirás queriendo en 30 días?", active: false },
        ].map((item, i) => (
          <div key={i} className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs ${item.active ? "bg-[#006341]/8 border border-[#006341]/15 text-[#006341] font-medium" : "bg-zinc-50 text-zinc-400"}`}>
            <span className={`font-bold w-4 flex-shrink-0 ${item.active ? "text-[#006341]" : "text-zinc-300"}`}>{i + 1}.</span>
            {item.q}
          </div>
        ))}
        <div className="flex items-start gap-2 mt-1 bg-[#006341]/5 border border-[#006341]/10 rounded-xl p-3">
          <span className="text-sm flex-shrink-0">🐢</span>
          <p className="text-[11px] text-[#006341] font-medium leading-relaxed">¿Realmente los necesitas o solo los viste en el feed tres veces?</p>
        </div>
      </div>
    ),
  },
  {
    id: "rachas",
    icon: Flame,
    title: "Rachas de Disciplina",
    tagline: "El hábito que sí se vuelve adictivo.",
    iconBg: "bg-orange-50 border border-orange-100",
    iconColor: "text-orange-500",
    accentColor: "bg-orange-500",
    borderAccent: "border-t-orange-400",
    details: [
      { heading: "Streaks diarios, no de capital", body: "Tu racha se mide en días de disciplina — no en cuánto dinero tienes. Un estudiante y un profesionista compiten en igualdad de condiciones." },
      { heading: "Interacción diaria obligatoria", body: "Para mantener la racha debes abrir la app cada día. Es el mecanismo de retención más honesto: si usas Azkali, Azkali funciona." },
      { heading: "Penalización real por romperla", body: "Romper una racha borra el progreso visible y activa una notificación de Kali. El costo emocional de perder una racha larga es el mejor disuasivo." },
      { heading: "Rachas visibles para tus amigos", body: "Tu racha es pública para tus contactos dentro de la app. La presión social positiva es uno de los motivadores conductuales más potentes." },
    ],
    mockup: (
      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Tu racha</p>
          <span className="text-xs font-bold text-orange-500">Récord personal 🏆</span>
        </div>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-16 h-16 rounded-2xl bg-orange-50 border border-orange-100 flex flex-col items-center justify-center flex-shrink-0">
            <span className="text-2xl font-heading font-bold text-orange-500 leading-none">45</span>
            <span className="text-[9px] text-orange-400 font-semibold mt-0.5">días</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-zinc-900">Nivel: Disciplinado</p>
            <p className="text-xs text-zinc-400 mt-0.5">15 días para Nivel Estoico</p>
            <div className="mt-2 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
              <div className="h-full w-3/4 bg-orange-400 rounded-full" />
            </div>
          </div>
        </div>
        <div className="flex gap-1">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className={`flex-1 h-7 rounded-lg flex items-center justify-center text-xs ${i < 6 ? "bg-orange-100 text-orange-500" : "bg-zinc-100 text-zinc-300"}`}>
              {i < 6 ? "✓" : "·"}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "social",
    icon: Users,
    title: "Retos Grupales",
    tagline: "Ahorrar con amigos es más fácil que solo.",
    iconBg: "bg-violet-50 border border-violet-100",
    iconColor: "text-violet-500",
    accentColor: "bg-violet-500",
    borderAccent: "border-t-violet-400",
    details: [
      { heading: "Metas compartidas", body: "Crea un reto con una meta específica — vacaciones, fondo de emergencia, gadget — e invita a tus amigos a competir por llegar primero." },
      { heading: "Bóveda colectiva", body: "Todos los participantes contribuyen a una bóveda visible en tiempo real. Ver el dinero de tu grupo crecer es uno de los motivadores más poderosos." },
      { heading: "Leaderboard colaborativo", body: "Un ranking en tiempo real que muestra el progreso de cada participante. La competencia sana entre amigos es el combustible del ahorro." },
      { heading: "Visibilidad total del progreso", body: "Cada miembro puede ver cuánto ha aportado cada quien, cuántos días llevan de racha y quién va ganando." },
    ],
    mockup: (
      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Reto activo</p>
          <span className="text-xs font-bold text-violet-500">15 días restantes</span>
        </div>
        <div className="bg-violet-50 border border-violet-100 rounded-xl p-3 mb-4 text-center">
          <p className="text-xs text-violet-500 font-semibold uppercase tracking-widest mb-1">Meta del grupo</p>
          <p className="text-xl font-heading font-bold text-violet-700">$12,000 MXN</p>
          <p className="text-xs text-violet-400">Vacaciones Cancún 🏖️</p>
        </div>
        {[
          { name: "Tú", pct: 78, color: "bg-[#006341]", amt: "$3,120" },
          { name: "Abigail", pct: 64, color: "bg-violet-400", amt: "$2,560" },
          { name: "Diego", pct: 51, color: "bg-amber-400", amt: "$2,040" },
        ].map(p => (
          <div key={p.name} className="flex items-center gap-2 mb-2">
            <span className="text-[10px] text-zinc-400 w-12 flex-shrink-0">{p.name}</span>
            <div className="flex-1 h-2 bg-zinc-100 rounded-full overflow-hidden">
              <div className={`h-full ${p.color} rounded-full`} style={{ width: `${p.pct}%` }} />
            </div>
            <span className="text-[10px] font-semibold text-zinc-600 w-10 text-right">{p.amt}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "tokens",
    icon: Award,
    title: "Tokens de Disciplina",
    tagline: "Cada buen hábito tiene su recompensa real.",
    iconBg: "bg-amber-50 border border-amber-100",
    iconColor: "text-amber-500",
    accentColor: "bg-amber-500",
    borderAccent: "border-t-amber-400",
    details: [
      { heading: "Tokens por comportamiento, no por saldo", body: "Ganas tokens cada vez que congelas una compra, mantienes tu racha o cumples una meta. No importa cuánto tengas en la cuenta." },
      { heading: "Marketplace de recompensas reales", body: "Los tokens se canjean por cafés gratis, meses de streaming, descuentos en retail y beneficios en el ecosistema Grupo Salinas: Elektra, Italika, Totalplay." },
      { heading: "Beneficios directos en Banco Azteca", body: "Con suficientes tokens puedes acceder a reducción de tasa de interés en créditos o rendimiento extra en productos de inversión." },
      { heading: "Sistema de niveles", body: "Aprendiz → Disciplinado → Estoico → Maestro. Cada nivel desbloquea beneficios exclusivos y mayor visibilidad en el leaderboard." },
    ],
    mockup: (
      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Tu balance</p>
          <span className="text-xs font-bold text-amber-500">+12 esta semana</span>
        </div>
        <div className="text-center mb-4">
          <p className="text-4xl font-heading font-bold text-zinc-900 tracking-tighter">240</p>
          <p className="text-xs text-zinc-400 font-medium">Tokens de Disciplina</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Café gratis", cost: "50 T", emoji: "☕" },
            { label: "1 mes Netflix", cost: "180 T", emoji: "🎬" },
            { label: "-0.5% tasa", cost: "300 T", emoji: "🏦" },
            { label: "Desc. Elektra", cost: "120 T", emoji: "🛍️" },
          ].map(r => (
            <div key={r.label} className="bg-amber-50 border border-amber-100 rounded-xl p-2.5 flex items-center gap-2">
              <span className="text-base">{r.emoji}</span>
              <div>
                <p className="text-[10px] font-semibold text-zinc-700 leading-tight">{r.label}</p>
                <p className="text-[9px] text-amber-500 font-bold">{r.cost}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

export function CoreFeatures() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = sectionRefs.current.map((ref, index) => {
      if (!ref) return null;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveIndex(index); },
        { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
      );
      observer.observe(ref);
      return observer;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  const active = features[activeIndex];

  return (
    <section className="py-20 sm:py-28 bg-zinc-100" aria-label="Core features">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-20"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#006341]/8 border border-[#006341]/20 text-[#006341] text-xs font-semibold tracking-widest uppercase mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#006341]" />
            MVP — Disponible en lanzamiento
          </span>
          <h2 className="font-heading font-medium tracking-tighter text-4xl sm:text-5xl text-zinc-900 leading-tight max-w-2xl">
            Las cuatro armas de Azkali.
          </h2>
          <p className="mt-4 text-zinc-500 text-lg font-light leading-relaxed max-w-xl">
            Todo lo que necesitas para cambiar tu relación con el dinero desde el día uno.
          </p>
        </motion.div>

        {/* Sticky scroll layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 lg:gap-16 items-start">

          {/* ── Sticky sidebar ── */}
          <div className="hidden lg:block sticky top-24 self-start">
            <nav className="space-y-1" aria-label="Feature navigation">
              {features.map((f, i) => {
                const Icon = f.icon;
                const isActive = i === activeIndex;
                return (
                  <button
                    key={f.id}
                    onClick={() => sectionRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" })}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all duration-300 ${
                      isActive
                        ? "bg-white border border-zinc-100"
                        : "hover:bg-white/60"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      isActive ? f.iconBg : "bg-zinc-100 border border-zinc-200"
                    }`}>
                      <Icon strokeWidth={1.5} size={15} className={isActive ? f.iconColor : "text-zinc-400"} />
                    </div>
                    <div className="min-w-0">
                      <p className={`text-sm font-semibold tracking-tight transition-colors duration-300 ${isActive ? "text-zinc-900" : "text-zinc-400"}`}>
                        {f.title}
                      </p>
                    </div>
                    {isActive && (
                      <div className={`ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0 ${f.accentColor}`} />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Mockup removed from sidebar per request */}
          </div>

          {/* ── Scrollable content ── */}
          <div className="space-y-0">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.id}
                  ref={el => { sectionRefs.current[index] = el; }}
                  className="py-14 border-b border-zinc-200 last:border-0"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {/* Mobile: icon */}
                    <div className="flex items-center gap-3 mb-5 lg:hidden">
                      <div className={`w-10 h-10 rounded-2xl ${feature.iconBg} flex items-center justify-center`}>
                        <Icon strokeWidth={1.5} size={18} className={feature.iconColor} />
                      </div>
                    </div>

                    <h3 className="font-heading font-semibold tracking-tighter text-3xl sm:text-4xl text-zinc-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-zinc-400 font-light text-lg mb-8 leading-relaxed">
                      {feature.tagline}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                      {feature.details.map((d, di) => (
                        <div key={d.heading} className={`bg-white rounded-2xl p-5 border border-zinc-100 border-t-2 ${feature.borderAccent}`}>
                          <div className="flex items-start justify-between mb-3">
                            <p className="text-sm font-semibold text-zinc-800 leading-snug">{d.heading}</p>
                            <span className="font-heading font-medium text-3xl text-zinc-100 leading-none ml-2 flex-shrink-0 tabular-nums">
                              {String(di + 1).padStart(2, "0")}
                            </span>
                          </div>
                          <p className="text-sm text-zinc-400 font-light leading-relaxed">{d.body}</p>
                        </div>
                      ))}
                    </div>

                    {/* Mobile: mockup */}
                    <div className="lg:hidden">
                      {feature.mockup}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, ScanSearch, CreditCard, Award } from "lucide-react";

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
      { heading: "Notificaciones conductuales", body: "Cuando detecta un patrón de gasto impulsivo, Kali aparece — no con spam, sino con un recordatorio contextual que usa tu propia data financiera." },
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
    id: "escaner",
    icon: ScanSearch,
    title: "Escáner de Impulsividad",
    tagline: "Tu veredicto financiero antes de cada compra.",
    iconBg: "bg-red-50 border border-red-100",
    iconColor: "text-red-500",
    accentColor: "bg-red-500",
    borderAccent: "border-t-red-400",
    details: [
      { heading: "Micro-chat de contexto financiero", body: "Cuando deseas comprar algo, la IA te hace preguntas de contexto rápidas para evaluar tu situación actual: liquidez, ingresos y prioridades." },
      { heading: "Porcentaje de riesgo de impulsividad", body: "El escáner calcula un porcentaje preciso de impulsividad cruzando el costo del artículo contra tu perfil financiero completo." },
      { heading: "Costo de oportunidad tangible", body: "Te muestra en qué más podrías usar ese dinero: horas de trabajo equivalentes, días de ahorro, o meses de servicios." },
      { heading: "Congelar o ignorar", body: "Después del veredicto, decides: pausar la compra (acumulas tokens) o comprar igual. Sin bloqueos ni juicios." },
    ],
    mockup: (
      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Veredicto Kali</p>
          <span className="text-[10px] bg-red-50 border border-red-100 text-red-500 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">89% Impulsiva</span>
        </div>
        <div className="flex justify-center mb-3">
          <div className="relative w-16 h-16">
            <svg viewBox="0 0 64 64" className="w-full h-full -rotate-90">
              <circle cx="32" cy="32" r="26" fill="none" stroke="#f3f4f6" strokeWidth="6" />
              <circle cx="32" cy="32" r="26" fill="none" stroke="#8B1A1A" strokeWidth="6" strokeDasharray="163" strokeDashoffset="18" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-heading font-bold text-lg text-[#8B1A1A] leading-none">89%</span>
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
    ),
  },
  {
    id: "lealtad",
    icon: CreditCard,
    title: "Lealtad Transaccional",
    tagline: "Tus compras responsables te premian en automático.",
    iconBg: "bg-violet-50 border border-violet-100",
    iconColor: "text-violet-500",
    accentColor: "bg-violet-500",
    borderAccent: "border-t-violet-400",
    details: [
      { heading: "Tokens por cada transacción", body: "Cada compra con tu tarjeta de Banco Azteca acumula tokens automáticamente. Sin pasos extra, sin formularios. Solo usa tu plástico." },
      { heading: "Tasa según producto financiero", body: "Guardadito te da 2 tokens/$1,000. TAZ te da 5. ABCredit Básica te da 8. Oro Garantizada te da 12. La app te muestra cómo multiplicar tus beneficios." },
      { heading: "Incentivo al upselling natural", body: "Verás claramente que migrar de débito a crédito responsable multiplica tus recompensas, gamificando tu madurez financiera." },
      { heading: "Monitoreo en tiempo real", body: "La app lee tu volumen de transacciones y actualiza tu balance de tokens al instante, fomentando la fidelización con Banco Azteca." },
    ],
    mockup: (
      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Tus plásticos</p>
          <span className="text-xs font-bold text-violet-500">Tokens activos</span>
        </div>
        <div className="space-y-2">
          {[
            { name: "Guardadito", rate: "2.0 T", pct: 20 },
            { name: "Tarjeta Azteca", rate: "5.0 T", pct: 50 },
            { name: "ABCredit", rate: "8.0 T", pct: 70 },
            { name: "Oro Garantizada", rate: "12.0 T", pct: 100 },
          ].map(p => (
            <div key={p.name} className="flex items-center gap-2">
              <span className="text-[10px] text-zinc-500 w-20 flex-shrink-0 font-medium">{p.name}</span>
              <div className="flex-1 h-2 bg-zinc-100 rounded-full overflow-hidden">
                <div className="h-full bg-violet-400 rounded-full" style={{ width: `${p.pct}%` }} />
              </div>
              <span className="text-[10px] font-bold text-violet-600 w-8 text-right">{p.rate}</span>
            </div>
          ))}
        </div>
        <p className="text-[9px] text-zinc-400 mt-3 text-center">Tokens por cada $1,000 MXN gastados</p>
      </div>
    ),
  },
  {
    id: "tokens",
    icon: Award,
    title: "Tokens de Resiliencia",
    tagline: "Cada buen hábito tiene su recompensa real.",
    iconBg: "bg-amber-50 border border-amber-100",
    iconColor: "text-amber-500",
    accentColor: "bg-amber-500",
    borderAccent: "border-t-amber-400",
    details: [
      { heading: "Tokens por comportamiento, no por saldo", body: "Ganas tokens cada vez que congelas una compra impulsiva basándote en el análisis de Kali. También acumulas por cada transacción con tus plásticos de Banco Azteca." },
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
          <p className="text-xs text-zinc-400 font-medium">Tokens de Resiliencia</p>
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

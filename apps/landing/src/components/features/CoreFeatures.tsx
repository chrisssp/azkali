"use client";
import { motion } from "framer-motion";
import { Snowflake, Bot, Flame, Users, Award } from "lucide-react";

const features = [
  {
    id: "nevera",
    icon: Snowflake,
    label: "Core · Anti-impulso",
    title: "La Nevera",
    tagline: "Congela el impulso antes de que queme tu cartera.",
    iconBg: "bg-sky-50 border border-sky-100",
    iconColor: "text-sky-500",
    accentColor: "text-sky-500",
    hoverBorder: "hover:border-sky-200",
    details: [
      {
        heading: "Veredicto de impulsividad",
        body: "La IA cruza el monto de la compra contra tu liquidez real mediante un micro-chat y arroja un porcentaje de impulsividad — por ejemplo, '89% Impulsiva'. Sin juicios, solo datos.",
      },
      {
        heading: "Congelamiento de 24 horas",
        body: "Si el veredicto es alto, puedes congelar el gasto por 24 horas. La mayoría de los impulsos se evaporan antes de que el tiempo expire.",
      },
      {
        heading: "Redirección automática al ahorro",
        body: "Si resistes, el monto congelado se redirige automáticamente a tu meta de ahorro activa. El impulso se convierte en progreso real.",
      },
      {
        heading: "Métricas de vida real",
        body: "Azkali traduce cada compra a horas trabajadas, recibos de luz pagados o quincenas de renta — para que el precio no sea un número abstracto.",
      },
    ],
    mockup: (
      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-5 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Decisión activa</p>
          <span className="text-[10px] bg-red-50 border border-red-100 text-red-500 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">89% Impulsiva</span>
        </div>
        <div className="flex items-center gap-3 p-3 bg-zinc-50 rounded-xl">
          <span className="text-lg">👟</span>
          <div>
            <p className="text-sm font-semibold text-zinc-900">Nike Air Max 270</p>
            <p className="text-xs text-zinc-400">$2,799 MXN · ZARA Online</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[{ l: "Horas de trabajo", v: "14.2 hrs" }, { l: "Días de ahorro", v: "3 días" }].map(m => (
            <div key={m.l} className="bg-zinc-50 rounded-xl p-2.5 text-center">
              <p className="text-sm font-heading font-bold text-[#0F6E56]">{m.v}</p>
              <p className="text-[9px] text-zinc-400 mt-0.5">{m.l}</p>
            </div>
          ))}
        </div>
        <button className="w-full bg-sky-500 text-white text-xs py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2">
          🧊 Congelar 24 horas
        </button>
      </div>
    ),
  },
  {
    id: "kali",
    icon: Bot,
    label: "Core · IA conductual",
    title: "Kali — Tu agente de IA",
    tagline: "La voz que necesitas escuchar antes de pagar.",
    iconBg: "bg-emerald-50 border border-emerald-100",
    iconColor: "text-[#0F6E56]",
    accentColor: "text-[#0F6E56]",
    hoverBorder: "hover:border-emerald-200",
    details: [
      {
        heading: "Preguntas reflexivas personalizadas",
        body: "Justo antes del checkout, Kali genera 3 preguntas calibradas a tu historial y contexto financiero — no genéricas, sino diseñadas para romper tu piloto automático.",
      },
      {
        heading: "Traducción a métricas de vida real",
        body: "Kali convierte el monto en unidades que duelen: horas trabajadas, semanas de comida, o meses de suscripción al streaming. El precio cobra otro peso.",
      },
      {
        heading: "Notificaciones conductuales",
        body: "Si llevas días sin abrir la app o tu racha está en riesgo, Kali aparece — no con spam, sino con un recordatorio contextual que usa tu propia data.",
      },
      {
        heading: "Sin tecnicismos",
        body: "Kali habla como tu amiga que estudió economía: directa, sin condescendencia, sin PDFs aburridos. Todo en el lenguaje de la Generación Z mexicana.",
      },
    ],
    mockup: (
      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-5 space-y-2.5">
        <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">Kali interviene</p>
        {[
          { q: "¿Lo habías planeado esta semana?", active: true },
          { q: "¿Tienes el efectivo para pagarlo hoy?", active: false },
          { q: "¿Lo seguirás queriendo en 30 días?", active: false },
        ].map((item, i) => (
          <div key={i} className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs ${item.active ? "bg-[#0F6E56]/8 border border-[#0F6E56]/15 text-[#0F6E56] font-medium" : "bg-zinc-50 text-zinc-400"}`}>
            <span className={`font-bold tabular-nums w-4 flex-shrink-0 ${item.active ? "text-[#0F6E56]" : "text-zinc-300"}`}>{i + 1}.</span>
            {item.q}
          </div>
        ))}
        <div className="flex items-start gap-2 mt-3 bg-[#0F6E56]/5 border border-[#0F6E56]/10 rounded-xl p-3">
          <span className="text-sm flex-shrink-0">🐢</span>
          <p className="text-[11px] text-[#0F6E56] font-medium leading-relaxed">¿Realmente los necesitas o solo los viste en el feed tres veces?</p>
        </div>
      </div>
    ),
  },
  {
    id: "rachas",
    icon: Flame,
    label: "Core · Gamificación",
    title: "Rachas de Disciplina",
    tagline: "El hábito que sí se vuelve adictivo.",
    iconBg: "bg-orange-50 border border-orange-100",
    iconColor: "text-orange-500",
    accentColor: "text-orange-500",
    hoverBorder: "hover:border-orange-200",
    details: [
      {
        heading: "Streaks diarios, no de capital",
        body: "Tu racha se mide en días de disciplina — no en cuánto dinero tienes. Esto nivela el terreno: un estudiante y un profesionista compiten en igualdad de condiciones.",
      },
      {
        heading: "Interacción diaria obligatoria",
        body: "Para mantener la racha activa debes abrir la app cada día. Es el mecanismo de retención más honesto: si usas Azkali, Azkali funciona.",
      },
      {
        heading: "Penalización real por romperla",
        body: "Romper una racha borra el progreso visible y activa una notificación conductual de Kali. El costo emocional de perder una racha larga es el mejor disuasivo.",
      },
      {
        heading: "Rachas visibles para tus amigos",
        body: "Tu racha es pública para tus contactos dentro de la app. La presión social positiva es uno de los motivadores conductuales más potentes.",
      },
    ],
    mockup: (
      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Tu racha</p>
          <span className="text-xs font-bold text-orange-500">Récord personal 🏆</span>
        </div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-16 h-16 rounded-2xl bg-orange-50 border border-orange-100 flex flex-col items-center justify-center">
            <span className="text-2xl font-heading font-bold text-orange-500 leading-none">45</span>
            <span className="text-[9px] text-orange-400 font-semibold mt-0.5">días</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-900">Nivel: Disciplinado</p>
            <p className="text-xs text-zinc-400 mt-0.5">15 días para Nivel Estoico</p>
            <div className="mt-2 w-32 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
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
        <p className="text-[10px] text-zinc-400 text-center mt-2">Últimos 7 días</p>
      </div>
    ),
  },
  {
    id: "social",
    icon: Users,
    label: "Core · Social",
    title: "Retos Grupales",
    tagline: "Ahorrar con amigos es más fácil que solo.",
    iconBg: "bg-violet-50 border border-violet-100",
    iconColor: "text-violet-500",
    accentColor: "text-violet-500",
    hoverBorder: "hover:border-violet-200",
    details: [
      {
        heading: "Metas compartidas",
        body: "Crea un reto con una meta específica — vacaciones, fondo de emergencia, gadget — e invita a tus amigos a competir por llegar primero.",
      },
      {
        heading: "Bóveda colectiva",
        body: "Todos los participantes contribuyen a una bóveda compartida visible en tiempo real. Ver el dinero de tu grupo crecer es uno de los motivadores más poderosos.",
      },
      {
        heading: "Leaderboard colaborativo",
        body: "Un ranking en tiempo real que muestra el progreso de cada participante. La competencia sana entre amigos es el combustible del ahorro sostenido.",
      },
      {
        heading: "Visibilidad del progreso",
        body: "Cada miembro puede ver cuánto ha aportado cada quien, cuántos días llevan de racha y quién va ganando. Transparencia total para mantener la accountability.",
      },
    ],
    mockup: (
      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Reto activo</p>
          <span className="text-xs font-bold text-violet-500">15 días restantes</span>
        </div>
        <div className="bg-violet-50 border border-violet-100 rounded-xl p-3 mb-4 text-center">
          <p className="text-xs text-violet-500 font-semibold uppercase tracking-widest mb-1">Meta del grupo</p>
          <p className="text-xl font-heading font-bold text-violet-700">$12,000 MXN</p>
          <p className="text-xs text-violet-400">Vacaciones Cancún 🏖️</p>
        </div>
        {[
          { name: "Tú", pct: 78, color: "bg-[#0F6E56]", amt: "$3,120" },
          { name: "Abigail", pct: 64, color: "bg-violet-400", amt: "$2,560" },
          { name: "Diego", pct: 51, color: "bg-amber-400", amt: "$2,040" },
        ].map((p, i) => (
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
    label: "Core · Recompensas",
    title: "Tokens de Disciplina",
    tagline: "Cada buen hábito tiene su recompensa real.",
    iconBg: "bg-amber-50 border border-amber-100",
    iconColor: "text-amber-500",
    accentColor: "text-amber-500",
    hoverBorder: "hover:border-amber-200",
    details: [
      {
        heading: "Tokens por comportamiento, no por saldo",
        body: "Ganas 'Tokens de Disciplina' o 'Tokens de Resiliencia' cada vez que congelas una compra, mantienes tu racha activa o cumples una meta. No importa cuánto tengas en la cuenta.",
      },
      {
        heading: "Marketplace de recompensas reales",
        body: "Los tokens se canjean por cafés gratis, meses de streaming, descuentos en retail y beneficios exclusivos dentro del ecosistema de Grupo Salinas: Elektra, Italika, Totalplay.",
      },
      {
        heading: "Beneficios directos en Banco Azteca",
        body: "Con suficientes tokens puedes acceder a reducción de tasa de interés en créditos o rendimiento extra en productos de inversión de Banco Azteca.",
      },
      {
        heading: "Sistema de niveles",
        body: "A más tokens acumulados, mayor es tu nivel: Aprendiz → Disciplinado → Estoico → Maestro. Cada nivel desbloquea beneficios exclusivos y mayor visibilidad en el leaderboard.",
      },
    ],
    mockup: (
      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Tu balance</p>
          <span className="text-xs font-bold text-amber-500">+12 esta semana</span>
        </div>
        <div className="text-center mb-4">
          <p className="text-3xl font-heading font-bold text-zinc-900 tracking-tighter">240</p>
          <p className="text-xs text-zinc-400 font-medium">Tokens de Disciplina</p>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-4">
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
  return (
    <section className="py-20 sm:py-28 bg-zinc-100" aria-label="Core features">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-20"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0F6E56]/8 border border-[#0F6E56]/20 text-[#0F6E56] text-xs font-semibold tracking-widest uppercase mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0F6E56]" />
            MVP — Disponible en lanzamiento
          </span>
          <h2 className="font-heading font-medium tracking-tighter text-4xl sm:text-5xl text-zinc-900 leading-tight max-w-2xl">
            Las cinco armas de Azkali.
          </h2>
          <p className="mt-4 text-zinc-500 text-lg font-light leading-relaxed max-w-xl">
            Todo lo que necesitas para cambiar tu relación con el dinero desde el día uno.
          </p>
        </motion.div>

        <div className="space-y-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.06 }}
                className={`group bg-white rounded-[2rem] border border-zinc-100 ${feature.hoverBorder} hover:shadow-md transition-all duration-500 p-8 lg:p-10`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                  {/* Left: info */}
                  <div>
                    <div className="flex items-center gap-3 mb-5">
                      <div className={`w-11 h-11 rounded-2xl ${feature.iconBg} flex items-center justify-center flex-shrink-0`}>
                        <Icon strokeWidth={1.5} size={20} className={feature.iconColor} />
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${feature.accentColor}`}>
                        {feature.label}
                      </span>
                    </div>
                    <h3 className="font-heading font-semibold tracking-tight text-2xl sm:text-3xl text-zinc-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-zinc-500 font-light text-base mb-8 leading-relaxed">
                      {feature.tagline}
                    </p>

                    <div className="space-y-5">
                      {feature.details.map((d) => (
                        <div key={d.heading} className="flex gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 flex-shrink-0 mt-2" />
                          <div>
                            <p className="text-sm font-semibold text-zinc-800 mb-1">{d.heading}</p>
                            <p className="text-sm text-zinc-400 font-light leading-relaxed">{d.body}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: mockup */}
                  <div className="lg:pt-4">
                    {feature.mockup}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

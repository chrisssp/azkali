"use client";
import { motion } from "framer-motion";
import { GitBranch, Shield, Puzzle } from "lucide-react";

const roadmap = [
  {
    icon: GitBranch,
    label: "Roadmap · Visualización",
    title: "Mapa de Nodos & Máquina del Tiempo",
    tagline: "Ve tu futuro financiero antes de que ocurra.",
    iconBg: "bg-indigo-50 border border-indigo-100",
    iconColor: "text-indigo-500",
    accentColor: "text-indigo-500",
    details: [
      {
        heading: "Canvas de grafos interactivo",
        body: "Sustituye el estado de cuenta tradicional por un mapa visual de nodos que muestra la relación entre tus ingresos, gastos, deudas y metas de forma intuitiva.",
      },
      {
        heading: "Slider predictivo temporal",
        body: "Un control deslizante en el tiempo que proyecta cómo crecen tus deudas vs. tus ahorros dependiendo de las decisiones que tomes hoy. El interés compuesto se vuelve tangible.",
      },
      {
        heading: "Impacto visual de cada decisión",
        body: "Cada compra congelada o cada token ganado se refleja en el grafo en tiempo real. Ver el impacto inmediato de tus decisiones es el refuerzo conductual más poderoso.",
      },
    ],
    mockupPreview: (
      <div className="bg-white rounded-2xl border border-zinc-100 p-5">
        <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-4">Proyección a 12 meses</p>
        <div className="relative h-28 flex items-end gap-1">
          {[20, 35, 30, 50, 45, 65, 60, 78, 72, 88, 82, 95].map((h, i) => (
            <div key={i} className="flex-1 flex flex-col justify-end gap-0.5">
              <div
                className="rounded-t-md bg-gradient-to-t from-[#0F6E56] to-emerald-400 opacity-80"
                style={{ height: `${h}%` }}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-[9px] text-zinc-400">Ene</span>
          <span className="text-[9px] text-zinc-400">Dic</span>
        </div>
        <p className="text-xs text-[#0F6E56] font-semibold text-center mt-3">
          +$47,200 MXN proyectados al año
        </p>
      </div>
    ),
  },
  {
    icon: Shield,
    label: "Roadmap · Inclusión financiera",
    title: "Score de Confianza Azkali",
    tagline: "Si el buró te ignora, Azkali te ve.",
    iconBg: "bg-emerald-50 border border-emerald-100",
    iconColor: "text-[#0F6E56]",
    accentColor: "text-[#0F6E56]",
    details: [
      {
        heading: "Historial conductual como colateral",
        body: "Los meses de disciplina acumulados en La Nevera se convierten en un 'Score de Confianza' propio de Azkali — un indicador de comportamiento financiero real, no de historial crediticio.",
      },
      {
        heading: "Acceso a primer microcrédito formal",
        body: "Un Score de Confianza suficientemente alto desbloquea acceso a un primer microcrédito formal con Banco Azteca para usuarios que hoy son invisibles para el buró de crédito.",
      },
      {
        heading: "Puerta de entrada al sistema financiero",
        body: "Para el 40% de jóvenes mexicanos sin acceso a crédito formal, Azkali es el primer escalón. No un producto bancario, sino el historial que te da derecho a uno.",
      },
    ],
    mockupPreview: (
      <div className="bg-white rounded-2xl border border-zinc-100 p-5">
        <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-4">Score de Confianza</p>
        <div className="flex justify-center mb-4">
          <div className="relative w-24 h-24">
            <svg viewBox="0 0 96 96" className="w-full h-full -rotate-90">
              <circle cx="48" cy="48" r="38" fill="none" stroke="#f3f4f6" strokeWidth="9" />
              <circle cx="48" cy="48" r="38" fill="none" stroke="#0F6E56" strokeWidth="9"
                strokeDasharray="239" strokeDashoffset="48" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-heading font-bold text-2xl text-zinc-900 leading-none">780</span>
              <span className="text-[9px] text-[#0F6E56] font-semibold">Confiable</span>
            </div>
          </div>
        </div>
        <div className="space-y-1.5">
          {[
            { label: "Disciplina (45 días)", w: "85%" },
            { label: "Compras congeladas", w: "72%" },
            { label: "Metas cumplidas", w: "60%" },
          ].map(b => (
            <div key={b.label} className="flex items-center gap-2">
              <span className="text-[9px] text-zinc-400 w-28 flex-shrink-0">{b.label}</span>
              <div className="flex-1 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#0F6E56] rounded-full" style={{ width: b.w }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    icon: Puzzle,
    label: "Roadmap · Enterprise",
    title: "Integración White-Label",
    tagline: "Azkali dentro de tu app bancaria existente.",
    iconBg: "bg-zinc-100 border border-zinc-200",
    iconColor: "text-zinc-500",
    accentColor: "text-zinc-500",
    details: [
      {
        heading: "Plug-and-play sobre infraestructura existente",
        body: "Banco Azteca puede absorber todos los módulos de Azkali directamente dentro de su app principal. Sin fricción de migración, sin reescritura de sistemas.",
      },
      {
        heading: "Módulos independientes",
        body: "La Nevera, Kali IA, el sistema de rachas y los Tokens de Disciplina son módulos desacoplados que pueden implementarse de forma gradual y por separado.",
      },
      {
        heading: "Expansión al ecosistema Grupo Salinas",
        body: "La arquitectura white-label permite que cualquier empresa del grupo — Elektra, Italika, Totalplay — integre los módulos conductuales de Azkali en sus propios flujos de venta.",
      },
    ],
    mockupPreview: (
      <div className="bg-white rounded-2xl border border-zinc-100 p-5">
        <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-4">Partners del ecosistema</p>
        <div className="grid grid-cols-2 gap-2">
          {[
            { name: "Banco Azteca", desc: "App principal", emoji: "🏦", active: true },
            { name: "Elektra", desc: "Puntos de venta", emoji: "🛍️", active: true },
            { name: "Totalplay", desc: "Facturación", emoji: "📡", active: false },
            { name: "Italika", desc: "Crédito moto", emoji: "🏍️", active: false },
          ].map(p => (
            <div key={p.name} className={`rounded-xl p-3 border ${p.active ? "bg-[#0F6E56]/5 border-[#0F6E56]/15" : "bg-zinc-50 border-zinc-100"}`}>
              <span className="text-lg">{p.emoji}</span>
              <p className={`text-xs font-semibold mt-1 ${p.active ? "text-zinc-800" : "text-zinc-400"}`}>{p.name}</p>
              <p className="text-[9px] text-zinc-400">{p.desc}</p>
              {p.active && <span className="text-[8px] text-[#0F6E56] font-bold uppercase tracking-widest">Activo</span>}
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

export function RoadmapFeatures() {
  return (
    <section className="py-20 sm:py-28 bg-white" aria-label="Roadmap features">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-20"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-500 text-xs font-semibold tracking-widest uppercase mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
            Post-MVP — En desarrollo
          </span>
          <h2 className="font-heading font-medium tracking-tighter text-4xl sm:text-5xl text-zinc-900 leading-tight max-w-2xl">
            El futuro de Azkali.
          </h2>
          <p className="mt-4 text-zinc-500 text-lg font-light leading-relaxed max-w-xl">
            Características que están en el roadmap y que llegarán después del lanzamiento inicial.
          </p>
        </motion.div>

        <div className="space-y-6">
          {roadmap.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
                className="group bg-zinc-50 rounded-[2rem] border border-zinc-100 hover:border-zinc-200 hover:shadow-md transition-all duration-500 p-8 lg:p-10 relative overflow-hidden"
              >
                {/* "Próximamente" watermark */}
                <div className="absolute top-6 right-6">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 border border-zinc-200 px-2.5 py-1 rounded-full bg-white">
                    Próximamente
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                  <div>
                    <div className="flex items-center gap-3 mb-5">
                      <div className={`w-11 h-11 rounded-2xl ${feature.iconBg} flex items-center justify-center flex-shrink-0`}>
                        <Icon strokeWidth={1.5} size={20} className={feature.iconColor} />
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${feature.accentColor}`}>
                        {feature.label}
                      </span>
                    </div>
                    <h3 className="font-heading font-semibold tracking-tight text-2xl sm:text-3xl text-zinc-900 mb-2 pr-24">
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
                            <p className="text-sm font-semibold text-zinc-700 mb-1">{d.heading}</p>
                            <p className="text-sm text-zinc-400 font-light leading-relaxed">{d.body}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="lg:pt-4 opacity-80">
                    {feature.mockupPreview}
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

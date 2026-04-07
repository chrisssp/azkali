"use client";
import { motion } from "framer-motion";

export function RoadmapFeatures() {
  return (
    <section className="py-20 sm:py-28 bg-white" aria-label="Roadmap features">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 md:mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-500 text-xs font-semibold tracking-widest uppercase mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
            Post-MVP — En desarrollo
          </span>
          <h2 className="font-heading font-medium tracking-tighter text-4xl sm:text-5xl text-zinc-900 leading-tight max-w-2xl">
            El futuro de Azkali.
          </h2>
          <p className="mt-4 text-zinc-500 text-lg font-light leading-relaxed max-w-xl">
            Características en roadmap que llegarán después del lanzamiento inicial.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-auto">

          {/* Cell 1 — large, spans 2 cols — Mapa de Nodos */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-2 bg-zinc-50 rounded-[2rem] border border-zinc-100 p-8 relative overflow-hidden flex flex-col justify-between min-h-[340px]"
          >
            <span className="absolute top-6 right-6 text-[10px] font-bold uppercase tracking-widest text-zinc-400 border border-zinc-200 px-2.5 py-1 rounded-full bg-white">
              Próximamente
            </span>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-500 mb-3">Visualización</p>
              <h3 className="font-heading font-semibold tracking-tight text-2xl sm:text-3xl text-zinc-900 mb-2 max-w-xs leading-snug">
                Mapa de Nodos & Máquina del Tiempo
              </h3>
              <p className="text-zinc-400 font-light text-sm leading-relaxed max-w-sm">
                Ve tu futuro financiero antes de que ocurra. Un slider temporal que proyecta cómo crecen
                tus deudas vs. tus ahorros dependiendo de las decisiones que tomes hoy.
              </p>
            </div>

            {/* Chart mockup */}
            <div className="mt-8 bg-white rounded-2xl border border-zinc-100 p-5">
              <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-4">
                Proyección a 12 meses
              </p>
              <div className="relative h-24 flex items-end gap-1">
                {[20, 35, 30, 50, 45, 65, 60, 78, 72, 88, 82, 95].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col justify-end">
                    <div
                      className="rounded-t-md bg-gradient-to-t from-[#0F6E56] to-emerald-400"
                      style={{ height: `${h}%`, opacity: 0.6 + i * 0.03 }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-[9px] text-zinc-400">Ene</span>
                <span className="text-[9px] text-[#0F6E56] font-semibold">+$47,200 MXN proyectados</span>
                <span className="text-[9px] text-zinc-400">Dic</span>
              </div>
            </div>

            <ul className="mt-6 flex flex-col gap-2">
              {[
                "Canvas interactivo de grafos financieros",
                "Interés compuesto visualizado en tiempo real",
                "Refuerzo conductual inmediato en cada decisión",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-zinc-500 font-light">
                  <span className="w-1 h-1 rounded-full bg-indigo-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Cell 2 — tall, 1 col — Score de Confianza */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="bg-[#0F6E56]/[0.04] rounded-[2rem] border border-[#0F6E56]/10 p-8 relative overflow-hidden flex flex-col"
          >
            <span className="absolute top-6 right-6 text-[10px] font-bold uppercase tracking-widest text-zinc-400 border border-zinc-200 px-2.5 py-1 rounded-full bg-white">
              Próximamente
            </span>

            <p className="text-[10px] font-bold uppercase tracking-widest text-[#0F6E56] mb-3">Inclusión financiera</p>
            <h3 className="font-heading font-semibold tracking-tight text-xl text-zinc-900 mb-2 leading-snug">
              Score de Confianza Azkali
            </h3>
            <p className="text-zinc-400 font-light text-sm leading-relaxed mb-6">
              Si el buró te ignora, Azkali te ve. Tu historial conductual como puerta de entrada al sistema financiero.
            </p>

            {/* Gauge */}
            <div className="flex justify-center my-4">
              <div className="relative w-28 h-28">
                <svg viewBox="0 0 96 96" className="w-full h-full -rotate-90">
                  <circle cx="48" cy="48" r="38" fill="none" stroke="#e5e7eb" strokeWidth="9" />
                  <circle
                    cx="48" cy="48" r="38" fill="none" stroke="#0F6E56" strokeWidth="9"
                    strokeDasharray="239" strokeDashoffset="48" strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-heading font-bold text-3xl text-zinc-900 leading-none">780</span>
                  <span className="text-[9px] text-[#0F6E56] font-semibold mt-0.5">Confiable</span>
                </div>
              </div>
            </div>

            <div className="mt-auto space-y-2">
              {[
                { label: "Disciplina (45 días)", w: "85%" },
                { label: "Compras congeladas", w: "72%" },
                { label: "Metas cumplidas", w: "60%" },
              ].map((b) => (
                <div key={b.label} className="flex items-center gap-2">
                  <span className="text-[9px] text-zinc-400 w-28 flex-shrink-0">{b.label}</span>
                  <div className="flex-1 h-1.5 bg-white rounded-full overflow-hidden">
                    <div className="h-full bg-[#0F6E56] rounded-full" style={{ width: b.w }} />
                  </div>
                </div>
              ))}
            </div>

            <p className="text-[10px] text-zinc-400 font-light mt-5 leading-relaxed">
              Para el 40% de jóvenes mexicanos sin acceso a crédito formal, Azkali es el primer escalón.
            </p>
          </motion.div>

          {/* Cell 3 — full width strip — White-Label */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="md:col-span-3 bg-zinc-950 rounded-[2rem] p-8 lg:p-10 relative overflow-hidden"
          >
            <span className="absolute top-6 right-6 text-[10px] font-bold uppercase tracking-widest text-zinc-500 border border-zinc-700 px-2.5 py-1 rounded-full">
              Próximamente
            </span>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-3">Enterprise</p>
                <h3 className="font-heading font-semibold tracking-tight text-2xl sm:text-3xl text-white mb-3 leading-snug">
                  Integración White-Label
                </h3>
                <p className="text-zinc-400 font-light text-base leading-relaxed mb-6 max-w-md">
                  Azkali dentro de tu app bancaria existente. Plug-and-play sobre infraestructura existente,
                  sin fricción de migración. Módulos desacoplados para implementación gradual.
                </p>
                <p className="text-xs text-zinc-500 font-light leading-relaxed max-w-sm">
                  La arquitectura white-label permite que cualquier empresa del Grupo Salinas — Elektra, Italika,
                  Totalplay — integre los módulos conductuales de Azkali en sus propios flujos de venta.
                </p>
              </div>

              {/* Partner grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { name: "Banco Azteca", desc: "App principal", emoji: "🏦", active: true },
                  { name: "Elektra", desc: "Puntos de venta", emoji: "🛍️", active: true },
                  { name: "Totalplay", desc: "Facturación", emoji: "📡", active: false },
                  { name: "Italika", desc: "Crédito moto", emoji: "🏍️", active: false },
                ].map((p) => (
                  <div
                    key={p.name}
                    className={`rounded-2xl p-4 border ${
                      p.active
                        ? "bg-[#0F6E56]/10 border-[#0F6E56]/20"
                        : "bg-white/[0.03] border-white/[0.06]"
                    }`}
                  >
                    <span className="text-2xl">{p.emoji}</span>
                    <p className={`text-xs font-semibold mt-2 ${p.active ? "text-white" : "text-zinc-500"}`}>
                      {p.name}
                    </p>
                    <p className="text-[10px] text-zinc-500">{p.desc}</p>
                    {p.active && (
                      <span className="inline-block mt-1.5 text-[8px] text-[#0F6E56] font-bold uppercase tracking-widest">
                        Activo
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

"use client";
import { motion } from "framer-motion";

const pillars = [
  {
    number: "01",
    title: "System Prompting con contexto financiero",
    body: "Kali no improvisa. Cada respuesta está construida sobre un prompt de sistema con inyección de contexto financiero del usuario — su historial, liquidez actual y patrones de gasto — para que las preguntas sean relevantes y no genéricas.",
    tag: "Contexto",
    accent: "text-violet-500",
    tagBg: "bg-violet-50 border-violet-100 text-violet-600",
  },
  {
    number: "02",
    title: "JSON Mode para salidas estructuradas",
    body: "Los veredictos de impulsividad se fuerzan a salir en JSON Mode. Esto garantiza que ninguna respuesta del LLM pueda romper la interfaz — el porcentaje siempre es un número, el veredicto siempre es un string válido.",
    tag: "Confiabilidad",
    accent: "text-sky-500",
    tagBg: "bg-sky-50 border-sky-100 text-sky-600",
  },
  {
    number: "03",
    title: "Árbol de decisiones determinístico como contingencia",
    body: "Para el MVP existe un árbol de decisiones local que funciona sin conexión al LLM. Si el modelo falla o hay latencia, el usuario recibe un veredicto igualmente útil en cero milisegundos.",
    tag: "Resiliencia",
    accent: "text-[#006341]",
    tagBg: "bg-emerald-50 border-emerald-100 text-emerald-700",
  },
  {
    number: "04",
    title: "Latencia cero en el momento crítico",
    body: "El checkout es el momento de mayor vulnerabilidad conductual. Kali debe responder antes de que el usuario tenga tiempo de racionalizar su impulso. Veredicto en menos de 800ms.",
    tag: "Performance",
    accent: "text-amber-500",
    tagBg: "bg-amber-50 border-amber-100 text-amber-600",
  },
];

export function AIEngine() {
  return (
    <section className="py-20 sm:py-28 bg-zinc-100 overflow-hidden" aria-label="Mecánica de IA">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Editorial header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20 items-end"
        >
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-400 mb-6">
              Bajo el capó
            </p>
            <h2 className="font-heading font-medium tracking-tighter text-5xl sm:text-6xl lg:text-7xl text-zinc-900 leading-[1.0]">
              Kali no es
              <br />
              un chatbot.
            </h2>
          </div>
          <div className="lg:pb-2">
            <p className="text-zinc-500 text-lg font-light leading-relaxed mb-5">
              Es un sistema conductual con cuatro capas de ingeniería diseñadas para intervenir
              en el momento exacto correcto, con la respuesta correcta, sin fallar nunca.
            </p>
            <p className="text-sm text-zinc-400 font-light leading-relaxed">
              Agnóstica al modelo de lenguaje — funciona con cualquier LLM que soporte JSON Mode
              y system prompting. Para el MVP: Claude Haiku y GPT-4o mini.
            </p>
          </div>
        </motion.div>

        {/* Statement list */}
        <div>
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.07 }}
              className="group pb-10"
            >
              <div className="pt-10 grid grid-cols-1 lg:grid-cols-[80px_1fr_1fr] gap-6 lg:gap-10 items-start">
                {/* Number */}
                <div className="flex items-center gap-4 lg:block">
                  <span className={`font-heading font-medium text-2xl tabular-nums transition-colors duration-300 group-hover:text-[#006341] ${pillar.accent}`}>
                    {pillar.number}
                  </span>
                  <span className={`lg:hidden text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-400`}>
                    {pillar.tag}
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h3 className="font-heading font-medium tracking-tight text-xl sm:text-2xl text-zinc-900 leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="hidden lg:block mt-3 text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-400">
                    {pillar.tag}
                  </p>
                </div>

                {/* Body */}
                <p className="text-zinc-400 font-light leading-relaxed text-base">
                  {pillar.body}
                </p>
              </div>

              {/* Animated line */}
              <div className="mt-10 h-px bg-zinc-200 relative overflow-hidden">
                <div className="absolute inset-y-0 left-0 w-0 group-hover:w-full bg-[#006341] transition-all duration-500 ease-out" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technical note — full width */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="mt-14 bg-white rounded-[2rem] border border-zinc-100 p-8 lg:p-10"
        >
          <div>
            <p className="text-sm font-semibold text-zinc-800 mb-2">Nota técnica del equipo</p>
            <p className="text-sm text-zinc-400 font-light leading-relaxed max-w-2xl">
              Kali es agnóstica al modelo de lenguaje — funciona con cualquier LLM que soporte JSON Mode
              y system prompting. Para el MVP evaluamos <span className="text-zinc-600 font-medium">Claude Haiku</span> y{" "}
              <span className="text-zinc-600 font-medium">GPT-4o mini</span> como proveedores principales
              por su balance entre latencia y calidad de razonamiento conductual.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

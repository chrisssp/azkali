"use client";
import { motion } from "framer-motion";
import { Cpu, Code2, Zap, ShieldCheck } from "lucide-react";

const pillars = [
  {
    icon: Cpu,
    title: "System Prompting con contexto financiero",
    body: "Kali no improvisa. Cada respuesta está construida sobre un prompt de sistema con inyección de contexto financiero del usuario — su historial, liquidez actual y patrones de gasto — para que las preguntas sean relevantes y no genéricas.",
    iconBg: "bg-violet-50 border border-violet-100",
    iconColor: "text-violet-500",
  },
  {
    icon: Code2,
    title: "JSON Mode para salidas estructuradas",
    body: "Los veredictos de impulsividad y las respuestas de Kali se fuerzan a salir en JSON Mode. Esto garantiza que ninguna respuesta del LLM pueda romper la interfaz — el porcentaje siempre es un número, el veredicto siempre es un string válido.",
    iconBg: "bg-sky-50 border border-sky-100",
    iconColor: "text-sky-500",
  },
  {
    icon: ShieldCheck,
    title: "Árbol de decisiones determinístico como contingencia",
    body: "Para el MVP existe un árbol de decisiones local que funciona sin conexión al LLM. Si el modelo falla o hay latencia, el usuario recibe un veredicto igualmente útil en cero milisegundos. La experiencia nunca se rompe.",
    iconBg: "bg-emerald-50 border border-emerald-100",
    iconColor: "text-[#0F6E56]",
  },
  {
    icon: Zap,
    title: "Latencia cero en el momento crítico",
    body: "El checkout es el momento de mayor vulnerabilidad conductual. Kali debe responder antes de que el usuario tenga tiempo de racionalizar su impulso. La arquitectura está diseñada para que el veredicto aparezca en menos de 800ms.",
    iconBg: "bg-amber-50 border border-amber-100",
    iconColor: "text-amber-500",
  },
];

export function AIEngine() {
  return (
    <section className="py-20 sm:py-28 bg-zinc-100" aria-label="Mecánica de IA">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-20"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-50 border border-violet-100 text-violet-600 text-xs font-semibold tracking-widest uppercase mb-5">
            <Cpu size={11} />
            Bajo el capó — Mecánica de IA
          </span>
          <h2 className="font-heading font-medium tracking-tighter text-4xl sm:text-5xl text-zinc-900 leading-tight max-w-2xl">
            Kali no es un chatbot.
            <br />
            <span className="bg-gradient-to-r from-[#0F6E56] to-emerald-500 bg-clip-text text-transparent">
              Es un sistema conductual.
            </span>
          </h2>
          <p className="mt-4 text-zinc-500 text-lg font-light leading-relaxed max-w-xl">
            La IA detrás de Azkali está diseñada para intervenir en el momento exacto correcto,
            con la respuesta correcta, sin fallar nunca.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
                className="bg-white rounded-[2rem] border border-zinc-100 hover:border-zinc-200 hover:shadow-md transition-all duration-500 p-7"
              >
                <div className={`w-11 h-11 rounded-2xl ${pillar.iconBg} flex items-center justify-center mb-5`}>
                  <Icon strokeWidth={1.5} size={20} className={pillar.iconColor} />
                </div>
                <h3 className="font-heading font-semibold tracking-tight text-lg text-zinc-900 mb-3 leading-snug">
                  {pillar.title}
                </h3>
                <p className="text-zinc-400 text-sm font-light leading-relaxed">
                  {pillar.body}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Technical note */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="mt-8 bg-white rounded-2xl border border-zinc-100 p-6 flex items-start gap-4"
        >
          <div className="w-9 h-9 rounded-xl bg-[#0F6E56]/8 border border-[#0F6E56]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-base">🐢</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-800 mb-1">Nota técnica del equipo</p>
            <p className="text-sm text-zinc-400 font-light leading-relaxed">
              Kali es agnóstica al modelo de lenguaje — funciona con cualquier LLM que soporte JSON Mode y system prompting. Para el MVP evaluamos Claude Haiku y GPT-4o mini como proveedores principales por su balance entre latencia y calidad de razonamiento conductual.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";
import { motion } from "framer-motion";
import { CreditCard, BarChart2, Clock } from "lucide-react";

const stats = [
  {
    icon: CreditCard,
    number: "+40%",
    stat: "De usuarios de tarjeta en México solo pagan el mínimo",
    context:
      "Pagar el mínimo cada mes puede costarte hasta 3 veces el valor original de tu deuda.",
    source: "Banxico / CONDUSEF",
    iconBg: "bg-red-50 border border-red-100",
    iconColor: "text-red-500",
    numberColor: "text-[#006341]",
    accentLine: "bg-red-200",
  },
  {
    icon: BarChart2,
    number: "~50%",
    stat: "De mexicanos no lleva ningún registro de sus gastos",
    context:
      "Sin saber a dónde va tu dinero, no puedes controlar a dónde va tu futuro.",
    source: "ENIF / INEGI",
    iconBg: "bg-emerald-50 border border-emerald-100",
    iconColor: "text-[#006341]",
    numberColor: "text-[#006341]",
    accentLine: "bg-emerald-200",
  },
  {
    icon: Clock,
    number: "Meses",
    stat: "De trabajo en intereses por una compra de $2,799 a MSI",
    context:
      "Una compra de $2,799 MXN en 18 meses sin intereses puede costarte más de $4,000 en total.",
    source: "Estimación con TIIE + comisiones",
    iconBg: "bg-amber-50 border border-amber-100",
    iconColor: "text-amber-500",
    numberColor: "text-[#006341]",
    accentLine: "bg-amber-200",
  },
];

export function Problem() {
  return (
    <section
      id="el-problema"
      className="relative py-24 sm:py-32 bg-zinc-100 overflow-hidden"
      aria-label="El problema"
    >
      {/* Subtle decorations */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#006341]/5 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-50 pointer-events-none" />

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
            — El problema real —
          </p>
          <h2 className="font-heading font-medium tracking-tighter text-4xl sm:text-5xl md:text-7xl text-zinc-900 leading-[1.1]">
            El sistema está diseñado
            <br />
            <span className="bg-gradient-to-r from-red-500 via-rose-500 to-orange-400 bg-clip-text text-transparent">
              para que te endeudes.
            </span>
          </h2>
          <p className="mt-8 text-zinc-500 text-lg md:text-xl max-w-3xl mx-auto tracking-tight font-light leading-relaxed">
            No es tu culpa. Las apps de compras, los bancos y las MSI están optimizados
            para que gastes más de lo que deberías. Azkali pone eso en evidencia.
          </p>
        </motion.div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {stats.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                  delay: index * 0.15,
                }}
                className="group relative bg-white rounded-[2rem] border border-zinc-100 hover:shadow-xl hover:border-[#006341] overflow-hidden transition-all duration-500 p-8 flex flex-col cursor-default"
              >
                {/* Green fill on hover */}
                <div className="absolute inset-0 bg-[#006341] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[2rem]" />

                {/* Icon */}
                <div className={`relative w-12 h-12 rounded-2xl ${item.iconBg} group-hover:bg-white/20 group-hover:border-white/30 flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-110`}>
                  <Icon strokeWidth={1.5} className={`w-5 h-5 ${item.iconColor} group-hover:text-white transition-colors duration-500`} />
                </div>

                {/* Number */}
                <p className={`relative font-heading font-medium tracking-tighter text-5xl lg:text-6xl ${item.numberColor} group-hover:text-white mb-4 transition-colors duration-500`}>
                  {item.number}
                </p>

                {/* Stat */}
                <h3 className="relative font-medium text-zinc-800 group-hover:text-white text-lg mb-4 tracking-tight leading-snug transition-colors duration-500">
                  {item.stat}
                </h3>

                {/* Context */}
                <p className="relative text-zinc-400 group-hover:text-white/80 text-sm leading-relaxed flex-1 font-light transition-colors duration-500">
                  {item.context}
                </p>

                {/* Source */}
                <div className="relative mt-8 pt-6 border-t border-zinc-100 group-hover:border-white/20 transition-colors duration-500">
                  <p className="text-zinc-400 group-hover:text-white/60 text-[10px] uppercase tracking-widest font-medium transition-colors duration-500">
                    Fuente: {item.source}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

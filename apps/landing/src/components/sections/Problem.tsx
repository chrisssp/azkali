"use client";
import { motion } from "framer-motion";
import { CreditCard, BarChart2, Clock } from "lucide-react";

const stats = [
  {
    icon: CreditCard,
    number: "+40%",
    stat: "de usuarios de tarjeta en México solo pagan el mínimo",
    context:
      "Pagar el mínimo cada mes puede costarte hasta 3 veces el valor original de tu deuda.",
    source: "Banxico / CONDUSEF",
    color: "bg-brand-guinda/10",
    iconColor: "text-brand-guinda",
  },
  {
    icon: BarChart2,
    number: "~50%",
    stat: "de mexicanos no lleva ningún registro de sus gastos",
    context:
      "Sin saber a dónde va tu dinero, no puedes controlar a dónde va tu futuro.",
    source: "ENIF / INEGI",
    color: "bg-brand-green/10",
    iconColor: "text-brand-green",
  },
  {
    icon: Clock,
    number: "Meses",
    stat: "de trabajo en intereses por una compra de $2,799 MXN a MSI",
    context:
      "Una compra de $2,799 MXN en 18 meses sin intereses puede costarte más de $4,000 en total.",
    source: "Estimación con TIIE + comisiones",
    color: "bg-amber-500/10",
    iconColor: "text-amber-600",
  },
];

export function Problem() {
  return (
    <section
      id="el-problema"
      className="py-20 sm:py-28 bg-gray-950"
      aria-label="El problema"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-brand-guinda/20 text-brand-guinda-300 text-xs font-semibold mb-4"
            style={{ color: "#f87171" }}
          >
            El problema real
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
            El sistema está diseñado
            <br />
            <span style={{ color: "#8B1A1A" }}>para que te endeudes</span>
          </h2>
          <p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto">
            No es tu culpa. Las apps de compras, los bancos y las MSI están optimizados
            para que gastes más de lo que deberías. Azkali pone eso en evidencia.
          </p>
        </motion.div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.stat}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                  delay: index * 0.15,
                }}
              >
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 h-full flex flex-col hover:border-gray-700 transition-colors duration-200">
                  {/* Icon */}
                  <div
                    className={`w-11 h-11 rounded-xl ${item.color} flex items-center justify-center mb-5`}
                  >
                    <Icon size={20} className={item.iconColor} />
                  </div>

                  {/* Number */}
                  <p className="font-heading font-bold text-5xl text-brand-green mb-2">
                    {item.number}
                  </p>

                  {/* Stat */}
                  <p className="font-semibold text-white text-base mb-3 leading-snug">
                    {item.stat}
                  </p>

                  {/* Context */}
                  <p className="text-gray-400 text-sm leading-relaxed flex-1">
                    {item.context}
                  </p>

                  {/* Source */}
                  <p className="text-gray-600 text-xs mt-4 pt-4 border-t border-gray-800">
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

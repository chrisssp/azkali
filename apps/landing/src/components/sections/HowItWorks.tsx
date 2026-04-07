"use client";
import { motion } from "framer-motion";
import { ShoppingCart, MessageCircle, CheckCircle2, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: ShoppingCart,
    title: "El impulso",
    description: "Estás a un clic de comprar algo que no necesitas.",
    detail:
      "Azkali detecta la compra en tiempo real — ya sea en una tienda en línea o cuando escaneas un código QR.",
    mockup: (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
            <ShoppingCart size={14} className="text-orange-500" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-900">Compra detectada</p>
            <p className="text-[10px] text-gray-400">ZARA.com · hace 2 seg</p>
          </div>
        </div>
        <div className="bg-gray-50 rounded-xl p-3">
          <p className="text-xs text-gray-500 mb-1">Producto</p>
          <p className="text-sm font-bold text-gray-900">Tenis Nike · $2,799</p>
        </div>
        <div className="mt-3 flex items-center gap-1">
          <div className="flex-1 h-1 bg-orange-400 rounded-full" />
          <div className="flex-1 h-1 bg-gray-200 rounded-full" />
          <div className="flex-1 h-1 bg-gray-200 rounded-full" />
          <span className="text-[9px] text-gray-400 ml-1">Paso 1/3</span>
        </div>
      </div>
    ),
    color: "bg-orange-500/10",
    iconColor: "text-orange-500",
    accent: "bg-orange-500",
  },
  {
    number: "02",
    icon: MessageCircle,
    title: "La intervención",
    description: "Kali te lanza 3 preguntas que te sacan del modo automático.",
    detail:
      "En lugar de bloquearte, Kali activa tu corteza prefrontal con preguntas simples que rompen el sesgo del presente.",
    mockup: (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-full bg-brand-green flex items-center justify-center">
            <span className="text-white text-xs">🐢</span>
          </div>
          <p className="text-xs font-semibold text-brand-green">Kali pregunta:</p>
        </div>
        <div className="space-y-2">
          {[
            "¿Lo habías planeado esta semana?",
            "¿Tienes el efectivo para pagarlo hoy?",
            "¿Lo seguirás queriendo en 30 días?",
          ].map((q, i) => (
            <div
              key={i}
              className={`rounded-xl px-3 py-2 text-xs flex items-center gap-2 ${
                i === 0
                  ? "bg-brand-green/10 text-brand-green font-medium"
                  : "bg-gray-50 text-gray-400"
              }`}
            >
              <span className="font-bold">{i + 1}.</span> {q}
            </div>
          ))}
        </div>
      </div>
    ),
    color: "bg-brand-green/10",
    iconColor: "text-brand-green",
    accent: "bg-brand-green",
  },
  {
    number: "03",
    icon: CheckCircle2,
    title: "El resultado",
    description:
      "Ves el veredicto: cuántas horas trabajaste para eso y si vale la pena.",
    detail:
      "El porcentaje de impulsividad, tus horas de trabajo, días de ahorro y la recomendación de Kali — todo en una pantalla.",
    mockup: (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold text-gray-900">Veredicto Kali</p>
          <span className="text-[10px] bg-brand-guinda/10 text-brand-guinda px-2 py-0.5 rounded-full font-semibold"
            style={{ color: "#8B1A1A" }}
          >
            89% Impulsiva
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-3">
          {[
            { label: "Horas de trabajo", val: "14.2 hrs", color: "text-brand-green" },
            { label: "Días de ahorro", val: "3 días", color: "text-brand-green" },
          ].map((m) => (
            <div key={m.label} className="bg-gray-50 rounded-xl p-2 text-center">
              <p className={`text-sm font-heading font-bold ${m.color}`}>{m.val}</p>
              <p className="text-[9px] text-gray-400 mt-0.5">{m.label}</p>
            </div>
          ))}
        </div>
        <button className="w-full bg-brand-green text-white rounded-xl py-2 text-xs font-semibold">
          🧊 Mandar a la Nevera
        </button>
      </div>
    ),
    color: "bg-blue-500/10",
    iconColor: "text-blue-500",
    accent: "bg-blue-500",
  },
];

export function HowItWorks() {
  return (
    <section
      id="como-funciona"
      className="py-20 sm:py-28 bg-white"
      aria-label="Cómo funciona Azkali"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-brand-green/10 text-brand-green text-xs font-semibold mb-4">
            Así funciona
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-900 leading-tight">
            Tu copiloto financiero entra justo
            <br className="hidden sm:block" />
            <span className="text-brand-green"> cuando más lo necesitas</span>
          </h2>
          <p className="mt-4 text-gray-500 text-lg max-w-2xl mx-auto">
            Tres pasos. Cero tecnicismos. Solo Kali entre tú y una decisión que podrías lamentar.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-[88px] left-[calc(16.666%+2rem)] right-[calc(16.666%+2rem)] h-0.5 bg-gradient-to-r from-orange-200 via-brand-green/40 to-blue-200" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.3,
                    ease: "easeOut",
                    delay: index * 0.12,
                  }}
                  className="flex flex-col"
                >
                  {/* Step header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="relative flex-shrink-0">
                      <div
                        className={`w-14 h-14 rounded-2xl ${step.color} flex items-center justify-center`}
                      >
                        <Icon size={22} className={step.iconColor} />
                      </div>
                      <span
                        className={`absolute -top-2 -right-2 w-6 h-6 ${step.accent} rounded-full flex items-center justify-center text-white text-[10px] font-bold`}
                      >
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium mb-0.5">
                        Paso {step.number}
                      </p>
                      <h3 className="font-heading font-bold text-lg text-gray-900">
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 font-medium text-base mb-2 leading-snug">
                    {step.description}
                  </p>
                  <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                    {step.detail}
                  </p>

                  {/* Mockup */}
                  <div className="mt-auto">{step.mockup}</div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: "easeOut", delay: 0.2 }}
          className="text-center mt-14"
        >
          <a
            href="#descargar"
            className="inline-flex items-center gap-2 bg-brand-green text-white px-8 py-4 rounded-full font-semibold text-base hover:bg-brand-green-600 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
          >
            Prueba el simulador gratis
            <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

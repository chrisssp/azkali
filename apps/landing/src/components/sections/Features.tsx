"use client";
import { motion } from "framer-motion";
import { Snowflake, Award, Users, Bot } from "lucide-react";

const features = [
  {
    icon: Snowflake,
    title: "La Nevera",
    description:
      "Congela el impulso 24 horas y conviértelo en ahorro. Si en 24h sigues queriéndolo, entonces sí lo compras.",
    color: "bg-sky-500/10",
    iconColor: "text-sky-500",
    borderHover: "hover:border-sky-400",
    tag: "Anti-impulso",
  },
  {
    icon: Award,
    title: "Tokens de Disciplina",
    description:
      "Gana recompensas canjeables por cada buen hábito financiero. Cada decisión consciente suma puntos reales.",
    color: "bg-amber-500/10",
    iconColor: "text-amber-500",
    borderHover: "hover:border-amber-400",
    tag: "Gamificación",
  },
  {
    icon: Users,
    title: "Retos Grupales",
    description:
      "Ahorra con tus amigos y gánale a la inflación juntos. Porque cuando hay competencia, hay motivación.",
    color: "bg-violet-500/10",
    iconColor: "text-violet-500",
    borderHover: "hover:border-violet-400",
    tag: "Social",
  },
  {
    icon: Bot,
    title: "Kali, tu guía de IA",
    description:
      "Aprende finanzas en tu idioma, sin PDFs aburridos. Kali te explica todo como si fuera tu amiga que estudió economía.",
    color: "bg-brand-green/10",
    iconColor: "text-brand-green",
    borderHover: "hover:border-brand-green",
    tag: "IA conductual",
  },
];

export function Features() {
  return (
    <section
      id="features"
      className="py-20 sm:py-28 bg-gray-50"
      aria-label="Features de Azkali"
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
          <span className="inline-block px-3 py-1 rounded-full bg-brand-green/10 text-brand-green text-xs font-semibold mb-4">
            Core features
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-900 leading-tight">
            Todo lo que Azkali
            <br />
            <span className="text-brand-green">hace por ti</span>
          </h2>
          <p className="mt-4 text-gray-500 text-lg max-w-xl mx-auto">
            No es una app de presupuestos aburrida. Es un sistema conductual que cambia
            cómo tomas decisiones financieras.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                  delay: index * 0.1,
                }}
                whileHover={{ scale: 1.02 }}
                transition2={{ duration: 0.2 }}
                className={`bg-white rounded-2xl p-7 border-2 border-transparent ${feature.borderHover} hover:shadow-card-hover transition-all duration-200 cursor-default group`}
              >
                <div className="flex items-start gap-5">
                  <div
                    className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200`}
                  >
                    <Icon size={22} className={feature.iconColor} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-heading font-bold text-lg text-gray-900">
                        {feature.title}
                      </h3>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 font-medium whitespace-nowrap">
                        {feature.tag}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: "easeOut", delay: 0.3 }}
          className="flex justify-center mt-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-green/5 border border-brand-green/20 rounded-full text-brand-green text-sm font-medium">
            <span>🐢</span>
            Kali aprende de tus hábitos y mejora con el tiempo
          </div>
        </motion.div>
      </div>
    </section>
  );
}

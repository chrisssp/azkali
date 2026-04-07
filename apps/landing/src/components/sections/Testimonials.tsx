"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Mateo",
    age: 21,
    city: "CDMX",
    initials: "MA",
    color: "bg-brand-green",
    stars: 5,
    quote:
      "Iba a comprar unos tenis a MSI. Kali me mostró que eran 87 horas de trabajo. Los mandé a la nevera. Todavía están ahí y ya no los quiero tanto.",
    tag: "Frenó $2,799 MXN",
  },
  {
    name: "Abigail",
    age: 22,
    city: "Monterrey",
    initials: "AB",
    color: "bg-violet-500",
    stars: 5,
    quote:
      "Soy freelancer y el banco me ignoraba. Azkali me ayudó a demostrar que sí puedo manejar mi dinero. Ahora tengo más claro a dónde va cada peso.",
    tag: "Independencia financiera",
  },
  {
    name: "Diego",
    age: 23,
    city: "Guadalajara",
    initials: "DI",
    color: "bg-amber-500",
    stars: 5,
    quote:
      "Mi racha va en 45 días. Mi cuenta también va para arriba. Nunca pensé que una app de finanzas podría darme el mismo rush que un videojuego.",
    tag: "45 días de racha 🔥",
  },
];

function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof testimonials)[0];
}) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm h-full flex flex-col hover:border-brand-green/30 hover:shadow-card-hover transition-all duration-200">
      {/* Stars */}
      <div className="flex gap-0.5 mb-4">
        {Array.from({ length: testimonial.stars }).map((_, i) => (
          <Star
            key={i}
            size={14}
            className="fill-amber-400 text-amber-400"
          />
        ))}
      </div>

      {/* Quote */}
      <p className="text-gray-700 text-base leading-relaxed flex-1 mb-6">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      {/* Tag */}
      <div className="mb-4">
        <span className="inline-block px-3 py-1 rounded-full bg-brand-green/10 text-brand-green text-xs font-semibold">
          {testimonial.tag}
        </span>
      </div>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
        <div
          className={`w-10 h-10 rounded-full ${testimonial.color} flex items-center justify-center flex-shrink-0`}
        >
          <span className="text-white font-bold text-sm font-heading">
            {testimonial.initials}
          </span>
        </div>
        <div>
          <p className="font-semibold text-gray-900 text-sm">
            {testimonial.name}, {testimonial.age}
          </p>
          <p className="text-gray-400 text-xs">{testimonial.city}</p>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  const dragRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="testimonios"
      className="py-20 sm:py-28 bg-white"
      aria-label="Testimonios"
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
            Comunidad Azkali
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-900 leading-tight">
            Lo que dicen los que ya
            <br />
            <span className="text-brand-green">frenaron el impulso</span>
          </h2>
          <p className="mt-4 text-gray-500 text-lg max-w-xl mx-auto">
            Gente real. Decisiones reales. Dinero que ahora sí está donde debe estar.
          </p>
        </motion.div>

        {/* Desktop grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
                delay: index * 0.12,
              }}
            >
              <TestimonialCard testimonial={testimonial} />
            </motion.div>
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden overflow-hidden" ref={dragRef}>
          <motion.div
            drag="x"
            dragConstraints={dragRef}
            dragElastic={0.1}
            className="flex gap-4 cursor-grab active:cursor-grabbing"
            style={{ width: `${testimonials.length * 85}vw` }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                className="flex-shrink-0"
                style={{ width: "80vw" }}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                  delay: index * 0.1,
                }}
              >
                <TestimonialCard testimonial={testimonial} />
              </motion.div>
            ))}
          </motion.div>
          <p className="text-center text-xs text-gray-400 mt-4">
            ← Desliza para ver más →
          </p>
        </div>

        {/* Bottom stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: "easeOut", delay: 0.2 }}
          className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12"
        >
          {[
            { value: "4.8/5", label: "Calificación promedio" },
            { value: "+10,000", label: "Usuarios activos" },
            { value: "92%", label: "Recomiendan Azkali" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-heading font-bold text-3xl text-brand-green">
                {stat.value}
              </p>
              <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

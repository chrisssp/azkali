"use client";
import { motion } from "framer-motion";

export function FeaturesCTA() {
  return (
    <section className="py-20 sm:py-28 bg-white" aria-label="CTA features">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          <span className="text-5xl">🐢</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          className="font-heading font-medium tracking-tighter text-3xl sm:text-5xl text-zinc-900 leading-[1.1] mb-5"
        >
          ¿Listo para que Kali
          <br />
          <span className="bg-gradient-to-r from-[#006341] to-emerald-400 bg-clip-text text-transparent">
            entre en acción?
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.14 }}
          className="text-zinc-500 text-lg font-light leading-relaxed mb-10 max-w-xl mx-auto"
        >
          Toda esta tecnología viene en una app gratuita. Sin suscripción, sin letra chica.
          Solo tú, Kali y mejores decisiones financieras.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <a
            href="/#descargar"
            className="inline-flex items-center justify-center bg-[#006341] text-white px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-[#003930] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-[#006341]/20"
          >
            Descarga gratis
          </a>
        </motion.div>
      </div>
    </section>
  );
}

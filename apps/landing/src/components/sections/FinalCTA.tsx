"use client";
import { motion } from "framer-motion";

function AppStoreBadge() {
  return (
    <a
      href="#"
      className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-5 py-3.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 group"
      aria-label="Descargar en App Store"
    >
      <svg
        viewBox="0 0 24 24"
        className="w-6 h-6 fill-white flex-shrink-0"
        aria-hidden="true"
      >
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
      <div className="text-left">
        <p className="text-[10px] text-white/70 leading-none">Disponible en</p>
        <p className="text-sm font-semibold leading-tight mt-0.5">App Store</p>
      </div>
    </a>
  );
}

function PlayStoreBadge() {
  return (
    <a
      href="#"
      className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-5 py-3.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 group"
      aria-label="Descargar en Google Play"
    >
      <svg
        viewBox="0 0 24 24"
        className="w-6 h-6 fill-white flex-shrink-0"
        aria-hidden="true"
      >
        <path d="M3 20.5v-17c0-.83.94-1.3 1.6-.8l14 8.5c.6.37.6 1.23 0 1.6l-14 8.5c-.66.5-1.6.03-1.6-.8zM5 7.07V16.93L14.01 12 5 7.07z" />
      </svg>
      <div className="text-left">
        <p className="text-[10px] text-white/70 leading-none">Disponible en</p>
        <p className="text-sm font-semibold leading-tight mt-0.5">Google Play</p>
      </div>
    </a>
  );
}

export function FinalCTA() {
  return (
    <section
      id="descargar"
      className="relative py-20 sm:py-32 overflow-hidden"
      style={{ backgroundColor: "#0F6E56" }}
      aria-label="Descarga Azkali"
    >
      {/* Decorative elements */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle, white 0%, transparent 70%)",
          transform: "translate(30%, -30%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle, white 0%, transparent 70%)",
          transform: "translate(-40%, 40%)",
        }}
      />
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Kali emoji */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="mb-6"
        >
          <span className="text-6xl" role="img" aria-label="Kali la tortuga">
            🐢
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: "easeOut", delay: 0.08 }}
          className="font-heading font-bold text-3xl sm:text-5xl text-white leading-[1.15] mb-6"
        >
          ¿Listo para dejar de regalarle
          <br className="hidden sm:block" />
          tu quincena al banco?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: "easeOut", delay: 0.14 }}
          className="text-white/80 text-lg sm:text-xl mb-10 max-w-xl mx-auto leading-relaxed"
        >
          Descarga Azkali. Es gratis, es tuya y Kali no te va a juzgar.
        </motion.p>

        {/* Store badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: "easeOut", delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
        >
          <AppStoreBadge />
          <PlayStoreBadge />
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: "easeOut", delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8"
        >
          <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
            <span className="text-white/60 text-xs">Respaldada por</span>
            <span className="text-white font-semibold text-sm">
              Banco Azteca · Grupo Salinas
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1">
              {["bg-violet-400", "bg-sky-400", "bg-amber-400"].map((c, i) => (
                <div
                  key={i}
                  className={`w-6 h-6 rounded-full ${c} border-2 border-white/20 flex items-center justify-center`}
                >
                  <span className="text-[8px] text-white font-bold">
                    {["M", "A", "D"][i]}
                  </span>
                </div>
              ))}
            </div>
            <span className="text-white/70 text-sm">
              +10,000 usuarios te esperan
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

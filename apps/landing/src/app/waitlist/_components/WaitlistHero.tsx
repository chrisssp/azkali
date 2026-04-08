"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Users, Star, Shield, Zap, Award, Coins, Bell } from "lucide-react";
import Image from "next/image";

const perks = [
  {
    icon: Zap,
    iconBg: "bg-amber-50 border border-amber-100",
    iconColor: "text-amber-500",
    title: "Acceso anticipado",
    body: "Serás el primero en usar Azkali el día del lanzamiento — antes que nadie.",
  },
  {
    icon: Award,
    iconBg: "bg-violet-50 border border-violet-100",
    iconColor: "text-violet-500",
    title: "Badge Fundador exclusivo",
    body: "Un badge permanente en tu perfil que solo tendrán los primeros 1,000 usuarios.",
  },
  {
    icon: Coins,
    iconBg: "bg-emerald-50 border border-emerald-100",
    iconColor: "text-[#006341]",
    title: "500 Tokens de bienvenida",
    body: "Arrancas con 500 Tokens de Disciplina listos para canjear desde el primer día.",
  },
  {
    icon: Bell,
    iconBg: "bg-sky-50 border border-sky-100",
    iconColor: "text-sky-500",
    title: "Notificación directa",
    body: "Te avisamos por WhatsApp el día exacto que la app esté disponible en tu tienda.",
  },
];

export function WaitlistHero() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  }

  return (
    <>
      {/* ── Hero ── */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ backgroundColor: "#003930" }}
        aria-label="Únete a la lista de espera"
      >
        {/* Background layers */}
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(15,110,86,0.5) 0%, transparent 70%)" }} />
        <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(52,211,153,0.1) 0%, transparent 70%)" }} />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent" />

        <div className="relative max-w-5xl mx-auto px-6 lg:px-8 w-full pt-32 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left — copy */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-2 bg-white/[0.07] border border-white/[0.12] rounded-full px-4 py-2 mb-8"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-white/70 font-medium tracking-wide">Lanzamiento próximo</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.07 }}
                className="font-heading font-medium tracking-tighter text-5xl sm:text-6xl text-white leading-[1.05] mb-6"
              >
                Sé el primero
                <br />
                en usar{" "}
                <span className="bg-gradient-to-r from-emerald-300 to-emerald-400 bg-clip-text text-transparent">
                  Azkali.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.13 }}
                className="text-white/55 text-lg font-light leading-relaxed mb-10 max-w-md"
              >
                Únete a la lista de espera y obtén acceso anticipado, badge de Fundador
                y 500 Tokens de Disciplina desde el día uno.
              </motion.p>

              {/* Counter */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.25 }}
                className="flex items-center gap-3 mb-10"
              >
                <div className="flex -space-x-2">
                  {[
                    { bg: "#006341", i: "MA" },
                    { bg: "#7c3aed", i: "AB" },
                    { bg: "#d97706", i: "DI" },
                    { bg: "#0284c7", i: "LU" },
                  ].map((a) => (
                    <div
                      key={a.i}
                      className="w-8 h-8 rounded-full border-2 border-[#003930] flex items-center justify-center text-white text-[10px] font-bold"
                      style={{ backgroundColor: a.bg }}
                    >
                      {a.i}
                    </div>
                  ))}
                </div>
                <p className="text-white/50 text-sm font-light">
                  <span className="text-white font-semibold">+2,400 personas</span> ya en la lista
                </p>
              </motion.div>

              {/* Trust badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-wrap gap-2"
              >
                {[
                  { icon: Shield, label: "Sin tarjeta de crédito" },
                  { icon: Star, label: "100% gratis" },
                  { icon: Users, label: "Cancela cuando quieras" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="inline-flex items-center gap-1.5 text-white/40 text-xs">
                    <Icon size={11} strokeWidth={1.5} />
                    {label}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — form */}
            <motion.div
              initial={{ opacity: 0, y: 32, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              <div className="bg-white rounded-[2rem] p-8 shadow-[0_32px_80px_rgba(0,0,0,0.35)]">
                {/* Card header */}
                <div className="flex items-center gap-3 mb-7">
                  <Image
                    src="/azkali_logo.png"
                    alt="Azkali"
                    width={128}
                    height={128}
                    quality={100}
                    className="h-8 w-auto object-contain"
                  />
                  <div>
                    <p className="font-semibold text-zinc-900 text-sm tracking-tight">Azkali</p>
                    <p className="text-xs text-zinc-400 font-light">Lista de espera</p>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {!submitted ? (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      <div>
                        <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-widest mb-2">
                          Tu nombre
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="¿Cómo te llamas?"
                          required
                          className="w-full px-4 py-3.5 rounded-xl border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-300 focus:outline-none focus:border-[#006341] focus:ring-2 focus:ring-[#006341]/10 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-widest mb-2">
                          Email o WhatsApp
                        </label>
                        <input
                          type="text"
                          value={contact}
                          onChange={(e) => setContact(e.target.value)}
                          placeholder="correo@ejemplo.com o +52 55..."
                          required
                          className="w-full px-4 py-3.5 rounded-xl border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-300 focus:outline-none focus:border-[#006341] focus:ring-2 focus:ring-[#006341]/10 transition-all"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#006341] text-white py-4 rounded-full font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#003930] transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-[#006341]/20"
                      >
                        {loading ? (
                          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                          </svg>
                        ) : (
                          <>
                            Unirme a la lista
                            <ArrowRight size={15} strokeWidth={2} />
                          </>
                        )}
                      </button>

                      <p className="text-[11px] text-zinc-400 text-center font-light leading-relaxed">
                        Sin spam. Solo te avisamos cuando Azkali esté lista.
                      </p>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="text-center py-6"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                        className="w-16 h-16 rounded-full bg-[#006341]/10 border border-[#006341]/20 flex items-center justify-center mx-auto mb-5"
                      >
                        <Check size={28} className="text-[#006341]" strokeWidth={2.5} />
                      </motion.div>
                      <h3 className="font-heading font-semibold text-xl text-zinc-900 tracking-tight mb-2">
                        ¡Ya estás dentro, {name.split(" ")[0]}!
                      </h3>
                      <p className="text-zinc-400 text-sm font-light leading-relaxed mb-6">
                        Te avisamos cuando Azkali esté disponible. Mientras tanto, cuéntale a tus amigos.
                      </p>
                      <div className="flex items-center justify-center gap-2 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
                        <span className="text-lg">🪙</span>
                        <p className="text-xs text-amber-700 font-semibold">500 Tokens reservados para ti</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Banco Azteca note */}
              <div className="flex items-center justify-center gap-3 mt-7">
                <p className="text-white/20 text-[9px] uppercase tracking-[0.1em] font-medium border-r border-white/10 pr-3">Respaldado por</p>
                <Image
                  src="/banco_azteca_logo.png"
                  alt="Banco Azteca"
                  width={144}
                  height={40}
                  quality={100}
                  className="h-3.5 w-auto object-contain brightness-0 invert opacity-40"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Perks ── */}
      <section className="py-20 sm:py-28 bg-white" aria-label="Beneficios early access">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-14"
          >
            <h2 className="font-heading font-medium tracking-tighter text-3xl sm:text-4xl text-zinc-900 mb-4">
              Lo que obtienes por ser early.
            </h2>
            <p className="text-zinc-400 font-light text-lg max-w-lg mx-auto">
              Los primeros 1,000 usuarios tienen ventajas permanentes que nadie más tendrá.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {perks.map((perk, i) => (
              <motion.div
                key={perk.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
                className="flex gap-4 bg-zinc-50 rounded-[1.5rem] border border-zinc-100 p-6 hover:border-zinc-200 transition-colors duration-300"
              >
                <div className={`w-10 h-10 rounded-xl ${perk.iconBg} flex items-center justify-center flex-shrink-0`}>
                  <perk.icon size={18} strokeWidth={1.5} className={perk.iconColor} />
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-900 text-sm mb-1">{perk.title}</h3>
                  <p className="text-zinc-400 text-sm font-light leading-relaxed">{perk.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

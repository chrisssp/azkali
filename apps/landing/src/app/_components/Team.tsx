"use client";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* ─── SVG Icons ──────────────────────────────────────────────────── */
function LinkedInIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4 fill-current"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4 fill-current"
      aria-hidden="true"
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

/* ─── Team data ──────────────────────────────────────────────────── */
const teamMembers = [
  {
    name: "Eduardo Moreno",
    role: "Full-Stack Developer",
    photo: "/team/eduardo.png",
    bio: "Full-stack developer con pasión por UI/UX y diseño moderno de software. Enfocado en arquitectura, performance y calidad de código.",
    linkedin: "https://www.linkedin.com/in/eduardochm/",
    github: "https://github.com/edmorenodev",
    accentColor: "from-emerald-400 to-green-600",
  },
  {
    name: "Misrael Florentino",
    role: "Full-Stack Developer",
    photo: "/team/misrael.png",
    bio: "Apasionado por microservicios, IA y Machine Learning. GitHub Developer Program Member con experiencia en Java, TypeScript y Python.",
    linkedin: "https://www.linkedin.com/in/misraelflorentino/",
    github: "https://github.com/misraelDev",
    accentColor: "from-blue-400 to-indigo-600",
  },
  {
    name: "Erick López",
    role: "Backend Developer",
    photo: "/team/erick.png",
    bio: "Mentalidad API-First. Especialista en arquitectura backend escalable y diseño de APIs orientadas al negocio. \"Everything is tryhardable.\"",
    linkedin: "https://www.linkedin.com/in/erick-elv/",
    github: "https://github.com/ErickBeLike",
    accentColor: "from-amber-400 to-orange-600",
  },
  {
    name: "Christian Serrano",
    role: "Full-Stack & Mobile Dev",
    photo: "/team/christian.png",
    bio: "Software Engineer especializado en Web y Mobile. Aplica metodologías ágiles para construir soluciones escalables.",
    linkedin: "https://www.linkedin.com/in/chrisssp/",
    github: "https://github.com/chrisssp",
    accentColor: "from-violet-400 to-purple-600",
  },
  {
    name: "Alejandro Ortiz",
    role: "Software Developer",
    photo: "/team/alejandro.png",
    bio: "Colaborador en proyectos de e-commerce y plataformas tecnológicas. Enfocado en soluciones de software con impacto real.",
    linkedin: "https://www.linkedin.com/in/alejandro-ortiz-perez-a409a92b8/",
    github: "https://github.com/aleor25",
    accentColor: "from-rose-400 to-red-600",
  },
];

/* ─── TeamCard ───────────────────────────────────────────────────── */
function TeamCard({
  member,
  delay,
}: {
  member: (typeof teamMembers)[0];
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
      className="group flex flex-col items-center text-center"
    >
      {/* Photo container */}
      <div className="relative mb-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2">

        {/* Animated stroke ring — draws itself on hover */}
        <svg
          className="absolute -inset-[6px] w-[calc(100%+12px)] h-[calc(100%+12px)] -rotate-90 pointer-events-none"
          viewBox="0 0 160 160"
          fill="none"
        >
          {/* Track ring */}
          <circle
            cx="80" cy="80" r="76"
            stroke="#e5e7eb"
            strokeWidth="2"
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
          {/* Animated arc */}
          <circle
            cx="80" cy="80" r="76"
            stroke="#006341"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="477"
            strokeDashoffset="477"
            className="[transition:stroke-dashoffset_0.7s_cubic-bezier(0.16,1,0.3,1)] group-hover:[stroke-dashoffset:0]"
          />
        </svg>

        {/* Photo frame */}
        <div className="relative w-36 h-36 rounded-full overflow-hidden ring-2 ring-gray-100 group-hover:ring-transparent transition-all duration-500 shadow-md group-hover:shadow-lg">
          <Image
            src={member.photo}
            alt={`Foto de ${member.name}`}
            fill
            sizes="144px"
            className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
          />
        </div>
      </div>

      {/* Info — name & role lift slightly on hover */}
      <div className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1">
        <h3 className="font-heading font-bold text-gray-900 text-base tracking-tight leading-tight mb-1">
          {member.name}
        </h3>
        <span className="inline-block text-[11px] font-semibold tracking-[0.12em] uppercase text-[#006341] mb-3">
          {member.role}
        </span>
      </div>

      <p className="text-gray-500 text-sm leading-relaxed font-light max-w-[220px]">
        {member.bio}
      </p>

      {/* Social links */}
      <div className="flex items-center gap-2.5 mt-4">
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`LinkedIn de ${member.name}`}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-[#0077B5] hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-md"
          >
            <LinkedInIcon />
          </a>
        )}
        <a
          href={member.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`GitHub de ${member.name}`}
          className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-900 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-md"
        >
          <GitHubIcon />
        </a>
      </div>
    </motion.div>
  );
}

/* ─── Section ────────────────────────────────────────────────────── */
export function Team() {
  const dragRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="equipo"
      className="relative py-24 sm:py-32 bg-white overflow-hidden"
      aria-label="Equipo Azkali"
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(#f3f4f6_1px,transparent_1px),linear-gradient(90deg,#f3f4f6_1px,transparent_1px)] [background-size:40px_40px] opacity-70 pointer-events-none" />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#006341]/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20 md:mb-28"
        >
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-400 mb-8">
            — El equipo detrás —
          </p>

          <h2 className="font-heading font-medium tracking-tighter text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-gray-900 leading-[1.1]">
            Las mentes que
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-[#006341] to-emerald-500 bg-clip-text text-transparent">
              {" "}construyeron Azkali.
            </span>
          </h2>

          <p className="mt-8 text-gray-500 text-lg md:text-xl max-w-2xl mx-auto tracking-tight font-light leading-relaxed">
            Un equipo de ingenieros apasionados por la tecnología, unidos para darle a la Gen Z una herramienta que realmente marque la diferencia.
          </p>
        </motion.div>

        {/* ── Desktop grid ── */}
        <div className="hidden md:grid md:grid-cols-5 gap-10 lg:gap-12">
          {teamMembers.map((member, i) => (
            <TeamCard key={member.name} member={member} delay={i * 0.08} />
          ))}
        </div>

        {/* ── Mobile carousel ── */}
        <div className="md:hidden overflow-hidden" ref={dragRef}>
          <motion.div
            drag="x"
            dragConstraints={dragRef}
            dragElastic={0.08}
            className="flex gap-8 cursor-grab active:cursor-grabbing pb-4"
            style={{ width: `${teamMembers.length * 75}vw` }}
          >
            {teamMembers.map((member, i) => (
              <div
                key={member.name}
                className="flex-shrink-0"
                style={{ width: "68vw" }}
              >
                <TeamCard member={member} delay={i * 0.06} />
              </div>
            ))}
          </motion.div>
          <p className="text-center text-xs text-gray-400 mt-4 font-medium tracking-wide">
            Desliza para ver más →
          </p>
        </div>

        {/* ── Hackathon Visual Carousel (Option A Enhanced) ── */}
        <HackathonCarousel />
      </div>
    </section>
  );
}

/* ─── Hackathon Carousel Component ────────────────────────────────── */
const hackathonImages = [
  {
    url: "/hackaton.jpg",
    label: "Innovación en tiempo real",
    desc: "Azkali nació en la intensidad del Challenge 23 de Genius Arena."
  },
  {
    url: "/hackaton3.jpg",
    label: "Haciendo historia",
    desc: "Un equipo unido por la visión de transformar las finanzas en México."
  }
];

function HackathonCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % hackathonImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      className="mt-28 md:mt-36 max-w-5xl mx-auto"
    >
      <div className="relative aspect-[4/5] md:aspect-[21/9] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-[0_32px_80px_-20px_rgba(0,0,0,0.15)] border border-zinc-100 group">
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={hackathonImages[index].url}
              alt={hackathonImages[index].label}
              fill
              priority
              className="object-cover scale-100"
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Robust Vignette & Gradient Overlay for perfect legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10 opacity-80 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-700" />

        {/* Floating content with legibility protection */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12">
          {/* Gradual blur mask behind text area - taller on mobile */}
          <div 
            className="absolute inset-x-0 bottom-0 h-3/4 md:h-2/3 bg-gradient-to-t from-black/60 via-black/20 to-transparent backdrop-blur-[4px] pointer-events-none" 
            style={{
              maskImage: 'linear-gradient(to top, black 30%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to top, black 30%, transparent 100%)'
            }}
          />

          <div className="relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 backdrop-blur-md mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                  {hackathonImages[index].label}
                </span>
              </div>
              <h3 className="font-heading font-medium text-xl md:text-3xl text-white tracking-tight leading-tight">
                Donde Azkali tomó forma.
              </h3>
              <p className="mt-3 text-zinc-300 text-xs md:text-base font-light leading-relaxed">
                Participamos en el <span className="text-white font-medium italic">Talent Hackathon</span> de <span className="text-white font-medium">Genius Arena</span> durante <span className="text-white font-medium">Talent Land 2026</span> en CDMX. Un fin de semana de innovación pura que definió nuestro MVP como producto.
              </p>
            </div>
            
            {/* Carousel dots */}
            <div className="flex gap-2">
              {hackathonImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === index ? "w-8 bg-emerald-400" : "w-1.5 bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Manual Nav Arrows - hidden on mobile for cleaner touch experience */}
        <button 
          onClick={() => setIndex((prev) => (prev - 1 + hackathonImages.length) % hackathonImages.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white hover:text-black"
        >
          <ChevronLeft size={20} />
        </button>
        <button 
          onClick={() => setIndex((prev) => (prev + 1) % hackathonImages.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white hover:text-black"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </motion.div>
  );
}

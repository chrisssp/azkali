"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const links = [
  { href: "/#como-funciona", label: "Cómo funciona" },
  { href: "/features", label: "Features" },
  { href: "/#descargar", label: "Descargar" },
  { href: "https://github.com/chrisssp/azkali", label: "GitHub", isExternal: true },
];

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A3.37 3.37 0 0 0 20.47 7.66 3.37 3.37 0 0 0 20.47 5S18.73 4.5 14.39 7.5a11.02 11.02 0 0 0-5.78 0C4.23 4.5 2.5 5 2.5 5a3.37 3.37 0 0 0-.04 2.66 3.37 3.37 0 0 0-.94 2.61c0 5.46 3.3 6.65 6.44 7a3.37 3.37 0 0 0-.94 2.61V22" />
    </svg>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const forceLight = pathname === "/waitlist";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || forceLight
          ? "bg-white/90 backdrop-blur-xl shadow-[0_1px_24px_rgba(0,0,0,0.06)]"
          : "bg-transparent"
      }`}
      role="banner"
    >
      <nav
        className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16"
        aria-label="Navegación principal"
      >
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5">
          <Image
            src="/azkali_logo.png"
            alt="Azkali"
            width={240}
            height={72}
            quality={100}
            className="h-8 w-auto object-contain"
            priority
          />
          <span className="font-heading font-semibold text-lg text-zinc-900 tracking-tight">
            Azkali
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.isExternal ? "_blank" : undefined}
              rel={link.isExternal ? "noopener noreferrer" : undefined}
              className="px-3.5 py-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors duration-200 rounded-lg hover:bg-zinc-50 flex items-center gap-1.5"
            >
              {link.label === "GitHub" && <GithubIcon size={14} />}
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="/waitlist"
            className="inline-flex items-center gap-2 bg-zinc-900 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-zinc-800 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-sm"
          >
            Descargar gratis
          </a>
        </div>

        {/* Mobile button */}
        <button
          className="md:hidden p-2 rounded-lg text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {mobileOpen ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-b border-zinc-100 px-6 pb-5"
          >
            <div className="flex flex-col gap-1 pt-2">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target={link.isExternal ? "_blank" : undefined}
                  rel={link.isExternal ? "noopener noreferrer" : undefined}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 text-sm font-medium text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 rounded-xl transition-colors flex items-center gap-2"
                >
                  {link.label === "GitHub" && <GithubIcon size={16} />}
                  {link.label}
                </a>
              ))}
              <a
                href="/waitlist"
                onClick={() => setMobileOpen(false)}
                className="mt-3 flex items-center justify-center bg-zinc-900 text-white py-3 rounded-full text-sm font-semibold"
              >
                Descargar gratis
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

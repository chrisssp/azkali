"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const links = [
  { href: "#como-funciona", label: "Cómo funciona" },
  { href: "#features", label: "Features" },
  { href: "#testimonios", label: "Testimonios" },
  { href: "#descargar", label: "Descargar" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
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
            width={120}
            height={36}
            className="h-8 w-auto object-contain"
            priority
          />
          <span className="font-heading font-semibold text-lg text-zinc-900 tracking-tight">
            Azkali
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {links.slice(0, 3).map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3.5 py-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors duration-200 rounded-lg hover:bg-zinc-50"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#descargar"
            className="inline-flex items-center gap-2 bg-[#0F6E56] text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#0c5c47] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-sm"
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
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 text-sm font-medium text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 rounded-xl transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#descargar"
                onClick={() => setMobileOpen(false)}
                className="mt-3 flex items-center justify-center bg-[#0F6E56] text-white py-3 rounded-full text-sm font-semibold"
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

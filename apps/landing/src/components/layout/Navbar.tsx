"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Download } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "#como-funciona", label: "Cómo funciona" },
    { href: "#features", label: "Features" },
    { href: "#descargar", label: "Descargar" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100"
          : "bg-transparent"
      }`}
      role="banner"
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16"
        aria-label="Navegación principal"
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-brand-green flex items-center justify-center">
            <span className="text-white font-heading font-bold text-sm">A</span>
          </div>
          <span
            className={`text-xl font-heading font-bold transition-colors ${
              scrolled ? "text-gray-900" : "text-gray-900"
            }`}
          >
            Azkali
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-brand-green ${
                scrolled ? "text-gray-600" : "text-gray-700"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#descargar"
            className="flex items-center gap-2 bg-brand-green text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-brand-green-600 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
          >
            <Download size={14} />
            Descargar gratis
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={mobileOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="md:hidden overflow-hidden bg-white border-b border-gray-100"
      >
        <div className="px-4 pb-4 space-y-3">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-sm font-medium text-gray-700 hover:text-brand-green transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#descargar"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center gap-2 w-full bg-brand-green text-white py-2.5 rounded-full text-sm font-semibold mt-2"
          >
            <Download size={14} />
            Descargar gratis
          </a>
        </div>
      </motion.div>
    </header>
  );
}

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
      viewBox="0 0 1024 1024" 
      fill="none"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" 
        transform="scale(64)" 
        fill="currentColor"
      />
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

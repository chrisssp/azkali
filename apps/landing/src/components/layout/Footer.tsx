function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.77 1.52V6.78a4.85 4.85 0 0 1-1-.09z" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

import Image from "next/image";

const navLinks = [
  { href: "#como-funciona", label: "Cómo funciona" },
  { href: "#features", label: "Features" },
  { href: "/privacidad", label: "Privacidad" },
  { href: "/terminos", label: "Términos" },
  { href: "#", label: "Contacto" },
];

const socialLinks = [
  { href: "#", icon: <InstagramIcon />, label: "Instagram" },
  { href: "#", icon: <TikTokIcon />, label: "TikTok" },
  { href: "#", icon: <XIcon />, label: "X (Twitter)" },
  { href: "#", icon: <YoutubeIcon />, label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-white/[0.06]" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-white/[0.06]">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <Image
                src="/azkali_logo.png"
                alt="Azkali"
                width={28}
                height={28}
                className="h-7 w-auto object-contain brightness-0 invert"
              />
              <span className="font-semibold text-white text-lg tracking-tight">Azkali</span>
            </div>
            <p className="text-sm text-zinc-400 font-light leading-relaxed max-w-xs">
              Frena el impulso. Acelera tu futuro.
            </p>
            <p className="text-xs text-zinc-600 leading-relaxed max-w-xs font-light">
              Tu copiloto financiero para tomar mejores decisiones, una compra a la vez.
            </p>

            {/* Banco Azteca partnership */}
            <div className="pt-2">
              <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-medium mb-3">
                En alianza con
              </p>
              <Image
                src="/banco_azteca_logo.png"
                alt="Banco Azteca"
                width={144}
                height={40}
                quality={100}
                className="h-4 w-auto object-contain brightness-0 invert opacity-90"
              />
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-zinc-300 font-semibold text-xs uppercase tracking-widest mb-5">
              Navegación
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-zinc-500 hover:text-white transition-colors duration-200 font-light"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-zinc-300 font-semibold text-xs uppercase tracking-widest mb-5">
              Síguenos
            </h3>
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-zinc-500 hover:bg-[#006341]/20 hover:border-[#006341]/30 hover:text-emerald-400 transition-all duration-200"
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <p className="mt-6 text-xs text-zinc-600 font-light">
              ¿Preguntas?{" "}
              <a href="mailto:hola@azkali.mx" className="text-emerald-600 hover:text-emerald-400 transition-colors">
                hola@azkali.mx
              </a>
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-zinc-700 font-light">
            &copy; {new Date().getFullYear()} Azkali. Todos los derechos reservados.
          </p>

          {/* Grupo Salinas */}
          <div className="flex items-center gap-2.5">
            <p className="text-[10px] text-zinc-700 uppercase tracking-widest font-medium whitespace-nowrap">
              Parte de
            </p>
            <Image
              src="/grupo_salinas_logo.png"
              alt="Grupo Salinas"
              width={200}
              height={48}
              quality={100}
              className="h-4 w-auto object-contain brightness-0 invert opacity-30"
            />
          </div>

          <p className="text-xs text-zinc-700 max-w-xs text-left sm:text-right font-light leading-relaxed hidden lg:block">
            Azkali es una herramienta de educación financiera conductual. No es un servicio bancario regulado.
          </p>
        </div>
      </div>
    </footer>
  );
}

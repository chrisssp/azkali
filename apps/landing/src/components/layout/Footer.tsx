import { Instagram, Twitter, Youtube } from "lucide-react";

function TikTokIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.77 1.52V6.78a4.85 4.85 0 0 1-1-.09z" />
    </svg>
  );
}

export function Footer() {
  const navLinks = [
    { href: "#como-funciona", label: "Cómo funciona" },
    { href: "#features", label: "Features" },
    { href: "#", label: "Privacidad" },
    { href: "#", label: "Términos" },
    { href: "#", label: "Contacto" },
  ];

  const socialLinks = [
    { href: "#", icon: <Instagram size={18} />, label: "Instagram" },
    { href: "#", icon: <TikTokIcon />, label: "TikTok" },
    { href: "#", icon: <Twitter size={18} />, label: "X (Twitter)" },
    { href: "#", icon: <Youtube size={18} />, label: "YouTube" },
  ];

  return (
    <footer className="bg-gray-950 text-gray-400" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-gray-800">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-green flex items-center justify-center">
                <span className="text-white font-heading font-bold text-sm">A</span>
              </div>
              <span className="text-xl font-heading font-bold text-white">Azkali</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Frena el impulso. Acelera tu futuro.
            </p>
            <p className="text-xs text-gray-500 leading-relaxed max-w-xs">
              Tu copiloto financiero para tomar mejores decisiones, una compra a la vez.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 font-heading">
              Navegación
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-brand-green-300 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 font-heading">
              Síguenos
            </h3>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-brand-green hover:text-white transition-all duration-200"
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <p className="mt-6 text-xs text-gray-500">
              ¿Preguntas? Escríbenos a{" "}
              <a
                href="mailto:hola@azkali.mx"
                className="text-brand-green-300 hover:underline"
              >
                hola@azkali.mx
              </a>
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} Azkali. Todos los derechos reservados.
          </p>
          <p className="text-xs text-gray-600 max-w-md text-left sm:text-right">
            Azkali es una herramienta de educación financiera conductual. No es un
            servicio bancario regulado.
          </p>
        </div>
      </div>
    </footer>
  );
}

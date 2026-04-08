"use client";
import { motion } from "framer-motion";

const sections = [
  {
    title: "Aceptación de los términos",
    content: `Al descargar, registrarte o utilizar Azkali (la "Aplicación"), aceptas quedar vinculado por estos Términos y Condiciones. Si no estás de acuerdo con alguno de ellos, no debes usar la Aplicación.

Azkali se reserva el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor al ser publicados. El uso continuado de la Aplicación implica la aceptación de los términos actualizados.`,
  },
  {
    title: "Descripción del servicio",
    content: `Azkali es una herramienta de educación financiera conductual que ayuda a sus usuarios a tomar decisiones de gasto más conscientes mediante:

• Análisis de impulsividad financiera en tiempo real.
• Asistencia conversacional con inteligencia artificial (Kali).
• Sistemas de gamificación y rachas de disciplina.
• Retos grupales de ahorro.
• Tokens de Disciplina canjeables por recompensas.

Azkali no es una institución financiera, ni ofrece servicios bancarios, de inversión o de crédito directamente. Las funciones relacionadas con Banco Azteca están sujetas a los términos y condiciones propios de dicha institución.`,
  },
  {
    title: "Registro y cuenta de usuario",
    content: `Para usar Azkali debes crear una cuenta proporcionando información veraz, completa y actualizada. Eres responsable de:

• Mantener la confidencialidad de tus credenciales de acceso.
• Todas las actividades que ocurran bajo tu cuenta.
• Notificarnos de inmediato ante cualquier uso no autorizado.

Azkali puede suspender o cancelar tu cuenta si detecta información falsa, uso fraudulento o violación de estos términos.`,
  },
  {
    title: "Uso aceptable",
    content: `Al usar Azkali te comprometes a no:

• Usar la Aplicación para fines ilegales o no autorizados.
• Intentar acceder a sistemas o datos de otros usuarios.
• Reproducir, distribuir o modificar el software sin autorización expresa.
• Introducir virus, malware o código dañino.
• Hacer uso automatizado de la Aplicación (bots, scrapers) sin permiso escrito.
• Suplantar la identidad de otras personas o entidades.`,
  },
  {
    title: "Propiedad intelectual",
    content: `Todo el contenido de Azkali — incluyendo pero no limitado a: nombre, logotipo, diseño de interfaz, código fuente, textos, gráficos, la mascota Kali y el sistema de Tokens de Disciplina — es propiedad exclusiva de Azkali o sus licenciantes y está protegido por las leyes de propiedad intelectual vigentes en México.

Se te otorga una licencia limitada, no exclusiva, intransferible y revocable para usar la Aplicación exclusivamente para los fines descritos en estos términos.`,
  },
  {
    title: "Tokens de Disciplina y recompensas",
    content: `Los Tokens de Disciplina son un sistema de incentivos dentro de la Aplicación. Debes tener en cuenta que:

• No tienen valor monetario ni pueden convertirse en dinero en efectivo.
• Su disponibilidad y las recompensas canjeables pueden cambiar sin previo aviso.
• Azkali no garantiza la disponibilidad permanente de ninguna recompensa específica.
• Los tokens no acumulados al cierre de una cuenta se perderán sin compensación.

Las recompensas ofrecidas por terceros (Banco Azteca, Elektra, etc.) están sujetas a los términos de cada aliado.`,
  },
  {
    title: "Limitación de responsabilidad",
    content: `Azkali proporciona el servicio "tal como está" y no garantiza que:

• La Aplicación estará disponible de forma ininterrumpida o libre de errores.
• Los análisis de Kali o los veredictos de impulsividad sean financieramente precisos para tu situación específica.
• Las decisiones tomadas con base en las sugerencias de Kali producirán resultados financieros específicos.

Azkali no será responsable por daños directos, indirectos, incidentales o consecuentes derivados del uso o la imposibilidad de uso de la Aplicación.

El contenido de Azkali es educativo e informativo. No constituye asesoría financiera, legal o fiscal profesional.`,
  },
  {
    title: "Servicios de terceros",
    content: `Azkali puede integrar o enlazar servicios de terceros, incluyendo Banco Azteca y otras empresas del Grupo Salinas. El uso de dichos servicios está sujeto a sus propios términos y condiciones. Azkali no es responsable por el contenido, las políticas ni las prácticas de servicios de terceros.`,
  },
  {
    title: "Terminación del servicio",
    content: `Puedes cancelar tu cuenta en cualquier momento desde la configuración de la Aplicación. Azkali puede suspender o terminar tu acceso de forma inmediata si:

• Violas estos Términos y Condiciones.
• Se detecta actividad fraudulenta o abusiva.
• Lo requiere una orden judicial o autoridad competente.

Tras la terminación, tus datos serán tratados conforme a nuestro Aviso de Privacidad.`,
  },
  {
    title: "Legislación aplicable",
    content: `Estos Términos y Condiciones se rigen por las leyes vigentes en los Estados Unidos Mexicanos. Para cualquier controversia derivada del uso de la Aplicación, las partes se someten a la jurisdicción de los tribunales competentes de la Ciudad de México, renunciando a cualquier otro fuero que pudiera corresponderles.

Para dudas o aclaraciones: legal@azkali.mx`,
  },
];

export function TerminosContent() {
  return (
    <main className="bg-white min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-16 bg-zinc-50 border-b border-zinc-100">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-400 mb-6">
              Legal
            </p>
            <h1 className="font-heading font-medium tracking-tighter text-4xl sm:text-5xl text-zinc-900 mb-4">
              Términos y Condiciones
            </h1>
            <p className="text-zinc-400 font-light text-lg leading-relaxed">
              Lee con atención las condiciones bajo las cuales puedes usar Azkali.
              Al registrarte, aceptas estos términos en su totalidad.
            </p>
            <p className="text-zinc-400 text-xs font-light mt-6">
              Última actualización: abril 2026 · Versión 1.0
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="space-y-12">
            {sections.map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.04 }}
                className="group pb-12"
              >
                <div className="flex items-start gap-4">
                  <span className="font-heading text-sm font-medium text-zinc-300 group-hover:text-[#006341] tabular-nums mt-1 w-6 flex-shrink-0 transition-colors duration-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2 className="font-heading font-semibold tracking-tight text-lg text-zinc-900 mb-4">
                      {section.title}
                    </h2>
                    <p className="text-zinc-500 text-sm font-light leading-[1.8] whitespace-pre-line">
                      {section.content}
                    </p>
                  </div>
                </div>
                <div className="mt-10 h-px bg-zinc-100 relative overflow-hidden">
                  <div className="absolute inset-y-0 left-0 w-0 group-hover:w-full bg-[#006341] transition-all duration-500 ease-out" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer note */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 p-6 bg-zinc-50 rounded-2xl"
          >
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              Estos Términos y Condiciones han sido redactados conforme a la legislación mexicana vigente,
              incluyendo la{" "}
              <span className="text-zinc-600 font-medium">
                Ley Federal de Protección al Consumidor
              </span>{" "}
              y el{" "}
              <span className="text-zinc-600 font-medium">
                Código de Comercio de los Estados Unidos Mexicanos
              </span>.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

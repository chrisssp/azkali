"use client";
import { motion } from "framer-motion";

const sections = [
  {
    title: "Responsable del tratamiento",
    content: `Azkali (en adelante "la Empresa") es responsable del tratamiento de tus datos personales. Con domicilio en Ciudad de México, México, y contacto en privacidad@azkali.mx.`,
  },
  {
    title: "Datos personales que recabamos",
    content: `Recabamos los siguientes datos personales:

• Datos de identificación: nombre, correo electrónico, número de teléfono.
• Datos financieros: historial de decisiones de compra, patrones de gasto, metas de ahorro. Estos datos son generados por tu uso de la app y nunca incluyen datos bancarios directos.
• Datos de uso: interacciones con la aplicación, rachas de disciplina, tokens acumulados.
• Datos de dispositivo: tipo de dispositivo, sistema operativo, identificadores de sesión.

No recabamos datos sensibles como información médica, religiosa o biométrica.`,
  },
  {
    title: "Finalidades del tratamiento",
    content: `Tus datos se utilizan para:

Finalidades primarias (necesarias para el servicio):
• Proveer y personalizar los servicios de Azkali.
• Generar el análisis conductual de impulsividad financiera.
• Administrar tu cuenta, rachas y tokens de disciplina.
• Enviarte notificaciones relevantes sobre tu actividad.

Finalidades secundarias (puedes oponerte):
• Enviarte comunicaciones sobre nuevas funcionalidades o alianzas.
• Mejorar nuestros algoritmos de IA mediante datos anonimizados.
• Elaborar estadísticas de uso agregadas y no identificables.`,
  },
  {
    title: "Transferencia de datos",
    content: `Tus datos personales pueden ser compartidos con:

• Banco Azteca, S.A. — como aliado estratégico, exclusivamente para evaluar el Score de Confianza Azkali y el acceso a productos financieros. Solo si tú lo autorizas expresamente.
• Proveedores de infraestructura tecnológica (servidores, bases de datos) bajo acuerdos de confidencialidad.
• Proveedores de LLM (modelos de lenguaje) para procesar consultas a Kali, usando únicamente datos anonimizados.

No vendemos ni compartimos tus datos con terceros para fines publicitarios.`,
  },
  {
    title: "Derechos ARCO",
    content: `Tienes derecho a Acceder, Rectificar, Cancelar u Oponerte (derechos ARCO) al tratamiento de tus datos personales, así como a revocar el consentimiento otorgado.

Para ejercer tus derechos ARCO envía una solicitud a:
privacidad@azkali.mx

Tu solicitud debe incluir: nombre completo, correo registrado en Azkali, descripción del derecho que deseas ejercer y, en su caso, documentación de soporte.

Responderemos en un plazo máximo de 20 días hábiles.`,
  },
  {
    title: "Seguridad de los datos",
    content: `Implementamos medidas técnicas, administrativas y físicas para proteger tus datos personales contra acceso no autorizado, pérdida, alteración o destrucción. Entre ellas:

• Cifrado en tránsito (TLS 1.3) y en reposo (AES-256).
• Acceso restringido por roles al equipo interno.
• Auditorías periódicas de seguridad.`,
  },
  {
    title: "Uso de cookies y tecnologías similares",
    content: `Utilizamos cookies y tecnologías de seguimiento para:

• Mantener tu sesión activa.
• Recordar tus preferencias de configuración.
• Analizar el comportamiento agregado de usuarios (sin identificación individual).

Puedes deshabilitar las cookies desde la configuración de tu navegador, aunque esto puede afectar el funcionamiento de algunas funciones.`,
  },
  {
    title: "Cambios a este aviso",
    content: `Nos reservamos el derecho de actualizar este Aviso de Privacidad en cualquier momento. Notificaremos cambios significativos mediante un aviso destacado en la app o por correo electrónico. El uso continuado de Azkali tras la notificación implica la aceptación de los cambios.`,
  },
  {
    title: "Contacto y quejas",
    content: `Para cualquier duda o aclaración sobre este aviso, contáctanos en:

privacidad@azkali.mx

Si consideras que tu derecho a la protección de datos ha sido vulnerado, puedes presentar una queja ante el Instituto Nacional de Transparencia, Acceso a la Información y Protección de Datos Personales (INAI): www.inai.org.mx`,
  },
];

export function PrivacidadContent() {
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
              Aviso de Privacidad
            </h1>
            <p className="text-zinc-400 font-light text-lg leading-relaxed">
              En Azkali tratamos tus datos con responsabilidad. Aquí explicamos qué recopilamos,
              para qué y cómo puedes ejercer tus derechos.
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
                className="border-b border-zinc-100 pb-12 last:border-0"
              >
                <div className="flex items-start gap-4">
                  <span className="font-heading text-sm font-medium text-zinc-300 tabular-nums mt-1 w-6 flex-shrink-0">
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
              Este aviso de privacidad es emitido en cumplimiento de la{" "}
              <span className="text-zinc-600 font-medium">
                Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP)
              </span>{" "}
              y su Reglamento, vigentes en los Estados Unidos Mexicanos.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

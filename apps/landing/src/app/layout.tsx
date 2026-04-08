import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Azkali — Frena el impulso. Acelera tu futuro.",
  description:
    "La app de educación financiera conductual que te hace pensar antes de gastar. Combate las compras impulsivas con IA, gamificación y hábitos reales.",
  keywords: [
    "finanzas personales",
    "educación financiera",
    "ahorro",
    "compras impulsivas",
    "México",
    "Gen Z",
    "app de finanzas",
  ],
  authors: [{ name: "Azkali" }],
  openGraph: {
    title: "Azkali — Frena el impulso. Acelera tu futuro.",
    description:
      "La app que te hace pensar antes de gastar. Tu copiloto financiero para la Generación Z en México.",
    type: "website",
    locale: "es_MX",
  },
  twitter: {
    card: "summary_large_image",
    title: "Azkali — Frena el impulso. Acelera tu futuro.",
    description:
      "La app que te hace pensar antes de gastar. Tu copiloto financiero para la Generación Z en México.",
  },
  icons: {
    icon: "/azkali_logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-MX"
      className={`${plusJakarta.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col antialiased font-body">
        <GluestackUIProvider mode="light">{children}</GluestackUIProvider>
      </body>
    </html>
  );
}

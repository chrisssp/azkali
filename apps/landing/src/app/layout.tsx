import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-MX"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col antialiased font-body">
        <GluestackUIProvider mode="light">{children}</GluestackUIProvider>
      </body>
    </html>
  );
}

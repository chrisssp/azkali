import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PrivacidadContent } from "./_components/PrivacidadContent";

export const metadata: Metadata = {
  title: "Aviso de Privacidad — Azkali",
  description:
    "Conoce cómo Azkali recopila, usa y protege tus datos personales conforme a la LFPDPPP.",
};

export default function PrivacidadPage() {
  return (
    <>
      <Navbar />
      <PrivacidadContent />
      <Footer />
    </>
  );
}

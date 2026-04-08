import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TerminosContent } from "./_components/TerminosContent";

export const metadata: Metadata = {
  title: "Términos y Condiciones — Azkali",
  description:
    "Conoce los términos y condiciones de uso de Azkali, la app de educación financiera conductual.",
};

export default function TerminosPage() {
  return (
    <>
      <Navbar />
      <TerminosContent />
      <Footer />
    </>
  );
}

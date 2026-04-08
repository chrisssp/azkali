import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WaitlistHero } from "./_components/WaitlistHero";

export const metadata: Metadata = {
  title: "Lista de espera — Azkali",
  description:
    "Únete a la lista de espera de Azkali y sé el primero en usarla. Acceso anticipado, badge de Fundador y 500 Tokens de Disciplina desde el día uno.",
};

export default function WaitlistPage() {
  return (
    <>
      <Navbar />
      <main>
        <WaitlistHero />
      </main>
      <Footer />
    </>
  );
}

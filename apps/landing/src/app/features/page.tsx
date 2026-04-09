import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FeaturesHero } from "./_components/FeaturesHero";
import { CoreFeatures } from "./_components/CoreFeatures";
import { RoadmapFeatures } from "./_components/RoadmapFeatures";
import { AIEngine } from "./_components/AIEngine";
import { FeaturesCTA } from "./_components/FeaturesCTA";

export const metadata: Metadata = {
  title: "Características — Azkali",
  description:
    "Descubre todo lo que Azkali puede hacer por ti: Kali IA conductual, Escáner de Impulsividad, Tokens de Resiliencia, Lealtad Transaccional y más.",
};

export default function FeaturesPage() {
  return (
    <>
      <Navbar />
      <main>
        <FeaturesHero />
        <CoreFeatures />
        <RoadmapFeatures />
        <AIEngine />
        <FeaturesCTA />
      </main>
      <Footer />
    </>
  );
}

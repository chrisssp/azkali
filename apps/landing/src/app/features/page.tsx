import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FeaturesHero } from "@/components/features/FeaturesHero";
import { CoreFeatures } from "@/components/features/CoreFeatures";
import { RoadmapFeatures } from "@/components/features/RoadmapFeatures";
import { AIEngine } from "@/components/features/AIEngine";
import { FeaturesCTA } from "@/components/features/FeaturesCTA";

export const metadata: Metadata = {
  title: "Características — Azkali",
  description:
    "Descubre todo lo que Azkali puede hacer por ti: La Nevera, Kali IA, Tokens de Disciplina, Retos Grupales y más.",
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

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "./_components/Hero";
import { Problem } from "./_components/Problem";
import { HowItWorks } from "./_components/HowItWorks";
import { Features } from "./_components/Features";
import { DemoVideo } from "./_components/DemoVideo";
import { Testimonials } from "./_components/Testimonials";
import { Team } from "./_components/Team";
import { FinalCTA } from "./_components/FinalCTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <Features />
        <DemoVideo />
        <Testimonials />
        <Team />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}

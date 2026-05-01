import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HeroVideo from "@/components/HeroVideo";
import Clients from "@/components/Clients";
import WhatWeDo from "@/components/WhatWeDo";
import SuccessStories from "@/components/SuccessStories";
import HowItWorks from "@/components/HowItWorks";
import Partners from "@/components/Partners";
import FAQ from "@/components/FAQ";
import FinalCta from "@/components/FinalCta";
import LeadForm from "@/components/LeadForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <HeroVideo />
      <Clients />
      <WhatWeDo />
      <SuccessStories />
      <HowItWorks />
      <Partners />
      <FAQ />
      <FinalCta />
      <LeadForm />
      <Footer />
    </main>
  );
}

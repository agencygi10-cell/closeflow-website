import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhatWeDo from "@/components/WhatWeDo";
import Services from "@/components/Services";
import SuccessStories from "@/components/SuccessStories";
import HowItWorks from "@/components/HowItWorks";
import LeadForm from "@/components/LeadForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <WhatWeDo />
      <Services />
      <SuccessStories />
      <HowItWorks />
      <LeadForm />
      <Footer />
    </main>
  );
}

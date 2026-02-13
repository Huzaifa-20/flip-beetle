"use client";

import React, { useEffect } from "react";
import ServicesSection from "@/sections/ServicesSection";
import TeamSection from "@/sections/TeamSection";
import ValuesSection from "@/sections/ValuesSection";
import AnimatedTextSection from "@/components/AnimatedTextSection";
import ContactSection from "@/sections/ContactSection";
import { useLenis } from "@/contexts/LenisContext";

const AboutPage = () => {
  const { lenis } = useLenis();

  // Scroll to top when page loads
  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [lenis]);

  return (
    <main className="w-screen overflow-x-hidden">
      {/* Hero Section */}
      <section data-theme="cream" className="w-screen py-24 md:py-36 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimatedTextSection
            sentence="WE'RE A TEAM THAT BELIEVES GREAT WORK COMES FROM GENUINE PARTNERSHIP, STRATEGIC THINKING, AND AN UNWAVERING COMMITMENT TO YOUR SUCCESS."
            highlightWord="PARTNERSHIP,"
            animationType="word-by-word"
          />
        </div>
      </section>
      <TeamSection />
      <ServicesSection theme="cream" />
      <ValuesSection />
      <ContactSection />
    </main>
  );
};

export default AboutPage;

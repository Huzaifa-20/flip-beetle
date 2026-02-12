import React from "react";
import MissionSection from "@/sections/MissionSection";
import ServicesAltSection from "@/sections/ServicesAltSection";
import TeamSection from "@/sections/TeamSection";
import ValuesSection from "@/sections/ValuesSection";
import AnimatedTextSection from "@/components/AnimatedTextSection";

const AboutPage = () => {
  return (
    <main className="w-screen overflow-x-hidden">
      {/* Hero Section */}
      <section data-theme="cream" className="w-screen py-24 md:py-36 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimatedTextSection
            sentence="WE'RE A TEAM THAT BELIEVES GREAT WORK COMES FROM GENUINE PARTNERSHIP, STRATEGIC THINKING, AND AN UNWAVERING COMMITMENT TO YOUR SUCCESS."
            highlightWord="PARTNERSHIP"
            animationType="word-by-word"
          />
        </div>
      </section>

      {/* Team Section */}
      <TeamSection />

      {/* Services Section */}
      <ServicesAltSection />

      {/* Values Section */}
      <ValuesSection />
    </main>
  );
};

export default AboutPage;

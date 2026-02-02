import AboutSection from "@/sections/AboutSection";
import ClientsSection from "@/sections/ClientsSection";
import ServicesSection from "@/sections/ServicesSection";
import ProcessSection from "@/sections/ProcessSection";
import ContactSection from "@/sections/ContactSection";
import HeroSectionAlt from "@/sections/HeroSectionAlt";
import AboutSectionAlt from "@/sections/AboutSectionAlt";

export default function Home() {
  return (
    <>
      <HeroSectionAlt />
      <AboutSectionAlt />
      <AboutSection />
      <ClientsSection />
      <ServicesSection />
      <ProcessSection />
      <ContactSection />
    </>
  );
}

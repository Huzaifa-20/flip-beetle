import AboutSection from "@/sections/AboutSection";
import HeroSection from "@/sections/HeroSection";
import ClientsSection from "@/sections/ClientsSection";
import ServicesSection from "@/sections/ServicesSection";
import ContactSection from "@/sections/ContactSection";
import HeroSectionAlt from "@/sections/HeroSectionAlt";

export default function Home() {
  return (
    <>
      <HeroSectionAlt />
      <HeroSection />
      <AboutSection />
      <ClientsSection />
      <ServicesSection />
      <ContactSection />
    </>
  );
}

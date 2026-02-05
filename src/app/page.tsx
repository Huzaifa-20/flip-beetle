import AboutSection from "@/sections/AboutSection";
import ClientsSection from "@/sections/ClientsSection";
import ServicesSection from "@/sections/ServicesSection";
import ProcessSection from "@/sections/ProcessSection";
import FAQSection from "@/sections/FAQSection";
import ContactSection from "@/sections/ContactSection";
import HeroSectionAlt from "@/sections/HeroSectionAlt";
import AboutSectionAlt from "@/sections/AboutSectionAlt";
import TextScrollBanner from "@/components/TextScrollBanner";
import Testimonials from "@/sections/Testimonials";

export default function Home() {
  return (
    <>
      <HeroSectionAlt />
      <AboutSectionAlt />
      <AboutSection />
      <ClientsSection />
      <TextScrollBanner text="FLIPBEETLE" />
      <ServicesSection />
      <ProcessSection />
      <Testimonials />
      <FAQSection />
      <ContactSection />
    </>
  );
}

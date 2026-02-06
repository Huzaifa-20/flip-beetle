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
import BlogSection from "@/sections/BlogSection";
import { getFeaturedPosts } from "@/lib/blog";

export default async function Home() {
  // Fetch featured blog posts for the blog section
  const featuredPosts = await getFeaturedPosts(4);

  return (
    <>
      <HeroSectionAlt />
      <AboutSectionAlt />
      <AboutSection />
      <ClientsSection />
      <TextScrollBanner />
      <ServicesSection />
      <ProcessSection />
      <Testimonials />
      <BlogSection posts={featuredPosts} />
      <FAQSection />
      <ContactSection />
    </>
  );
}

import AboutSection from "@/sections/AboutSection";
import ClientsSection from "@/sections/ClientsSection";
import ServicesAltSection from "@/sections/ServicesAltSection";
import ProcessSection from "@/sections/ProcessSection";
import FAQSection from "@/sections/FAQSection";
import ContactSection from "@/sections/ContactSection";
import HeroSection from "@/sections/HeroSection";
import MissionSection from "@/sections/MissionSection";
import TextScrollBanner from "@/components/TextScrollBanner";
import Testimonials from "@/sections/Testimonials";
import BlogSection from "@/sections/BlogSection";
import { getFeaturedPosts } from "@/lib/blog";

export default async function Home() {
  // Fetch featured blog posts for the blog section
  const featuredPosts = await getFeaturedPosts(4);

  return (
    <>
      <HeroSection />
      <MissionSection />
      <AboutSection />
      {/* <ClientsSection /> */}
      <TextScrollBanner />
      <ServicesAltSection />
      <ProcessSection />
      <Testimonials />
      <BlogSection posts={featuredPosts} />
      {/* <FAQSection />
      <ContactSection /> */}
    </>
  );
}

import AboutSection from "@/sections/AboutSection";
import ClientsSection from "@/sections/ClientsSection";
import ServicesSection from "@/sections/ServicesSection";
import ProcessSection from "@/sections/ProcessSection";
import FAQSection from "@/sections/FAQSection";
import BookCallSection from "@/sections/BookCallSection";
import ContactSection from "@/sections/ContactSection";
import HeroSection from "@/sections/HeroSection";
import MissionSection from "@/sections/MissionSection";
import TextScrollBanner from "@/components/TextScrollBanner";
import Testimonials from "@/sections/Testimonials";
// import ProjectsSection from "@/sections/ProjectsSection";
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
      {/* <ProjectsSection /> */}
      <TextScrollBanner />
      <ServicesSection />
      <ProcessSection />
      <ClientsSection />
      <Testimonials />
      <BookCallSection />
      <FAQSection />
      <ContactSection />
      <BlogSection posts={featuredPosts} />
    </>
  );
}

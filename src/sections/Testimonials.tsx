"use client";
import AnimatedTextSection from "@/components/AnimatedTextSection";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { motion } from "motion/react";

const testimonials = [
  {
    text: "Flip Beetle transformed my portfolio into something I'm genuinely proud to share. Inquiries doubled within the first month.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    name: "Sarah Mitchell",
    role: "Freelance Photographer",
  },
  {
    text: "They didn't just build us a website—they understood our story and brought it to life. Our reservations are up 200%.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    name: "Marcus Chen",
    role: "Restaurant Owner",
  },
  {
    text: "Working with Flip Beetle felt like having a partner, not just a vendor. They nailed our brand identity on the first try.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    name: "Rachel Thompson",
    role: "Fitness Coach",
  },
  {
    text: "The new site is fast, beautiful, and actually converts. We've seen a 3x increase in leads since launching.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    name: "David Park",
    role: "Small Business Owner",
  },
  {
    text: "They took the time to understand my vision and delivered something that truly represents my brand. Worth every penny.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    name: "Amira Hassan",
    role: "Life Coach",
  },
  {
    text: "From branding to website launch, the process was seamless. They made the complex feel simple and delivered ahead of schedule.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    name: "James Rodriguez",
    role: "Startup Founder",
  },
  {
    text: "My new website showcases properties beautifully and loads incredibly fast. Clients constantly compliment the design.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    name: "Lisa Anderson",
    role: "Real Estate Agent",
  },
  {
    text: "They brought creativity and technical expertise in equal measure. The attention to detail in every interaction was impressive.",
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop",
    name: "Nina Patel",
    role: "Graphic Designer",
  },
  {
    text: "Flip Beetle redesigned our site and transformed our online presence. Traffic is up 150% and the site actually reflects who we are.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    name: "Tom Williams",
    role: "Local Business Owner",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const Testimonials = () => {
  return (
    <section className="relative py-16 md:py-20" data-theme="cream">
      <div className="container z-10 mx-auto px-4">

        <AnimatedTextSection sentence="What our users say" animationType="word-by-word" />

        <div className="flex justify-center gap-6 mt-10 mask-[linear-gradient(to_bottom,transparent,black_50%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

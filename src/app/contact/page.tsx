"use client";

import { useEffect } from "react";
import ContactSection from "@/sections/ContactSection";
import { useLenis } from "@/contexts/LenisContext";

const ContactPage = () => {
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
      <ContactSection />
    </main>
  );
};

export default ContactPage;

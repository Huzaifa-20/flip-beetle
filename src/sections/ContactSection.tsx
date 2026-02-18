"use client";

import React, { useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { fadeInUp, fadeInLeft } from "@/utils/animations";
import { PARALLAX_SPEEDS, SCROLL_OFFSETS } from "@/utils/parallaxConfig";
import AnimatedTextSection from "@/components/AnimatedTextSection";
import Button from "@/components/ui/Button";

const ContactSection = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Parallax scroll setup
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: SCROLL_OFFSETS.FOOTER,
  });

  // Cascading parallax effects - useTransform handles optimization internally
  const headingY = useTransform(scrollYProgress, [0, 1], [0, -40 * PARALLAX_SPEEDS.SLOWER]);
  const descriptionY = useTransform(scrollYProgress, [0, 1], [0, -30 * PARALLAX_SPEEDS.MEDIUM]);
  const formY = useTransform(scrollYProgress, [0, 1], [0, 35 * PARALLAX_SPEEDS.MEDIUM_FAST]);


  const [formData, setFormData] = useState({
    email: "",
    message: "",
    agreedToTerms: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.agreedToTerms) {
      alert("Please agree to the terms of Privacy Policy");
      return;
    }

    setIsSubmitting(true);

    try {
      // Here you would integrate with your email service (e.g., EmailJS, SendGrid, etc.)
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));

      setSubmitStatus("success");
      setFormData({ email: "", message: "", agreedToTerms: false });

      setTimeout(() => setSubmitStatus("idle"), 3000);
    } catch (error) {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      data-theme="cream"
      className="w-screen flex flex-col justify-center items-center pt-16 pb-28 md:py-32 px-4 sm:px-6 md:px-8"
    >
      <motion.div
        className="w-full flex flex-col items-center gap-12"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <AnimatedTextSection
          sentence="LET'S BUILD SOMETHING REMARKABLE"
          animationType="word-by-word"
          highlightWord="REMARKABLE"
        />

        {/* Description */}
        <motion.p
          className="max-w-3xl text-lg riposte text-center leading-relaxed"
          variants={fadeInUp}
          style={{ y: descriptionY }}
          transition={{ delay: 0.2 }}
        >
          Have a project in mind? We&apos;re ready to partner with you. Tell us about your vision,
          your goals, or the challenge you&apos;re looking to solve—and let&apos;s create something
          that makes an impact together.
        </motion.p>

        {/* Form Section */}
        <div className="w-full max-w-[800px] flex justify-center items-start">
          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="flex-2 p-4 sm:p-6 md:p-8 border border-black rounded-lg bg-background"
            variants={fadeInLeft}
            style={{ y: formY }}
            transition={{ delay: 0.3 }}
          >
            {/* To Field */}
            <div className="flex items-center gap-4 mb-8">
              <label className="text-base sm:text-lg riposte font-bold">To:</label>
              <div className="flex-1">
                <input
                  type="text"
                  value="flipbeetle"
                  readOnly
                  className="w-full bg-transparent border-b border-black text-black riposte text-lg pb-2 outline-none"
                />
              </div>
            </div>

            {/* From Field */}
            <div className="flex items-center gap-4 mb-12">
              <label className="text-base sm:text-lg riposte font-bold">From:</label>
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full bg-transparent border-b border-black text-black placeholder:text-black/50 riposte text-lg pb-2 outline-none"
                />
              </div>
            </div>

            {/* Message Field */}
            <div className="mb-8">
              <p className="text-base sm:text-lg riposte mb-2">Hey Flip Beetle,</p>
              <textarea
                placeholder="tell us about your project, vision, or what you're looking to create"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={6}
                className="w-full bg-transparent text-black placeholder:text-vlack/50 riposte text-lg outline-none resize-none"
              />
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-center gap-3 mb-8">
              <input
                type="checkbox"
                id="terms"
                checked={formData.agreedToTerms}
                onChange={(e) => setFormData({ ...formData, agreedToTerms: e.target.checked })}
                className="w-6 h-6 border-2 border-black rounded accent-secondary cursor-pointer"
              />
              <label htmlFor="terms" className="riposte text-black text-base">
                I agree to the terms of{" "}
                <span className="text-black underline cursor-pointer">Privacy Policy</span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between">
              <Button
                type="submit"
                disabled={isSubmitting}
                variant="outlined"
                theme="cream"
                className="px-6! sm:px-12! py-2! sm:py-4! text-sm! sm:text-lg!"
              >
                {isSubmitting ? "SENDING..." : "SEND EMAIL"}
              </Button>
            </div>

            {/* Status Messages */}
            {submitStatus === "success" && (
              <p className="mt-4 text-black riposte text-center">
                Message sent successfully!
              </p>
            )}
            {submitStatus === "error" && (
              <p className="mt-4 text-black riposte text-center">
                Failed to send message. Please try again.
              </p>
            )}
          </motion.form>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;

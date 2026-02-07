"use client";

import React, { useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { fadeInUp, fadeInLeft } from "@/utils/animations";
import { PARALLAX_SPEEDS, SCROLL_OFFSETS } from "@/utils/parallaxConfig";
import AnimatedTextSection from "@/components/AnimatedTextSection";

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
      ref={ref}
      data-theme="cream"
      className="w-screen flex flex-col justify-center items-center my-32 px-12"
    >
      <motion.div
        className="w-full flex flex-col items-center gap-12"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <AnimatedTextSection
          sentence="READY TO START? LET'S CONNECT!"
          animationType="word-by-word"
        />

        {/* Description */}
        <motion.p
          className="max-w-3xl text-lg riposte text-center leading-relaxed"
          variants={fadeInUp}
          style={{ y: descriptionY }}
          transition={{ delay: 0.2 }}
        >
          Whether you&apos;re curious about creating a new website or have questions on
          where to begin, I&apos;m here to help. Tell me about your business, your vision, or
          any ideas you have in mind—I&apos;d love to bring them to life.
        </motion.p>

        {/* Form Section */}
        <div className="w-full max-w-[800px] flex justify-center items-start gap-12">
          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="flex-2 p-12 border border-black rounded-lg bg-background"
            variants={fadeInLeft}
            style={{ y: formY }}
            transition={{ delay: 0.3 }}
          >
            {/* To Field */}
            <div className="flex items-center gap-4 mb-8">
              <label className="text-2xl riposte text-black font-bold">To:</label>
              <div className="flex-1">
                <input
                  type="text"
                  value="webdesignwithdaria@gmail.com"
                  readOnly
                  className="w-full bg-transparent border-b border-black text-black riposte text-lg pb-2 outline-none"
                />
              </div>
            </div>

            {/* From Field */}
            <div className="flex items-center gap-4 mb-12">
              <label className="text-2xl riposte text-black font-bold">From:</label>
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
              <p className="text-lg riposte text-black mb-2">Dear Daria,</p>
              <textarea
                placeholder="enter your message"
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
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="px-12 py-4 border border-black text-black text-2xl font-inter-tight rounded-lg hover:bg-secondary hover:text-background transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
              >
                {isSubmitting ? "SENDING..." : "SEND EMAIL"}
              </motion.button>

              <p className="riposte text-black/70 text-sm italic">
                *I will respond during 24 hours
              </p>
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

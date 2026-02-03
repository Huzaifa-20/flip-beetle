"use client";

import React, { useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { fadeInUp, fadeInLeft, fadeInRight } from "@/utils/animations";
import { PARALLAX_SPEEDS, SCROLL_OFFSETS } from "@/utils/parallaxConfig";

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

  // Individual cascading transforms for each social link
  const social1Y = useTransform(scrollYProgress, [0, 1], [0, (45 * PARALLAX_SPEEDS.FASTER) + (0 * 5)]);
  const social2Y = useTransform(scrollYProgress, [0, 1], [0, (45 * PARALLAX_SPEEDS.FASTER) + (1 * 5)]);
  const social3Y = useTransform(scrollYProgress, [0, 1], [0, (45 * PARALLAX_SPEEDS.FASTER) + (2 * 5)]);
  const social4Y = useTransform(scrollYProgress, [0, 1], [0, (45 * PARALLAX_SPEEDS.FASTER) + (3 * 5)]);

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

  const socialLinks = [
    { name: "INSTAGRAM", url: "https://instagram.com", color: "#606c38" },
    { name: "FACEBOOK", url: "https://facebook.com", color: "#606c38" },
    { name: "TELEGRAM", url: "https://telegram.org", color: "#606c38" },
    { name: "WHATSAPP", url: "https://whatsapp.com", color: "#606c38" },
  ];

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
        {/* Heading */}
        <motion.h1
          className="text-6xl md:text-7xl text-center text-primary"
          variants={fadeInUp}
          style={{ y: headingY }}
        >
          READY TO START? LET&apos;S CONNECT!
        </motion.h1>

        {/* Description */}
        <motion.p
          className="max-w-3xl text-lg font-josefin text-center leading-relaxed"
          variants={fadeInUp}
          style={{ y: descriptionY }}
          transition={{ delay: 0.2 }}
        >
          Whether you&apos;re curious about creating a new website or have questions on
          where to begin, I&apos;m here to help. Tell me about your business, your vision, or
          any ideas you have in mind—I&apos;d love to bring them to life.
        </motion.p>

        {/* Form and Social Media Section */}
        <div className="w-full flex justify-center items-start gap-12">
          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="flex-2 p-12 border-4 border-primary rounded-[40px] bg-background"
            variants={fadeInLeft}
            style={{ y: formY }}
            transition={{ delay: 0.3 }}
          >
            {/* To Field */}
            <div className="flex items-center gap-4 mb-8">
              <label className="text-2xl font-josefin text-primary font-bold">To:</label>
              <div className="flex-1">
                <input
                  type="text"
                  value="webdesignwithdaria@gmail.com"
                  readOnly
                  className="w-full bg-transparent border-b-2 border-primary text-primary font-josefin text-lg pb-2 outline-none"
                />
              </div>
            </div>

            {/* From Field */}
            <div className="flex items-center gap-4 mb-12">
              <label className="text-2xl font-josefin text-primary font-bold">From:</label>
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full bg-transparent border-b-2 border-primary text-primary placeholder:text-primary/50 font-josefin text-lg pb-2 outline-none"
                />
              </div>
            </div>

            {/* Message Field */}
            <div className="mb-8">
              <p className="text-lg font-josefin text-primary mb-2">Dear Daria,</p>
              <textarea
                placeholder="enter your message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={6}
                className="w-full bg-transparent text-primary placeholder:text-primary/50 font-josefin text-lg outline-none resize-none"
              />
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-center gap-3 mb-8">
              <input
                type="checkbox"
                id="terms"
                checked={formData.agreedToTerms}
                onChange={(e) => setFormData({ ...formData, agreedToTerms: e.target.checked })}
                className="w-6 h-6 border-2 border-primary rounded accent-secondary cursor-pointer"
              />
              <label htmlFor="terms" className="font-josefin text-primary text-base">
                I agree to the terms of{" "}
                <span className="text-secondary underline cursor-pointer">Privacy Policy</span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="px-12 py-4 border-4 border-secondary text-secondary text-2xl font-inter-tight rounded-full hover:bg-secondary hover:text-background transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
              >
                {isSubmitting ? "SENDING..." : "SEND EMAIL"}
              </motion.button>

              <p className="font-josefin text-primary/70 text-sm italic">
                *I will respond during 24 hours
              </p>
            </div>

            {/* Status Messages */}
            {submitStatus === "success" && (
              <p className="mt-4 text-primary font-josefin text-center">
                Message sent successfully!
              </p>
            )}
            {submitStatus === "error" && (
              <p className="mt-4 text-secondary font-josefin text-center">
                Failed to send message. Please try again.
              </p>
            )}
          </motion.form>

          {/* Social Media Links - Cascading parallax */}
          <motion.div
            className="flex flex-col gap-6"
            variants={fadeInRight}
            transition={{ delay: 0.4 }}
          >
            {socialLinks.map((social, index) => {
              // Get the pre-defined transform for this index
              const cascadeY = [social1Y, social2Y, social3Y, social4Y][index];

              return (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-96 px-12 py-6 bg-primary text-background text-3xl font-inter-tight italic text-center rounded-2xl hover:bg-secondary transition-colors duration-300"
                  style={{ y: cascadeY }}
                >
                  {social.name}
                </motion.a>
              );
            })}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;

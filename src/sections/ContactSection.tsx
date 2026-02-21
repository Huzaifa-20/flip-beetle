"use client";

import React, { useState } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { fadeInUp, fadeInLeft } from "@/utils/animations";
import { CheckCircle2 } from "lucide-react";
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
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send email");
      }

      setSubmitStatus("success");
      setFormData({ email: "", phone: "", message: "" });
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
          <AnimatePresence mode="wait">
            {submitStatus === "success" ? (
              /* Success State - replaces the form */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
                className="w-full p-8 sm:p-12 md:p-16 border border-black rounded-lg bg-background flex flex-col items-center gap-6 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }}
                >
                  <CheckCircle2 className="w-16 h-16 text-primary" strokeWidth={1.5} />
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.4 }}
                  className="text-2xl sm:text-3xl riposte font-bold text-black uppercase tracking-wider"
                >
                  Message Sent
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  className="text-base sm:text-lg riposte text-black/70 w-full"
                >
                  We&apos;ll get back to you soon. Great things are about to happen.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65, duration: 0.4 }}
                >
                  <Button
                    onClick={() => setSubmitStatus("idle")}
                    variant="outlined"
                    theme="cream"
                    className="px-6! sm:px-12! py-2! sm:py-4! text-sm! sm:text-lg! mt-2"
                  >
                    SEND ANOTHER
                  </Button>
                </motion.div>
              </motion.div>
            ) : (
              /* Contact Form */
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="flex-2 p-4 sm:p-6 md:p-8 border border-black rounded-lg bg-background"
                variants={fadeInLeft}
                style={{ y: formY }}
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
                <div className="flex items-center gap-4 mb-8">
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

                {/* Phone Field */}
                <div className="flex items-center gap-4 mb-12">
                  <label className="text-base sm:text-lg riposte font-bold">Phone:</label>
                  <div className="flex-1">
                    <input
                      type="tel"
                      placeholder="your mobile number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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

                {/* Error Message */}
                <AnimatePresence>
                  {submitStatus === "error" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mb-6 p-4 border border-secondary rounded-lg bg-secondary/10"
                    >
                      <p className="text-black riposte text-sm sm:text-base text-center">
                        Something went wrong. Please try again.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

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
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;

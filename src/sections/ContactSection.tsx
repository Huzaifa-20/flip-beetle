"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { fadeInUp, fadeInLeft } from "@/utils/animations";
import { CheckCircle2, Mail, Phone, Instagram } from "lucide-react";
import { PARALLAX_SPEEDS, SCROLL_OFFSETS } from "@/utils/parallaxConfig";
import AnimatedTextSection from "@/components/AnimatedTextSection";
import Button from "@/components/ui/Button";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";

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

  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileError, setTurnstileError] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance | null>(null);

  const handleTurnstileSuccess = useCallback((token: string) => {
    setTurnstileToken(token);
    setTurnstileError(null);
  }, []);

  const handleTurnstileError = useCallback(() => {
    setTurnstileToken(null);
    setTurnstileError("Verification failed. Please try again.");
  }, []);

  const handleTurnstileExpire = useCallback(() => {
    setTurnstileToken(null);
    setTurnstileError("Verification expired. Please verify again.");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!turnstileToken) {
      setTurnstileError("Please complete the verification challenge.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          turnstileToken,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        if (response.status === 403) {
          setTurnstileToken(null);
          turnstileRef.current?.reset();
          throw new Error(errorData?.error || "Verification failed. Please try again.");
        }
        throw new Error(errorData?.error || "Failed to send message");
      }

      setSubmitStatus("success");
      setFormData({ email: "", phone: "", message: "" });
      setTurnstileToken(null);
      turnstileRef.current?.reset();
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

                {/* Turnstile CAPTCHA */}
                <div className="space-y-2 mb-8">
                  <Turnstile
                    ref={turnstileRef}
                    siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                    onSuccess={handleTurnstileSuccess}
                    onError={handleTurnstileError}
                    onExpire={handleTurnstileExpire}
                    options={{
                      theme: "light",
                      size: "flexible",
                    }}
                  />
                  {turnstileError && (
                    <p className="text-secondary text-sm riposte">{turnstileError}</p>
                  )}
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
                    disabled={isSubmitting || !turnstileToken}
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

        {/* Direct Contact Info */}
        <motion.div
          variants={fadeInUp}
          transition={{ delay: 0.4 }}
          className="flex justify-center gap-6"
        >
          <a href="mailto:flipbeetle@studiocrobe.com" aria-label="Email" className="text-black/50 hover:text-black transition-colors duration-300">
            <Mail className="w-5 h-5" />
          </a>
          <a href="tel:+971525021443" aria-label="Phone" className="text-black/50 hover:text-black transition-colors duration-300">
            <Phone className="w-5 h-5" />
          </a>
          <a href="https://wa.me/971525021443" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-black/50 hover:text-black transition-colors duration-300">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </a>
          <a href="https://www.instagram.com/flipbeetle" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-black/50 hover:text-black transition-colors duration-300">
            <Instagram className="w-5 h-5" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ContactSection;

"use client";

import React, { useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { fadeInUp, createStaggerContainer } from "@/utils/animations";
import AnimatedTextSection from "@/components/AnimatedTextSection";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: "faq-1",
    question: "How long until we're live?",
    answer:
      "Most projects land between 3-6 weeks, depending on scope. But here's the thing—we're not watching the clock, we're building something that works. Rush jobs get rushed results. We move fast where it counts and take our time where it matters. You'll have a clear timeline from day one.",
  },
  {
    id: "faq-2",
    question: "What if I don't have content ready?",
    answer:
      "Perfect. Most people don't. We'll help you figure out what story you're telling and how to tell it. Bring your vision, your vibe, and what makes you different. We'll handle the rest—from writing copy that actually sounds like you to sourcing visuals that don't look like stock photo hell.",
  },
  {
    id: "faq-3",
    question: "Do you only work with certain industries?",
    answer:
      "We build for people, not industries. Whether you're flipping burgers or flipping houses, coaching athletes or crafting jewelry—if you've got a vision worth sharing, we're in. Good design doesn't care about your job title.",
  },
  {
    id: "faq-4",
    question: "Will this look good on mobile?",
    answer:
      "It better. Over half your visitors are on their phones right now. Every site we build is designed mobile-first, which means it's not just 'responsive'—it's built to look stunning and work perfectly on whatever screen your audience is holding.",
  },
  {
    id: "faq-5",
    question: "Can I make updates myself later?",
    answer:
      "Absolutely. We'll set you up with a system that doesn't require a computer science degree to figure out. Change text, swap images, add new pages—all without calling us. (Though we're here if you need us.) You own your site, so you should be able to control it.",
  },
];

const FAQSection = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section
      ref={ref}
      data-theme="cream"
      className="w-screen flex justify-center items-center py-16 md:py-32 px-4 sm:px-6 md:px-8"
    >
      <div className="w-full max-w-4xl flex flex-col gap-12 justify-start items-center">
        <AnimatedTextSection
          sentence="Frequently asked questions"
          animationType="fade-in"
        />

        <motion.div
          className="w-full flex flex-col gap-4"
          variants={createStaggerContainer(0.1, 0.2)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              variants={fadeInUp}
              className="w-full border-b-2 border-primary/20 pb-4"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full flex justify-between items-center gap-4 text-left group"
              >
                <h3 className="text-2xl riposte group-hover:text-secondary transition-colors">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: expandedId === faq.id ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center"
                >
                  <span className="text-secondary text-2xl font-light">+</span>
                </motion.div>
              </button>

              <AnimatePresence>
                {expandedId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-lg riposte leading-relaxed mt-4">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;

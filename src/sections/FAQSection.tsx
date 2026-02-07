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
    question: "How long does it take to build a website?",
    answer:
      "The timeline varies depending on the project scope and complexity. A simple landing page typically takes 2-3 weeks, while a multi-page website can take 4-6 weeks. I'll provide you with a detailed timeline after understanding your specific requirements.",
  },
  {
    id: "faq-2",
    question: "What do I need to provide to get started?",
    answer:
      "To get started, I'll need your brand guidelines (colors, fonts, logos), content (text and images), and a clear understanding of your goals. Don't worry if you don't have everything ready—I can guide you through the process and help with content creation if needed.",
  },
  {
    id: "faq-3",
    question: "Do you offer ongoing support and maintenance?",
    answer:
      "Yes! I offer ongoing support and maintenance packages to ensure your website stays up-to-date, secure, and performing optimally. This includes regular updates, bug fixes, and minor content changes as needed.",
  },
  {
    id: "faq-4",
    question: "Will my website be mobile-friendly?",
    answer:
      "Absolutely! All websites I create are fully responsive and optimized for all devices—from smartphones to tablets to desktop computers. Mobile-first design is a standard practice to ensure your site looks great everywhere.",
  },
  {
    id: "faq-5",
    question: "Can I update the website content myself?",
    answer:
      "Yes! I can integrate a user-friendly content management system (CMS) that allows you to easily update text, images, and other content without any technical knowledge. I'll also provide training on how to use it.",
  },
  {
    id: "faq-6",
    question: "What is your payment structure?",
    answer:
      "I typically work with a 50% upfront deposit to begin the project, with the remaining 50% due upon completion and before the website goes live. For larger projects, we can arrange a milestone-based payment plan.",
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
      className="w-screen flex justify-center items-center my-32 px-4 sm:px-6 md:px-8"
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
                    <p className="text-lg riposte leading-relaxed mt-4 text-primary/80">
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

"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "filled" | "outlined";
  theme?: "cream" | "green" | "black";
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const Button = ({
  children,
  href,
  onClick,
  variant = "filled",
  theme = "cream",
  className = "",
  type = "button",
  disabled = false,
}: ButtonProps) => {
  // Determine colors based on theme and variant
  const getButtonStyles = () => {
    if (variant === "filled") {
      switch (theme) {
        case "cream":
          return "bg-[var(--color-primary)] text-[var(--color-background)] hover:bg-[var(--color-primary)]/90 border-[var(--color-primary)]";
        case "green":
          return "bg-[var(--color-background)] text-[var(--color-primary)] hover:bg-[var(--color-background)]/90 border-[var(--color-background)]";
        case "black":
          return "bg-[var(--color-background)] text-[var(--color-primary)] hover:bg-[var(--color-background)]/90 border-[var(--color-background)]";
        default:
          return "bg-[var(--color-primary)] text-[var(--color-background)] hover:bg-[var(--color-primary)]/90 border-[var(--color-primary)]";
      }
    } else {
      // outlined
      switch (theme) {
        case "cream":
          return "bg-transparent text-[var(--color-primary)] border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-background)]";
        case "green":
          return "bg-transparent text-[var(--color-background)] border-[var(--color-background)] hover:bg-[var(--color-background)] hover:text-[var(--color-primary)]";
        case "black":
          return "bg-transparent text-[var(--color-background)] border-[var(--color-background)] hover:bg-[var(--color-background)] hover:text-[var(--color-primary)]";
        default:
          return "bg-transparent text-[var(--color-primary)] border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-background)]";
      }
    }
  };

  const baseStyles =
    "inline-block px-6 md:px-8 py-3 md:py-4 border-2 rounded-lg riposte text-sm md:text-base uppercase tracking-wider transition-all duration-300";

  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "";
  const buttonStyles = `${baseStyles} ${getButtonStyles()} ${disabledStyles} ${className}`;

  // If href is provided, render as Link
  if (href) {
    return (
      <motion.div
        // whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.99 }}
        className="inline-block"
      >
        <Link href={href} className={buttonStyles}>
          {children}
        </Link>
      </motion.div>
    );
  }

  // Otherwise render as button
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonStyles}
      whileTap={disabled ? undefined : { scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
};

export default Button;

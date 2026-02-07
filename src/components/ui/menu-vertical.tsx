"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

import Link from "next/link";

type MenuItem = {
  label: string;
  href: string;
};

interface MenuVerticalProps {
  menuItems: MenuItem[];
  color?: string;
  skew?: number;
  onItemClick?: () => void;
}

const MotionLink = motion.create(Link);

export const MenuVertical = ({
  menuItems = [],
  color = "var(--color-menu-default)", // Fallback color, usually overridden by parent
  skew = 0,
  onItemClick,
}: MenuVerticalProps) => {
  return (
    <div className="flex w-fit flex-col gap-5 sm:gap-6 md:gap-8 px-0">
      {menuItems.map((item, index) => (
        <motion.div
          key={`${item.href}-${index}`}
          className="group/nav flex items-center gap-1.5 sm:gap-2 cursor-pointer"
          style={{ color }}
          initial="initial"
          whileHover="hover"
        >
          <motion.div
            variants={{
              initial: { x: "-100%", opacity: 0 },
              hover: { x: 0, opacity: 1 },
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="z-0"
          >
            <ArrowRight strokeWidth={3} className="size-7 sm:size-8 md:size-10" />
          </motion.div>

          <MotionLink
            href={item.href}
            onClick={onItemClick}
            variants={{
              initial: { x: -32 },
              hover: { x: 0, skewX: skew },
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="font-semibold text-2xl sm:text-3xl md:text-4xl no-underline"
            style={{ color }}
          >
            {item.label}
          </MotionLink>
        </motion.div>
      ))}
    </div>
  );
};

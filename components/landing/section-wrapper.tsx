"use client";

import { motion } from "framer-motion";

const defaultVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

type SectionWrapperProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  as?: "section" | "div";
  delay?: number;
  once?: boolean;
};

export function SectionWrapper({
  children,
  className,
  id,
  as: Component = "section",
  delay = 0,
  once = true,
}: SectionWrapperProps) {
  const MotionEl = Component === "section" ? motion.section : motion.div;
  return (
    <MotionEl
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.5, delay }}
      variants={defaultVariants}
    >
      {children}
    </MotionEl>
  );
}

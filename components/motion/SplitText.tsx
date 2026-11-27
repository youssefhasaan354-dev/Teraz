"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  wordSpacing?: string;
  priority?: boolean;
}

export function SplitText({
  text,
  className = "",
  delay = 0,
  wordSpacing = "mx-1.5",
  priority = false,
}: SplitTextProps) {
  const shouldReduceMotion = useReducedMotion();

  // If priority (above the fold) or reduced motion, render text immediately without delay
  if (shouldReduceMotion || priority) {
    return <span className={className}>{text}</span>;
  }

  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: delay * i },
    }),
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 18,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 110,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 110,
      },
    },
  };

  return (
    <motion.span
      className={`inline-block overflow-hidden ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          key={index}
          className={`inline-block ${wordSpacing}`}
          style={{ willChange: "transform, opacity" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

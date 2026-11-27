"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface LineDrawProps {
  variant?: "horizontal" | "arc" | "vertical";
  className?: string;
  delay?: number;
  duration?: number;
}

export function LineDraw({
  variant = "horizontal",
  className = "",
  delay = 0.2,
  duration = 1.2,
}: LineDrawProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    if (variant === "vertical") {
      return <div className={`w-px bg-gold/40 ${className}`} />;
    }
    return <div className={`h-px bg-gold/40 ${className}`} />;
  }

  if (variant === "vertical") {
    return (
      <div className={`relative w-px overflow-hidden ${className}`}>
        <motion.div
          initial={{ scaleY: 0, originY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full bg-gradient-to-b from-transparent via-gold to-transparent"
        />
      </div>
    );
  }

  if (variant === "arc") {
    return (
      <div className={`overflow-hidden flex justify-center ${className}`}>
        <motion.svg
          viewBox="0 0 200 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[240px] origin-center"
        >
          <path
            d="M 10 30 Q 100 5 190 30"
            stroke="url(#goldGradientArc)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="goldGradientArc" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#B38B54" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#D9B97E" stopOpacity="1" />
              <stop offset="100%" stopColor="#B38B54" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </motion.svg>
      </div>
    );
  }

  // Horizontal line by default
  return (
    <div className={`relative h-px w-full overflow-hidden ${className}`}>
      <motion.div
        initial={{ scaleX: 0, originX: 0.5 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
        className="w-full h-full bg-gradient-to-r from-transparent via-gold to-transparent"
      />
    </div>
  );
}

"use client";

import React from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

interface ScrollProgressProps {
  className?: string;
}

export function ScrollProgress({ className = "" }: ScrollProgressProps) {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  if (shouldReduceMotion) return null;

  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0%" }}
      className={`fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-gold via-gold-light to-gold z-50 pointer-events-none ${className}`}
    />
  );
}

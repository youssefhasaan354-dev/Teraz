"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface ImageRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  priority?: boolean;
  direction?: "up" | "right" | "left" | "down" | "center";
}

export function ImageReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.9,
  priority = false,
  direction = "center",
}: ImageRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion || priority) {
    return (
      <div className={`overflow-hidden ${className}`}>
        <div className="w-full h-full">{children}</div>
      </div>
    );
  }

  // Architectural clip-path variations
  const clipVariants = {
    center: {
      hidden: { clipPath: "polygon(10% 10%, 90% 10%, 90% 90%, 10% 90%)", opacity: 0 },
      visible: {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        opacity: 1,
        transition: {
          duration,
          delay,
          ease: [0.25, 1, 0.5, 1], // expo/power3.out
        },
      },
    },
    up: {
      hidden: { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)", opacity: 0.3 },
      visible: {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        opacity: 1,
        transition: {
          duration,
          delay,
          ease: [0.25, 1, 0.5, 1],
        },
      },
    },
    right: {
      hidden: { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)", opacity: 0.3 },
      visible: {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        opacity: 1,
        transition: {
          duration,
          delay,
          ease: [0.25, 1, 0.5, 1],
        },
      },
    },
    left: {
      hidden: { clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)", opacity: 0.3 },
      visible: {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        opacity: 1,
        transition: {
          duration,
          delay,
          ease: [0.25, 1, 0.5, 1],
        },
      },
    },
    down: {
      hidden: { clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)", opacity: 0.3 },
      visible: {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        opacity: 1,
        transition: {
          duration,
          delay,
          ease: [0.25, 1, 0.5, 1],
        },
      },
    },
  };

  const selectedClip = clipVariants[direction] || clipVariants.center;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={selectedClip}
      className={`relative overflow-hidden ${className}`}
      style={{ willChange: "clip-path, opacity" }}
    >
      <motion.div
        initial={{ scale: 1.12 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{
          duration: duration * 1.25,
          delay,
          ease: [0.25, 1, 0.5, 1],
        }}
        className="w-full h-full"
        style={{ willChange: "transform" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

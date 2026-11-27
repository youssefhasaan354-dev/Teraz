"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export type RevealVariant =
  | "up"
  | "down"
  | "left"
  | "right"
  | "fade"
  | "clip"
  | "scale";

export interface RevealProps {
  children: React.ReactNode;
  variant?: RevealVariant;
  direction?: "up" | "down" | "left" | "right" | "none"; // Backward compatibility
  delay?: number;
  duration?: number;
  staggerIndex?: number;
  staggerDelay?: number;
  priority?: boolean; // Critical for LCP elements: renders immediately without delay or layout shift!
  className?: string;
  threshold?: number;
}

interface StaggerContextType {
  staggerDelay: number;
}

const StaggerContext = createContext<StaggerContextType | null>(null);

export function RevealStagger({
  children,
  staggerDelay = 0.08,
  className = "",
}: {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}) {
  return (
    <StaggerContext.Provider value={{ staggerDelay }}>
      <div className={className}>{children}</div>
    </StaggerContext.Provider>
  );
}

export function Reveal({
  children,
  variant,
  direction,
  delay = 0,
  duration = 0.75,
  staggerIndex,
  staggerDelay = 0.08,
  priority = false,
  className = "",
  threshold = -40,
}: RevealProps) {
  const { language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const staggerCtx = useContext(StaggerContext);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 768);
    }
  }, []);

  // Resolve active variant with backward compatibility for direction prop
  const activeVariant: RevealVariant =
    variant ||
    (direction === "none" ? "fade" : (direction as RevealVariant)) ||
    "up";

  // Calculate staggered cascade delay
  const effectiveStaggerDelay = staggerCtx ? staggerCtx.staggerDelay : staggerDelay;
  const effectiveDelay =
    typeof staggerIndex === "number"
      ? delay + staggerIndex * effectiveStaggerDelay
      : delay;

  // LCP & Accessibility Guard: Show instantly if reduced motion or above-the-fold priority
  if (shouldReduceMotion || priority) {
    return (
      <div
        className={className}
        style={{ opacity: 1, transform: "none", clipPath: "none" }}
      >
        {children}
      </div>
    );
  }

  // Initial and Animate states using GPU-accelerated properties (transform, opacity, clip-path)
  const getInitial = () => {
    const yOffset = isMobile ? 18 : 32;
    const xOffset = isMobile ? 18 : 32;

    switch (activeVariant) {
      case "up":
        return { opacity: 0, y: yOffset };
      case "down":
        return { opacity: 0, y: -yOffset };
      case "left":
        // In RTL Arabic layout: "left" enters from opposite inline direction
        return { opacity: 0, x: language === "ar" ? xOffset : -xOffset };
      case "right":
        // In RTL Arabic layout: "right" enters from opposite inline direction
        return { opacity: 0, x: language === "ar" ? -xOffset : xOffset };
      case "clip":
        // Luxury architectural curtain unmasking
        return {
          opacity: 0.05,
          clipPath: "inset(0 0 100% 0)",
          scale: 1.03,
        };
      case "scale":
        return { opacity: 0, scale: 0.95 };
      case "fade":
      default:
        return { opacity: 0 };
    }
  };

  const getAnimate = () => {
    switch (activeVariant) {
      case "clip":
        return {
          opacity: 1,
          clipPath: "inset(0 0 0% 0)",
          scale: 1,
        };
      case "scale":
        return {
          opacity: 1,
          scale: 1,
        };
      case "up":
      case "down":
      case "left":
      case "right":
        return {
          opacity: 1,
          y: 0,
          x: 0,
        };
      case "fade":
      default:
        return {
          opacity: 1,
        };
    }
  };

  // Luxury editorial ease curve
  const luxuryEase = [0.19, 1, 0.22, 1];

  return (
    <motion.div
      initial={getInitial()}
      whileInView={getAnimate()}
      viewport={{ once: true, margin: `${threshold}px` }}
      transition={{
        duration: isMobile ? Math.min(duration, 0.6) : duration,
        delay: effectiveDelay,
        ease: luxuryEase,
      }}
      className={className}
      style={{
        willChange: activeVariant === "clip" ? "transform, opacity, clip-path" : "transform, opacity",
      }}
    >
      {children}
    </motion.div>
  );
}

// Hook for custom component integration
export function useReveal() {
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 768);
    }
  }, []);

  return {
    isReducedMotion: Boolean(shouldReduceMotion),
    isMobile,
  };
}

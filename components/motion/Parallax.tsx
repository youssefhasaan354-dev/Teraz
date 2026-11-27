"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface ParallaxProps {
  children: React.ReactNode;
  speed?: number; // negative moves slower than scroll, positive faster
  className?: string;
  horizontal?: boolean;
}

export function Parallax({
  children,
  speed = 0.15,
  className = "",
  horizontal = false,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 768px)").matches);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Scale down parallax magnitude on mobile to protect 60fps
  const effectiveSpeed = isMobile ? speed * 0.4 : speed;
  const distance = effectiveSpeed * 100;

  const y = useTransform(scrollYProgress, [0, 1], [-distance, distance]);
  const x = useTransform(scrollYProgress, [0, 1], [-distance, distance]);

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        style={horizontal ? { x, willChange: "transform" } : { y, willChange: "transform" }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}

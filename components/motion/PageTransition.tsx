"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";

export function PageTransition() {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) return;

    // Trigger transition curtain on route change
    setIsTransitioning(true);

    // Scroll to top and refresh ScrollTrigger
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    const timer = setTimeout(() => {
      setIsTransitioning(false);
      // Trigger GSAP ScrollTrigger recalculations after layout shifts
      if (typeof window !== "undefined" && (window as any).ScrollTrigger) {
        (window as any).ScrollTrigger.refresh();
      }
    }, 550);

    return () => clearTimeout(timer);
  }, [pathname, shouldReduceMotion]);

  if (shouldReduceMotion) return null;

  return (
    <AnimatePresence mode="wait">
      {isTransitioning && (
        <motion.div
          key="route-curtain"
          initial={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
          animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
          exit={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] bg-espresso flex items-center justify-center pointer-events-none select-none"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center gap-3"
          >
            <div className="relative w-28 h-16">
              <Image
                src="/brand/logo-light.svg"
                alt="TERAZ"
                fill
                priority
                className="object-contain"
              />
            </div>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

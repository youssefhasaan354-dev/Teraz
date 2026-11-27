"use client";

import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface SmoothScrollContextType {
  lenis: Lenis | null;
  isReducedMotion: boolean;
  isMobile: boolean;
  scrollTo: (target: string | number | HTMLElement, options?: any) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  lenis: null,
  isReducedMotion: false,
  isMobile: false,
  scrollTo: () => {},
});

export const useLenis = () => useContext(SmoothScrollContext);

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Detect accessibility preferences and device viewport
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = window.matchMedia("(max-width: 768px)");

    const updateMedia = () => {
      setIsReducedMotion(motionQuery.matches);
      setIsMobile(mobileQuery.matches);
    };

    updateMedia();
    motionQuery.addEventListener("change", updateMedia);
    mobileQuery.addEventListener("change", updateMedia);

    // If reduced motion is requested, do NOT initialize smooth momentum scroll
    if (motionQuery.matches) {
      return () => {
        motionQuery.removeEventListener("change", updateMedia);
        mobileQuery.removeEventListener("change", updateMedia);
      };
    }

    gsap.registerPlugin(ScrollTrigger);

    // RTL-safe Lenis smooth scroll configuration
    const instance = new Lenis({
      duration: mobileQuery.matches ? 0.9 : 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // luxury exponential deceleration
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: mobileQuery.matches ? 1.0 : 1.15,
      infinite: false,
    });

    lenisRef.current = instance;
    setLenis(instance);

    // Synchronize Lenis scroll momentum with GSAP ScrollTrigger
    instance.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      instance.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      motionQuery.removeEventListener("change", updateMedia);
      mobileQuery.removeEventListener("change", updateMedia);
      gsap.ticker.remove(tickerCallback);
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, []);

  // Reset scroll and recalculate ScrollTrigger positions on route transition
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    } else if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  const scrollTo = (target: string | number | HTMLElement, options?: any) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, options);
    } else if (typeof window !== "undefined") {
      if (typeof target === "number") {
        window.scrollTo({ top: target, behavior: "smooth" });
      } else if (typeof target === "string") {
        const el = document.querySelector(target);
        el?.scrollIntoView({ behavior: "smooth" });
      } else if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <SmoothScrollContext.Provider
      value={{
        lenis,
        isReducedMotion,
        isMobile,
        scrollTo,
      }}
    >
      {children}
    </SmoothScrollContext.Provider>
  );
}

"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { useInView, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface BeforeAfterProps {
  beforeImage: string;
  afterImage: string;
  caption?: string;
  className?: string;
}

export function BeforeAfter({
  beforeImage,
  afterImage,
  caption,
  className = "",
}: BeforeAfterProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });
  const shouldReduceMotion = useReducedMotion();
  const { language } = useLanguage();
  const hasAutoDemoed = useRef(false);

  // Auto-demo sweep when entering viewport
  useEffect(() => {
    if (isInView && !hasAutoDemoed.current && !shouldReduceMotion) {
      hasAutoDemoed.current = true;
      let start: number | null = null;
      const demoDuration = 1800; // ms

      const step = (timestamp: number) => {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        const progress = Math.min(elapsed / demoDuration, 1);

        // Sinusoidal sweep: 50% -> 25% -> 70% -> 50%
        const sweep = 50 + Math.sin(progress * Math.PI * 2) * 22;
        setSliderPosition(sweep);

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          setSliderPosition(50);
        }
      };

      const timer = setTimeout(() => {
        requestAnimationFrame(step);
      }, 400);

      return () => clearTimeout(timer);
    }
  }, [isInView, shouldReduceMotion]);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      let percentage = (x / rect.width) * 100;
      if (percentage < 0) percentage = 0;
      if (percentage > 100) percentage = 100;
      setSliderPosition(percentage);
    },
    []
  );

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <div className={`relative w-full overflow-hidden select-none rounded-2xl ${className}`}>
      <div
        ref={containerRef}
        className="relative w-full aspect-[16/10] sm:aspect-[16/9] cursor-ew-resize overflow-hidden border border-gold/30 rounded-2xl shadow-xl"
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* After Image (Background, full width) */}
        <div className="absolute inset-0">
          <Image
            src={afterImage}
            alt="After Renovation"
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover"
            priority
          />
          <div className="absolute bottom-4 right-4 bg-espresso/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-gold/40 text-cream text-xs font-medium tracking-wide">
            {language === "ar" ? "بعد التنفيذ ✨" : "After ✨"}
          </div>
        </div>

        {/* Before Image (Clipped overlay) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <div className="relative w-full h-full" style={{ width: containerRef.current?.offsetWidth || "100%" }}>
            <Image
              src={beforeImage}
              alt="Before Renovation"
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-espresso/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-gold/40 text-cream text-xs font-medium tracking-wide">
              {language === "ar" ? "قبل التجديد" : "Before"}
            </div>
          </div>
        </div>

        {/* Divider Line & Handle */}
        <div
          className="absolute top-0 bottom-0 z-20 pointer-events-none"
          style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
        >
          <div className="w-0.5 h-full bg-gold shadow-[0_0_12px_rgba(217,185,126,0.9)]" />
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 w-10 h-10 rounded-full bg-espresso border-2 border-gold flex items-center justify-center text-gold shadow-2xl pointer-events-auto cursor-ew-resize hover:scale-110 transition-transform">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 9l-3 3m0 0l3 3m-3-3h14m-3-3l3 3m0 0l-3 3"
              />
            </svg>
          </div>
        </div>
      </div>

      {caption && (
        <p className="mt-3 text-center text-sm text-taupe font-medium">
          {caption}
        </p>
      )}
    </div>
  );
}

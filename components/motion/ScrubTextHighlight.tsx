"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface ScrubTextHighlightProps {
  text: string;
  className?: string;
  textClassName?: string;
}

export function ScrubTextHighlight({
  text,
  className = "",
  textClassName = "",
}: ScrubTextHighlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const words = text.split(" ");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.35"],
  });

  if (shouldReduceMotion) {
    return (
      <div className={className}>
        <p className={`text-espresso ${textClassName}`}>{text}</p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative select-none ${className}`}>
      <p className={`flex flex-wrap leading-relaxed ${textClassName}`}>
        {words.map((word, i) => {
          const start = i / words.length;
          const end = (i + 1) / words.length;
          return (
            <Word key={i} progress={scrollYProgress} range={[start, end]}>
              {word}
            </Word>
          );
        })}
      </p>
    </div>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: any;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.28, 1]);
  const color = useTransform(progress, range, ["#8A7762", "#1C1512"]);

  return (
    <motion.span
      style={{ opacity, color }}
      className="inline-block mx-1.5 my-1 font-bold transition-colors duration-200"
    >
      {children}
    </motion.span>
  );
}

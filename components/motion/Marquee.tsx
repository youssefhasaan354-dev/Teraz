"use client";

import React from "react";

interface MarqueeProps {
  items: string[];
  speed?: number;
  reverse?: boolean;
  className?: string;
}

export function Marquee({
  items,
  speed = 25,
  reverse = false,
  className = "",
}: MarqueeProps) {
  return (
    <div className={`overflow-hidden whitespace-nowrap flex select-none py-4 border-y border-gold/20 bg-espresso text-cream ${className}`}>
      <div
        className={`flex min-w-full shrink-0 items-center justify-around gap-12 animate-marquee ${
          reverse ? "animate-marquee-reverse" : ""
        }`}
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        {items.concat(items).map((item, idx) => (
          <div key={idx} className="flex items-center gap-6">
            <span className="text-sm md:text-base font-semibold tracking-widest uppercase text-cream/90">
              {item}
            </span>
            <span className="w-2 h-2 rounded-full bg-gold/60 inline-block" />
          </div>
        ))}
      </div>
    </div>
  );
}

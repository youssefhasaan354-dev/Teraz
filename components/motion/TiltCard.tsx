"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glare?: boolean;
}

export function TiltCard({
  children,
  className = "",
  maxTilt = 7,
  glare = false,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isTouch, setIsTouch] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  if (shouldReduceMotion || isTouch) {
    return <div className={className}>{children}</div>;
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -maxTilt;
    const rY = ((x - centerX) / centerX) * maxTilt;

    setRotateX(rX);
    setRotateY(rY);

    if (glare) {
      setGlarePosition({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
      });
    }
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
        willChange: "transform",
      }}
      className={`relative ${className}`}
    >
      {children}
      {glare && (
        <div
          className="absolute inset-0 pointer-events-none rounded-inherit transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(217, 185, 126, 0.15) 0%, transparent 60%)`,
          }}
        />
      )}
    </motion.div>
  );
}

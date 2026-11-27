"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorVariant, setCursorVariant] = useState<"default" | "hover" | "view">("default");
  const [cursorText, setCursorText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    // Only enable on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const mouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      const interactiveEl = target.closest("[data-cursor]");
      if (interactiveEl) {
        const type = interactiveEl.getAttribute("data-cursor");
        if (type === "view") {
          setCursorVariant("view");
          setCursorText(language === "ar" ? "عرض" : "View");
        } else {
          setCursorVariant("hover");
          setCursorText("");
        }
      } else {
        setCursorVariant("default");
        setCursorText("");
      }
    };

    const mouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseleave", mouseLeave);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("mouseleave", mouseLeave);
    };
  }, [isVisible, language]);

  if (!isVisible) return null;

  const variants = {
    default: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      width: 16,
      height: 16,
      backgroundColor: "rgba(179, 139, 84, 0.7)",
      border: "1px solid rgba(217, 185, 126, 0.9)",
      transition: { type: "spring", mass: 0.1, stiffness: 800, damping: 35 },
    },
    hover: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      width: 48,
      height: 48,
      backgroundColor: "rgba(28, 21, 18, 0.15)",
      border: "2px solid rgba(179, 139, 84, 1)",
      transition: { type: "spring", mass: 0.2, stiffness: 400, damping: 25 },
    },
    view: {
      x: mousePosition.x - 36,
      y: mousePosition.y - 36,
      width: 72,
      height: 72,
      backgroundColor: "rgba(28, 21, 18, 0.9)",
      border: "2px solid #D9B97E",
      color: "#F7F2EA",
      transition: { type: "spring", mass: 0.25, stiffness: 350, damping: 24 },
    },
  };

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full flex items-center justify-center text-xs font-semibold select-none shadow-lg backdrop-blur-sm"
      variants={variants}
      animate={cursorVariant}
    >
      {cursorVariant === "view" && (
        <span className="text-[11px] font-bold tracking-wider text-gold-light animate-fadeIn">
          {cursorText}
        </span>
      )}
    </motion.div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function Preloader() {
  const [showPreloader, setShowPreloader] = useState(false);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem("teraz_preloader_seen");
    if (!hasSeen) {
      setShowPreloader(true);
      const timer = setTimeout(() => {
        handleDismiss();
      }, 1900);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setShowPreloader(false);
    sessionStorage.setItem("teraz_preloader_seen", "true");
  };

  return (
    <AnimatePresence>
      {showPreloader && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[10000] bg-espresso flex flex-col items-center justify-center text-cream select-none px-4"
        >
          {/* Skip Button */}
          <button
            onClick={handleDismiss}
            className="absolute top-6 right-6 text-xs text-gold/70 hover:text-gold px-3 py-1.5 rounded-full border border-gold/30 transition-colors uppercase tracking-widest"
          >
            تخطي • Skip
          </button>

          {/* Central Animated Logo */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center text-center"
          >
            <div className="relative w-36 h-24 mb-4">
              <Image
                src="/brand/logo-light.svg"
                alt="TERAZ"
                fill
                priority
                className="object-contain"
              />
            </div>

            {/* Gold Hairline Progress */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "160px" }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
              className="h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent my-3"
            />

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-xs tracking-[0.25em] text-gold-light uppercase font-medium"
            >
              Live in Elegance • عِش الأناقة
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

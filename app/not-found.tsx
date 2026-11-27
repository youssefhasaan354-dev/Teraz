"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Home, Sparkles, MessageCircle, Armchair } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { LineDraw } from "@/components/motion/LineDraw";
import { Magnetic } from "@/components/motion/Magnetic";

export default function NotFound() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cream text-espresso px-4 text-center relative overflow-hidden py-16">
      {/* Ambient background lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[450px] bg-gold/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-md mx-auto space-y-6">
        {/* Brand Lockup */}
        <div className="relative w-40 h-12 mx-auto mb-2">
          <Image
            src="/brand/logo-full.svg"
            alt="TERAZ Furniture & Kitchens"
            fill
            priority
            className="object-contain"
          />
        </div>

        {/* Playful Floating Armchair Illustration */}
        <motion.div
          animate={{
            y: [-8, 8, -8],
            rotate: [-2, 2, -2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-20 h-20 mx-auto rounded-3xl bg-espresso/5 border border-gold/30 flex items-center justify-center text-gold shadow-lg"
        >
          <Armchair className="w-10 h-10 stroke-[1.5]" />
        </motion.div>

        {/* Animated Brand Swoosh Arc */}
        <div className="w-48 mx-auto -my-2">
          <LineDraw variant="arc" className="w-full h-8" />
        </div>

        <span className="text-7xl sm:text-8xl font-serif font-extrabold text-gold block tracking-tighter">
          404
        </span>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-espresso">
          {language === "ar" ? "الصفحة غير موجودة" : "Page Not Found"}
        </h1>

        <p className="text-xs sm:text-sm text-taupe leading-relaxed">
          {language === "ar"
            ? "عذرًا، يبدو أن الصفحة التي تبحث عنها قد تم نقلها أو لم تعد متاحة. تفضل بالعودة للصفحة الرئيسية واستكشاف أرقى التصاميم والمطابخ."
            : "The page you are looking for has been relocated or is unavailable. Please return home to explore our bespoke designs and kitchens."}
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Magnetic strength={0.25}>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-espresso text-cream text-xs font-bold hover:bg-gold hover:text-espresso transition-all shadow-xl active:scale-95"
            >
              <Home className="w-4 h-4" />
              <span>{language === "ar" ? "العودة إلى الرئيسية" : "Return to Home"}</span>
            </Link>
          </Magnetic>

          <Magnetic strength={0.25}>
            <a
              href="https://wa.me/201005423809"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cream-dark border border-gold/40 text-espresso text-xs font-bold hover:bg-gold/20 transition-all active:scale-95"
            >
              <MessageCircle className="w-4 h-4 text-gold" />
              <span>{language === "ar" ? "تواصل معنا واتساب" : "WhatsApp Support"}</span>
            </a>
          </Magnetic>
        </div>
      </div>
    </div>
  );
}

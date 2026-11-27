"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Home, ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function NotFound() {
  const { language } = useLanguage();

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20 text-center">
      <div className="max-w-md space-y-6">
        <span className="text-6xl sm:text-7xl font-serif font-extrabold text-gold block">
          404
        </span>

        <h1 className="text-2xl sm:text-3xl font-bold text-espresso">
          {language === "ar" ? "الصفحة غير موجودة" : "Page Not Found"}
        </h1>

        <p className="text-xs sm:text-sm text-taupe leading-relaxed">
          {language === "ar"
            ? "عذرًا، يبدو أن الصفحة التي تبحث عنها قد تم نقلها أو لم تعد متاحة. يمكنك العودة للصفحة الرئيسية واستكشاف أرقى التصاميم."
            : "The page you are looking for has been relocated or is unavailable. Please return home to explore our bespoke designs."}
        </p>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-espresso text-cream text-xs font-bold hover:bg-gold hover:text-espresso transition-all shadow-lg"
          >
            <Home className="w-4 h-4" />
            <span>{language === "ar" ? "العودة إلى الرئيسية" : "Return to Home"}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

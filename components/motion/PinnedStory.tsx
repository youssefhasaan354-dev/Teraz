"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Category } from "@/lib/types";

interface PinnedStoryProps {
  categories: Category[];
}

export function PinnedStory({ categories }: PinnedStoryProps) {
  const { language, localize } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalHeight = containerRef.current.offsetHeight - window.innerHeight;
      const currentScroll = -rect.top;

      if (currentScroll >= 0 && totalHeight > 0) {
        const progress = Math.min(Math.max(currentScroll / totalHeight, 0), 0.999);
        const index = Math.floor(progress * categories.length);
        setActiveIndex(index);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [categories.length]);

  if (!categories || categories.length === 0) return null;

  const currentCategory = categories[activeIndex] || categories[0];

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: `${categories.length * 100}vh` }}
    >
      {/* Pinned Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-espresso text-cream">
        {/* Background Image Crossfade */}
        <div className="absolute inset-0 z-0">
          {categories.map((cat, idx) => (
            <div
              key={cat.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                idx === activeIndex ? "opacity-40 scale-100" : "opacity-0 scale-105 pointer-events-none"
              }`}
            >
              <Image
                src={cat.coverImage}
                alt={localize(cat.name)}
                fill
                priority={idx === 0}
                className="object-cover transition-transform duration-1000"
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/70 to-espresso/40" />
        </div>

        {/* Foreground Content Card */}
        <div className="relative z-10 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Text & Steps Column */}
          <div className="lg:col-span-6 space-y-6">
            {/* Progress Step Pills */}
            <div className="flex items-center gap-2">
              {categories.map((cat, idx) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === activeIndex ? "w-10 bg-gold" : "w-3 bg-cream/30 hover:bg-cream/60"
                  }`}
                  aria-label={`Jump to ${localize(cat.name)}`}
                />
              ))}
              <span className="text-xs font-semibold text-gold-light ms-2">
                0{activeIndex + 1} / 0{categories.length}
              </span>
            </div>

            {/* Discipline Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/20 text-gold-light text-xs font-bold border border-gold/40">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === "ar" ? "تخصصات طِراز الاستثنائية" : "TERAZ Signature Craft"}</span>
            </div>

            {/* Category Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-cream">
              {localize(currentCategory.name)}
            </h2>

            {/* Category Description */}
            <p className="text-base text-cream/80 leading-relaxed max-w-xl">
              {localize(currentCategory.description)}
            </p>

            {/* Subcategories Tags */}
            {currentCategory.subcategories && currentCategory.subcategories.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-wider text-taupe block font-semibold">
                  {language === "ar" ? "أبرز التشطيبات والخيارات:" : "Key Finishes & Options:"}
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentCategory.subcategories.map((sub) => (
                    <span
                      key={sub.id}
                      className="px-3 py-1 rounded-lg bg-cream/10 border border-cream/20 text-xs font-medium text-cream/90"
                    >
                      {localize(sub.name)}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href={`/categories/${currentCategory.slug}`}
                className="px-6 py-3 rounded-full bg-gold text-espresso font-bold text-xs uppercase tracking-wider hover:bg-gold-light transition-all flex items-center gap-2 shadow-lg"
              >
                <span>{language === "ar" ? "استكشف التشكيلة الكاملة" : "Explore Collection"}</span>
                <span>{language === "ar" ? "←" : "→"}</span>
              </Link>

              <Link
                href={`/quote?service=${currentCategory.slug}`}
                className="px-5 py-3 rounded-full bg-transparent text-cream hover:text-gold border border-gold/40 text-xs font-bold transition-all"
              >
                {language === "ar" ? "اطلب مقايسة خاصة" : "Request Custom Quote"}
              </Link>
            </div>
          </div>

          {/* Interactive Feature Visual Card */}
          <div className="lg:col-span-6 relative aspect-[4/3] rounded-3xl overflow-hidden border-2 border-gold/30 shadow-2xl">
            <Image
              src={currentCategory.coverImage}
              alt={localize(currentCategory.name)}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 right-6 left-6 flex items-center justify-between text-xs text-cream/90">
              <span className="bg-espresso/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-gold/40">
                {language === "ar" ? "تصنيع بالطلب وتوريد لكافة المحافظات" : "Custom Built & Installed Nationwide"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

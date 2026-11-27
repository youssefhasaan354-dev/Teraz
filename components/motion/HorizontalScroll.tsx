"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, MapPin, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Project } from "@/lib/types";
import { TiltCard } from "./TiltCard";

interface HorizontalScrollProps {
  projects: Project[];
}

export function HorizontalScroll({ projects }: HorizontalScrollProps) {
  const { language, localize } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const distance = 420;
    const scrollAmount = direction === "left" ? -distance : distance;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <div className="relative w-full">
      {/* Controls & Nav Arrows */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-xs font-bold text-gold uppercase tracking-widest block mb-1">
            {language === "ar" ? "معرض الإنجازات" : "Portfolio Showcase"}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-espresso">
            {language === "ar" ? "أحدث المشاريع المنفذة على أرض الواقع" : "Recently Handed-Over Projects"}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll(language === "ar" ? "right" : "left")}
            aria-label="Previous Projects"
            className="w-11 h-11 rounded-full border border-gold/40 flex items-center justify-center text-espresso hover:bg-gold hover:text-white transition-all shadow-sm active:scale-95"
          >
            {language === "ar" ? <ArrowRight className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
          </button>
          <button
            onClick={() => scroll(language === "ar" ? "left" : "right")}
            aria-label="Next Projects"
            className="w-11 h-11 rounded-full border border-gold/40 flex items-center justify-center text-espresso hover:bg-gold hover:text-white transition-all shadow-sm active:scale-95"
          >
            {language === "ar" ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Scrollable Container with Momentum */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-6 pt-2 select-none"
      >
        {projects.map((project) => (
          <div
            key={project.id}
            data-cursor="view"
            className="w-[320px] sm:w-[400px] shrink-0"
          >
            <TiltCard maxTilt={5} glare={true} className="h-full">
              <Link
                href={`/projects/${project.slug}`}
                className="group rounded-3xl overflow-hidden bg-cream-dark/50 border border-gold/25 hover:border-gold shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
              >
                {/* Image Thumbnail */}
                <div className="relative aspect-[16/11] overflow-hidden">
                  <Image
                    src={project.images[0]}
                    alt={localize(project.title)}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Before/After Badge */}
                  {project.beforeAfterPair && (
                    <div className="absolute top-4 start-4 bg-espresso/85 backdrop-blur-md px-3 py-1 rounded-full border border-gold/40 text-[11px] font-bold text-gold-light flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-gold" />
                      <span>{language === "ar" ? "يحتوي على قبل وبعد" : "Before & After"}</span>
                    </div>
                  )}
                </div>

                {/* Content Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-espresso group-hover:text-gold transition-colors line-clamp-1">
                      {localize(project.title)}
                    </h3>
                    <p className="text-xs text-taupe line-clamp-2 leading-relaxed">
                      {localize(project.description)}
                    </p>
                  </div>

                  {/* Specs & Location Meta */}
                  <div className="pt-3 border-t border-gold/15 flex items-center justify-between text-xs text-taupe">
                    {project.clientLocation && (
                      <span className="flex items-center gap-1 truncate max-w-[190px]">
                        <MapPin className="w-3.5 h-3.5 text-gold shrink-0" />
                        <span className="truncate">{localize(project.clientLocation)}</span>
                      </span>
                    )}
                    <span className="text-gold font-bold flex items-center gap-1 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                      <span>{language === "ar" ? "تفاصيل" : "Details"}</span>
                      <span>{language === "ar" ? "←" : "→"}</span>
                    </span>
                  </div>
                </div>
              </Link>
            </TiltCard>
          </div>
        ))}
      </div>
    </div>
  );
}

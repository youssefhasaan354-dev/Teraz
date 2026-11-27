"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { getProjects, getCategories } from "@/lib/firebase/firestore-service";
import { Project, Category } from "@/lib/types";
import { initialProjects, initialCategories } from "@/lib/initial-data";
import { Reveal, RevealStagger } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { TiltCard } from "@/components/motion/TiltCard";
import { LineDraw } from "@/components/motion/LineDraw";

export default function ProjectsPage() {
  const { language, localize } = useLanguage();
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [selectedCat, setSelectedCat] = useState<string>("all");

  useEffect(() => {
    getProjects().then((res) => {
      if (res && res.length > 0) setProjects(res);
    });
    getCategories().then((res) => {
      if (res && res.length > 0) setCategories(res);
    });
  }, []);

  const filtered =
    selectedCat === "all" ? projects : projects.filter((p) => p.categoryId === selectedCat);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <Reveal variant="down" priority={true}>
          <span className="text-xs font-bold text-gold uppercase tracking-widest block">
            {language === "ar" ? "سجل إنجازات طِراز" : "Portfolio & Handed Works"}
          </span>
        </Reveal>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-espresso">
          <SplitText
            priority={true}
            text={
              language === "ar"
                ? "مشاريع واقعية نُفذت بحرفية استثنائية"
                : "Executed Realities, Handcrafted in Egypt"
            }
          />
        </h1>
        <Reveal variant="up" delay={0.15}>
          <p className="text-sm sm:text-base text-taupe leading-relaxed">
            {language === "ar"
              ? "استكشف أحدث مشاريع المطابخ وتجاليد الجدران والأثاث التي تم تسليمها لعملائنا في القاهرة والشيخ زايد والمنصورة وكافة المحافظات."
              : "Explore completed kitchens, architectural claddings, and residential/corporate fit-outs delivered across Greater Cairo, Sheikh Zayed, and El-Mansoura."}
          </p>
        </Reveal>
      </div>

      <div className="max-w-4xl mx-auto">
        <LineDraw variant="arc" className="w-full h-8 opacity-50" />
      </div>

      {/* Filter Tabs with Layout Indicator */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar pb-2">
        <button
          onClick={() => setSelectedCat("all")}
          className={`relative px-5 py-2 rounded-full text-xs font-bold transition-colors ${
            selectedCat === "all" ? "text-cream" : "text-espresso hover:bg-gold/20"
          }`}
        >
          {selectedCat === "all" && (
            <motion.div
              layoutId="proj-cat-pill"
              className="absolute inset-0 bg-espresso rounded-full border border-gold"
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
            />
          )}
          <span className="relative z-10">{language === "ar" ? "كافة الأعمال" : "All Projects"}</span>
        </button>
        {categories.map((c) => {
          const isSelected = selectedCat === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setSelectedCat(c.id)}
              className={`relative px-5 py-2 rounded-full text-xs font-bold transition-colors whitespace-nowrap ${
                isSelected ? "text-cream" : "text-espresso hover:bg-gold/20"
              }`}
            >
              {isSelected && (
                <motion.div
                  layoutId="proj-cat-pill"
                  className="absolute inset-0 bg-espresso rounded-full border border-gold"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">{localize(c.name)}</span>
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <RevealStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((proj, idx) => (
          <Reveal key={proj.id} staggerIndex={idx} variant="up" className="h-full">
            <TiltCard maxTilt={4} className="h-full">
              <div
                data-cursor="view"
                className="group rounded-3xl overflow-hidden bg-cream-dark/50 border border-gold/30 hover:border-gold shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col justify-between h-full"
              >
                <div>
                  <Link href={`/projects/${proj.slug}`} className="block relative aspect-[16/11] overflow-hidden">
                    <Image
                      src={proj.images[0]}
                      alt={localize(proj.title)}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                    {proj.beforeAfterPair && (
                      <div className="absolute top-4 start-4 bg-espresso/85 backdrop-blur-md px-3 py-1 rounded-full border border-gold/40 text-[11px] font-bold text-gold-light flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-gold" />
                        <span>{language === "ar" ? "قبل وبعد" : "Before/After"}</span>
                      </div>
                    )}
                  </Link>

                  <div className="p-6 space-y-3">
                    <Link href={`/projects/${proj.slug}`}>
                      <h2 className="text-xl font-bold text-espresso group-hover:text-gold transition-colors line-clamp-1">
                        {localize(proj.title)}
                      </h2>
                    </Link>
                    <p className="text-xs text-taupe line-clamp-2 leading-relaxed">
                      {localize(proj.description)}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-gold/15 flex items-center justify-between text-xs text-taupe">
                  {proj.clientLocation ? (
                    <span className="flex items-center gap-1 truncate max-w-[190px]">
                      <MapPin className="w-3.5 h-3.5 text-gold shrink-0" />
                      <span className="truncate">{localize(proj.clientLocation)}</span>
                    </span>
                  ) : <div />}

                  <Link
                    href={`/projects/${proj.slug}`}
                    className="text-xs font-bold text-gold group-hover:text-espresso transition-colors flex items-center gap-1"
                  >
                    <span>{language === "ar" ? "استعراض المشروع" : "Explore Project"}</span>
                    <span>{language === "ar" ? "←" : "→"}</span>
                  </Link>
                </div>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </RevealStagger>
    </div>
  );
}

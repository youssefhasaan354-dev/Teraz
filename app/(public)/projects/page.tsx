"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, MapPin, Clock } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { getProjects, getCategories } from "@/lib/firebase/firestore-service";
import { Project, Category } from "@/lib/types";

export default function ProjectsPage() {
  const { language, localize } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCat, setSelectedCat] = useState<string>("all");

  useEffect(() => {
    getProjects().then(setProjects);
    getCategories().then(setCategories);
  }, []);

  const filtered =
    selectedCat === "all" ? projects : projects.filter((p) => p.categoryId === selectedCat);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold text-gold uppercase tracking-widest">
          {language === "ar" ? "سجل إنجازات طِراز" : "Portfolio & Handed Works"}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-espresso">
          {language === "ar"
            ? "مشاريع واقعية نُفذت بحرفية استثنائية"
            : "Executed Realities, Handcrafted in Egypt"}
        </h1>
        <p className="text-sm sm:text-base text-taupe leading-relaxed">
          {language === "ar"
            ? "استكشف أحدث مشاريع المطابخ وتجاليد الجدران والأثاث التي تم تسليمها لعملائنا في القاهرة والشيخ زايد والمنصورة وكافة المحافظات."
            : "Explore completed kitchens, architectural claddings, and residential/corporate fit-outs delivered across Greater Cairo, Sheikh Zayed, and El-Mansoura."}
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar pb-2">
        <button
          onClick={() => setSelectedCat("all")}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
            selectedCat === "all"
              ? "bg-espresso text-cream shadow-md border border-gold"
              : "bg-cream-dark text-espresso hover:bg-gold/20"
          }`}
        >
          {language === "ar" ? "كافة الأعمال" : "All Projects"}
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCat(c.id)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              selectedCat === c.id
                ? "bg-espresso text-cream shadow-md border border-gold"
                : "bg-cream-dark text-espresso hover:bg-gold/20"
            }`}
          >
            {localize(c.name)}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((proj) => (
          <div
            key={proj.id}
            className="group rounded-3xl overflow-hidden bg-cream-dark/50 border border-gold/30 hover:border-gold shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col justify-between"
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
                  <h3 className="text-lg font-bold text-espresso group-hover:text-gold transition-colors line-clamp-1">
                    {localize(proj.title)}
                  </h3>
                </Link>
                <p className="text-xs text-taupe line-clamp-2 leading-relaxed">
                  {localize(proj.description)}
                </p>

                <div className="pt-2 flex items-center justify-between text-xs text-taupe border-t border-gold/15">
                  {proj.clientLocation && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-gold shrink-0" />
                      <span>{localize(proj.clientLocation)}</span>
                    </span>
                  )}
                  {proj.duration && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-gold shrink-0" />
                      <span>{localize(proj.duration)}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <Link
                href={`/projects/${proj.slug}`}
                className="w-full py-2.5 rounded-xl bg-espresso text-cream text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-gold hover:text-espresso transition-colors"
              >
                <span>{language === "ar" ? "استعرض تفاصيل المشروع" : "View Project Case"}</span>
                <span>{language === "ar" ? "←" : "→"}</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

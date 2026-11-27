"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { getCategories } from "@/lib/firebase/firestore-service";
import { Category } from "@/lib/types";
import { initialCategories } from "@/lib/initial-data";

export default function CategoriesPage() {
  const { language, localize } = useLanguage();
  const [categories, setCategories] = useState<Category[]>(initialCategories);

  useEffect(() => {
    getCategories().then((res) => {
      if (res && res.length > 0) setCategories(res);
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold text-gold uppercase tracking-widest">
          {language === "ar" ? "أقسام وتخصصات طِراز" : "Our Disciplines"}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-espresso">
          {language === "ar"
            ? "حلول معمارية متكاملة للمطابخ والموبيليا"
            : "Master-Engineered Living & Workspace Solutions"}
        </h1>
        <p className="text-sm sm:text-base text-taupe leading-relaxed">
          {language === "ar"
            ? "استكشف تخصصاتنا الخمسة الأساسية في تصميم وتنفيذ المطابخ الخشبية والألوميتال، تجاليد الكلادينج، والأثاث المنزلي والمكتبي."
            : "Explore our five signature disciplines in custom kitchens, architectural wall claddings, and tailored residential & corporate furniture."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/categories/${cat.slug}`}
            className="group rounded-3xl overflow-hidden bg-cream-dark/50 border border-gold/30 hover:border-gold shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col"
          >
            <div className="relative aspect-[16/11] overflow-hidden">
              <Image
                src={cat.coverImage}
                alt={localize(cat.name)}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity" />
              <div className="absolute bottom-4 start-4 end-4 flex items-center justify-between text-cream">
                <span className="text-xs font-bold bg-espresso/80 backdrop-blur-md px-3 py-1 rounded-full border border-gold/40">
                  {language === "ar" ? "تفصيل بالطلب" : "Custom Made"}
                </span>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-espresso group-hover:text-gold transition-colors">
                  {localize(cat.name)}
                </h2>
                <p className="text-xs text-taupe line-clamp-3 leading-relaxed">
                  {localize(cat.description)}
                </p>
              </div>

              {cat.subcategories && cat.subcategories.length > 0 && (
                <div className="pt-2 flex flex-wrap gap-1.5">
                  {cat.subcategories.map((sub) => (
                    <span
                      key={sub.id}
                      className="text-[10px] px-2.5 py-1 rounded-md bg-cream border border-gold/20 text-taupe"
                    >
                      {localize(sub.name)}
                    </span>
                  ))}
                </div>
              )}

              <div className="pt-4 border-t border-gold/15 flex items-center justify-between text-xs font-bold text-gold group-hover:text-espresso transition-colors">
                <span>{language === "ar" ? "استكشف المنتجات والمشاريع" : "Explore Products & Projects"}</span>
                <span>{language === "ar" ? "←" : "→"}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

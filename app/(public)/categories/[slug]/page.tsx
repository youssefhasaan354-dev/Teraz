"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { Sparkles, MessageCircle, Phone, ArrowLeft, ArrowRight, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { getCategories, getProducts } from "@/lib/firebase/firestore-service";
import { Category, Product } from "@/lib/types";
import { initialCategories, initialProducts } from "@/lib/initial-data";
import { Reveal, RevealStagger } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { Parallax } from "@/components/motion/Parallax";
import { TiltCard } from "@/components/motion/TiltCard";
import { Magnetic } from "@/components/motion/Magnetic";

export default function CategoryDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { language, localize } = useLanguage();
  const seedCat = initialCategories.find((c) => c.slug === slug);
  const seedProds = seedCat ? initialProducts.filter((p) => p.categoryId === seedCat.id) : [];

  const [category, setCategory] = useState<Category | null>(seedCat || null);
  const [products, setProducts] = useState<Product[]>(seedProds);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("all");
  const [loading, setLoading] = useState(!seedCat);

  useEffect(() => {
    Promise.all([getCategories(), getProducts()]).then(([cats, prods]) => {
      const current = cats.find((c) => c.slug === slug);
      if (current) {
        setCategory(current);
        const filtered = prods.filter((p) => p.categoryId === current.id);
        setProducts(filtered);
      }
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center text-taupe">
        {language === "ar" ? "جاري تحميل تفاصيل القسم..." : "Loading discipline details..."}
      </div>
    );
  }

  if (!category) {
    return notFound();
  }

  const displayedProducts =
    selectedSubcategory === "all"
      ? products
      : products.filter((p) => p.subcategoryId === selectedSubcategory);

  return (
    <div className="space-y-16 pb-20">
      {/* Category Hero Banner with Parallax */}
      <section className="relative min-h-[48vh] flex items-center justify-center bg-espresso text-cream overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Parallax speed={0.2} className="w-full h-[120%] -top-[10%]">
            <Image
              src={category.coverImage}
              alt={localize(category.name)}
              fill
              priority
              className="object-cover opacity-35"
            />
          </Parallax>
          <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/70 to-espresso/40" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 py-16">
          <Reveal variant="down" priority={true}>
            <span className="text-xs font-bold text-gold-light uppercase tracking-widest inline-block">
              {language === "ar" ? "أقسام طِراز الفاخرة" : "TERAZ Signature Collection"}
            </span>
          </Reveal>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-cream">
            <SplitText priority={true} text={localize(category.name)} />
          </h1>
          <Reveal variant="up" delay={0.15}>
            <p className="text-sm sm:text-base text-cream/80 max-w-2xl mx-auto leading-relaxed">
              {localize(category.description)}
            </p>
          </Reveal>
          <Reveal variant="up" delay={0.25}>
            <div className="pt-2 flex justify-center">
              <Magnetic strength={0.25}>
                <Link
                  href={`/quote?service=${category.slug}`}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gold text-espresso font-bold text-xs uppercase tracking-wider hover:bg-gold-light transition-all shadow-lg active:scale-95"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{language === "ar" ? "اطلب مقايسة وعرض سعر لهذا القسم" : "Request a Quote For This Category"}</span>
                </Link>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Subcategory Filter Tabs with Animated Layout Indicator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {category.subcategories && category.subcategories.length > 0 && (
          <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar pb-4">
            <button
              onClick={() => setSelectedSubcategory("all")}
              className={`relative px-5 py-2 rounded-full text-xs font-bold transition-colors ${
                selectedSubcategory === "all" ? "text-cream" : "text-espresso hover:bg-gold/20"
              }`}
            >
              {selectedSubcategory === "all" && (
                <motion.div
                  layoutId="subcat-active"
                  className="absolute inset-0 bg-espresso rounded-full border border-gold"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">{language === "ar" ? "كافة التصاميم" : "All Designs"}</span>
            </button>
            {category.subcategories.map((sub) => {
              const isSelected = selectedSubcategory === sub.id;
              return (
                <button
                  key={sub.id}
                  onClick={() => setSelectedSubcategory(sub.id)}
                  className={`relative px-5 py-2 rounded-full text-xs font-bold transition-colors whitespace-nowrap ${
                    isSelected ? "text-cream" : "text-espresso hover:bg-gold/20"
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="subcat-active"
                      className="absolute inset-0 bg-espresso rounded-full border border-gold"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{localize(sub.name)}</span>
                </button>
              );
            })}
          </div>
        )}
      </section>

      {/* Products Grid with RevealStagger and TiltCard */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {displayedProducts.length === 0 ? (
          <div className="text-center py-12 text-taupe text-sm">
            {language === "ar" ? "لا توجد تصاميم مسجلة في هذا التصنيف حالياً." : "No designs registered under this subcategory currently."}
          </div>
        ) : (
          <RevealStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedProducts.map((p, idx) => (
              <Reveal key={p.id} staggerIndex={idx} variant="up" className="h-full">
                <TiltCard maxTilt={4} className="h-full">
                  <div className="group rounded-3xl overflow-hidden bg-cream-dark/50 border border-gold/30 hover:border-gold shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col justify-between h-full">
                    <div>
                      <Link href={`/products/${p.slug}`} className="block relative aspect-[16/11] overflow-hidden">
                        <Image
                          src={p.images[0]}
                          alt={localize(p.title)}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                        <div className="absolute top-4 start-4 bg-espresso/85 backdrop-blur-md px-3 py-1 rounded-full border border-gold/40 text-[11px] font-bold text-gold-light">
                          {language === "ar" ? "تصميم مخصص" : "Bespoke"}
                        </div>
                      </Link>

                      <div className="p-6 space-y-3">
                        <Link href={`/products/${p.slug}`}>
                          <h3 className="text-lg font-bold text-espresso group-hover:text-gold transition-colors line-clamp-1">
                            {localize(p.title)}
                          </h3>
                        </Link>
                        <p className="text-xs text-taupe line-clamp-2 leading-relaxed">
                          {localize(p.shortDescription)}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 pt-0 border-t border-gold/15 flex items-center justify-between">
                      <Link
                        href={`/products/${p.slug}`}
                        className="text-xs font-bold text-espresso hover:text-gold transition-colors"
                      >
                        {language === "ar" ? "استعراض المواصفات ←" : "View Specs →"}
                      </Link>

                      <Link
                        href={`/quote?product=${p.slug}`}
                        className="px-4 py-1.5 rounded-full bg-gold text-espresso text-xs font-bold hover:bg-gold-light transition-colors"
                      >
                        {language === "ar" ? "طلب مقايسة" : "Get Quote"}
                      </Link>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </RevealStagger>
        )}
      </section>
    </div>
  );
}

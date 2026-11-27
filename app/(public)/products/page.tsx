"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, MessageCircle, Filter } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { getProducts, getCategories } from "@/lib/firebase/firestore-service";
import { Product, Category } from "@/lib/types";
import { initialProducts, initialCategories } from "@/lib/initial-data";
import { Reveal, RevealStagger } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { TiltCard } from "@/components/motion/TiltCard";
import { LineDraw } from "@/components/motion/LineDraw";

export default function ProductsPage() {
  const { language, localize } = useLanguage();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    getProducts().then((res) => {
      if (res && res.length > 0) setProducts(res);
    });
    getCategories().then((res) => {
      if (res && res.length > 0) setCategories(res);
    });
  }, []);

  const filtered =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.categoryId === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <Reveal variant="down" priority={true}>
          <span className="text-xs font-bold text-gold uppercase tracking-widest block">
            {language === "ar" ? "كتالوج التصاميم الفاخرة" : "Bespoke Collection"}
          </span>
        </Reveal>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-espresso">
          <SplitText
            priority={true}
            text={
              language === "ar"
                ? "تصاميم حصرية تُصنع خصيصًا لمساحتك"
                : "Exclusive Designs Tailored to Your Architecture"
            }
          />
        </h1>
        <Reveal variant="up" delay={0.15}>
          <p className="text-sm sm:text-base text-taupe leading-relaxed">
            {language === "ar"
              ? "تصفح مجموعة تصاميم المطابخ، تجاليد الكلادينج، والأثاث الراقي. كل قطعة تُصنع بمقاسات وألوان وخامات مخصصة بالكامل."
              : "Explore our curated catalog of custom kitchens, wall claddings, and furniture. Each piece is engineered to bespoke dimensions and finishes."}
          </p>
        </Reveal>
      </div>

      <div className="max-w-4xl mx-auto">
        <LineDraw variant="arc" className="w-full h-8 opacity-50" />
      </div>

      {/* Category Filter Pills with Layout Indicator */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar pb-2">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`relative px-5 py-2 rounded-full text-xs font-bold transition-colors ${
            selectedCategory === "all" ? "text-cream" : "text-espresso hover:bg-gold/20"
          }`}
        >
          {selectedCategory === "all" && (
            <motion.div
              layoutId="product-cat-pill"
              className="absolute inset-0 bg-espresso rounded-full border border-gold"
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
            />
          )}
          <span className="relative z-10">{language === "ar" ? "كافة التصاميم" : "All Products"}</span>
        </button>
        {categories.map((c) => {
          const isSelected = selectedCategory === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`relative px-5 py-2 rounded-full text-xs font-bold transition-colors whitespace-nowrap ${
                isSelected ? "text-cream" : "text-espresso hover:bg-gold/20"
              }`}
            >
              {isSelected && (
                <motion.div
                  layoutId="product-cat-pill"
                  className="absolute inset-0 bg-espresso rounded-full border border-gold"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">{localize(c.name)}</span>
            </button>
          );
        })}
      </div>

      {/* Products Grid */}
      <RevealStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((p, idx) => {
          const whatsappMsg =
            language === "ar"
              ? `السلام عليكم، أنا مهتم بـ: ${localize(p.title)} من خلال موقع طراز. ممكن مساعدة وعرض سعر؟ 🌿`
              : `Hello TERAZ team, I am interested in: ${localize(p.title)}. Could you assist with details and a quote?`;
          const waUrl = `https://wa.me/201005423809?text=${encodeURIComponent(whatsappMsg)}`;

          return (
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
                        {language === "ar" ? "تفصيل بالطلب" : "Bespoke"}
                      </div>
                    </Link>

                    <div className="p-6 space-y-3">
                      <Link href={`/products/${p.slug}`}>
                        <h2 className="text-xl font-bold text-espresso group-hover:text-gold transition-colors line-clamp-1">
                          {localize(p.title)}
                        </h2>
                      </Link>
                      <p className="text-xs text-taupe line-clamp-2 leading-relaxed">
                        {localize(p.shortDescription)}
                      </p>

                      {p.materials && p.materials.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {p.materials.slice(0, 2).map((mat, fIdx) => (
                            <span
                              key={fIdx}
                              className="text-[10px] px-2.5 py-1 rounded-md bg-cream border border-gold/20 text-taupe"
                            >
                              {localize(mat)}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-gold/15 flex items-center justify-between">
                    <Link
                      href={`/products/${p.slug}`}
                      className="text-xs font-bold text-gold group-hover:text-espresso transition-colors flex items-center gap-1"
                    >
                      <span>{language === "ar" ? "التفاصيل والمواصفات" : "View Specifications"}</span>
                      <span>{language === "ar" ? "←" : "→"}</span>
                    </Link>

                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-[#25D366] text-white hover:bg-green-600 transition-colors shadow-sm"
                      aria-label="WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                    </a>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          );
        })}
      </RevealStagger>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, MessageCircle, Filter } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { getProducts, getCategories } from "@/lib/firebase/firestore-service";
import { Product, Category } from "@/lib/types";

export default function ProductsPage() {
  const { language, localize } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    getProducts().then(setProducts);
    getCategories().then(setCategories);
  }, []);

  const filtered =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.categoryId === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold text-gold uppercase tracking-widest">
          {language === "ar" ? "كتالوج التصاميم الفاخرة" : "Bespoke Collection"}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-espresso">
          {language === "ar"
            ? "تصاميم حصرية تُصنع خصيصًا لمساحتك"
            : "Exclusive Designs Tailored to Your Architecture"}
        </h1>
        <p className="text-sm sm:text-base text-taupe leading-relaxed">
          {language === "ar"
            ? "تصفح مجموعة تصاميم المطابخ، تجاليد الكلادينج، والأثاث الراقي. كل قطعة تُصنع بمقاسات وألوان وخامات مخصصة بالكامل."
            : "Explore our curated catalog of custom kitchens, wall claddings, and furniture. Each piece is engineered to bespoke dimensions and finishes."}
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar pb-2">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
            selectedCategory === "all"
              ? "bg-espresso text-cream shadow-md border border-gold"
              : "bg-cream-dark text-espresso hover:bg-gold/20"
          }`}
        >
          {language === "ar" ? "كافة التصاميم" : "All Products"}
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCategory(c.id)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              selectedCategory === c.id
                ? "bg-espresso text-cream shadow-md border border-gold"
                : "bg-cream-dark text-espresso hover:bg-gold/20"
            }`}
          >
            {localize(c.name)}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((p) => {
          const whatsappMsg =
            language === "ar"
              ? `السلام عليكم، أنا مهتم بـ: ${localize(p.title)} من خلال موقع طراز. ممكن مساعدة وعرض سعر؟ 🌿`
              : `Hello TERAZ team, I am interested in: ${localize(p.title)}. Could you assist with details and a quote?`;
          const waUrl = `https://wa.me/201005423809?text=${encodeURIComponent(whatsappMsg)}`;

          return (
            <div
              key={p.id}
              className="group rounded-3xl overflow-hidden bg-cream-dark/50 border border-gold/30 hover:border-gold shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col justify-between"
            >
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
                    {language === "ar" ? "تفصيل بالطلب" : "Custom Built"}
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

                  {p.materials && p.materials.length > 0 && (
                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {p.materials.slice(0, 2).map((m, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-2.5 py-0.5 rounded bg-cream border border-gold/20 text-taupe font-medium"
                        >
                          {localize(m)}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* CTAs (NO PRICE SHOWN) */}
              <div className="p-6 pt-0 border-t border-gold/15 mt-4 flex items-center gap-2">
                <Link
                  href={`/quote?product=${p.slug}`}
                  className="flex-1 py-2.5 rounded-xl bg-espresso text-cream text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-gold hover:text-espresso transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-gold-light" />
                  <span>{language === "ar" ? "اطلب عرض سعر" : "Request Quote"}</span>
                </Link>

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Inquire via WhatsApp"
                  className="p-2.5 rounded-xl bg-[#25D366] text-white hover:bg-green-600 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

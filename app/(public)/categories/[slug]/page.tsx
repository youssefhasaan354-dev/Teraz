"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { Sparkles, MessageCircle, Phone, ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { getCategories, getProducts } from "@/lib/firebase/firestore-service";
import { Category, Product } from "@/lib/types";
import { initialCategories, initialProducts } from "@/lib/initial-data";

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
      {/* Category Hero Banner */}
      <section className="relative min-h-[45vh] flex items-center justify-center bg-espresso text-cream overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={category.coverImage}
            alt={localize(category.name)}
            fill
            priority
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/70 to-espresso/40" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 py-16">
          <span className="text-xs font-bold text-gold-light uppercase tracking-widest inline-block">
            {language === "ar" ? "أقسام طِراز الفاخرة" : "TERAZ Signature Collection"}
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-cream">
            {localize(category.name)}
          </h1>
          <p className="text-sm sm:text-base text-cream/80 max-w-2xl mx-auto leading-relaxed">
            {localize(category.description)}
          </p>
          <div className="pt-2">
            <Link
              href={`/quote?service=${category.slug}`}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gold text-espresso font-bold text-xs uppercase tracking-wider hover:bg-gold-light transition-all shadow-lg"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === "ar" ? "اطلب مقايسة وعرض سعر لهذا القسم" : "Request a Quote For This Category"}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Subcategory Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {category.subcategories && category.subcategories.length > 0 && (
          <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar pb-4">
            <button
              onClick={() => setSelectedSubcategory("all")}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                selectedSubcategory === "all"
                  ? "bg-espresso text-cream shadow-md border border-gold"
                  : "bg-cream-dark text-espresso hover:bg-gold/20"
              }`}
            >
              {language === "ar" ? "كافة التصاميم" : "All Designs"}
            </button>
            {category.subcategories.map((sub) => (
              <button
                key={sub.id}
                onClick={() => setSelectedSubcategory(sub.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                  selectedSubcategory === sub.id
                    ? "bg-espresso text-cream shadow-md border border-gold"
                    : "bg-cream-dark text-espresso hover:bg-gold/20"
                }`}
              >
                {localize(sub.name)}
              </button>
            ))}
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-6">
          {displayedProducts.map((p) => {
            const whatsappMsg =
              language === "ar"
                ? `السلام عليكم، أنا مهتم بتفصيل: ${localize(p.title)} من خلال موقع طراز. ممكن مساعدة وعرض سعر؟`
                : `Hello TERAZ team, I am interested in custom building: ${localize(p.title)}. Could you assist with details and a quote?`;
            const waUrl = `https://wa.me/201005423809?text=${encodeURIComponent(whatsappMsg)}`;

            return (
              <div
                key={p.id}
                className="group rounded-3xl overflow-hidden bg-cream-dark/50 border border-gold/30 hover:border-gold shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col justify-between"
              >
                <div>
                  {/* Image */}
                  <Link href={`/products/${p.slug}`} className="block relative aspect-[16/11] overflow-hidden">
                    <Image
                      src={p.images[0]}
                      alt={localize(p.title)}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                    {/* Quote only badge */}
                    <div className="absolute top-4 start-4 bg-espresso/85 backdrop-blur-md px-3 py-1 rounded-full border border-gold/40 text-[11px] font-bold text-gold-light">
                      {language === "ar" ? "تفصيل حسب أبعادك" : "Custom Dimensions"}
                    </div>
                  </Link>

                  {/* Body */}
                  <div className="p-6 space-y-3">
                    <Link href={`/products/${p.slug}`}>
                      <h3 className="text-lg font-bold text-espresso group-hover:text-gold transition-colors line-clamp-1">
                        {localize(p.title)}
                      </h3>
                    </Link>
                    <p className="text-xs text-taupe line-clamp-2 leading-relaxed">
                      {localize(p.shortDescription)}
                    </p>

                    {/* Quick Specs Tags */}
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

                {/* Card CTAs (NO price shown, quote-only) */}
                <div className="p-6 pt-0 border-t border-gold/15 mt-4 flex items-center gap-2">
                  <Link
                    href={`/quote?service=${category.slug}&product=${p.slug}`}
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
      </section>
    </div>
  );
}

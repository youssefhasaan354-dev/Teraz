"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import {
  Sparkles,
  MessageCircle,
  Phone,
  ShieldCheck,
  Ruler,
  Check,
  Layers,
  ArrowRight,
  ArrowLeft,
  Share2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { getProductBySlug, getProducts, getCategories } from "@/lib/firebase/firestore-service";
import { Product, Category } from "@/lib/types";
import { initialProducts, initialCategories } from "@/lib/initial-data";
import { Reveal, RevealStagger } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { TiltCard } from "@/components/motion/TiltCard";
import { Magnetic } from "@/components/motion/Magnetic";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { language, localize } = useLanguage();
  const seedProd = initialProducts.find((p) => p.slug === slug);
  const seedCat = seedProd ? initialCategories.find((c) => c.id === seedProd.categoryId) : null;
  const seedRelated = seedProd ? initialProducts.filter((p) => p.categoryId === seedProd.categoryId && p.id !== seedProd.id).slice(0, 3) : [];

  const [product, setProduct] = useState<Product | null>(seedProd || null);
  const [category, setCategory] = useState<Category | null>(seedCat || null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>(seedRelated);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [loading, setLoading] = useState(!seedProd);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    Promise.all([getProductBySlug(slug), getProducts(), getCategories()]).then(
      ([prod, allProds, cats]) => {
        if (prod) {
          setProduct(prod);
          const cat = cats.find((c) => c.id === prod.categoryId);
          if (cat) setCategory(cat);
          const related = allProds.filter(
            (p) => p.categoryId === prod.categoryId && p.id !== prod.id
          );
          setRelatedProducts(related.slice(0, 3));
        }
        setLoading(false);
      }
    );
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center text-taupe">
        {language === "ar" ? "جاري تحميل تفاصيل التصميم..." : "Loading design specifications..."}
      </div>
    );
  }

  if (!product) {
    return notFound();
  }

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const whatsappMsg =
    language === "ar"
      ? `السلام عليكم، أنا مهتم بـ: ${localize(product.title)} من خلال موقع طراز للأثاث. أود الاستفسار والحصول على عرض سعر ومقايسة. الرابط: ${currentUrl} 🌿`
      : `Hello TERAZ team, I am interested in: ${localize(product.title)} on your website. Could you provide details and a custom quote? Link: ${currentUrl}`;
  const whatsappUrl = `https://wa.me/201005423809?text=${encodeURIComponent(whatsappMsg)}`;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-taupe">
          <Link href="/" className="hover:text-espresso transition-colors">
            {language === "ar" ? "الرئيسية" : "Home"}
          </Link>
          <span>/</span>
          {category && (
            <>
              <Link
                href={`/categories/${category.slug}`}
                className="hover:text-espresso transition-colors"
              >
                {localize(category.name)}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-espresso font-semibold truncate max-w-[200px] sm:max-w-none">
            {localize(product.title)}
          </span>
        </nav>

        {/* Product Showcase: Gallery & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">
          {/* Left Column: Image Gallery (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Main Image with AnimatePresence */}
            <div className="relative aspect-[16/11] rounded-3xl overflow-hidden border border-gold/40 shadow-2xl bg-espresso/5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImageIdx}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={product.images[activeImageIdx] || product.images[0]}
                    alt={localize(product.title)}
                    fill
                    priority
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              {/* Badge */}
              <div className="absolute top-4 start-4 bg-espresso/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-gold/40 text-xs font-bold text-gold-light pointer-events-none">
                {language === "ar" ? "تصنيع بالطلب والتفصيل" : "Bespoke Commission"}
              </div>
            </div>

            {/* Thumbnails Row */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                      activeImageIdx === idx
                        ? "border-gold scale-105 shadow-md"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt="Thumbnail" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Sticky Details & Specs (5 cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            <div className="space-y-4">
              {/* Category Pill & Share */}
              <div className="flex items-center justify-between">
                {category && (
                  <Link
                    href={`/categories/${category.slug}`}
                    className="text-xs font-bold uppercase tracking-widest text-gold hover:underline"
                  >
                    {localize(category.name)}
                  </Link>
                )}
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 text-xs text-taupe hover:text-espresso transition-colors active:scale-95"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copied ? (language === "ar" ? "تم النسخ!" : "Copied!") : (language === "ar" ? "مشاركة" : "Share")}</span>
                </button>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-extrabold text-espresso leading-snug">
                <SplitText priority={true} text={localize(product.title)} />
              </h1>

              {/* Short Description */}
              <p className="text-xs sm:text-sm text-taupe leading-relaxed">
                {localize(product.shortDescription)}
              </p>
            </div>

            {/* Specifications & Features */}
            <div className="p-6 rounded-2xl bg-cream-dark/50 border border-gold/30 space-y-4">
              <h3 className="text-xs font-bold text-espresso uppercase tracking-widest">
                {language === "ar" ? "المواصفات الفنية المعتمدة" : "Technical Specifications"}
              </h3>

              <div className="space-y-2.5">
                {product.specs && product.specs.length > 0 ? (
                  product.specs.map((spec, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs text-espresso border-b border-gold/10 pb-2">
                      <span className="font-semibold text-espresso">{localize(spec.label)}</span>
                      <span className="text-taupe">{localize(spec.value)}</span>
                    </div>
                  ))
                ) : (
                  product.materials && product.materials.map((mat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-espresso">
                      <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{localize(mat)}</span>
                    </div>
                  ))
                )}
              </div>

              <div className="pt-3 border-t border-gold/20 grid grid-cols-2 gap-3 text-xs text-taupe">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-gold" />
                  <span>{language === "ar" ? "ضمان 10 سنوات" : "10-Year Warranty"}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Ruler className="w-4 h-4 text-gold" />
                  <span>{language === "ar" ? "رفع مقاسات بالليزر" : "Laser Survey Included"}</span>
                </div>
              </div>
            </div>

            {/* Quote Action CTAs */}
            <div className="space-y-3">
              <Magnetic strength={0.2}>
                <Link
                  href={`/quote?service=${product.categoryId}&product=${product.slug}`}
                  className="w-full py-4 rounded-full bg-gold text-espresso font-bold text-xs uppercase tracking-wider hover:bg-gold-light transition-all shadow-xl flex items-center justify-center gap-2 pulse-gold active:scale-95"
                >
                  <Sparkles className="w-4 h-4 text-espresso" />
                  <span>{language === "ar" ? "طلب مقايسة وعرض سعر لهذا التصميم" : "Request Survey & Custom Quote"}</span>
                </Link>
              </Magnetic>

              <Magnetic strength={0.2}>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-full bg-[#25D366] text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-green-600 transition-colors shadow-lg active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{language === "ar" ? "استفسر فورًا عبر واتساب" : "Inquire via WhatsApp"}</span>
                </a>
              </Magnetic>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="space-y-8 pt-8 border-t border-gold/20">
            <div>
              <span className="text-xs font-bold text-gold uppercase tracking-widest block mb-1">
                {language === "ar" ? "تصاميم قد تلهمك" : "Related Designs"}
              </span>
              <h2 className="text-2xl font-bold text-espresso">
                {language === "ar" ? "نماذج أخرى من نفس القسم" : "More From This Discipline"}
              </h2>
            </div>

            <RevealStagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((rel, idx) => (
                <Reveal key={rel.id} staggerIndex={idx} variant="up" className="h-full">
                  <TiltCard maxTilt={4} className="h-full">
                    <Link
                      href={`/products/${rel.slug}`}
                      className="group block rounded-2xl overflow-hidden bg-cream-dark/50 border border-gold/25 hover:border-gold transition-all duration-300 h-full"
                    >
                      <div className="relative aspect-[16/11] overflow-hidden">
                        <Image
                          src={rel.images[0]}
                          alt={localize(rel.title)}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4 space-y-1">
                        <h4 className="text-sm font-bold text-espresso group-hover:text-gold transition-colors truncate">
                          {localize(rel.title)}
                        </h4>
                        <p className="text-[11px] text-taupe truncate">{localize(rel.shortDescription)}</p>
                      </div>
                    </Link>
                  </TiltCard>
                </Reveal>
              ))}
            </RevealStagger>
          </div>
        )}
      </div>

      {/* Mobile Sticky Bottom Action Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-cream/95 backdrop-blur-md border-t border-gold/30 p-3 flex items-center gap-3 shadow-2xl">
        <Link
          href={`/quote?service=${product.categoryId}&product=${product.slug}`}
          className="flex-1 py-3 rounded-full bg-gold text-espresso font-bold text-xs uppercase tracking-wider text-center shadow-md active:scale-95"
        >
          {language === "ar" ? "طلب مقايسة" : "Get Quote"}
        </Link>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-11 h-11 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-md active:scale-95"
          aria-label="WhatsApp"
        >
          <MessageCircle className="w-5 h-5 fill-current" />
        </a>
      </div>
    </>
  );
}

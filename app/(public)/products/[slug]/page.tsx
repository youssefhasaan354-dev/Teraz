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
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { getProductBySlug, getProducts, getCategories } from "@/lib/firebase/firestore-service";
import { Product, Category } from "@/lib/types";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { language, localize } = useLanguage();
  const [product, setProduct] = useState<Product | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [loading, setLoading] = useState(true);
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

  // Structured Data JSON-LD for Product
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: localize(product.title),
    image: product.images,
    description: localize(product.shortDescription),
    brand: {
      "@type": "Brand",
      name: "TERAZ Furniture",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "EGP",
      availability: "https://schema.org/InStock",
      url: currentUrl,
      description: "Custom quote upon spatial measurement and material selection",
    },
  };

  return (
    <>
      {/* Insert JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14">
          {/* Left Column: Image Gallery (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Main Image */}
            <div className="relative aspect-[16/11] rounded-3xl overflow-hidden border border-gold/40 shadow-2xl bg-espresso/5">
              <Image
                src={product.images[activeImageIdx] || product.images[0]}
                alt={localize(product.title)}
                fill
                priority
                className="object-cover"
              />
              {/* Badge */}
              <div className="absolute top-4 start-4 bg-espresso/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-gold/40 text-xs font-bold text-gold-light">
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

          {/* Right Column: Specs, Highlights & Quote CTAs (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
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
                  className="flex items-center gap-1.5 text-xs text-taupe hover:text-espresso transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copied ? (language === "ar" ? "تم النسخ!" : "Copied!") : (language === "ar" ? "مشاركة" : "Share")}</span>
                </button>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-extrabold text-espresso leading-snug">
                {localize(product.title)}
              </h1>

              {/* Short Description */}
              <p className="text-sm text-taupe leading-relaxed">
                {localize(product.shortDescription)}
              </p>

              {/* Materials & Colors Finishes */}
              <div className="space-y-3 pt-2">
                {product.materials && product.materials.length > 0 && (
                  <div>
                    <span className="text-xs font-bold text-espresso block mb-1.5">
                      {language === "ar" ? "الخامات الرئيسية:" : "Key Materials:"}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {product.materials.map((m, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-lg bg-cream-dark border border-gold/30 text-xs font-medium text-espresso"
                        >
                          {localize(m)}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {product.colorsFinishes && product.colorsFinishes.length > 0 && (
                  <div>
                    <span className="text-xs font-bold text-espresso block mb-1.5">
                      {language === "ar" ? "الألوان والتشطيبات المتاحة:" : "Available Finishes:"}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {product.colorsFinishes.map((c, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-lg bg-cream border border-gold/20 text-xs text-taupe"
                        >
                          {localize(c)}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Trust Badges */}
              <div className="p-4 rounded-2xl bg-cream-dark/60 border border-gold/20 space-y-2 text-xs text-taupe">
                <div className="flex items-center gap-2 text-espresso font-semibold">
                  <ShieldCheck className="w-4 h-4 text-gold" />
                  <span>{language === "ar" ? "ضمان رسمي معتمد حتى 10 سنوات" : "Certified 10-Year Full Warranty"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-gold" />
                  <span>{language === "ar" ? "مقايسة ليزر دقيقة وتصميم 3D قبل التنفيذ" : "Precision laser survey & 3D render included"}</span>
                </div>
              </div>
            </div>

            {/* CTAs Box (NO PRICES SHOWN) */}
            <div className="pt-4 border-t border-gold/20 space-y-3">
              <Link
                href={`/quote?service=${category?.slug || ""}&product=${product.slug}`}
                className="w-full py-4 rounded-full bg-espresso text-cream text-sm font-bold flex items-center justify-center gap-2 hover:bg-black border border-gold/40 shadow-xl transition-all pulse-gold"
              >
                <Sparkles className="w-4 h-4 text-gold-light" />
                <span>{language === "ar" ? "اطلب عرض سعر ومقايسة لهذا التصميم" : "Request a Quote for this Design"}</span>
              </Link>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-full bg-[#25D366] text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-green-600 shadow-md transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>{language === "ar" ? "استفسر عن هذا التصميم عبر واتساب" : "WhatsApp Inquiry for this Item"}</span>
              </a>

              <p className="text-center text-[11px] text-taupe">
                {language === "ar"
                  ? "الأسعار تُحدد بناءً على أبعاد المكان والخامات المختارة لنمنحك أفضل سعر عادل."
                  : "Quotes are calculated precisely based on exact spatial dimensions and selected finishes."}
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Full Description & Specs Table */}
        <div className="pt-10 border-t border-gold/20 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-6 space-y-4">
            <h2 className="text-xl font-bold text-espresso">
              {language === "ar" ? "عن هذا التصميم والتفاصيل الفنية" : "Design Narrative & Engineering Details"}
            </h2>
            <div className="hairline-gold w-24" />
            <p className="text-sm text-taupe leading-relaxed whitespace-pre-line">
              {localize(product.fullDescription)}
            </p>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <h2 className="text-xl font-bold text-espresso">
              {language === "ar" ? "جدول المواصفات والضمان" : "Technical Specifications Table"}
            </h2>
            <div className="hairline-gold w-24" />
            <div className="rounded-2xl border border-gold/30 bg-cream-dark/40 overflow-hidden divide-y divide-gold/15">
              {product.specs &&
                product.specs.map((spec, idx) => (
                  <div key={idx} className="p-3.5 flex items-center justify-between text-xs">
                    <span className="font-bold text-espresso">{localize(spec.label)}</span>
                    <span className="text-taupe">{localize(spec.value)}</span>
                  </div>
                ))}
              {product.dimensions && (
                <div className="p-3.5 flex items-center justify-between text-xs">
                  <span className="font-bold text-espresso">{language === "ar" ? "المقاسات" : "Dimensions"}</span>
                  <span className="text-taupe">{localize(product.dimensions)}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="pt-12 border-t border-gold/20 space-y-6">
            <h2 className="text-2xl font-bold text-espresso text-center">
              {language === "ar" ? "تصاميم أخرى قد تنال إعجابك" : "Related Designs You May Admire"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/products/${rel.slug}`}
                  className="group rounded-2xl overflow-hidden bg-cream-dark/50 border border-gold/25 hover:border-gold transition-all duration-300 flex flex-col"
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
                    <h3 className="text-sm font-bold text-espresso group-hover:text-gold transition-colors truncate">
                      {localize(rel.title)}
                    </h3>
                    <p className="text-xs text-taupe line-clamp-1">{localize(rel.shortDescription)}</p>
                    <span className="text-[11px] font-bold text-gold block pt-1">
                      {language === "ar" ? "اطلب عرض سعر ←" : "Request Quote →"}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

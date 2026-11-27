"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Check, ArrowRight, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface MaterialItem {
  id: string;
  name: { ar: string; en: string };
  category: "woods" | "surfaces" | "metals" | "hardware";
  description: { ar: string; en: string };
  image: string;
  features: { ar: string; en: string }[];
}

export default function MaterialsPage() {
  const { language, localize } = useLanguage();
  const [activeTab, setActiveTab] = useState<"all" | "woods" | "surfaces" | "metals" | "hardware">("all");

  const materials: MaterialItem[] = [
    {
      id: "mat-1",
      name: { ar: "قشرة أرو طبيعي (Natural Oak)", en: "Natural Oak Veneer" },
      category: "woods",
      description: {
        ar: "خشب أرو مستورد مكسو بطبقة طلاء بولي يوريثان إيطالي غير لامع لإبراز تموجات الألياف الطبيعية مع حماية ضد الرطوبة.",
        en: "Imported natural oak veneer finished with matte Italian polyurethane to accent natural grain patterns with moisture defense.",
      },
      image: "https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?auto=format&fit=crop&w=600&q=80",
      features: [
        { ar: "مقاومة لبخار الطهي", en: "Steam & Humidity Resistant" },
        { ar: "ملمس خشبي طبيعي بارز", en: "Tactile Deep Wood Grain" },
      ],
    },
    {
      id: "mat-2",
      name: { ar: "بولي لاك تركي عالي اللمعان", en: "Turkish Polygloss High-Gloss" },
      category: "woods",
      description: {
        ar: "ألواح خشبية معالجة مغطاة بطبقة بولي إيثيلين فائقة النقاء تمنح انعكاساً مرآوياً مع مقاومة عالية للخدوش والحرارة.",
        en: "MDF core surfaced with optical-grade polyethylene for ultra-gloss mirror reflection and superior scratch tolerance.",
      },
      image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80",
      features: [
        { ar: "سهولة تامة في التنظيف", en: "Effortless Wipe-Clean" },
        { ar: "ثبات اللون ضد الأشعة فوق البنفسجية", en: "UV Stable Color Fastness" },
      ],
    },
    {
      id: "mat-3",
      name: { ar: "كوارتز كالاكاتا ذهبي (Calacatta Gold)", en: "Calacatta Gold Engineered Quartz" },
      category: "surfaces",
      description: {
        ar: "كوارتز معالج بنسبة 93% من حبيبات السيليكا الطبيعية، خالي تماماً من المسام ومقاوم بنسبة 100% للبقع والأحماض والحرارة.",
        en: "Composed of 93% pure natural silica quartz, entirely non-porous and impenetrable by citrus, oils, and high heat.",
      },
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
      features: [
        { ar: "مقاوم للبكتيريا والبقع", en: "Antibacterial & Stain Proof" },
        { ar: "صلابة تفوق الرخام الطبيعي", en: "Harder than Natural Marble" },
      ],
    },
    {
      id: "mat-4",
      name: { ar: "ألومنيوم تركي مقوى (Architectural Black)", en: "Reinforced Anodized Turkish Aluminum" },
      category: "metals",
      description: {
        ar: "قطاعات ألومنيوم بسماكة 2 مم مطلية إلكتروستاتيك بدهانات أكرليك سوداء ومطعمة بزجاج مضلع مسكر أو درف كلادينج.",
        en: "2mm gauge structural aluminum extruded and electrostatic powder-coated for total water immersion without corrosion.",
      },
      image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80",
      features: [
        { ar: "مقاوم للمياه بنسبة 100%", en: "100% Waterproof & Rust-Free" },
        { ar: "عمر افتراضي غير محدود", en: "Virtually Indestructible Lifetime" },
      ],
    },
    {
      id: "mat-5",
      name: { ar: "مفصلات ومجاري بلوم النمساوية (Blum)", en: "Austrian Blum Soft-Close Systems" },
      category: "hardware",
      description: {
        ar: "إكسسوارات بلوم النمساوية الأصلية هيدروليك بنظام Clip Top و Tandembox لضمان إغلاق صامت وسلس مدى الحياة.",
        en: "Authentic Austrian Blum hydraulic hinges and full-extension drawer slides certified for 200,000+ open-close cycles.",
      },
      image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=600&q=80",
      features: [
        { ar: "ضمان مدى الحياة ضد التلف", en: "Lifetime Mechanical Guarantee" },
        { ar: "إغلاق صامت فائق النعومة", en: "Whisper Soft Dampening" },
      ],
    },
    {
      id: "mat-6",
      name: { ar: "تجاليد خشبية مضلعة عازلة للصوت (Acoustic Slats)", en: "Acoustic Slatted Wall Panels" },
      category: "woods",
      description: {
        ar: "أعواد خشبية مضلعة مثبتة على طبقة لباد بوليستر عازلة للصوت والصدى ومزودة بمجاري إضاءة ليد غير مرئية.",
        en: "Architectural vertical timber battens affixed to recycled acoustic felt backing, integrating micro LED illumination channels.",
      },
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80",
      features: [
        { ar: "عزل صوتي فندقي NRC 0.85", en: "Hotel Acoustic Absorption" },
        { ar: "تثبيت مخفي بدون مسامير", en: "Concealed Cleat Mounting" },
      ],
    },
  ];

  const filtered =
    activeTab === "all" ? materials : materials.filter((m) => m.category === activeTab);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold text-gold uppercase tracking-widest">
          {language === "ar" ? "معايير الجودة الفائقة" : "Material Excellence"}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-espresso">
          {language === "ar" ? "مكتبة الخامات والتشطيبات الفاخرة" : "Finishes & Materials Archive"}
        </h1>
        <p className="text-sm sm:text-base text-taupe leading-relaxed">
          {language === "ar"
            ? "نختار أرقى الخامات العالمية المقاومة للرطوبة والحرارة لنوفر لك مطابخ وأثاثًا يعيش لعشرات السنين."
            : "We procure world-class moisture-proof and heat-resistant components to ensure decades of uncompromised elegance."}
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar pb-2">
        {[
          { id: "all", label: language === "ar" ? "كافة الخامات" : "All Materials" },
          { id: "woods", label: language === "ar" ? "الأخشاب والبولي لاك" : "Wood & Acrylic" },
          { id: "surfaces", label: language === "ar" ? "الكوارتز والرخام" : "Quartz & Surfaces" },
          { id: "metals", label: language === "ar" ? "الألومنيوم والكلادينج" : "Aluminum & Profiles" },
          { id: "hardware", label: language === "ar" ? "المفصلات والإكسسوار" : "Hardware & Blum" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-espresso text-cream shadow-md border border-gold"
                : "bg-cream-dark text-espresso hover:bg-gold/20"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((mat) => (
          <div
            key={mat.id}
            className="group rounded-3xl overflow-hidden bg-cream-dark/50 border border-gold/30 hover:border-gold shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[16/11] overflow-hidden">
                <Image
                  src={mat.image}
                  alt={localize(mat.name)}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="p-6 space-y-3">
                <h3 className="text-lg font-bold text-espresso group-hover:text-gold transition-colors">
                  {localize(mat.name)}
                </h3>
                <p className="text-xs text-taupe leading-relaxed">
                  {localize(mat.description)}
                </p>

                <div className="pt-2 space-y-1.5 border-t border-gold/15">
                  {mat.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-espresso/90 font-medium">
                      <Check className="w-3.5 h-3.5 text-gold shrink-0" />
                      <span>{localize(feat)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <Link
                href={`/quote?material=${mat.id}`}
                className="w-full py-2.5 rounded-xl bg-espresso text-cream text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-gold hover:text-espresso transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-gold-light" />
                <span>{language === "ar" ? "طلب استشارة بهذه الخامة" : "Inquire About This Material"}</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

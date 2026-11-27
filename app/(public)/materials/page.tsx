"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Check, ArrowRight, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Reveal, RevealStagger } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { TiltCard } from "@/components/motion/TiltCard";
import { LineDraw } from "@/components/motion/LineDraw";

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
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80",
      features: [
        { ar: "عزل صوتي وتشتيت للصدى", en: "Acoustic Dampening" },
        { ar: "مظهر فندقي عصري", en: "Architectural Hospitality Finish" },
      ],
    },
  ];

  const filtered =
    activeTab === "all" ? materials : materials.filter((m) => m.category === activeTab);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <Reveal variant="down" priority={true}>
          <span className="text-xs font-bold text-gold uppercase tracking-widest block">
            {language === "ar" ? "معايير الجودة العالمية" : "Materials & Finish Library"}
          </span>
        </Reveal>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-espresso">
          <SplitText
            priority={true}
            text={
              language === "ar"
                ? "خامات فاخرة صُممت لتقاوم الزمن"
                : "Curated Materials Engineered for Longevity"
            }
          />
        </h1>
        <Reveal variant="up" delay={0.15}>
          <p className="text-sm sm:text-base text-taupe leading-relaxed">
            {language === "ar"
              ? "نستورد أجود أنواع الأخشاب الطبيعية، أسطح الكوارتز، قطاعات الألومنيوم، والمفصلات النمساوية لنضمن لك أعلى كفاءة وجودة تشطيب."
              : "We source authentic European hardwoods, engineered quartz slabs, heavy Turkish aluminum, and Austrian Blum hardware for lifetime durability."}
          </p>
        </Reveal>
      </div>

      <div className="max-w-4xl mx-auto">
        <LineDraw variant="arc" className="w-full h-8 opacity-50" />
      </div>

      {/* Filter Tabs with Layout Indicator */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar pb-2">
        {[
          { id: "all", label: { ar: "كافة الخامات", en: "All Finishes" } },
          { id: "woods", label: { ar: "أخشاب ودرف", en: "Woods & Panels" } },
          { id: "surfaces", label: { ar: "أسطح وكوارتز", en: "Quartz & Countertops" } },
          { id: "metals", label: { ar: "ألوميتال وكلادينج", en: "Aluminum & Metals" } },
          { id: "hardware", label: { ar: "مفصلات وإكسسوارات", en: "Blum Hardware" } },
        ].map((tab) => {
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`relative px-5 py-2 rounded-full text-xs font-bold transition-colors whitespace-nowrap ${
                isSelected ? "text-cream" : "text-espresso hover:bg-gold/20"
              }`}
            >
              {isSelected && (
                <motion.div
                  layoutId="material-tab-active"
                  className="absolute inset-0 bg-espresso rounded-full border border-gold"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">{language === "ar" ? tab.label.ar : tab.label.en}</span>
            </button>
          );
        })}
      </div>

      {/* Materials Grid */}
      <RevealStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((mat, idx) => (
          <Reveal key={mat.id} staggerIndex={idx} variant="up" className="h-full">
            <TiltCard maxTilt={4} className="h-full">
              <div className="group rounded-3xl overflow-hidden bg-cream-dark/50 border border-gold/30 hover:border-gold shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col justify-between h-full">
                <div>
                  <div className="relative aspect-[16/11] overflow-hidden">
                    <Image
                      src={mat.image}
                      alt={localize(mat.name)}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                  </div>

                  <div className="p-6 space-y-3">
                    <h2 className="text-xl font-bold text-espresso group-hover:text-gold transition-colors">
                      {localize(mat.name)}
                    </h2>
                    <p className="text-xs text-taupe leading-relaxed">
                      {localize(mat.description)}
                    </p>

                    <div className="space-y-1.5 pt-2 border-t border-gold/15">
                      {mat.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-xs font-medium text-espresso">
                          <Check className="w-3.5 h-3.5 text-gold shrink-0" />
                          <span>{localize(feat)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href={`/quote?door=${mat.id}`}
                    className="w-full py-2.5 rounded-xl bg-espresso text-cream text-xs font-bold flex items-center justify-center gap-2 hover:bg-gold hover:text-espresso transition-colors active:scale-95 shadow-sm"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-gold-light" />
                    <span>{language === "ar" ? "طلب معاينة لهذه الخامة" : "Request Swatch Survey"}</span>
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

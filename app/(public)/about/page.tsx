"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ShieldCheck, HeartHandshake, Award, Clock, ArrowRight, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function AboutPage() {
  const { language } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero Heading */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold text-gold uppercase tracking-widest">
          {language === "ar" ? "قصة طِراز وعراقة الحرفة" : "Our Heritage & Story"}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-espresso">
          {language === "ar" ? "حيث تُصنع الفخامة بأيدي حرفيين مصريين" : "Quiet Luxury Handcrafted in Egypt"}
        </h1>
        <p className="text-sm sm:text-base text-taupe leading-relaxed">
          {language === "ar"
            ? "طراز (TERAZ) انطلقت برؤية معاصرة تجمع بين عراقة النجارة المصرية وأحدث خطوط الإنتاج التكنولوجية لتوفير مطابخ وتجاليد وأثاث بمواصفات عالمية وتكلفة تنفيذية مباشرة."
            : "TERAZ was founded on a singular premise: merging time-honored Egyptian joinery with computerized precision to craft architectural kitchens and furniture at honest factory-direct pricing."}
        </p>
      </div>

      {/* Feature Narrative Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 relative aspect-[4/3] rounded-3xl overflow-hidden border border-gold/30 shadow-2xl">
          <Image
            src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80"
            alt="Workshop and Woodcraft"
            fill
            className="object-cover"
          />
        </div>

        <div className="lg:col-span-6 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-espresso">
            {language === "ar"
              ? "لماذا نعمل بنظام الأونلاين والتوريد المباشر؟"
              : "Why We Operate Direct-to-Client Online"}
          </h2>
          <p className="text-sm text-taupe leading-relaxed">
            {language === "ar"
              ? "معارض الأثاث التقليدية تفرض تكاليف إيجارية وتشغيلية باهظة تُحمّل في النهاية على سعر المتر للعميل. اخترنا في طراز أن نوجه كل استثمارنا نحو استيراد أرقى أخشاب الأرو والجوز، ألواح الكوارتز الإيطالية، ومفصلات بلوم النمساوية، مع تقديم خدمة معاينة منزلية مجانية لرفع المقاسات بالليزر واطلاعك على عينات الخامات الواقعية في موقعك."
              : "Traditional showrooms impose massive retail overheads that inflate the final cost of every cabinet. At TERAZ, we direct all resources into superior woods, Italian quartz, and Austrian Blum hardware, while providing complimentary on-site laser surveys with physical swatch kits directly to your doorstep."}
          </p>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-cream-dark/60 border border-gold/20">
              <ShieldCheck className="w-6 h-6 text-gold mb-2" />
              <h3 className="text-xs font-bold text-espresso">
                {language === "ar" ? "ضمان 10 سنوات" : "10-Year Warranty"}
              </h3>
              <p className="text-[11px] text-taupe mt-1">
                {language === "ar" ? "على جودة الشاسيه والمفصلات" : "On structural carcasses & hardware"}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-cream-dark/60 border border-gold/20">
              <Clock className="w-6 h-6 text-gold mb-2" />
              <h3 className="text-xs font-bold text-espresso">
                {language === "ar" ? "دعم متواصل 24/7" : "Always Available 24/7"}
              </h3>
              <p className="text-[11px] text-taupe mt-1">
                {language === "ar" ? "استشارات ومتابعة فورية على واتساب" : "Instant consultation via WhatsApp"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
        {[
          {
            title: { ar: "الدقة الهندسية", en: "Engineering Rigor" },
            desc: {
              ar: "نرفع المقاسات بأجهزة ليزر متطورة ونراعي أدق ميول الجدران وتمديدات السباكة والكهرباء.",
              en: "Every spatial survey is executed with digital laser tools to account for MEP pathways and wall angles.",
            },
          },
          {
            title: { ar: "الحرفية المتوارثة", en: "Master Joinery" },
            desc: {
              ar: "نجارون وفنيو ألومنيوم ذوو خبرة تمتد لأكثر من 10 سنوات في تصنيع المطابخ الفندقية والموبيليا الفاخرة.",
              en: "Cabinetmakers and aluminum fabricators with over a decade of mastery in bespoke residential fit-outs.",
            },
          },
          {
            title: { ar: "الالتزام بالمواعيد", en: "Punctual Delivery" },
            desc: {
              ar: "جدول زمني محدد ودقيق من تاريخ توقيع العقد وحتى التسليم والتركيب النهائي في موقعك.",
              en: "Strict production timelines from contract sign-off to white-glove turnkey installation.",
            },
          },
        ].map((val, idx) => (
          <div
            key={idx}
            className="p-8 rounded-3xl bg-cream-dark/40 border border-gold/20 space-y-3"
          >
            <span className="text-gold font-serif text-2xl font-bold">0{idx + 1}</span>
            <h3 className="text-lg font-bold text-espresso">
              {language === "ar" ? val.title.ar : val.title.en}
            </h3>
            <p className="text-xs text-taupe leading-relaxed">
              {language === "ar" ? val.desc.ar : val.desc.en}
            </p>
          </div>
        ))}
      </div>

      {/* CTA Box */}
      <div className="p-8 sm:p-12 rounded-3xl bg-espresso text-cream border border-gold/40 shadow-2xl text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-cream">
          {language === "ar" ? "يسعدنا أن نكون جزءًا من تأثيث منزلك القادم" : "We Welcome the Honor of Crafting Your Home"}
        </h2>
        <p className="text-xs sm:text-sm text-cream/70 max-w-xl mx-auto">
          {language === "ar"
            ? "احصل على استشارة هندسية ومقايسة مجانية لمساحتك اليوم."
            : "Book a complimentary laser spatial survey and consultation today."}
        </p>
        <div className="pt-2">
          <Link
            href="/quote"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gold text-espresso font-bold text-xs uppercase tracking-wider hover:bg-gold-light transition-all shadow-xl"
          >
            <Sparkles className="w-3.5 h-3.5 text-espresso" />
            <span>{language === "ar" ? "اطلب عرض سعر مجاني" : "Request Free Quote"}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

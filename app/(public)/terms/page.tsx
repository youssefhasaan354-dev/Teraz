"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function TermsPage() {
  const { language } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-espresso">
          {language === "ar" ? "الشروط والأحكام والضمان" : "Terms & Warranty Conditions"}
        </h1>
        <p className="text-xs text-taupe">
          {language === "ar" ? "آخر تحديث: 2026" : "Last updated: 2026"}
        </p>
      </div>

      <div className="prose prose-sm text-taupe leading-relaxed space-y-6">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-espresso">
            {language === "ar" ? "١. المقايسات والتعاقد" : "1. Measurements & Commissioning"}
          </h2>
          <p>
            {language === "ar"
              ? "تعتمد المقايسة الهندسية المرفوعة من قبل مهندسي طراز كمرجع أساسي في تقطيع وتصنيع الوحدات. يتم توثيق كافة الخامات والألوان والإكسسوارات المتفق عليها في عقد التوريد الرسمي."
              : "Laser spatial measurements verified by TERAZ engineering staff serve as the authoritative reference for CNC manufacturing. Specifications and swatches are memorialized in the official commissioning agreement."}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-espresso">
            {language === "ar" ? "٢. شروط الضمان المعتمد (10 سنوات)" : "2. Certified 10-Year Warranty Terms"}
          </h2>
          <p>
            {language === "ar"
              ? "يشمل الضمان سلامة الهياكل الخشبية والألوميتال ضد عيوب التصنيع ومقاومة الرطوبة، وضمان مفصلات ومجاري بلوم (Blum) النمساوية ضد التلف الميكانيكي. لا يشمل الضمان الأضرار الناتجة عن سوء الاستخدام المتعمد أو الكوارث الطبيعية."
              : "Warranty covers structural integrity of cabinet carcasses, moisture resistance, and Blum mechanical hardware against defects. Damages caused by external plumbing flooding or intentional abuse are excluded."}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-espresso">
            {language === "ar" ? "٣. التسليم والتركيب" : "3. Turnkey Handover"}
          </h2>
          <p>
            {language === "ar"
              ? "يلتزم فريق طراز بتركيب الوحدات ومحاذاتها وتنظيف الموقع وتسليم العميل فحصًا كاملاً قبل توقيع محضر الاستلام الرسمي."
              : "Our certified technicians align all doors, adjust hinges, and leave the site spotless before conducting final handover inspections."}
          </p>
        </section>
      </div>
    </div>
  );
}

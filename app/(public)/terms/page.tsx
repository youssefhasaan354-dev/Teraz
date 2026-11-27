"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Reveal, RevealStagger } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { LineDraw } from "@/components/motion/LineDraw";

export default function TermsPage() {
  const { language } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-espresso">
          <SplitText
            priority={true}
            text={language === "ar" ? "الشروط والأحكام والضمانات" : "Terms & Warranty Conditions"}
          />
        </h1>
        <p className="text-xs text-taupe">
          {language === "ar" ? "آخر تحديث: 2026" : "Last updated: 2026"}
        </p>
      </div>

      <LineDraw variant="horizontal" className="w-full opacity-40" />

      <RevealStagger className="prose prose-sm text-taupe leading-relaxed space-y-6">
        <Reveal variant="up" staggerIndex={0}>
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-espresso">
              {language === "ar" ? "١. نظام التعاقد والمقايسة" : "1. Survey & Contracts"}
            </h2>
            <p>
              {language === "ar"
                ? "يتم رفع المقاسات الهندسية بواسطة أجهزة الليزر الرقمية المعتمدة. يُعتمد العقد بعد مراجعة المخططات الثلاثية الأبعاد (3D) والموافقة الرسمية على عينات الخامات ومواصفات الإكسسوارات."
                : "Laser measurements are surveyed on-site using digital tools. Fabrication begins following customer approval of 3D layout renders, hardware specs, and physical wood/surface samples."}
            </p>
          </section>
        </Reveal>

        <Reveal variant="up" staggerIndex={1}>
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-espresso">
              {language === "ar" ? "٢. وثيقة الضمان المعتمد (10 سنوات)" : "2. 10-Year Certified Warranty"}
            </h2>
            <p>
              {language === "ar"
                ? "تمنح طراز ضمانًا معتمدًا لمدة 10 سنوات على شاسيهات المطابخ والموبيليا ضد عيوب الصناعة وعزل الرطوبة، وضمانًا على مفصلات ومجاري بلوم (Blum) النمساوية وفق الشروط المرفقة بالعقد."
                : "TERAZ grants a 10-year structural warranty on carcasses, joinery, and moisture resistance, alongside authentic Austrian Blum mechanical warranties as detailed in the handover certificate."}
            </p>
          </section>
        </Reveal>

        <Reveal variant="up" staggerIndex={2}>
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-espresso">
              {language === "ar" ? "٣. التوريد والتركيب لكافة المحافظات" : "3. Nationwide Turnkey Assembly"}
            </h2>
            <p>
              {language === "ar"
                ? "يشمل العقد التوريد والتركيب المجاني أو المشروط حسب المحافظة في كافة أنحاء جمهورية مصر العربية بفريق فني مدرب من المصنع مباشرة."
                : "Contracts cover turnkey freight and expert installation across Greater Cairo, Alexandria, Delta, and all Egyptian governorates directly by our certified assembly teams."}
            </p>
          </section>
        </Reveal>
      </RevealStagger>
    </div>
  );
}

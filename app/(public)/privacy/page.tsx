"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function PrivacyPage() {
  const { language } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-espresso">
          {language === "ar" ? "سياسة الخصوصية وسرية البيانات" : "Privacy Policy"}
        </h1>
        <p className="text-xs text-taupe">
          {language === "ar" ? "آخر تحديث: 2026" : "Last updated: 2026"}
        </p>
      </div>

      <div className="prose prose-sm text-taupe leading-relaxed space-y-6">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-espresso">
            {language === "ar" ? "١. البيانات التي نجمعها" : "1. Information We Collect"}
          </h2>
          <p>
            {language === "ar"
              ? "نجمع فقط البيانات الضرورية لتنفيذ طلبات المعاينة وتقديم عروض الأسعار الدقيقة، مثل: الاسم، رقم الهاتف، عنوان المشروع، وأبعاد المساحة التقريبية."
              : "We only collect information required to facilitate site surveys and tailored estimates, including your name, contact phone number, general project location, and spatial measurements."}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-espresso">
            {language === "ar" ? "٢. حماية وأمان بياناتك" : "2. Data Protection"}
          </h2>
          <p>
            {language === "ar"
              ? "نلتزم بأعلى معايير السرية التامة. لا نقوم بمشاركة أو بيع بيانات عملائنا لأي طرف ثالث خارجي. تُستخدم بياناتك حصرًا لغرض التواصل معك وإتمام أعمال التصنيع والتركيب."
              : "We adhere to strict confidentiality protocols. Client information is never traded, leased, or transferred to third parties and is used solely for project execution and warranty records."}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-espresso">
            {language === "ar" ? "٣. التواصل وحق الاستفسار" : "3. Inquiries & Contact"}
          </h2>
          <p>
            {language === "ar"
              ? "لأي استفسار بخصوص سياسة الخصوصية أو لتحديث بياناتك، يمكنك مراسلتنا مباشرة على البريد: terazfurneture@gmail.com أو عبر واتساب: 01005423809."
              : "For questions regarding your data privacy, reach out to terazfurneture@gmail.com or via WhatsApp at +201005423809."}
          </p>
        </section>
      </div>
    </div>
  );
}

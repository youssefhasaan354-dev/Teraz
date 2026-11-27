"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { KitchenConfigurator } from "@/components/public/KitchenConfigurator";

export default function ConfiguratorPage() {
  const { language } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold text-gold uppercase tracking-widest">
          {language === "ar" ? "أداة المحاكاة الهندسية" : "3D Customizer Studio"}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-espresso">
          {language === "ar" ? "صمّم مطبخ أحلامك بلمستك الخاصة" : "Configure Your Bespoke Kitchen Live"}
        </h1>
        <p className="text-sm sm:text-base text-taupe leading-relaxed">
          {language === "ar"
            ? "جرّب توافق خامات الأخشاب والبولي لاك مع أسطح الكوارتز والمقابض في بيئة تفاعلية، ثم أرسل اختيارك لمهندسينا للحصول على مقايسة وعرض سعر فوري."
            : "Experiment with cabinetry finishes, quartz countertops, and hardware options in an interactive environment, then submit your spec for an immediate tailored quote."}
        </p>
      </div>

      <KitchenConfigurator />
    </div>
  );
}

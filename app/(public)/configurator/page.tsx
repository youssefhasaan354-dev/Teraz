"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { KitchenConfigurator } from "@/components/public/KitchenConfigurator";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { LineDraw } from "@/components/motion/LineDraw";

export default function ConfiguratorPage() {
  const { language } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <Reveal variant="down" priority={true}>
          <span className="text-xs font-bold text-gold uppercase tracking-widest block">
            {language === "ar" ? "أداة المحاكاة الهندسية" : "3D Customizer Studio"}
          </span>
        </Reveal>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-espresso">
          <SplitText
            priority={true}
            text={
              language === "ar"
                ? "صمّم مطبخ أحلامك بلمستك الخاصة"
                : "Configure Your Bespoke Kitchen Live"
            }
          />
        </h1>
        <Reveal variant="up" delay={0.15}>
          <p className="text-sm sm:text-base text-taupe leading-relaxed">
            {language === "ar"
              ? "جرّب توافق خامات الأخشاب والبولي لاك مع أسطح الكوارتز والمقابض في بيئة تفاعلية، ثم أرسل اختيارك لمهندسينا للحصول على مقايسة وعرض سعر فوري."
              : "Experiment with cabinetry finishes, quartz countertops, and hardware options in an interactive environment, then submit your spec for an immediate tailored quote."}
          </p>
        </Reveal>
      </div>

      <div className="max-w-4xl mx-auto">
        <LineDraw variant="arc" className="w-full h-8 opacity-50" />
      </div>

      <Reveal variant="clip">
        <KitchenConfigurator />
      </Reveal>
    </div>
  );
}

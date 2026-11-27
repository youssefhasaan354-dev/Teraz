"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, ChefHat, Layers, Sofa, Briefcase, Check } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { getServices } from "@/lib/firebase/firestore-service";
import { ServiceItem } from "@/lib/types";
import { initialServices } from "@/lib/initial-data";
import { Reveal, RevealStagger } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { TiltCard } from "@/components/motion/TiltCard";
import { Magnetic } from "@/components/motion/Magnetic";
import { LineDraw } from "@/components/motion/LineDraw";

export default function ServicesPage() {
  const { language, localize } = useLanguage();
  const [services, setServices] = useState<ServiceItem[]>(initialServices);

  useEffect(() => {
    getServices().then((res) => {
      if (res && res.length > 0) setServices(res);
    });
  }, []);

  const iconMap: Record<string, any> = {
    ChefHat,
    Layers,
    Sofa,
    Briefcase,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <Reveal variant="down" priority={true}>
          <span className="text-xs font-bold text-gold uppercase tracking-widest block">
            {language === "ar" ? "خدمات طِراز المتكاملة" : "Comprehensive Services"}
          </span>
        </Reveal>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-espresso">
          <SplitText
            priority={true}
            text={language === "ar" ? "حلول تنفيذية وتصميمية متكاملة" : "Turnkey Architectural & Fit-Out Services"}
          />
        </h1>
        <Reveal variant="up" delay={0.15}>
          <p className="text-sm sm:text-base text-taupe leading-relaxed">
            {language === "ar"
              ? "من رفع المقاسات الهندسية ورسم مخططات 3D إلى التصنيع بالماكينات الآلية والتركيب المتقن في منزلك أو شركتك."
              : "From initial laser survey and 3D visualization to automated CNC fabrication and white-glove site assembly."}
          </p>
        </Reveal>
      </div>

      <div className="max-w-4xl mx-auto">
        <LineDraw variant="arc" className="w-full h-8 opacity-50" />
      </div>

      <RevealStagger className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((srv, idx) => {
          const Icon = iconMap[srv.iconName] || Sparkles;
          return (
            <Reveal key={srv.id} staggerIndex={idx} variant="up" className="h-full">
              <TiltCard maxTilt={4} className="h-full">
                <div className="p-8 sm:p-10 rounded-3xl bg-cream-dark/50 border border-gold/30 hover:border-gold shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col justify-between space-y-6 h-full">
                  <div className="space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-gold/15 text-gold flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      <Icon className="w-7 h-7" />
                    </div>
                    <h2 className="text-2xl font-bold text-espresso">{localize(srv.title)}</h2>
                    <p className="text-xs sm:text-sm text-taupe leading-relaxed">
                      {localize(srv.description)}
                    </p>

                    <div className="pt-2 space-y-2 border-t border-gold/15">
                      {srv.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-xs font-medium text-espresso">
                          <Check className="w-4 h-4 text-gold shrink-0" />
                          <span>{localize(feat)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4">
                    <Magnetic strength={0.2}>
                      <Link
                        href={`/quote?service=${srv.id}`}
                        className="w-full py-3 rounded-xl bg-espresso text-cream text-xs font-bold flex items-center justify-center gap-2 hover:bg-gold hover:text-espresso transition-colors shadow-md active:scale-95"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-gold-light" />
                        <span>{language === "ar" ? "اطلب استشارة لهذه الخدمة" : "Request Consultation"}</span>
                      </Link>
                    </Magnetic>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          );
        })}
      </RevealStagger>
    </div>
  );
}

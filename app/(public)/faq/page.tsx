"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, MessageCircle, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { getFAQs } from "@/lib/firebase/firestore-service";
import { FAQItem } from "@/lib/types";

export default function FAQPage() {
  const { language, localize } = useLanguage();
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [openId, setOpenId] = useState<string | null>("faq-1");

  useEffect(() => {
    getFAQs().then(setFaqs);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-xs font-bold text-gold uppercase tracking-widest">
          {language === "ar" ? "كل ما تود معرفته" : "Knowledge Base"}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-espresso">
          {language === "ar" ? "الأسئلة الشائعة وإجاباتها" : "Frequently Asked Questions"}
        </h1>
        <p className="text-sm text-taupe leading-relaxed">
          {language === "ar"
            ? "جمعنا لك هنا أهم الأسئلة حول نظام المقايسة، التوريد لكافة المحافظات، الضمانات، ونوعيات الأخشاب والألوميتال."
            : "Clear insights regarding on-site surveys, nationwide deliveries, 10-year warranties, and custom materials."}
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((f) => {
          const isOpen = openId === f.id;
          return (
            <div
              key={f.id}
              className="rounded-2xl border border-gold/30 bg-cream-dark/50 overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenId(isOpen ? null : f.id)}
                className="w-full p-5 text-start flex items-center justify-between gap-4"
              >
                <span className="text-sm font-bold text-espresso">{localize(f.question)}</span>
                <ChevronDown
                  className={`w-4 h-4 text-gold shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs text-taupe leading-relaxed border-t border-gold/15">
                  {localize(f.answer)}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="p-8 rounded-3xl bg-cream-dark/60 border border-gold/30 text-center space-y-4">
        <h3 className="text-lg font-bold text-espresso">
          {language === "ar" ? "لديك استفسار آخر لم تجده هنا؟" : "Have Another Question Not Listed Here?"}
        </h3>
        <p className="text-xs text-taupe max-w-md mx-auto">
          {language === "ar"
            ? "فريقنا متواجد 24/7 عبر واتساب ومستعد للإجابة عن أدق تفاصيل مساحتك."
            : "Our engineering consultants are on standby 24/7 on WhatsApp to assist you."}
        </p>
        <div className="pt-1">
          <a
            href="https://wa.me/201005423809"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#25D366] text-white font-bold text-xs shadow-md hover:bg-green-600 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{language === "ar" ? "تحدث مع مهندس على واتساب" : "Chat on WhatsApp"}</span>
          </a>
        </div>
      </div>
    </div>
  );
}

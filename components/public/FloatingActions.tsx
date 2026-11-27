"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MessageCircle, Phone, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function FloatingActions() {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 400 && currentScrollY > lastScrollY) {
        setIsVisible(false); // hide on fast scroll down
      } else {
        setIsVisible(true);  // show on scroll up
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const defaultMsg =
    language === "ar"
      ? "السلام عليكم، أنا مهتم بخدماتكم من خلال موقع تيراز للأثاث. أود الاستفسار والحصول على عرض سعر. ممكن تساعدوني؟ 🌿"
      : "Hello TERAZ team, I found you through your website and I'm interested in your furniture and kitchens. Could you please help me with details and a quote?";

  const whatsappUrl = `https://wa.me/201005423809?text=${encodeURIComponent(defaultMsg)}`;

  return (
    <div
      className={`fixed bottom-6 z-50 flex flex-col items-end gap-3 transition-all duration-300 ${
        language === "ar" ? "left-6" : "right-6"
      } ${isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0 pointer-events-none"}`}
    >
      {/* Quote Floating Button */}
      <Link
        href="/quote"
        className="group flex items-center gap-2 bg-espresso text-cream px-4 py-2.5 rounded-full shadow-2xl border border-gold/40 hover:border-gold hover:bg-black transition-all pulse-gold"
      >
        <Sparkles className="w-4 h-4 text-gold-light group-hover:rotate-12 transition-transform" />
        <span className="text-xs font-semibold tracking-wide">
          {language === "ar" ? "اطلب عرض سعر" : "Request Quote"}
        </span>
      </Link>

      <div className="flex items-center gap-2.5">
        {/* Direct Call Button */}
        <a
          href="tel:+201005423809"
          aria-label="Call Teraz"
          className="w-11 h-11 rounded-full bg-cream-dark text-espresso border border-gold/40 flex items-center justify-center shadow-lg hover:scale-110 hover:bg-gold hover:text-white transition-all"
        >
          <Phone className="w-4 h-4" />
        </a>

        {/* WhatsApp Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp Chat"
          className="w-13 h-13 p-3 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:scale-110 hover:shadow-green-500/30 transition-all"
        >
          <MessageCircle className="w-6 h-6 fill-current" />
        </a>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, Clock, ShieldCheck, ArrowUp, Facebook, Instagram } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { getSiteSettings, getCategories } from "@/lib/firebase/firestore-service";
import { SiteSettings, Category } from "@/lib/types";
import { initialCategories } from "@/lib/initial-data";
import { Reveal, RevealStagger } from "../motion/Reveal";

export function Footer() {
  const { language, localize } = useLanguage();
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    getSiteSettings().then(setSettings);
    getCategories().then((res) => {
      if (res && res.length > 0) setCategories(res);
    });

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-espresso text-cream pt-16 pb-8 border-t border-gold/30 relative overflow-hidden">
      {/* Decorative Background Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-cream/10">
          {/* Column 1: Brand Info & Tagline */}
          <Reveal variant="up" staggerIndex={0} className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block group">
              <div className="relative w-52 h-14 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/brand/logo-light.svg"
                  alt="TERAZ Furniture & Kitchens"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>

            <p className="text-sm text-cream/75 leading-relaxed max-w-md">
              {language === "ar"
                ? "طراز (TERAZ) — علامة مصرية رائدة في تفصيل وتنفيذ المطابخ المودرن والكلاسيك، تجاليد الكلادينج المعمارية، والموبيليا الفاخرة والأثاث المكتبي بأعلى معايير الإتقان والجودة."
                : "TERAZ — A distinguished Egyptian manufacturer specializing in contemporary custom kitchens, wall claddings, and tailored furniture for residences and corporate offices."}
            </p>

            {/* Service & Hours Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/15 text-gold-light text-xs font-semibold border border-gold/30">
                <Clock className="w-3.5 h-3.5" />
                <span>{language === "ar" ? "متاحون دائمًا (24/7)" : "Always Available 24/7"}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream/10 text-cream/90 text-xs font-medium border border-cream/20">
                <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                <span>{language === "ar" ? "ضمان معتمد حتى 10 سنوات" : "Certified 10-Yr Warranty"}</span>
              </div>
            </div>

            {/* Online only notice */}
            <p className="text-xs text-cream/50 pt-1">
              {language === "ar"
                ? "نخدمكم بنظام الأونلاين والتوريد المباشر — نوصّل ونركّب في جميع محافظات مصر."
                : "Serving you online with direct nationwide delivery & assembly across Egypt."}
            </p>
          </Reveal>

          {/* Column 2: Categories */}
          <Reveal variant="up" staggerIndex={1}>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gold-light mb-4">
              {language === "ar" ? "أقسامنا" : "Disciplines"}
            </h4>
            <ul className="space-y-2.5 text-sm text-cream/70">
              {categories.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/categories/${c.slug}`}
                    className="hover:text-gold-light transition-colors flex items-center justify-between group"
                  >
                    <span>{localize(c.name)}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-gold">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Column 3: Quick Links */}
          <Reveal variant="up" staggerIndex={2}>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gold-light mb-4">
              {language === "ar" ? "روابط سريعة" : "Quick Links"}
            </h4>
            <ul className="space-y-2.5 text-sm text-cream/70">
              <li>
                <Link href="/projects" className="hover:text-gold-light transition-colors">
                  {language === "ar" ? "أعمالنا المنفذة" : "Our Portfolio"}
                </Link>
              </li>
              <li>
                <Link href="/configurator" className="hover:text-gold-light transition-colors text-gold">
                  {language === "ar" ? "محاكي تصميم المطابخ" : "Kitchen Configurator"}
                </Link>
              </li>
              <li>
                <Link href="/materials" className="hover:text-gold-light transition-colors">
                  {language === "ar" ? "مكتبة الخامات والتشطيبات" : "Materials & Finishes"}
                </Link>
              </li>
              <li>
                <Link href="/quote" className="hover:text-gold-light transition-colors">
                  {language === "ar" ? "طلب عرض سعر ومقايسة" : "Request a Quote"}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gold-light transition-colors">
                  {language === "ar" ? "عن طِراز وقيمنا" : "About Us"}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold-light transition-colors">
                  {language === "ar" ? "تواصل معنا" : "Contact"}
                </Link>
              </li>
            </ul>
          </Reveal>

          {/* Column 4: Contact & Socials */}
          <Reveal variant="up" staggerIndex={3}>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gold-light mb-4">
              {language === "ar" ? "بيانات التواصل" : "Get In Touch"}
            </h4>
            <ul className="space-y-3 text-sm text-cream/70">
              <li>
                <a
                  href="tel:+201005423809"
                  className="flex items-center gap-2 hover:text-gold-light transition-colors"
                >
                  <Phone className="w-4 h-4 text-gold shrink-0" />
                  <span dir="ltr">01005423809</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/201005423809"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-gold-light transition-colors"
                >
                  <span className="w-4 h-4 rounded-full bg-[#25D366] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                    W
                  </span>
                  <span>{language === "ar" ? "واتساب: 01005423809" : "WhatsApp: +201005423809"}</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:terazfurneture@gmail.com"
                  className="flex items-center gap-2 hover:text-gold-light transition-colors break-all"
                >
                  <Mail className="w-4 h-4 text-gold shrink-0" />
                  <span>terazfurneture@gmail.com</span>
                </a>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-4">
              <a
                href="https://www.facebook.com/profile.php?id=61596909988938"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-cream/10 border border-gold/30 flex items-center justify-center text-cream hover:bg-gold hover:text-espresso transition-all"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/furnitureteraz/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-cream/10 border border-gold/30 flex items-center justify-center text-cream hover:bg-gold hover:text-espresso transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </Reveal>
        </RevealStagger>

        {/* Bottom Bar: Copyright & Back to Top with Circular Progress */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream/50">
          <p>
            {language === "ar"
              ? "جميع الحقوق محفوظة © طراز للأثاث والمطابخ (TERAZ) 2026. عِش الأناقة."
              : "All Rights Reserved © TERAZ Furniture & Kitchens 2026. Live in Elegance."}
          </p>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-cream transition-colors">
              {language === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}
            </Link>
            <Link href="/terms" className="hover:text-cream transition-colors">
              {language === "ar" ? "الشروط والأحكام" : "Terms & Conditions"}
            </Link>

            {/* Back to top with Circular SVG Progress Ring */}
            <button
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="relative w-10 h-10 rounded-full bg-cream/10 border border-gold/40 flex items-center justify-center text-gold hover:bg-gold hover:text-espresso transition-all shadow-md active:scale-95 group"
            >
              <svg className="w-10 h-10 absolute inset-0 -rotate-90 pointer-events-none" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  className="stroke-cream/10"
                  strokeWidth="2.5"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  className="stroke-gold transition-all duration-150"
                  strokeWidth="2.5"
                  strokeDasharray="100"
                  strokeDashoffset={100 - scrollProgress}
                  strokeLinecap="round"
                />
              </svg>
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, Clock, MapPin, Instagram, Facebook, ArrowUpRight, ShieldCheck, Lock } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { getSiteSettings, getCategories } from "@/lib/firebase/firestore-service";
import { SiteSettings, Category } from "@/lib/types";

export function Footer() {
  const { language, localize } = useLanguage();
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getSiteSettings().then(setSettings);
    getCategories().then(setCategories);
  }, []);

  return (
    <footer className="bg-espresso text-cream pt-16 pb-8 border-t border-gold/30 relative overflow-hidden">
      {/* Decorative Background Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-cream/10">
          {/* Column 1: Brand Info & Tagline */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <div className="relative w-52 h-14">
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
          </div>

          {/* Column 2: Categories */}
          <div>
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
          </div>

          {/* Column 3: Quick Links */}
          <div>
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
          </div>

          {/* Column 4: Contact & Socials */}
          <div>
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
          </div>
        </div>

        {/* Bottom Bar: Copyright & Admin CMS Link */}
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
            <Link
              href="/admin"
              className="flex items-center gap-1 text-gold-light/70 hover:text-gold-light transition-colors border border-gold/20 px-2.5 py-1 rounded-full"
            >
              <Lock className="w-3 h-3" />
              <span>{language === "ar" ? "لوحة الإدارة (CMS)" : "Admin Portal"}</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

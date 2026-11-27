"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search, Globe, Menu, X, ChevronDown, Sparkles, Phone, MessageCircle } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { getCategories } from "@/lib/firebase/firestore-service";
import { Category } from "@/lib/types";
import { GlobalSearch } from "./GlobalSearch";

export function Header() {
  const { language, toggleLanguage, localize } = useLanguage();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories().then(setCategories);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setMegaMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/", label: language === "ar" ? "الرئيسية" : "Home" },
    { href: "/projects", label: language === "ar" ? "أعمالنا" : "Projects" },
    { href: "/configurator", label: language === "ar" ? "صمّم مطبخك" : "Configurator", highlight: true },
    { href: "/materials", label: language === "ar" ? "الخامات والتشطيبات" : "Materials" },
    { href: "/about", label: language === "ar" ? "من نحن" : "About" },
    { href: "/contact", label: language === "ar" ? "تواصل معنا" : "Contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-cream/90 backdrop-blur-md shadow-md py-2.5 border-b border-gold/20"
            : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group shrink-0">
              <div className="relative w-44 sm:w-52 h-12 transition-transform duration-300 group-hover:scale-[1.02]">
                <Image
                  src="/brand/logo-full.svg"
                  alt="طراز للأثاث والمطابخ - TERAZ"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
              {/* Home */}
              <Link
                href="/"
                className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-colors ${
                  pathname === "/"
                    ? "text-espresso bg-gold/15 font-bold"
                    : "text-espresso/80 hover:text-espresso hover:bg-cream-dark/60"
                }`}
              >
                {language === "ar" ? "الرئيسية" : "Home"}
              </Link>

              {/* Categories with Mega Menu Trigger */}
              <div
                className="relative"
                onMouseEnter={() => setMegaMenuOpen(true)}
                onMouseLeave={() => setMegaMenuOpen(false)}
              >
                <button
                  onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide text-espresso/80 hover:text-espresso hover:bg-cream-dark/60 transition-colors"
                >
                  <span>{language === "ar" ? "أقسامنا الفاخرة" : "Disciplines"}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      megaMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Mega Menu Dropdown */}
                {megaMenuOpen && (
                  <div className="absolute top-full right-0 lg:-right-36 w-[720px] bg-cream/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gold/30 p-6 z-50 animate-fadeIn">
                    <div className="grid grid-cols-3 gap-4">
                      {categories.map((cat) => (
                        <Link
                          key={cat.id}
                          href={`/categories/${cat.slug}`}
                          className="group p-3 rounded-xl hover:bg-cream-dark/80 transition-all border border-transparent hover:border-gold/20 flex flex-col gap-2"
                        >
                          <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden">
                            <Image
                              src={cat.coverImage}
                              alt={localize(cat.name)}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-espresso/20 group-hover:bg-transparent transition-colors" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-espresso group-hover:text-gold transition-colors">
                              {localize(cat.name)}
                            </h4>
                            <p className="text-[11px] text-taupe line-clamp-1 mt-0.5">
                              {localize(cat.description)}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>

                    <div className="mt-4 pt-3 border-t border-gold/20 flex items-center justify-between text-xs text-taupe">
                      <span>{language === "ar" ? "تفصيل خاص لجميع الأبعاد حسب رغبتك" : "Custom fabrication to your exact spatial needs"}</span>
                      <Link
                        href="/categories"
                        className="text-gold font-bold hover:underline flex items-center gap-1"
                      >
                        {language === "ar" ? "عرض كافة الأقسام ←" : "Explore All Categories →"}
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Other Links */}
              {navLinks.slice(1).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-colors ${
                    pathname === link.href
                      ? "text-espresso bg-gold/15 font-bold"
                      : link.highlight
                      ? "text-gold font-bold bg-gold/10 hover:bg-gold hover:text-white"
                      : "text-espresso/80 hover:text-espresso hover:bg-cream-dark/60"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions: Search, Language, Quote CTA */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search Button */}
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Global Search"
                className="w-9 h-9 rounded-full flex items-center justify-center text-espresso/80 hover:text-espresso hover:bg-cream-dark/80 transition-colors border border-transparent hover:border-gold/30"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Language Switch */}
              <button
                onClick={toggleLanguage}
                aria-label="Switch Language"
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-semibold text-espresso/80 hover:text-espresso hover:bg-cream-dark/80 transition-colors border border-gold/30"
              >
                <Globe className="w-3.5 h-3.5 text-gold" />
                <span>{language === "ar" ? "EN" : "عربي"}</span>
              </button>

              {/* Request a Quote CTA */}
              <Link
                href="/quote"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-espresso text-cream text-xs font-semibold tracking-wide hover:bg-black border border-gold/40 shadow-sm transition-all hover:scale-105"
              >
                <Sparkles className="w-3.5 h-3.5 text-gold-light" />
                <span>{language === "ar" ? "اطلب عرض سعر" : "Request a Quote"}</span>
              </Link>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Mobile Menu"
                className="lg:hidden p-2 rounded-xl text-espresso hover:bg-cream-dark/80"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Global Search Modal */}
      <GlobalSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Mobile Full-Screen Overlay Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-cream/98 backdrop-blur-2xl flex flex-col justify-between p-6 overflow-y-auto lg:hidden animate-fadeIn">
          {/* Top Bar inside Overlay */}
          <div className="flex items-center justify-between pb-6 border-b border-gold/20">
            <div className="relative w-36 h-10">
              <Image
                src="/brand/logo-full.svg"
                alt="TERAZ"
                fill
                className="object-contain"
              />
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-full bg-cream-dark text-espresso hover:bg-gold/20"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Links List */}
          <div className="py-8 space-y-4">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xl font-bold text-espresso hover:text-gold transition-colors"
            >
              {language === "ar" ? "الرئيسية" : "Home"}
            </Link>

            {/* Categories Mobile Expand */}
            <div className="space-y-2 pt-2 border-t border-gold/15">
              <span className="text-xs font-bold text-gold uppercase tracking-wider block">
                {language === "ar" ? "أقسام الأثاث والمطابخ" : "Categories"}
              </span>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((c) => (
                  <Link
                    key={c.id}
                    href={`/categories/${c.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2.5 rounded-xl bg-cream-dark/70 text-xs font-semibold text-espresso flex items-center justify-between"
                  >
                    <span>{localize(c.name)}</span>
                    <span className="text-gold">←</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-4 space-y-3">
              {navLinks.slice(1).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block text-lg font-semibold transition-colors ${
                    link.highlight ? "text-gold font-bold" : "text-espresso/90 hover:text-espresso"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom CTAs */}
          <div className="pt-6 border-t border-gold/20 space-y-3">
            <Link
              href="/quote"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3.5 rounded-full bg-espresso text-cream text-sm font-bold flex items-center justify-center gap-2 border border-gold/40 shadow-lg"
            >
              <Sparkles className="w-4 h-4 text-gold-light" />
              <span>{language === "ar" ? "اطلب مقايسة وعرض سعر مجاني" : "Request Free Quote & Survey"}</span>
            </Link>

            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/201005423809"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 rounded-full bg-[#25D366] text-white text-xs font-bold flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{language === "ar" ? "واتساب مباشر" : "WhatsApp"}</span>
              </a>
              <a
                href="tel:+201005423809"
                className="flex-1 py-2.5 rounded-full bg-cream-dark text-espresso border border-gold/40 text-xs font-bold flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>{language === "ar" ? "اتصال هاتف" : "Call"}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

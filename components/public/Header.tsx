"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search, Globe, Menu, X, ChevronDown, Sparkles, Phone, MessageCircle } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { getCategories } from "@/lib/firebase/firestore-service";
import { Category } from "@/lib/types";
import { initialCategories } from "@/lib/initial-data";
import { GlobalSearch } from "./GlobalSearch";
import { ScrollProgress } from "../motion/ScrollProgress";

export function Header() {
  const { language, toggleLanguage, localize } = useLanguage();
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>(initialCategories);

  useEffect(() => {
    getCategories().then((res) => {
      if (res && res.length > 0) setCategories(res);
    });

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      // Hide on scroll down past hero, show on scroll up
      if (currentScrollY > 120 && currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

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
      <ScrollProgress />
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 transform ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          isScrolled
            ? "bg-cream/92 backdrop-blur-md shadow-md py-2.5 border-b border-gold/20"
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

                {/* Staggered Mega Menu Dropdown */}
                <AnimatePresence>
                  {megaMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="absolute top-full -left-20 rtl:-right-20 mt-2 w-[540px] p-4 bg-espresso text-cream rounded-3xl shadow-2xl border border-gold/40 z-50 overflow-hidden"
                    >
                      <div className="flex items-center justify-between pb-3 border-b border-gold/20 mb-3 px-2">
                        <span className="text-[11px] font-bold text-gold-light uppercase tracking-widest">
                          {language === "ar" ? "التخصصات الرئيسية" : "Signature Disciplines"}
                        </span>
                        <Link
                          href="/categories"
                          className="text-[11px] text-cream/70 hover:text-gold transition-colors"
                        >
                          {language === "ar" ? "عرض كافة الأقسام ←" : "View All Categories →"}
                        </Link>
                      </div>

                      <div className="grid grid-cols-2 gap-2.5">
                        {categories.map((cat, idx) => (
                          <motion.div
                            key={cat.id}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.04 }}
                          >
                            <Link
                              href={`/categories/${cat.slug}`}
                              className="group/item flex items-center gap-3 p-2 rounded-2xl hover:bg-cream/10 transition-colors border border-transparent hover:border-gold/20"
                            >
                              <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-gold/30">
                                <Image
                                  src={cat.coverImage}
                                  alt={localize(cat.name)}
                                  fill
                                  className="object-cover group-hover/item:scale-110 transition-transform duration-500"
                                />
                              </div>
                              <div className="overflow-hidden">
                                <span className="text-xs font-bold text-cream group-hover/item:text-gold-light transition-colors block truncate">
                                  {localize(cat.name)}
                                </span>
                                <span className="text-[10px] text-cream/60 block truncate">
                                  {localize(cat.description)}
                                </span>
                              </div>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Remaining Nav Links */}
              {navLinks.slice(1).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-colors ${
                    pathname === link.href
                      ? "text-espresso bg-gold/15 font-bold"
                      : link.highlight
                      ? "text-gold font-bold bg-gold/10 hover:bg-gold hover:text-espresso"
                      : "text-espresso/80 hover:text-espresso hover:bg-cream-dark/60"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions: Search, Language, Quote CTA */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search Modal Trigger */}
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
                className="w-9 h-9 rounded-full flex items-center justify-center text-espresso/80 hover:text-espresso hover:bg-cream-dark/60 transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                aria-label="Toggle language"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-espresso border border-gold/30 hover:border-gold hover:bg-gold/10 transition-all"
              >
                <Globe className="w-3.5 h-3.5 text-gold" />
                <span>{language === "ar" ? "EN" : "عربي"}</span>
              </button>

              {/* Quote CTA Button */}
              <Link
                href="/quote"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold text-espresso font-bold text-xs uppercase tracking-wider hover:bg-gold-light transition-all shadow-md active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5 text-espresso" />
                <span>{language === "ar" ? "عرض سعر" : "Quote"}</span>
              </Link>

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Mobile Menu"
                className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center text-espresso hover:bg-cream-dark/60 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Drawer with Staggered Entrance */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-espresso/95 backdrop-blur-xl flex flex-col justify-between p-6 text-cream lg:hidden"
          >
            <div className="flex items-center justify-between pb-6 border-b border-gold/20">
              <div className="relative w-36 h-10">
                <Image
                  src="/brand/logo-light.svg"
                  alt="TERAZ"
                  fill
                  className="object-contain"
                />
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center text-gold hover:bg-gold hover:text-espresso transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <motion.nav
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.08 } },
              }}
              className="py-8 space-y-4 text-center overflow-y-auto"
            >
              {[
                { href: "/", label: language === "ar" ? "الرئيسية" : "Home" },
                { href: "/categories", label: language === "ar" ? "أقسامنا الفاخرة" : "Disciplines" },
                { href: "/products", label: language === "ar" ? "كتالوج التصاميم" : "Bespoke Products" },
                { href: "/projects", label: language === "ar" ? "أعمالنا ومشاريعنا" : "Projects" },
                { href: "/configurator", label: language === "ar" ? "صمّم مطبخك تفاعليًا" : "Configurator", highlight: true },
                { href: "/materials", label: language === "ar" ? "الخامات والتشطيبات" : "Materials" },
                { href: "/about", label: language === "ar" ? "من نحن وقصتنا" : "About TERAZ" },
                { href: "/services", label: language === "ar" ? "خدماتنا المتكاملة" : "Services" },
                { href: "/faq", label: language === "ar" ? "الأسئلة الشائعة" : "FAQ" },
                { href: "/contact", label: language === "ar" ? "تواصل معنا" : "Contact" },
              ].map((item, i) => (
                <motion.div
                  key={item.href}
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-2 text-lg font-bold transition-colors ${
                      pathname === item.href
                        ? "text-gold"
                        : item.highlight
                        ? "text-gold-light font-extrabold"
                        : "text-cream/90 hover:text-gold"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>

            <div className="pt-6 border-t border-gold/20 flex flex-col gap-3 text-center">
              <Link
                href="/quote"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3.5 rounded-full bg-gold text-espresso font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl"
              >
                <Sparkles className="w-4 h-4" />
                <span>{language === "ar" ? "طلب مقايسة وعرض سعر مجاني" : "Request Free Quote"}</span>
              </Link>
              <div className="flex items-center justify-center gap-4 pt-2 text-xs text-cream/70">
                <a href="tel:+201005423809" className="hover:text-gold transition-colors">
                  01005423809
                </a>
                <span>•</span>
                <button onClick={toggleLanguage} className="text-gold font-bold">
                  {language === "ar" ? "English Version" : "النسخة العربية"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Search Modal */}
      <GlobalSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

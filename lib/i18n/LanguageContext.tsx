"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { translations, Language } from "./dictionaries";
import { LocalizedText } from "../types";

interface LanguageContextType {
  language: Language;
  direction: "rtl" | "ltr";
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  t: typeof translations.ar;
  localize: (item?: LocalizedText | string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("ar");

  useEffect(() => {
    // Check localStorage on mount
    const saved = localStorage.getItem("teraz_lang") as Language;
    if (saved === "ar" || saved === "en") {
      setLanguageState(saved);
      document.documentElement.dir = saved === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = saved;
    } else {
      document.documentElement.dir = "rtl";
      document.documentElement.lang = "ar";
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("teraz_lang", lang);
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  };

  const toggleLanguage = () => {
    const next = language === "ar" ? "en" : "ar";
    setLanguage(next);
  };

  const localize = (item?: LocalizedText | string): string => {
    if (!item) return "";
    if (typeof item === "string") return item;
    return item[language] || item.ar || item.en || "";
  };

  const value: LanguageContextType = {
    language,
    direction: language === "ar" ? "rtl" : "ltr",
    toggleLanguage,
    setLanguage,
    t: translations[language],
    localize,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

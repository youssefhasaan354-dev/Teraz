"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X, ArrowRight, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { getProducts, getProjects, getCategories } from "@/lib/firebase/firestore-service";
import { Product, Project, Category } from "@/lib/types";

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlobalSearch({ isOpen, onClose }: GlobalSearchProps) {
  const { language, localize } = useLanguage();
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (isOpen) {
      getProducts().then(setProducts);
      getProjects().then(setProjects);
      getCategories().then(setCategories);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  const filteredProducts = query
    ? products.filter(
        (p) =>
          localize(p.title).toLowerCase().includes(q) ||
          localize(p.shortDescription).toLowerCase().includes(q)
      )
    : [];

  const filteredProjects = query
    ? projects.filter(
        (p) =>
          localize(p.title).toLowerCase().includes(q) ||
          localize(p.description).toLowerCase().includes(q)
      )
    : [];

  const filteredCategories = query
    ? categories.filter(
        (c) =>
          localize(c.name).toLowerCase().includes(q) ||
          localize(c.description).toLowerCase().includes(q)
      )
    : [];

  return (
    <div className="fixed inset-0 z-[9999] bg-espresso/80 backdrop-blur-md flex items-start justify-center pt-20 px-4 sm:px-6">
      <div
        className="relative w-full max-w-2xl bg-cream rounded-2xl shadow-2xl border border-gold/40 overflow-hidden text-espresso"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-gold/20 gap-3">
          <Search className="w-5 h-5 text-gold shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              language === "ar"
                ? "ابحث عن مطبخ، كلادينج، أثاث مكتبي، أو خامة..."
                : "Search for kitchens, cladding, furniture, or materials..."
            }
            className="w-full bg-transparent border-none outline-none text-base placeholder:text-taupe/60 text-espresso"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-xs text-taupe hover:text-espresso px-2 py-1"
            >
              مسح
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-full text-taupe hover:text-espresso hover:bg-gold/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {!query && (
            <div className="text-center py-8 text-taupe text-sm">
              <p>
                {language === "ar"
                  ? "اكتب أي كلمة للبحث الفوري في المنتجات، المشاريع، والأقسام."
                  : "Type any keyword to instantly search products, projects, and disciplines."}
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setQuery(localize(c.name))}
                    className="text-xs px-3 py-1.5 rounded-full bg-cream-dark text-espresso hover:bg-gold hover:text-white transition-colors"
                  >
                    {localize(c.name)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {query &&
            filteredProducts.length === 0 &&
            filteredProjects.length === 0 &&
            filteredCategories.length === 0 && (
              <div className="text-center py-10 text-taupe text-sm">
                {language === "ar"
                  ? "لم يتم العثور على نتائج تطابق بحثك. جرّب كلمات أخرى أو تواصل معنا مباشرة."
                  : "No matches found. Try alternative keywords or contact us directly."}
              </div>
            )}

          {/* Categories matches */}
          {filteredCategories.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-gold uppercase tracking-wider mb-2">
                {language === "ar" ? "الأقسام" : "Categories"}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredCategories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/categories/${cat.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-cream-dark transition-colors border border-transparent hover:border-gold/30"
                  >
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                      <Image
                        src={cat.coverImage}
                        alt={localize(cat.name)}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold">{localize(cat.name)}</h4>
                      <p className="text-xs text-taupe line-clamp-1">{localize(cat.description)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Products matches */}
          {filteredProducts.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-gold uppercase tracking-wider mb-2">
                {language === "ar" ? "المنتجات والتصاميم" : "Products & Designs"}
              </h3>
              <div className="space-y-2">
                {filteredProducts.map((p) => (
                  <Link
                    key={p.id}
                    href={`/products/${p.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-cream-dark transition-colors border border-transparent hover:border-gold/30"
                  >
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0">
                      <Image
                        src={p.images[0]}
                        alt={localize(p.title)}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold truncate">{localize(p.title)}</h4>
                      <p className="text-xs text-taupe line-clamp-1">{localize(p.shortDescription)}</p>
                    </div>
                    <span className="text-xs font-medium text-gold hover:underline shrink-0">
                      {language === "ar" ? "اطلب عرض سعر ←" : "Request Quote →"}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Projects matches */}
          {filteredProjects.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-gold uppercase tracking-wider mb-2">
                {language === "ar" ? "أعمالنا المنفذة" : "Completed Projects"}
              </h3>
              <div className="space-y-2">
                {filteredProjects.map((pr) => (
                  <Link
                    key={pr.id}
                    href={`/projects/${pr.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-cream-dark transition-colors border border-transparent hover:border-gold/30"
                  >
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0">
                      <Image
                        src={pr.images[0]}
                        alt={localize(pr.title)}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold truncate">{localize(pr.title)}</h4>
                      <p className="text-xs text-taupe line-clamp-1">{localize(pr.description)}</p>
                    </div>
                    {pr.beforeAfterPair && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-gold/15 text-gold-dark font-medium shrink-0">
                        {language === "ar" ? "قبل وبعد" : "Before/After"}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-cream-dark/60 border-t border-gold/15 text-[11px] text-taupe flex justify-between items-center">
          <span>{language === "ar" ? "اضغط ESC للإغلاق" : "Press ESC to close"}</span>
          <span>TERAZ Search Engine</span>
        </div>
      </div>
    </div>
  );
}

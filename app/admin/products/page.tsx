"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Edit2, Trash2, Package, Eye, Lock, Sparkles, X, Check } from "lucide-react";
import { getProducts, getCategories, saveProduct, deleteProduct } from "@/lib/firebase/firestore-service";
import { Product, Category } from "@/lib/types";
import { BilingualInput } from "@/components/admin/BilingualInput";
import { ImagePicker } from "@/components/admin/ImagePicker";
import { StatusBadge } from "@/components/admin/StatusBadge";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCat, setSelectedCat] = useState<string>("all");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [p, c] = await Promise.all([getProducts(), getCategories()]);
    setProducts(p);
    setCategories(c);
  };

  const filtered =
    selectedCat === "all" ? products : products.filter((p) => p.categoryId === selectedCat);

  const handleCreateNew = () => {
    setEditingProduct({
      id: "prod-" + Date.now(),
      slug: "new-design",
      title: { ar: "", en: "" },
      categoryId: categories[0]?.id || "cat-wooden-kitchens",
      shortDescription: { ar: "", en: "" },
      fullDescription: { ar: "", en: "" },
      images: ["https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80"],
      specs: [
        { label: { ar: "الهيكل والخشب", en: "Structure" }, value: { ar: "خشب طبيعي معالج", en: "Treated Natural Wood" } },
        { label: { ar: "المسطح", en: "Countertop" }, value: { ar: "كوارتز كالاكاتا مقاوم للبقع", en: "Stain-Proof Calacatta Quartz" } },
        { label: { ar: "الضمان", en: "Warranty" }, value: { ar: "10 سنوات معتمد", en: "10 Years Certified" } },
      ],
      materials: [{ ar: "قشرة أرو طبيعية", en: "Natural Oak Veneer" }],
      colorsFinishes: [{ ar: "بني إسبريسو", en: "Espresso Brown" }],
      internalNotesPrice: "Approx 9,000 EGP / meter (INTERNAL ONLY)",
      featured: true,
      status: "published",
      createdAt: new Date().toISOString(),
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    await saveProduct(editingProduct);
    setIsModalOpen(false);
    setEditingProduct(null);
    loadData();
  };

  const handleDelete = async (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذا المنتج؟")) {
      await deleteProduct(id);
      loadData();
    }
  };

  return (
    <div className="space-y-6 max-w-7xl pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gold/20">
        <div>
          <h2 className="text-xl font-bold text-cream">
            كتالوج المنتجات والتصاميم (Products &amp; Models CMS)
          </h2>
          <p className="text-xs text-taupe">
            أضف أو عدّل المواصفات الفنية، صور المعرض، وملاحظات التكلفة الداخلية
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="px-4 py-2 rounded-xl bg-gold text-espresso font-bold text-xs hover:bg-gold-light transition-all flex items-center gap-1.5 shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة منتج أو تصميم جديد</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        <button
          onClick={() => setSelectedCat("all")}
          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
            selectedCat === "all"
              ? "bg-gold text-espresso shadow-md"
              : "bg-espresso border border-gold/25 text-taupe hover:text-cream"
          }`}
        >
          الكل ({products.length})
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCat(c.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              selectedCat === c.id
                ? "bg-gold text-espresso shadow-md"
                : "bg-espresso border border-gold/25 text-taupe hover:text-cream"
            }`}
          >
            {c.name.ar}
          </button>
        ))}
      </div>

      {/* Products Table */}
      <div className="rounded-3xl bg-espresso border border-gold/25 overflow-hidden shadow-xl">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-start text-xs border-collapse">
            <thead>
              <tr className="border-b border-gold/20 text-taupe bg-espresso-400/40">
                <th className="py-3 px-4 text-start">المنتج والتصميم</th>
                <th className="py-3 px-4 text-start">القسم الرئيسي</th>
                <th className="py-3 px-4 text-start">الحالة</th>
                <th className="py-3 px-4 text-start">التكلفة الداخلية (مخفية للعامة)</th>
                <th className="py-3 px-4 text-start">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold/15">
              {filtered.map((prod) => {
                const cat = categories.find((c) => c.id === prod.categoryId);
                return (
                  <tr key={prod.id} className="hover:bg-espresso-400/30 transition-colors">
                    <td className="py-3.5 px-4 flex items-center gap-3">
                      <div className="relative w-12 h-10 rounded-lg overflow-hidden border border-gold/20 shrink-0">
                        <Image
                          src={prod.images[0]}
                          alt={prod.title.ar}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <span className="font-bold text-cream block">{prod.title.ar}</span>
                        <span className="text-[11px] text-taupe">{prod.title.en}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-gold-light font-medium">
                      {cat?.name.ar || prod.categoryId}
                    </td>

                    <td className="py-3.5 px-4">
                      <StatusBadge status={prod.status || "published"} size="sm" />
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-espresso-400 border border-gold/20 text-[11px] text-taupe font-mono">
                        <Lock className="w-3 h-3 text-gold" />
                        <span>{prod.internalNotesPrice || "غير محدد"}</span>
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingProduct({ ...prod });
                            setIsModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg bg-espresso-400 hover:bg-gold hover:text-espresso transition-colors text-cream border border-gold/30"
                          title="تعديل"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <Link
                          href={`/products/${prod.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-lg bg-espresso-400 hover:bg-gold hover:text-espresso transition-colors text-cream border border-gold/30"
                          title="معاينة في الموقع"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(prod.id)}
                          className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors border border-red-500/20"
                          title="حذف"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / Add Modal */}
      {isModalOpen && editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-3xl bg-espresso border border-gold/40 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh] space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-gold/20">
              <h3 className="text-base font-bold text-cream">
                {editingProduct.title.ar ? `تعديل تصميم: ${editingProduct.title.ar}` : "إضافة منتج وتصميم جديد"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full text-taupe hover:text-cream"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <BilingualInput
                label="اسم وتصميم المنتج"
                value={editingProduct.title}
                onChange={(title) => setEditingProduct({ ...editingProduct, title })}
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-cream/90 block">القسم التابع له</label>
                  <select
                    value={editingProduct.categoryId}
                    onChange={(e) => setEditingProduct({ ...editingProduct, categoryId: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-espresso-400 border border-gold/30 text-xs text-cream outline-none focus:border-gold"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name.ar}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-cream/90 block">المعرّف (Slug)</label>
                  <input
                    type="text"
                    dir="ltr"
                    value={editingProduct.slug}
                    onChange={(e) => setEditingProduct({ ...editingProduct, slug: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-espresso-400 border border-gold/30 text-xs text-cream outline-none focus:border-gold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-cream/90 block">حالة النشر</label>
                  <select
                    value={editingProduct.status}
                    onChange={(e) => setEditingProduct({ ...editingProduct, status: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-espresso-400 border border-gold/30 text-xs text-cream outline-none focus:border-gold"
                  >
                    <option value="published">منشور للعامة (Published)</option>
                    <option value="draft">مسودة داخلية (Draft)</option>
                  </select>
                </div>
              </div>

              <BilingualInput
                label="الوصف القصير للمعاينة"
                value={editingProduct.shortDescription}
                onChange={(shortDescription) => setEditingProduct({ ...editingProduct, shortDescription })}
                required
              />

              <BilingualInput
                label="الوصف الهندسي الكامل وتفاصيل التشطيب"
                value={editingProduct.fullDescription}
                onChange={(fullDescription) => setEditingProduct({ ...editingProduct, fullDescription })}
                multiline
                rows={4}
                required
              />

              {/* Primary Image */}
              <ImagePicker
                label="صورة الغلاف الأساسية"
                value={editingProduct.images[0] || ""}
                onChange={(url) => {
                  const updated = [...editingProduct.images];
                  updated[0] = url;
                  setEditingProduct({ ...editingProduct, images: updated });
                }}
                required
              />

              {/* Internal Notes / Price (Strictly Hidden from Public) */}
              <div className="p-4 rounded-2xl bg-espresso-400/60 border border-amber-500/30 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                  <Lock className="w-3.5 h-3.5" />
                  <span>ملاحظات السعر والتكلفة الداخلية (خاص للإدارة فقط — لا تظهر للعامة أبدًا)</span>
                </div>
                <input
                  type="text"
                  value={editingProduct.internalNotesPrice || ""}
                  onChange={(e) => setEditingProduct({ ...editingProduct, internalNotesPrice: e.target.value })}
                  placeholder="مثال: متوسط 8,500 إلى 11,000 ج.م للمتر حسب الكوارتز المختار..."
                  className="w-full px-3 py-2 rounded-xl bg-espresso border border-gold/30 text-xs text-cream outline-none focus:border-gold"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-gold/20">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-gold/30 text-xs text-taupe hover:text-cream"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-gold text-espresso font-bold text-xs hover:bg-gold-light shadow-md"
                >
                  حفظ المنتج
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

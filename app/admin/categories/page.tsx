"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Edit2, Trash2, FolderTree, Check, X, Sparkles } from "lucide-react";
import { getCategories, saveCategory, deleteCategory } from "@/lib/firebase/firestore-service";
import { Category } from "@/lib/types";
import { BilingualInput } from "@/components/admin/BilingualInput";
import { ImagePicker } from "@/components/admin/ImagePicker";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCat, setEditingCat] = useState<Category | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subNameAr, setSubNameAr] = useState("");
  const [subNameEn, setSubNameEn] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const res = await getCategories();
    setCategories(res);
  };

  const handleCreateNew = () => {
    setEditingCat({
      id: "cat-" + Date.now(),
      slug: "new-category",
      name: { ar: "", en: "" },
      description: { ar: "", en: "" },
      order: categories.length + 1,
      featured: true,
      coverImage: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80",
      subcategories: [],
      createdAt: new Date().toISOString(),
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCat) return;
    await saveCategory(editingCat);
    setIsModalOpen(false);
    setEditingCat(null);
    loadCategories();
  };

  const handleDelete = async (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذا القسم؟ سيتم حذف التصنيف وجميع عناصره.")) {
      await deleteCategory(id);
      loadCategories();
    }
  };

  const handleAddSub = () => {
    if (!editingCat || !subNameAr.trim()) return;
    const newSub = {
      id: "sub-" + Date.now(),
      slug: subNameEn.trim().toLowerCase().replace(/\s+/g, "-") || "sub-" + Date.now(),
      name: { ar: subNameAr.trim(), en: subNameEn.trim() || subNameAr.trim() },
    };
    setEditingCat({
      ...editingCat,
      subcategories: [...(editingCat.subcategories || []), newSub],
    });
    setSubNameAr("");
    setSubNameEn("");
  };

  const handleRemoveSub = (subId: string) => {
    if (!editingCat) return;
    setEditingCat({
      ...editingCat,
      subcategories: editingCat.subcategories.filter((s) => s.id !== subId),
    });
  };

  return (
    <div className="space-y-6 max-w-6xl pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gold/20">
        <div>
          <h2 className="text-xl font-bold text-cream">
            إدارة الأقسام والتصنيفات (Categories Management)
          </h2>
          <p className="text-xs text-taupe">
            أضف أو عدّل التخصصات الرئيسية، صور الغلاف، والتصنيفات الفرعية
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="px-4 py-2 rounded-xl bg-gold text-espresso font-bold text-xs hover:bg-gold-light transition-all flex items-center gap-1.5 shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة قسم جديد</span>
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="rounded-3xl bg-espresso border border-gold/25 overflow-hidden shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={cat.coverImage}
                  alt={cat.name.ar}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 end-3 bg-espresso/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-gold/40 text-[10px] font-bold text-gold-light">
                  ترتيب: #{cat.order}
                </div>
              </div>

              <div className="p-5 space-y-2">
                <h3 className="text-base font-bold text-cream">{cat.name.ar}</h3>
                <h4 className="text-xs text-gold-light font-semibold">{cat.name.en}</h4>
                <p className="text-xs text-taupe line-clamp-2 leading-relaxed">
                  {cat.description.ar}
                </p>

                {cat.subcategories && cat.subcategories.length > 0 && (
                  <div className="pt-3 border-t border-gold/15 space-y-1">
                    <span className="text-[10px] text-taupe font-bold block">
                      التصنيفات الفرعية ({cat.subcategories.length}):
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {cat.subcategories.map((s) => (
                        <span
                          key={s.id}
                          className="text-[10px] px-2 py-0.5 rounded bg-espresso-400 border border-gold/20 text-cream/80"
                        >
                          {s.name.ar}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-gold/15 mt-3 flex items-center gap-2">
              <button
                onClick={() => {
                  setEditingCat({ ...cat });
                  setIsModalOpen(true);
                }}
                className="flex-1 py-2 rounded-xl bg-espresso-400 hover:bg-gold hover:text-espresso transition-colors text-xs font-bold flex items-center justify-center gap-1.5 border border-gold/30"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>تعديل</span>
              </button>
              <button
                onClick={() => handleDelete(cat.id)}
                className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors border border-red-500/20"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Create Modal */}
      {isModalOpen && editingCat && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-espresso border border-gold/40 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh] space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-gold/20">
              <h3 className="text-base font-bold text-cream">
                {editingCat.name.ar ? `تعديل قسم: ${editingCat.name.ar}` : "إضافة قسم وتخصص جديد"}
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
                label="اسم القسم الرئيسي"
                value={editingCat.name}
                onChange={(name) => setEditingCat({ ...editingCat, name })}
                required
              />

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-cream/90 block">المعرّف (Slug)</label>
                  <input
                    type="text"
                    dir="ltr"
                    value={editingCat.slug}
                    onChange={(e) => setEditingCat({ ...editingCat, slug: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-espresso-400 border border-gold/30 text-xs text-cream outline-none focus:border-gold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-cream/90 block">الترتيب في القائمة</label>
                  <input
                    type="number"
                    value={editingCat.order}
                    onChange={(e) => setEditingCat({ ...editingCat, order: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-espresso-400 border border-gold/30 text-xs text-cream outline-none focus:border-gold"
                  />
                </div>
              </div>

              <BilingualInput
                label="وصف تخصص القسم"
                value={editingCat.description}
                onChange={(description) => setEditingCat({ ...editingCat, description })}
                multiline
                rows={3}
                required
              />

              <ImagePicker
                label="صورة الغلاف للقسم"
                value={editingCat.coverImage}
                onChange={(coverImage) => setEditingCat({ ...editingCat, coverImage })}
                required
              />

              {/* Subcategories Management */}
              <div className="pt-2 border-t border-gold/20 space-y-3">
                <label className="text-xs font-bold text-cream block">
                  إدارة التصنيفات الفرعية (Subcategories)
                </label>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="اسم الفرعي بالعربية..."
                    value={subNameAr}
                    onChange={(e) => setSubNameAr(e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-xl bg-espresso-400 border border-gold/30 text-xs text-cream outline-none"
                  />
                  <input
                    type="text"
                    dir="ltr"
                    placeholder="English subcategory..."
                    value={subNameEn}
                    onChange={(e) => setSubNameEn(e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-xl bg-espresso-400 border border-gold/30 text-xs text-cream outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddSub}
                    className="px-4 py-1.5 rounded-xl bg-gold text-espresso text-xs font-bold hover:bg-gold-light"
                  >
                    إضافة
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {editingCat.subcategories?.map((sub) => (
                    <span
                      key={sub.id}
                      className="px-2.5 py-1 rounded-lg bg-espresso-400 border border-gold/30 text-xs flex items-center gap-1.5 text-cream"
                    >
                      <span>{sub.name.ar}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSub(sub.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}
                </div>
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
                  حفظ القسم
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

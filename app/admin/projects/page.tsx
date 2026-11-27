"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Edit2, Trash2, Briefcase, Sparkles, X, MapPin, Clock } from "lucide-react";
import { getProjects, getCategories, saveProject, deleteProject } from "@/lib/firebase/firestore-service";
import { Project, Category } from "@/lib/types";
import { BilingualInput } from "@/components/admin/BilingualInput";
import { ImagePicker } from "@/components/admin/ImagePicker";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [pr, c] = await Promise.all([getProjects(), getCategories()]);
    setProjects(pr);
    setCategories(c);
  };

  const handleCreateNew = () => {
    setEditingProject({
      id: "proj-" + Date.now(),
      slug: "new-project",
      title: { ar: "", en: "" },
      categoryId: categories[0]?.id || "cat-wooden-kitchens",
      description: { ar: "", en: "" },
      images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"],
      clientLocation: { ar: "القاهرة الجديدة", en: "New Cairo" },
      duration: { ar: "30 يوم عمل", en: "30 working days" },
      featured: true,
      status: "published",
      createdAt: new Date().toISOString(),
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    await saveProject(editingProject);
    setIsModalOpen(false);
    setEditingProject(null);
    loadData();
  };

  const handleDelete = async (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذا المشروع من سابقة الأعمال؟")) {
      await deleteProject(id);
      loadData();
    }
  };

  return (
    <div className="space-y-6 max-w-7xl pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gold/20">
        <div>
          <h2 className="text-xl font-bold text-cream">
            إدارة سابقة الأعمال والمشاريع (Projects Showcase)
          </h2>
          <p className="text-xs text-taupe">
            أضف أو عدّل المشاريع المنفذة، صور قبل وبعد التجديد، والموقع والمدة
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="px-4 py-2 rounded-xl bg-gold text-espresso font-bold text-xs hover:bg-gold-light transition-all flex items-center gap-1.5 shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة مشروع جديد</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="rounded-3xl bg-espresso border border-gold/25 overflow-hidden shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={proj.images[0]}
                  alt={proj.title.ar}
                  fill
                  className="object-cover"
                />
                {proj.beforeAfterPair && (
                  <div className="absolute top-3 start-3 bg-espresso/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-gold/40 text-[10px] font-bold text-gold-light flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-gold" />
                    <span>قبل وبعد</span>
                  </div>
                )}
              </div>

              <div className="p-5 space-y-2">
                <h3 className="text-base font-bold text-cream">{proj.title.ar}</h3>
                <p className="text-xs text-taupe line-clamp-2 leading-relaxed">
                  {proj.description.ar}
                </p>

                <div className="pt-3 border-t border-gold/15 flex items-center justify-between text-xs text-taupe">
                  {proj.clientLocation && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-gold" />
                      <span>{proj.clientLocation.ar}</span>
                    </span>
                  )}
                  {proj.duration && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-gold" />
                      <span>{proj.duration.ar}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-gold/15 mt-3 flex items-center gap-2">
              <button
                onClick={() => {
                  setEditingProject({ ...proj });
                  setIsModalOpen(true);
                }}
                className="flex-1 py-2 rounded-xl bg-espresso-400 hover:bg-gold hover:text-espresso transition-colors text-xs font-bold flex items-center justify-center gap-1.5 border border-gold/30"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>تعديل المشروع</span>
              </button>
              <button
                onClick={() => handleDelete(proj.id)}
                className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors border border-red-500/20"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Create Modal */}
      {isModalOpen && editingProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-3xl bg-espresso border border-gold/40 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh] space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-gold/20">
              <h3 className="text-base font-bold text-cream">
                {editingProject.title.ar ? `تعديل مشروع: ${editingProject.title.ar}` : "إضافة مشروع جديد لسجل الأعمال"}
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
                label="عنوان واسم المشروع"
                value={editingProject.title}
                onChange={(title) => setEditingProject({ ...editingProject, title })}
                required
              />

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-cream/90 block">القسم</label>
                  <select
                    value={editingProject.categoryId}
                    onChange={(e) => setEditingProject({ ...editingProject, categoryId: e.target.value })}
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
                    value={editingProject.slug}
                    onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-espresso-400 border border-gold/30 text-xs text-cream outline-none focus:border-gold"
                  />
                </div>
              </div>

              <BilingualInput
                label="الموقع الجغرافي / الكمبوند"
                value={editingProject.clientLocation || { ar: "", en: "" }}
                onChange={(clientLocation) => setEditingProject({ ...editingProject, clientLocation })}
              />

              <BilingualInput
                label="مدة التنفيذ والتسليم"
                value={editingProject.duration || { ar: "", en: "" }}
                onChange={(duration) => setEditingProject({ ...editingProject, duration })}
              />

              <BilingualInput
                label="وصف ونطاق أعمال المشروع"
                value={editingProject.description}
                onChange={(description) => setEditingProject({ ...editingProject, description })}
                multiline
                rows={3}
                required
              />

              <ImagePicker
                label="صورة المشروع الرئيسية"
                value={editingProject.images[0] || ""}
                onChange={(url) => {
                  const updated = [...editingProject.images];
                  updated[0] = url;
                  setEditingProject({ ...editingProject, images: updated });
                }}
                required
              />

              {/* Before/After Pair Manager */}
              <div className="p-4 rounded-2xl bg-espresso-400/50 border border-gold/25 space-y-3">
                <span className="text-xs font-bold text-gold-light block">
                  مقارنة قبل وبعد (Before &amp; After) — اختياري
                </span>
                <ImagePicker
                  label="صورة قبل التجديد (Before Image)"
                  value={editingProject.beforeAfterPair?.beforeImage || ""}
                  onChange={(beforeImage) =>
                    setEditingProject({
                      ...editingProject,
                      beforeAfterPair: {
                        beforeImage,
                        afterImage: editingProject.beforeAfterPair?.afterImage || "",
                        caption: editingProject.beforeAfterPair?.caption || { ar: "قبل وبعد التنفيذ", en: "Before and After" },
                      },
                    })
                  }
                />
                <ImagePicker
                  label="صورة بعد التنفيذ (After Image)"
                  value={editingProject.beforeAfterPair?.afterImage || ""}
                  onChange={(afterImage) =>
                    setEditingProject({
                      ...editingProject,
                      beforeAfterPair: {
                        beforeImage: editingProject.beforeAfterPair?.beforeImage || "",
                        afterImage,
                        caption: editingProject.beforeAfterPair?.caption || { ar: "قبل وبعد التنفيذ", en: "Before and After" },
                      },
                    })
                  }
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
                  حفظ المشروع
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

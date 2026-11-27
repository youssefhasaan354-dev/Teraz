"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, MessageSquareQuote, X, Star } from "lucide-react";
import { getTestimonials } from "@/lib/firebase/firestore-service";
import { Testimonial } from "@/lib/types";
import { BilingualInput } from "@/components/admin/BilingualInput";

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getTestimonials().then(setTestimonials);
  }, []);

  const handleCreateNew = () => {
    setEditingItem({
      id: "test-" + Date.now(),
      name: { ar: "", en: "" },
      roleLocation: { ar: "مالك شقة — القاهرة", en: "Homeowner — Cairo" },
      content: { ar: "", en: "" },
      rating: 5,
      verified: true,
      isDemo: false,
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    const idx = testimonials.findIndex((t) => t.id === editingItem.id);
    if (idx >= 0) {
      const updated = [...testimonials];
      updated[idx] = editingItem;
      setTestimonials(updated);
    } else {
      setTestimonials([editingItem, ...testimonials]);
    }
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleDelete = (id: string) => {
    if (confirm("هل تريد حذف هذا التقييم؟")) {
      setTestimonials(testimonials.filter((t) => t.id !== id));
    }
  };

  return (
    <div className="space-y-6 max-w-6xl pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gold/20">
        <div>
          <h2 className="text-xl font-bold text-cream">
            إدارة آراء وتقييمات العملاء (Testimonials CMS)
          </h2>
          <p className="text-xs text-taupe">
            أضف أو عدّل تجارب وآراء العملاء المنشورة في الصفحة الرئيسية
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="px-4 py-2 rounded-xl bg-gold text-espresso font-bold text-xs hover:bg-gold-light transition-all flex items-center gap-1.5 shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة رأي عميل جديد</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-3xl bg-espresso border border-gold/25 shadow-xl flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex text-gold text-sm">
                {"★".repeat(item.rating)}
              </div>
              <p className="text-xs text-cream/90 leading-relaxed italic">
                &ldquo;{item.content.ar}&rdquo;
              </p>
              <div className="pt-2 border-t border-gold/15">
                <h4 className="text-xs font-bold text-cream">{item.name.ar}</h4>
                <span className="text-[11px] text-taupe block">{item.roleLocation.ar}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-gold/15 flex items-center justify-between text-xs">
              <button
                onClick={() => {
                  setEditingItem({ ...item });
                  setIsModalOpen(true);
                }}
                className="text-gold hover:underline font-semibold"
              >
                تعديل
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-400 hover:text-red-300"
              >
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-espresso border border-gold/40 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-gold/20">
              <h3 className="text-sm font-bold text-cream">بيانات الرأي والتقييم</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-taupe hover:text-cream">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3">
              <BilingualInput
                label="اسم العميل"
                value={editingItem.name}
                onChange={(name) => setEditingItem({ ...editingItem, name })}
                required
              />

              <BilingualInput
                label="الموقع أو الصفة"
                value={editingItem.roleLocation}
                onChange={(roleLocation) => setEditingItem({ ...editingItem, roleLocation })}
                required
              />

              <BilingualInput
                label="نص الرأي والشهادة"
                value={editingItem.content}
                onChange={(content) => setEditingItem({ ...editingItem, content })}
                multiline
                rows={3}
                required
              />

              <div className="space-y-1">
                <label className="text-xs font-bold text-cream/90 block">التقييم (النجوم)</label>
                <select
                  value={editingItem.rating}
                  onChange={(e) => setEditingItem({ ...editingItem, rating: Number(e.target.value) })}
                  className="w-full px-3 py-1.5 rounded-xl bg-espresso-400 border border-gold/30 text-xs text-cream outline-none"
                >
                  <option value={5}>5 نجوم (ممتاز)</option>
                  <option value={4}>4 نجوم (جيد جدًا)</option>
                </select>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-gold/20">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-1.5 rounded-xl border border-gold/30 text-xs text-taupe hover:text-cream"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-1.5 rounded-xl bg-gold text-espresso font-bold text-xs hover:bg-gold-light"
                >
                  حفظ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

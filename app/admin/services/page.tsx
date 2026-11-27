"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Wrench, X, Check } from "lucide-react";
import { getServices } from "@/lib/firebase/firestore-service";
import { ServiceItem } from "@/lib/types";
import { BilingualInput } from "@/components/admin/BilingualInput";

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getServices().then(setServices);
  }, []);

  const handleCreateNew = () => {
    setEditingService({
      id: "srv-" + Date.now(),
      title: { ar: "", en: "" },
      description: { ar: "", en: "" },
      iconName: "ChefHat",
      order: services.length + 1,
      features: [
        { ar: "تنفيذ بأعلى معايير الإتقان", en: "Executed with master precision" },
        { ar: "شاسيهات معالجة ضد الرطوبة والمياه", en: "Moisture & humidity resistant" },
      ],
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;
    const idx = services.findIndex((s) => s.id === editingService.id);
    if (idx >= 0) {
      const updated = [...services];
      updated[idx] = editingService;
      setServices(updated);
    } else {
      setServices([...services, editingService]);
    }
    setIsModalOpen(false);
    setEditingService(null);
  };

  const handleDelete = (id: string) => {
    if (confirm("هل تريد حذف هذه الخدمة؟")) {
      setServices(services.filter((s) => s.id !== id));
    }
  };

  return (
    <div className="space-y-6 max-w-6xl pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gold/20">
        <div>
          <h2 className="text-xl font-bold text-cream">
            إدارة الخدمات المعمارية (Services Management)
          </h2>
          <p className="text-xs text-taupe">
            تحكم في بطاقات الخدمات، الأيقونات، والمزايا التنافسية لكل تخصص
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="px-4 py-2 rounded-xl bg-gold text-espresso font-bold text-xs hover:bg-gold-light transition-all flex items-center gap-1.5 shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة خدمة جديدة</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((srv) => (
          <div
            key={srv.id}
            className="p-6 rounded-3xl bg-espresso border border-gold/25 shadow-xl flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gold uppercase tracking-wider">
                  خدمة #{srv.order}
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-espresso-400 text-taupe font-mono">
                  Icon: {srv.iconName}
                </span>
              </div>

              <h3 className="text-lg font-bold text-cream">{srv.title.ar}</h3>
              <p className="text-xs text-taupe leading-relaxed">{srv.description.ar}</p>

              <div className="pt-2 space-y-1.5 border-t border-gold/15">
                {srv.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-cream/90">
                    <Check className="w-3.5 h-3.5 text-gold shrink-0" />
                    <span>{feat.ar}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-gold/15 flex items-center justify-between text-xs">
              <button
                onClick={() => {
                  setEditingService({ ...srv });
                  setIsModalOpen(true);
                }}
                className="text-gold hover:underline font-semibold"
              >
                تعديل الخدمة
              </button>
              <button
                onClick={() => handleDelete(srv.id)}
                className="text-red-400 hover:text-red-300"
              >
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && editingService && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-xl bg-espresso border border-gold/40 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-gold/20">
              <h3 className="text-sm font-bold text-cream">بيانات الخدمة</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-taupe hover:text-cream">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3">
              <BilingualInput
                label="عنوان الخدمة"
                value={editingService.title}
                onChange={(title) => setEditingService({ ...editingService, title })}
                required
              />

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-cream/90 block">رمز الأيقونة (Lucide)</label>
                  <select
                    value={editingService.iconName}
                    onChange={(e) => setEditingService({ ...editingService, iconName: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-xl bg-espresso-400 border border-gold/30 text-xs text-cream outline-none"
                  >
                    <option value="ChefHat">ChefHat (مطابخ)</option>
                    <option value="Layers">Layers (كلادينج)</option>
                    <option value="Sofa">Sofa (موبيليا)</option>
                    <option value="Briefcase">Briefcase (مكاتب)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-cream/90 block">الترتيب</label>
                  <input
                    type="number"
                    value={editingService.order}
                    onChange={(e) => setEditingService({ ...editingService, order: Number(e.target.value) })}
                    className="w-full px-3 py-1.5 rounded-xl bg-espresso-400 border border-gold/30 text-xs text-cream outline-none"
                  />
                </div>
              </div>

              <BilingualInput
                label="شرح نطاق الخدمة"
                value={editingService.description}
                onChange={(description) => setEditingService({ ...editingService, description })}
                multiline
                rows={3}
                required
              />

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

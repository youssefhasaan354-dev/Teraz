"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Edit2, Trash2, Check, X, Sliders } from "lucide-react";
import { getConfiguratorOptions, saveConfiguratorOption, deleteConfiguratorOption } from "@/lib/firebase/firestore-service";
import { ConfiguratorOption } from "@/lib/types";
import { BilingualInput } from "@/components/admin/BilingualInput";
import { ImagePicker } from "@/components/admin/ImagePicker";

export default function AdminConfiguratorPage() {
  const [options, setOptions] = useState<ConfiguratorOption[]>([]);
  const [activeTab, setActiveTab] = useState<ConfiguratorOption["type"]>("layouts");
  const [editingOpt, setEditingOpt] = useState<ConfiguratorOption | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadOptions();
  }, []);

  const loadOptions = async () => {
    const res = await getConfiguratorOptions();
    setOptions(res);
  };

  const filtered = options.filter((o) => o.type === activeTab);

  const handleCreateNew = () => {
    setEditingOpt({
      id: "cfg-" + Date.now(),
      type: activeTab,
      name: { ar: "", en: "" },
      thumbnail: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=400&q=80",
      hexColor: "#B38B54",
      order: filtered.length + 1,
      isDefault: false,
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingOpt) return;
    await saveConfiguratorOption(editingOpt);
    setIsModalOpen(false);
    setEditingOpt(null);
    loadOptions();
  };

  const handleDelete = async (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذا الخيار من المحاكي؟")) {
      await deleteConfiguratorOption(id);
      loadOptions();
    }
  };

  return (
    <div className="space-y-6 max-w-6xl pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gold/20">
        <div>
          <h2 className="text-xl font-bold text-cream">
            إدارة خيارات محاكي المطابخ (Kitchen Configurator Options)
          </h2>
          <p className="text-xs text-taupe">
            تحكم في أشكال التوزيع، أنواع الدرف، أسطح الكوارتز، والمقابض المتاحة للعميل في المحاكي
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="px-4 py-2 rounded-xl bg-gold text-espresso font-bold text-xs hover:bg-gold-light transition-all flex items-center gap-1.5 shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة خيار جديد</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {[
          { id: "layouts", label: "أشكال التوزيع (Layouts)" },
          { id: "doorFinishes", label: "تشطيبات الدرف (Door Finishes)" },
          { id: "countertops", label: "أسطح الكوارتز والرخام (Countertops)" },
          { id: "handles", label: "المقابض والإكسسوار (Handles)" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-gold text-espresso shadow-md"
                : "bg-espresso border border-gold/25 text-taupe hover:text-cream"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((opt) => (
          <div
            key={opt.id}
            className="p-4 rounded-2xl bg-espresso border border-gold/25 shadow-lg space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="relative aspect-video rounded-xl overflow-hidden border border-gold/20">
                <Image src={opt.thumbnail} alt={opt.name.ar} fill className="object-cover" />
                {opt.hexColor && (
                  <span
                    className="absolute top-2 start-2 w-5 h-5 rounded-full border-2 border-white shadow-md"
                    style={{ backgroundColor: opt.hexColor }}
                  />
                )}
                {opt.isDefault && (
                  <span className="absolute bottom-2 start-2 bg-espresso/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-gold font-bold">
                    افتراضي
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-xs font-bold text-cream">{opt.name.ar}</h3>
                <span className="text-[11px] text-taupe">{opt.name.en}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-gold/15 flex items-center justify-between text-xs">
              <button
                onClick={() => {
                  setEditingOpt({ ...opt });
                  setIsModalOpen(true);
                }}
                className="text-gold hover:underline font-semibold"
              >
                تعديل
              </button>
              <button
                onClick={() => handleDelete(opt.id)}
                className="text-red-400 hover:text-red-300"
              >
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Create Modal */}
      {isModalOpen && editingOpt && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-espresso border border-gold/40 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-gold/20">
              <h3 className="text-sm font-bold text-cream">
                {editingOpt.name.ar ? `تعديل: ${editingOpt.name.ar}` : "إضافة خيار محاكي جديد"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-taupe hover:text-cream">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3">
              <BilingualInput
                label="اسم الخيار (Option Name)"
                value={editingOpt.name}
                onChange={(name) => setEditingOpt({ ...editingOpt, name })}
                required
              />

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-cream/90 block">الترتيب</label>
                  <input
                    type="number"
                    value={editingOpt.order}
                    onChange={(e) => setEditingOpt({ ...editingOpt, order: Number(e.target.value) })}
                    className="w-full px-3 py-1.5 rounded-xl bg-espresso-400 border border-gold/30 text-xs text-cream outline-none focus:border-gold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-cream/90 block">رمز اللون (Hex Color)</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={editingOpt.hexColor || "#B38B54"}
                      onChange={(e) => setEditingOpt({ ...editingOpt, hexColor: e.target.value })}
                      className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                    />
                    <input
                      type="text"
                      dir="ltr"
                      value={editingOpt.hexColor || ""}
                      onChange={(e) => setEditingOpt({ ...editingOpt, hexColor: e.target.value })}
                      className="flex-1 px-3 py-1.5 rounded-xl bg-espresso-400 border border-gold/30 text-xs text-cream outline-none"
                    />
                  </div>
                </div>
              </div>

              <ImagePicker
                label="صورة المعاينة المصغرة"
                value={editingOpt.thumbnail}
                onChange={(thumbnail) => setEditingOpt({ ...editingOpt, thumbnail })}
                required
              />

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isDef"
                  checked={editingOpt.isDefault}
                  onChange={(e) => setEditingOpt({ ...editingOpt, isDefault: e.target.checked })}
                  className="w-4 h-4 accent-gold"
                />
                <label htmlFor="isDef" className="text-xs text-cream/90 cursor-pointer">
                  تحديد كخيار افتراضي عند بدء المحاكي
                </label>
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

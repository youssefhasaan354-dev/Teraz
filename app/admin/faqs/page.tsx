"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, HelpCircle, X } from "lucide-react";
import { getFAQs } from "@/lib/firebase/firestore-service";
import { FAQItem } from "@/lib/types";
import { BilingualInput } from "@/components/admin/BilingualInput";

export default function AdminFAQsPage() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [editingFaq, setEditingFaq] = useState<FAQItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getFAQs().then(setFaqs);
  }, []);

  const handleCreateNew = () => {
    setEditingFaq({
      id: "faq-" + Date.now(),
      category: "general",
      order: faqs.length + 1,
      question: { ar: "", en: "" },
      answer: { ar: "", en: "" },
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaq) return;
    const idx = faqs.findIndex((f) => f.id === editingFaq.id);
    if (idx >= 0) {
      const updated = [...faqs];
      updated[idx] = editingFaq;
      setFaqs(updated);
    } else {
      setFaqs([...faqs, editingFaq]);
    }
    setIsModalOpen(false);
    setEditingFaq(null);
  };

  const handleDelete = (id: string) => {
    if (confirm("هل تريد حذف هذا السؤال الشائع؟")) {
      setFaqs(faqs.filter((f) => f.id !== id));
    }
  };

  return (
    <div className="space-y-6 max-w-5xl pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gold/20">
        <div>
          <h2 className="text-xl font-bold text-cream">
            إدارة الأسئلة الشائعة (FAQs Management)
          </h2>
          <p className="text-xs text-taupe">
            تحكم في الأسئلة والإجابات التوضيحية المنشورة للعملاء
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="px-4 py-2 rounded-xl bg-gold text-espresso font-bold text-xs hover:bg-gold-light transition-all flex items-center gap-1.5 shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة سؤال جديد</span>
        </button>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => (
          <div
            key={faq.id}
            className="p-5 rounded-2xl bg-espresso border border-gold/25 shadow-lg space-y-3"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] text-gold font-bold">سؤال #{idx + 1}</span>
                <h3 className="text-sm font-bold text-cream">{faq.question.ar}</h3>
                <h4 className="text-xs text-gold-light">{faq.question.en}</h4>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setEditingFaq({ ...faq });
                    setIsModalOpen(true);
                  }}
                  className="p-1.5 rounded-lg bg-espresso-400 text-gold hover:bg-gold hover:text-espresso transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(faq.id)}
                  className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <p className="text-xs text-taupe leading-relaxed pt-2 border-t border-gold/15">
              {faq.answer.ar}
            </p>
          </div>
        ))}
      </div>

      {isModalOpen && editingFaq && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-xl bg-espresso border border-gold/40 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-gold/20">
              <h3 className="text-sm font-bold text-cream">بيانات السؤال الشائع</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-taupe hover:text-cream">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3">
              <BilingualInput
                label="نص السؤال (Question)"
                value={editingFaq.question}
                onChange={(question) => setEditingFaq({ ...editingFaq, question })}
                required
              />

              <BilingualInput
                label="نص الإجابة المفصلة (Answer)"
                value={editingFaq.answer}
                onChange={(answer) => setEditingFaq({ ...editingFaq, answer })}
                multiline
                rows={4}
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

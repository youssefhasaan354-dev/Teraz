"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Eye, EyeOff, MoveUp, MoveDown, Edit2, Save, Sparkles, CheckCircle2 } from "lucide-react";
import { BilingualInput } from "@/components/admin/BilingualInput";
import { ImagePicker } from "@/components/admin/ImagePicker";

interface SectionItem {
  id: string;
  name: string;
  type: string;
  visible: boolean;
  heading: { ar: string; en: string };
  subheading: { ar: string; en: string };
  body: { ar: string; en: string };
  ctaText: { ar: string; en: string };
  ctaLink: string;
  mediaUrl: string;
}

export default function AdminSectionsPage() {
  const [sections, setSections] = useState<SectionItem[]>([
    {
      id: "sec-hero",
      name: "الهيرو الرئيسي (Hero Section)",
      type: "hero",
      visible: true,
      heading: { ar: "حيث يلتقي الإبداع بفخامة التفاصيل", en: "Where Artistry Meets Architectural Precision" },
      subheading: { ar: "حرفية استثنائية • لمسات فندقية", en: "Bespoke Craftsmanship • Quiet Luxury" },
      body: {
        ar: "نبتكر لك مطابخ عصرية، كلادينج فاخر، وقطع موبيليا تُصنع خصيصًا لتعكس ذوقك الرفيع بجودة تدوم لأجيال.",
        en: "Tailor-made kitchens, luxury cladding, and statement furniture crafted to elevate your living and workspaces across Egypt.",
      },
      ctaText: { ar: "اطلب استشارة وتصميم مجاني", en: "Request Free Consultation" },
      ctaLink: "/quote",
      mediaUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85",
    },
    {
      id: "sec-story",
      name: "استعراض الأقسام المثبت (Pinned Storytelling)",
      type: "storytelling",
      visible: true,
      heading: { ar: "تخصصات طِراز الاستثنائية", en: "TERAZ Signature Craft" },
      subheading: { ar: "حلول متكاملة لكل زاوية في منزلك ومكتبك", en: "Tailored Living Solutions For Modern Homes & Offices" },
      body: {
        ar: "استعراض تفاعلي ينتقل بين المطابخ الخشبية، الألوميتال، الكلادينج، والموبيليا مع التمرير.",
        en: "Scroll-driven interactive transition across all five primary disciplines.",
      },
      ctaText: { ar: "استكشف التشكيلة", en: "Explore Collection" },
      ctaLink: "/categories",
      mediaUrl: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "sec-before-after",
      name: "شريط قبل وبعد (Before & After Slider)",
      type: "before_after",
      visible: true,
      heading: { ar: "شاهد الفارق الملموس قبل وبعد التنفيذ", en: "Compare Before & After Installation" },
      subheading: { ar: "المقارنة الحية", en: "Visual Transformation" },
      body: {
        ar: "اسحب المؤشر لترى كيف حوّل مهندسو طراز مساحة قديمة إلى تحفة عصرية متكاملة.",
        en: "Drag the slider to compare real executed renovations in New Cairo and Sheikh Zayed.",
      },
      ctaText: { ar: "اطلب مقايسة مماثلة", en: "Request Similar Survey" },
      ctaLink: "/quote",
      mediaUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "sec-configurator",
      name: "محاكي المطابخ التفاعلي (Kitchen Configurator)",
      type: "configurator",
      visible: true,
      heading: { ar: "صمّم مطبخك وشاهد نتيجتك التقديرية فورًا", en: "Customize Your Bespoke Kitchen Live" },
      subheading: { ar: "المحاكي التفاعلي الذكي", en: "Interactive Studio" },
      body: {
        ar: "اختر شكل التوزيع، نوع الدرف، الكوارتز، والمقابض واطلب تسعيرًا مباشرًا بنقرة واحدة.",
        en: "Configure layout, finishes, surfaces, and hardware live with one-click quote submission.",
      },
      ctaText: { ar: "اطلب عرض سعر بهذا التصميم", en: "Request Quote with Config" },
      ctaLink: "/quote",
      mediaUrl: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "sec-faq",
      name: "الأسئلة الشائعة (FAQ Accordion)",
      type: "faq",
      visible: true,
      heading: { ar: "إجابات واضحة لكل ما يدور بذهنك", en: "Frequently Asked Questions" },
      subheading: { ar: "الأسئلة الشائعة", en: "Knowledge Base" },
      body: {
        ar: "إجابات مفصلة عن نظام العمل الأونلاين والتوريد والضمانات للمحافظات.",
        en: "Detailed answers concerning nationwide surveys, warranties, and direct pricing.",
      },
      ctaText: { ar: "تواصل معنا", en: "Contact Us" },
      ctaLink: "/contact",
      mediaUrl: "",
    },
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const toggleVisibility = (id: string) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, visible: !s.visible } : s))
    );
  };

  const moveSection = (idx: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= sections.length) return;
    const updated = [...sections];
    const temp = updated[idx];
    updated[idx] = updated[targetIdx];
    updated[targetIdx] = temp;
    setSections(updated);
  };

  const handleSave = () => {
    localStorage.setItem("teraz_page_sections", JSON.stringify(sections));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-5xl pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gold/20">
        <div>
          <h2 className="text-xl font-bold text-cream">
            منشئ الأقسام والصفحات (Page &amp; Section Builder)
          </h2>
          <p className="text-xs text-taupe">
            تحكم في ترتيب أقسام الصفحة الرئيسية، إخفائها أو إظهارها، وتعديل النصوص والصور في ثوانٍ
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-6 py-2.5 rounded-full bg-gold text-espresso font-bold text-xs hover:bg-gold-light transition-all flex items-center gap-2 shadow-lg"
        >
          <Save className="w-4 h-4" />
          <span>حفظ ونشر التغييرات</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" />
          <span>تم حفظ ترتيب الأقسام ونشرها بنجاح! Live changes applied.</span>
        </div>
      )}

      {/* Sections List */}
      <div className="space-y-4">
        {sections.map((sec, idx) => {
          const isEditing = editingId === sec.id;
          return (
            <div
              key={sec.id}
              className={`p-5 rounded-3xl bg-espresso border transition-all ${
                sec.visible ? "border-gold/30 shadow-lg" : "border-zinc-800 opacity-60"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-gold font-bold">#{idx + 1}</span>
                  <div>
                    <h3 className="text-sm font-bold text-cream">{sec.name}</h3>
                    <span className="text-[11px] text-taupe font-mono">{sec.type}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => moveSection(idx, "up")}
                    disabled={idx === 0}
                    className="p-1.5 rounded-lg bg-espresso-400 text-cream/70 hover:text-cream disabled:opacity-30"
                    title="تحريك لأعلى"
                  >
                    <MoveUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => moveSection(idx, "down")}
                    disabled={idx === sections.length - 1}
                    className="p-1.5 rounded-lg bg-espresso-400 text-cream/70 hover:text-cream disabled:opacity-30"
                    title="تحريك لأسفل"
                  >
                    <MoveDown className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => toggleVisibility(sec.id)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      sec.visible
                        ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                        : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                    }`}
                    title={sec.visible ? "إخفاء القسم" : "إظهار القسم"}
                  >
                    {sec.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => setEditingId(isEditing ? null : sec.id)}
                    className="px-3 py-1.5 rounded-xl bg-gold text-espresso text-xs font-bold hover:bg-gold-light"
                  >
                    {isEditing ? "إغلاق التعديل" : "تعديل المحتوى والصورة"}
                  </button>
                </div>
              </div>

              {/* Editable Fields when expanded */}
              {isEditing && (
                <div className="mt-5 pt-4 border-t border-gold/20 space-y-4 animate-fadeIn">
                  <BilingualInput
                    label="عنوان القسم الرئيسي (Heading)"
                    value={sec.heading}
                    onChange={(heading) =>
                      setSections((prev) =>
                        prev.map((s) => (s.id === sec.id ? { ...s, heading } : s))
                      )
                    }
                  />

                  <BilingualInput
                    label="العنوان الفرعي (Subheading)"
                    value={sec.subheading}
                    onChange={(subheading) =>
                      setSections((prev) =>
                        prev.map((s) => (s.id === sec.id ? { ...s, subheading } : s))
                      )
                    }
                  />

                  <BilingualInput
                    label="نص الشرح والفقرة (Paragraph / Body)"
                    value={sec.body}
                    onChange={(body) =>
                      setSections((prev) =>
                        prev.map((s) => (s.id === sec.id ? { ...s, body } : s))
                      )
                    }
                    multiline
                    rows={2}
                  />

                  {sec.mediaUrl && (
                    <ImagePicker
                      label="استبدال صورة القسم (Replace Section Media)"
                      value={sec.mediaUrl}
                      onChange={(mediaUrl) =>
                        setSections((prev) =>
                          prev.map((s) => (s.id === sec.id ? { ...s, mediaUrl } : s))
                        )
                      }
                    />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

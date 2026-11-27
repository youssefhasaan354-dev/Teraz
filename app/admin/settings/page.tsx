"use client";

import React, { useState, useEffect } from "react";
import { Save, CheckCircle2, Sliders, Phone, Palette, Globe, Shield, Sparkles } from "lucide-react";
import { getSiteSettings, updateSiteSettings } from "@/lib/firebase/firestore-service";
import { SiteSettings } from "@/lib/types";
import { BilingualInput } from "@/components/admin/BilingualInput";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    getSiteSettings().then(setSettings);
  }, []);

  if (!settings) {
    return (
      <div className="py-20 text-center text-taupe text-xs">
        جاري تحميل إعدادات الموقع...
      </div>
    );
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateSiteSettings(settings);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-5xl pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gold/20">
        <div>
          <h2 className="text-xl font-bold text-cream">
            إعدادات الموقع وهوية العلامة التجارية
          </h2>
          <p className="text-xs text-taupe">
            تحكم في اسم العلامة، بيانات التواصل، الألوان، وأزرار الواتساب
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 rounded-full bg-gold text-espresso font-bold text-xs hover:bg-gold-light transition-all flex items-center gap-2 shadow-lg"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? "جاري الحفظ..." : "حفظ كافة التغييرات"}</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>تم حفظ الإعدادات وتحديث الموقع بنجاح! Settings saved live.</span>
        </div>
      )}

      {/* 1. Brand Identity */}
      <div className="p-6 rounded-3xl bg-espresso border border-gold/25 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-gold-light">
          <Sparkles className="w-4 h-4" />
          <span>هوية البراند والشعار (Brand Identity)</span>
        </div>

        <BilingualInput
          label="اسم البراند • Brand Name"
          value={settings.brandName}
          onChange={(brandName) => setSettings({ ...settings, brandName })}
          required
        />

        <BilingualInput
          label="شعار البراند (Tagline)"
          value={settings.tagline}
          onChange={(tagline) => setSettings({ ...settings, tagline })}
          required
        />
      </div>

      {/* 2. Contact & Hours */}
      <div className="p-6 rounded-3xl bg-espresso border border-gold/25 shadow-xl space-y-6">
        <div className="flex items-center gap-2 text-sm font-bold text-gold-light">
          <Phone className="w-4 h-4" />
          <span>بيانات التواصل وساعات العمل (Contact & Operating Hours)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-cream/90 block">
              رقم الهاتف المباشر • Phone Number
            </label>
            <input
              type="text"
              value={settings.contact.phone}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  contact: { ...settings.contact, phone: e.target.value },
                })
              }
              className="w-full px-3.5 py-2 rounded-xl bg-espresso-400 border border-gold/30 text-xs text-cream outline-none focus:border-gold"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-cream/90 block">
              رقم الواتساب بالصيغة الدولية • WhatsApp
            </label>
            <input
              type="text"
              value={settings.contact.whatsapp}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  contact: { ...settings.contact, whatsapp: e.target.value },
                })
              }
              className="w-full px-3.5 py-2 rounded-xl bg-espresso-400 border border-gold/30 text-xs text-cream outline-none focus:border-gold"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-cream/90 block">
              البريد الإلكتروني الرسمي • Email
            </label>
            <input
              type="email"
              value={settings.contact.email}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  contact: { ...settings.contact, email: e.target.value },
                })
              }
              className="w-full px-3.5 py-2 rounded-xl bg-espresso-400 border border-gold/30 text-xs text-cream outline-none focus:border-gold"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-cream/90 block">
              رابط صفحة فيسبوك • Facebook Page
            </label>
            <input
              type="text"
              value={settings.contact.facebook}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  contact: { ...settings.contact, facebook: e.target.value },
                })
              }
              className="w-full px-3.5 py-2 rounded-xl bg-espresso-400 border border-gold/30 text-xs text-cream outline-none focus:border-gold"
            />
          </div>
        </div>

        {/* 24/7 Hours Toggle */}
        <div className="p-4 rounded-2xl bg-espresso-400/50 border border-gold/20 flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-cream block">
              نظام العمل: متاحون دائمًا (24/7)
            </span>
            <span className="text-[11px] text-taupe block">
              يعرض عبارة &ldquo;متاحون دائمًا 24/7&rdquo; وتلقي الاستفسارات بدون تقييد بمواعيد إغلاق.
            </span>
          </div>
          <input
            type="checkbox"
            checked={settings.contact.isAlwaysOpen}
            onChange={(e) =>
              setSettings({
                ...settings,
                contact: { ...settings.contact, isAlwaysOpen: e.target.checked },
              })
            }
            className="w-5 h-5 accent-gold cursor-pointer"
          />
        </div>

        {/* Address and Map Toggle (OFF by default for online-only) */}
        <div className="p-4 rounded-2xl bg-espresso-400/50 border border-gold/20 flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-cream block">
              عرض العنوان الفعلي وخريطة جوجل (Show Address &amp; Map)
            </span>
            <span className="text-[11px] text-taupe block">
              معطل افتراضيًا لأن النشاط يعمل بنظام الأونلاين والتوريد المباشر بدون معرض. تفعيله يظهر العنوان والخريطة في صفحة التواصل.
            </span>
          </div>
          <input
            type="checkbox"
            checked={settings.contact.showAddressMap}
            onChange={(e) =>
              setSettings({
                ...settings,
                contact: { ...settings.contact, showAddressMap: e.target.checked },
              })
            }
            className="w-5 h-5 accent-gold cursor-pointer"
          />
        </div>
      </div>

      {/* 3. Theme Colors Tokens */}
      <div className="p-6 rounded-3xl bg-espresso border border-gold/25 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-gold-light">
          <Palette className="w-4 h-4" />
          <span>ألوان البراند (Design Palette Tokens)</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="space-y-1">
            <label className="text-xs text-taupe block font-semibold">Espresso Dark</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={settings.themeTokens.espresso}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    themeTokens: { ...settings.themeTokens, espresso: e.target.value },
                  })
                }
                className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
              />
              <span className="text-xs text-cream font-mono">{settings.themeTokens.espresso}</span>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-taupe block font-semibold">Brushed Gold</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={settings.themeTokens.gold}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    themeTokens: { ...settings.themeTokens, gold: e.target.value },
                  })
                }
                className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
              />
              <span className="text-xs text-cream font-mono">{settings.themeTokens.gold}</span>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-taupe block font-semibold">Warm Cream</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={settings.themeTokens.cream}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    themeTokens: { ...settings.themeTokens, cream: e.target.value },
                  })
                }
                className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
              />
              <span className="text-xs text-cream font-mono">{settings.themeTokens.cream}</span>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-taupe block font-semibold">Warm Taupe</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={settings.themeTokens.taupe}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    themeTokens: { ...settings.themeTokens, taupe: e.target.value },
                  })
                }
                className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
              />
              <span className="text-xs text-cream font-mono">{settings.themeTokens.taupe}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. WhatsApp Default Messages */}
      <div className="p-6 rounded-3xl bg-espresso border border-gold/25 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-gold-light">
          <Globe className="w-4 h-4" />
          <span>رسائل الواتساب الافتراضية (Default WhatsApp Messages)</span>
        </div>

        <BilingualInput
          label="الرسالة التلقائية عند الضغط على زر واتساب العام"
          value={settings.whatsappMessages.defaultMsg}
          onChange={(defaultMsg) =>
            setSettings({
              ...settings,
              whatsappMessages: { ...settings.whatsappMessages, defaultMsg },
            })
          }
          multiline
          rows={2}
        />
      </div>
    </form>
  );
}

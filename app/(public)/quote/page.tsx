"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Sparkles,
  Check,
  CheckCircle2,
  ChefHat,
  Layers,
  Sofa,
  Briefcase,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { createLead } from "@/lib/firebase/firestore-service";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { Magnetic } from "@/components/motion/Magnetic";
import { LineDraw } from "@/components/motion/LineDraw";

function QuoteWizardContent() {
  const searchParams = useSearchParams();
  const { language } = useLanguage();

  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [formData, setFormData] = useState({
    serviceType: searchParams?.get("service") || "wooden_kitchens",
    productSlug: searchParams?.get("product") || "",
    spaceType: "villa",
    spaceDetails: "",
    materialPreference: searchParams?.get("door") || "natural_wood",
    countertopPreference: searchParams?.get("countertop") || "calacatta_quartz",
    budgetRange: "medium",
    fullName: "",
    phone: "",
    email: "",
    preferredTime: "evening",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [hasErrorShake, setHasErrorShake] = useState(false);

  const services = [
    { id: "wooden_kitchens", title: { ar: "مطابخ خشب", en: "Wooden Kitchens" }, icon: ChefHat },
    { id: "aluminum_kitchens", title: { ar: "مطابخ ألوميتال", en: "Aluminum Kitchens" }, icon: ChefHat },
    { id: "cladding", title: { ar: "كلادينج وتجاليد", en: "Wall Cladding" }, icon: Layers },
    { id: "furniture", title: { ar: "موبيليا وأثاث", en: "Home Furniture" }, icon: Sofa },
    { id: "office", title: { ar: "أثاث مكتبي وكراسي", en: "Office Furniture" }, icon: Briefcase },
  ];

  const handleNext = () => {
    if (step === 1 && !formData.serviceType) {
      setError(language === "ar" ? "يرجى اختيار نوع الخدمة." : "Please choose a service.");
      setHasErrorShake(true);
      setTimeout(() => setHasErrorShake(false), 500);
      return;
    }
    setError("");
    setDirection(1);
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const handlePrev = () => {
    setError("");
    setDirection(-1);
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      setError(language === "ar" ? "يرجى إدخال الاسم ورقم الهاتف للتواصل." : "Please enter your name and phone number.");
      setHasErrorShake(true);
      setTimeout(() => setHasErrorShake(false), 500);
      return;
    }

    setLoading(true);
    setError("");

    try {
      await createLead({
        type: "quote",
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        serviceType: formData.serviceType,
        spaceDetails: `${formData.spaceType}: ${formData.spaceDetails}`,
        selectedMaterial: `${formData.materialPreference} / ${formData.countertopPreference}`,
        budgetRange: formData.budgetRange,
        preferredContactTime: formData.preferredTime,
        message: formData.notes,
      });

      setSuccess(true);
    } catch (err) {
      setError(language === "ar" ? "حدث خطأ أثناء إرسال المقايسة، يرجى المحاولة ثانية." : "Error submitting. Please try again.");
      setHasErrorShake(true);
      setTimeout(() => setHasErrorShake(false), 500);
    } finally {
      setLoading(false);
    }
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? (language === "ar" ? -40 : 40) : (language === "ar" ? 40 : -40),
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.35, ease: [0.25, 1, 0.5, 1] },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? (language === "ar" ? 40 : -40) : (language === "ar" ? -40 : 40),
      opacity: 0,
      transition: { duration: 0.25, ease: "easeIn" },
    }),
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <Reveal variant="down" priority={true}>
          <span className="text-xs font-bold text-gold uppercase tracking-widest block">
            {language === "ar" ? "خطوتك الأولى نحو الفخامة" : "Bespoke Estimation Wizard"}
          </span>
        </Reveal>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-espresso">
          <SplitText
            priority={true}
            text={language === "ar" ? "طلب عرض سعر ومقايسة دقيقة" : "Request a Detailed Quote & Survey"}
          />
        </h1>
        <Reveal variant="up" delay={0.15}>
          <p className="text-xs sm:text-sm text-taupe max-w-xl mx-auto">
            {language === "ar"
              ? "املأ الخطوات البسيطة التالية وسيتواصل معك مهندس متخصص لدراسة المساحة وتقديم عرض سعر مجاني."
              : "Complete these straightforward steps to receive a tailored engineering proposal and measurement."}
          </p>
        </Reveal>
      </div>

      {/* Progress Steps Header */}
      <Reveal variant="up">
        <div className="p-4 sm:p-6 rounded-3xl bg-cream-dark/50 border border-gold/30 shadow-md">
          <div className="flex items-center justify-between relative">
            {/* Background line */}
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-0.5 bg-gold/20 -z-0" />
            {/* Active gold fill line */}
            <motion.div
              className="absolute top-1/2 left-0 -translate-y-1/2 h-0.5 bg-gold -z-0"
              initial={{ width: "0%" }}
              animate={{ width: `${((step - 1) / 3) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
            {[
              { num: 1, label: language === "ar" ? "الخدمة" : "Service" },
              { num: 2, label: language === "ar" ? "المساحة" : "Space" },
              { num: 3, label: language === "ar" ? "الخامات" : "Materials" },
              { num: 4, label: language === "ar" ? "التواصل" : "Contact" },
            ].map((s) => (
              <div key={s.num} className="flex flex-col items-center gap-1.5 z-10">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    step === s.num
                      ? "bg-espresso text-cream border-2 border-gold scale-110 shadow-lg"
                      : step > s.num
                      ? "bg-gold text-espresso"
                      : "bg-cream text-taupe border border-gold/30"
                  }`}
                >
                  {step > s.num ? <Check className="w-4 h-4 stroke-[3]" /> : s.num}
                </div>
                <span className="text-[11px] font-semibold text-espresso">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Wizard Card */}
      <motion.div
        animate={hasErrorShake ? { x: [-8, 8, -6, 6, -3, 3, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="p-6 sm:p-10 rounded-3xl bg-cream-dark/40 border border-gold/30 shadow-xl overflow-hidden"
      >
        {success ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-12 text-center space-y-4"
          >
            <CheckCircle2 className="w-16 h-16 text-gold mx-auto" />
            <h2 className="text-2xl font-bold text-espresso">
              {language === "ar" ? "تم استلام طلب المقايسة بنجاح! 🌿" : "Quote Request Received Successfully! 🌿"}
            </h2>
            <p className="text-xs sm:text-sm text-taupe max-w-lg mx-auto leading-relaxed">
              {language === "ar"
                ? "شكرًا لثقتك في طِراز (TERAZ). سيتواصل معك أحد مهندسينا خلال ساعات لمراجعة مخططات مساحتك وتحديد موعد المقايسة."
                : "Thank you for choosing TERAZ. An engineer will reach out shortly to review your layout and schedule a laser survey."}
            </p>
            <div className="pt-4 flex justify-center gap-4">
              <a
                href="https://wa.me/201005423809"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-[#25D366] text-white font-bold text-xs flex items-center gap-2 hover:bg-green-600 transition-colors shadow-md active:scale-95"
              >
                <span>{language === "ar" ? "متابعة الطلب عبر واتساب" : "Follow up on WhatsApp"}</span>
              </a>
              <button
                onClick={() => {
                  setSuccess(false);
                  setStep(1);
                }}
                className="px-6 py-3 rounded-full bg-espresso text-cream font-bold text-xs hover:bg-gold hover:text-espresso transition-colors active:scale-95"
              >
                {language === "ar" ? "طلب جديد" : "New Quote"}
              </button>
            </div>
          </motion.div>
        ) : (
          <div>
            {error && (
              <div className="mb-6 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <AnimatePresence mode="wait" custom={direction}>
              {/* STEP 1: Select Service */}
              {step === 1 && (
                <motion.div
                  key="step-1"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="space-y-6"
                >
                  <h3 className="text-lg font-bold text-espresso">
                    {language === "ar" ? "ما نوع الخدمة التي تود تنفيذها؟" : "What discipline would you like to commission?"}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {services.map((srv) => {
                      const Icon = srv.icon;
                      const isSelected = formData.serviceType === srv.id;
                      return (
                        <button
                          key={srv.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, serviceType: srv.id })}
                          className={`p-5 rounded-2xl border text-start transition-all flex flex-col justify-between space-y-4 ${
                            isSelected
                              ? "bg-espresso text-cream border-gold shadow-lg scale-[1.02]"
                              : "bg-cream text-espresso border-gold/20 hover:border-gold/50"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <Icon className={`w-6 h-6 ${isSelected ? "text-gold" : "text-taupe"}`} />
                            {isSelected && <Check className="w-4 h-4 text-gold" />}
                          </div>
                          <span className="text-sm font-bold">
                            {language === "ar" ? srv.title.ar : srv.title.en}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Space Details */}
              {step === 2 && (
                <motion.div
                  key="step-2"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="space-y-6"
                >
                  <h3 className="text-lg font-bold text-espresso">
                    {language === "ar" ? "أخبرنا عن مساحة المكان وموقعه" : "Tell us about your space and location"}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { id: "villa", label: { ar: "فيلا / تاون هاوس", en: "Villa / Townhouse" } },
                      { id: "apartment", label: { ar: "شقة / دوبلكس", en: "Apartment / Duplex" } },
                      { id: "commercial", label: { ar: "مكتب / شركة", en: "Office / Commercial" } },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, spaceType: item.id })}
                        className={`p-4 rounded-xl border text-center font-bold text-xs transition-all ${
                          formData.spaceType === item.id
                            ? "bg-espresso text-cream border-gold shadow-md"
                            : "bg-cream text-espresso border-gold/20 hover:border-gold/50"
                        }`}
                      >
                        {language === "ar" ? item.label.ar : item.label.en}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-espresso block">
                      {language === "ar" ? "أبعاد المساحة والمحافظة/المنطقة" : "Approximate Dimensions & Area/City"}
                    </label>
                    <textarea
                      rows={3}
                      value={formData.spaceDetails}
                      onChange={(e) => setFormData({ ...formData, spaceDetails: e.target.value })}
                      placeholder={
                        language === "ar"
                          ? "مثال: مطبخ 4 * 3.5 متر في التجمع الخامس، أو تجاليد جدارية لغرفة معيشة بالشيخ زايد..."
                          : "e.g. 4m x 3.5m kitchen in New Cairo, or living room wall cladding in Zayed..."
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-cream border border-gold/30 text-xs focus:border-gold outline-none resize-none"
                    />
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Finishes & Materials */}
              {step === 3 && (
                <motion.div
                  key="step-3"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="space-y-6"
                >
                  <h3 className="text-lg font-bold text-espresso">
                    {language === "ar" ? "ما هي الخامات والتشطيبات المفضلة لديك؟" : "Select Your Preferred Finishes & Surfaces"}
                  </h3>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-espresso block">
                      {language === "ar" ? "نوع الدرف / الخشب المفضل" : "Cabinetry / Wood Style"}
                    </label>
                    <select
                      value={formData.materialPreference}
                      onChange={(e) => setFormData({ ...formData, materialPreference: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-cream border border-gold/30 text-xs focus:border-gold outline-none"
                    >
                      <option value="natural_wood">{language === "ar" ? "أرو أو جوز طبيعي فاخر (Natural Veneer)" : "Natural Oak/Walnut Veneer"}</option>
                      <option value="polygloss">{language === "ar" ? "بولي لاك تركي عالي اللمعان (Polygloss)" : "High-Gloss Turkish Polygloss"}</option>
                      <option value="acrylic">{language === "ar" ? "أكريليك مودرن (Acrylic)" : "Contemporary Acrylic"}</option>
                      <option value="aluminum">{language === "ar" ? "ألوميتال أسود غير لامع مع زجاج مضلع" : "Matte Black Aluminum with Fluted Glass"}</option>
                      <option value="consultant_choice">{language === "ar" ? "أفضل ترشيح المهندس أثناء المعاينة" : "Advise me during the site visit"}</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-espresso block">
                      {language === "ar" ? "المسطح (الكونترتوب)" : "Countertop Surface"}
                    </label>
                    <select
                      value={formData.countertopPreference}
                      onChange={(e) => setFormData({ ...formData, countertopPreference: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-cream border border-gold/30 text-xs focus:border-gold outline-none"
                    >
                      <option value="calacatta_quartz">{language === "ar" ? "كوارتز كالاكاتا إيطالي (Calacatta Quartz)" : "Italian Calacatta Quartz"}</option>
                      <option value="black_granite">{language === "ar" ? "جرانيت أسود دبل بلاك معالج" : "Honed Double Black Granite"}</option>
                      <option value="terrazzo">{language === "ar" ? "تيرازو إيطالي عصري" : "Italian Terrazzo"}</option>
                      <option value="not_sure">{language === "ar" ? "غير محدد حالياً" : "Not Decided Yet"}</option>
                    </select>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: Contact & Optional Budget */}
              {step === 4 && (
                <motion.form
                  key="step-4"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-bold text-espresso">
                    {language === "ar" ? "معلومات التواصل والميزانية التقديرية" : "Contact Details & Estimated Budget"}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-espresso block">
                        {language === "ar" ? "الاسم بالكامل *" : "Full Name *"}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder={language === "ar" ? "الاسم الكريم" : "Your Name"}
                        className="w-full px-4 py-2.5 rounded-xl bg-cream border border-gold/30 text-xs focus:border-gold outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-espresso block">
                        {language === "ar" ? "رقم الهاتف / الواتساب *" : "Phone / WhatsApp *"}
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="0100xxxxxxx"
                        className="w-full px-4 py-2.5 rounded-xl bg-cream border border-gold/30 text-xs focus:border-gold outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-espresso block">
                        {language === "ar" ? "البريد الإلكتروني (اختياري)" : "Email (Optional)"}
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@example.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-cream border border-gold/30 text-xs focus:border-gold outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-espresso block">
                        {language === "ar" ? "الميزانية التقديرية المقترحة (اختياري)" : "Budget Range (Optional)"}
                      </label>
                      <select
                        value={formData.budgetRange}
                        onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-cream border border-gold/30 text-xs focus:border-gold outline-none"
                      >
                        <option value="economy">{language === "ar" ? "اقتصادي ومدروس (Economy)" : "Value Focused"}</option>
                        <option value="medium">{language === "ar" ? "متوسط فاخر (Mid-Luxury)" : "Mid-Tier Luxury"}</option>
                        <option value="high_end">{language === "ar" ? "أعلى فئة ومواصفات خاصة (Ultra Luxury)" : "Presidential / Bespoke Ultra"}</option>
                        <option value="open">{language === "ar" ? "أفضل قيمة مقابل جودة الخامة" : "Best Value for Quality"}</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-espresso block">
                      {language === "ar" ? "أي ملاحظات إضافية تود إخبارنا بها" : "Additional Notes or Preferences"}
                    </label>
                    <textarea
                      rows={2}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder={language === "ar" ? "أرفق أي تفاصيل تود إضافتها للمهندس..." : "Any specific requests..."}
                      className="w-full px-4 py-2.5 rounded-xl bg-cream border border-gold/30 text-xs focus:border-gold outline-none resize-none"
                    />
                  </div>

                  <Magnetic strength={0.15}>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 rounded-full bg-gold text-espresso font-bold text-xs uppercase tracking-wider hover:bg-gold-light transition-all shadow-xl flex items-center justify-center gap-2 pulse-gold active:scale-95 disabled:opacity-50"
                    >
                      <Sparkles className="w-4 h-4 text-espresso" />
                      <span>{loading ? (language === "ar" ? "جاري إرسال المقايسة..." : "Submitting...") : (language === "ar" ? "إرسال طلب المقايسة فورًا 🌿" : "Submit Quote Request 🌿")}</span>
                    </button>
                  </Magnetic>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="mt-8 pt-6 border-t border-gold/20 flex items-center justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="px-5 py-2 rounded-full border border-gold/40 text-xs font-bold text-espresso hover:bg-cream transition-colors active:scale-95"
                >
                  {language === "ar" ? "← السابق" : "← Previous"}
                </button>
              ) : <div />}

              {step < 4 && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-full bg-espresso text-cream text-xs font-bold hover:bg-gold hover:text-espresso transition-all flex items-center gap-2 active:scale-95"
                >
                  <span>{language === "ar" ? "التالي →" : "Next →"}</span>
                </button>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default function QuoteWizardPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center text-xs text-taupe">جاري التحميل...</div>}>
      <QuoteWizardContent />
    </Suspense>
  );
}

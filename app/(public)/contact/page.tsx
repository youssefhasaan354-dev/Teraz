"use client";

import React, { useState } from "react";
import { Phone, Mail, Clock, MessageCircle, Send, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { createLead } from "@/lib/firebase/firestore-service";

export default function ContactPage() {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    serviceType: "wooden_kitchens",
    preferredTime: "morning",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      setError(language === "ar" ? "يرجى كتابة الاسم ورقم الهاتف على الأقل." : "Please enter your name and phone number.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await createLead({
        type: "contact",
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        serviceType: formData.serviceType,
        preferredContactTime: formData.preferredTime,
        message: formData.message,
      });

      setSuccess(true);
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        serviceType: "wooden_kitchens",
        preferredTime: "morning",
        message: "",
      });
    } catch (err) {
      setError(language === "ar" ? "حدث خطأ أثناء الإرسال، يرجى المحاولة مرة أخرى." : "Error submitting. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const defaultWhatsappMsg =
    language === "ar"
      ? "السلام عليكم، أود الاستفسار عن خدمات طراز للأثاث والمطابخ والحصول على عرض سعر ومقايسة 🌿"
      : "Hello TERAZ team, I would like to inquire about your bespoke kitchens and furniture and request a quote.";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold text-gold uppercase tracking-widest">
          {language === "ar" ? "تواصل دائم ومباشر" : "Direct Communication"}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-espresso">
          {language === "ar" ? "نحن في خدمتك دائمًا 24/7" : "Always At Your Service 24/7"}
        </h1>
        <p className="text-sm sm:text-base text-taupe leading-relaxed">
          {language === "ar"
            ? "نخدمك أونلاين في كافة محافظات مصر — تواصل معنا عبر واتساب، الهاتف، أو املأ النموذج وسيتواصل معك مهندس متخصص فورًا."
            : "We serve you online nationwide across Egypt — reach us via WhatsApp, phone, or submit your inquiry below."}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact Information & Online Notice (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 rounded-3xl bg-espresso text-cream border border-gold/40 shadow-2xl space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-gold-light uppercase tracking-widest">
                {language === "ar" ? "نموذج العمل الحديث" : "Operating Model"}
              </span>
              <h2 className="text-xl font-bold text-cream">
                {language === "ar" ? "خدمة أونلاين وتوريد مباشر لكافة المحافظات" : "Online Service & Nationwide Assembly"}
              </h2>
              <p className="text-xs text-cream/70 leading-relaxed pt-1">
                {language === "ar"
                  ? "نعمل بدون معرض ثابت لنوفر لك أعلى خامة بأفضل تكلفة تنفيذية. ينتقل مهندسنا المتخصص إليك لرفع المقاسات بالليزر واطلاعك على عينات الأخشاب والرخام في موقعك."
                  : "We operate direct-to-client without showroom markups. Our engineer visits your site for laser spatial measurements and presents real finish samples directly to you."}
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-gold/20">
              <a
                href="https://wa.me/201005423809?text="
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-cream/10 hover:bg-gold/20 transition-colors border border-gold/20"
              >
                <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <span className="text-xs text-gold-light block font-semibold">
                    {language === "ar" ? "واتساب مباشر 24/7" : "WhatsApp (Instant Response)"}
                  </span>
                  <span className="text-sm font-bold text-cream" dir="ltr">+201005423809</span>
                </div>
              </a>

              <a
                href="tel:+201005423809"
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-cream/10 hover:bg-gold/20 transition-colors border border-gold/20"
              >
                <div className="w-10 h-10 rounded-full bg-gold/20 text-gold flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-gold-light block font-semibold">
                    {language === "ar" ? "اتصال هاتفي مباشر" : "Direct Phone Line"}
                  </span>
                  <span className="text-sm font-bold text-cream" dir="ltr">01005423809</span>
                </div>
              </a>

              <a
                href="mailto:terazfurneture@gmail.com"
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-cream/10 hover:bg-gold/20 transition-colors border border-gold/20"
              >
                <div className="w-10 h-10 rounded-full bg-gold/20 text-gold flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-gold-light block font-semibold">
                    {language === "ar" ? "البريد الإلكتروني" : "Email Address"}
                  </span>
                  <span className="text-xs font-bold text-cream break-all">terazfurneture@gmail.com</span>
                </div>
              </a>

              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-cream/10 border border-gold/20">
                <div className="w-10 h-10 rounded-full bg-gold/20 text-gold flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-gold-light block font-semibold">
                    {language === "ar" ? "أوقات العمل" : "Operating Hours"}
                  </span>
                  <span className="text-xs font-bold text-cream">
                    {language === "ar" ? "متاحون دائمًا على مدار الساعة (24/7)" : "Always Open 24/7"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="p-8 sm:p-10 rounded-3xl bg-cream-dark/50 border border-gold/30 shadow-xl space-y-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-espresso">
                {language === "ar" ? "أرسل لنا استفسارك وسنعاود الاتصال بك" : "Send an Inquiry & We'll Call You"}
              </h2>
              <p className="text-xs text-taupe">
                {language === "ar"
                  ? "املأ بياناتك وسيقوم أحد مهندسينا بالتواصل معك لمناقشة أبعاد وتفاصيل طلبك."
                  : "Fill out your details and an engineer will connect with you to review specifications."}
              </p>
            </div>

            {success ? (
              <div className="p-6 rounded-2xl bg-green-50 border border-green-200 text-green-900 space-y-2 text-center animate-fadeIn">
                <CheckCircle2 className="w-10 h-10 text-green-600 mx-auto" />
                <h3 className="text-base font-bold">
                  {language === "ar" ? "تم استلام رسالتك بنجاح! 🌿" : "Message Received Successfully! 🌿"}
                </h3>
                <p className="text-xs text-green-700">
                  {language === "ar"
                    ? "شكرًا لتواصلك مع طراز. سيتواصل معك أحد مهندسينا في أقرب وقت."
                    : "Thank you for reaching out to TERAZ. Our team will contact you shortly."}
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-3 text-xs font-bold text-green-800 underline"
                >
                  {language === "ar" ? "إرسال استفسار آخر" : "Send another inquiry"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

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
                      placeholder={language === "ar" ? "مثال: م. أحمد الشناوي" : "e.g. John Doe"}
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
                      placeholder={language === "ar" ? "0100xxxxxxx" : "+20100xxxxxxx"}
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
                      {language === "ar" ? "نوع الخدمة المطلوبة" : "Discipline Required"}
                    </label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-cream border border-gold/30 text-xs focus:border-gold outline-none"
                    >
                      <option value="wooden_kitchens">{language === "ar" ? "مطابخ خشب" : "Wooden Kitchens"}</option>
                      <option value="aluminum_kitchens">{language === "ar" ? "مطابخ ألوميتال" : "Aluminum Kitchens"}</option>
                      <option value="cladding">{language === "ar" ? "كلادينج وتجاليد جدران" : "Wall Cladding"}</option>
                      <option value="furniture">{language === "ar" ? "موبيليا وأثاث منزلي" : "Home Furniture"}</option>
                      <option value="office">{language === "ar" ? "أثاث مكتبي وكراسي" : "Office Furniture & Chairs"}</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-espresso block">
                    {language === "ar" ? "أفضل وقت للتواصل معك" : "Preferred Time to Call"}
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-cream border border-gold/30 text-xs focus:border-gold outline-none"
                  >
                    <option value="morning">{language === "ar" ? "صباحًا (10 ص - 2 م)" : "Morning (10 AM - 2 PM)"}</option>
                    <option value="afternoon">{language === "ar" ? "عصرًا (2 م - 6 م)" : "Afternoon (2 PM - 6 PM)"}</option>
                    <option value="evening">{language === "ar" ? "مساءً (6 م - 10 م)" : "Evening (6 PM - 10 PM)"}</option>
                    <option value="anytime">{language === "ar" ? "في أي وقت يناسبكم" : "Anytime"}</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-espresso block">
                    {language === "ar" ? "تفاصيل رسالتك أو استفسارك" : "Your Message / Details"}
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={
                      language === "ar"
                        ? "أخبرنا عن أبعاد المكان التقريبية، التصميم المفضل، أو أي ملاحظات تود معرفتها..."
                        : "Tell us about your space dimensions, preferred style, or specific inquiries..."
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-cream border border-gold/30 text-xs focus:border-gold outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-full bg-espresso text-cream text-xs font-bold flex items-center justify-center gap-2 hover:bg-gold hover:text-espresso transition-all shadow-xl"
                >
                  <Send className="w-4 h-4 text-gold" />
                  <span>{loading ? (language === "ar" ? "جاري الإرسال..." : "Sending...") : (language === "ar" ? "إرسال الاستفسار الآن" : "Submit Inquiry")}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

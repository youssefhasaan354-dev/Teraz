"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Ruler,
  Compass,
  Hammer,
  Truck,
  HeartHandshake,
  ChevronDown,
  Phone,
  MessageCircle,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import {
  getCategories,
  getProjects,
  getTestimonials,
  getFAQs,
  getStats,
  getServices,
} from "@/lib/firebase/firestore-service";
import {
  initialCategories,
  initialProjects,
  initialTestimonials,
  initialFAQs,
  initialStats,
  initialServices,
} from "@/lib/initial-data";
import {
  Category,
  Project,
  Testimonial,
  FAQItem,
  StatItem,
  ServiceItem,
} from "@/lib/types";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { Magnetic } from "@/components/motion/Magnetic";
import { Counter } from "@/components/motion/Counter";
import { Marquee } from "@/components/motion/Marquee";
import { BeforeAfter } from "@/components/motion/BeforeAfter";
import { PinnedStory } from "@/components/motion/PinnedStory";
import { HorizontalScroll } from "@/components/motion/HorizontalScroll";
import { KitchenConfigurator } from "@/components/public/KitchenConfigurator";

export default function HomePage() {
  const { language, localize } = useLanguage();
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [faqs, setFaqs] = useState<FAQItem[]>(initialFAQs);
  const [stats, setStats] = useState<StatItem[]>(initialStats);
  const [services, setServices] = useState<ServiceItem[]>(initialServices);
  const [openFaq, setOpenFaq] = useState<string | null>("faq-1");

  useEffect(() => {
    getCategories().then((res) => { if (res && res.length > 0) setCategories(res); });
    getProjects().then((res) => { if (res && res.length > 0) setProjects(res); });
    getTestimonials().then((res) => { if (res && res.length > 0) setTestimonials(res); });
    getFAQs().then((res) => { if (res && res.length > 0) setFaqs(res); });
    getStats().then((res) => { if (res && res.length > 0) setStats(res); });
    getServices().then((res) => { if (res && res.length > 0) setServices(res); });
  }, []);

  const marqueeItems =
    language === "ar"
      ? [
          "مطابخ خشبية فاخرة",
          "مطابخ ألوميتال مودرن",
          "كلادينج وتجاليد جدران",
          "غرف نوم وموبيليا عصرية",
          "أثاث مكتبي وكراسي مريحة",
          "ضمان معتمد 10 سنوات",
          "توريد وتركيب لكافة المحافظات",
          "عِش الأناقة مع طراز",
        ]
      : [
          "Luxury Bespoke Kitchens",
          "Architectural Wall Cladding",
          "Contemporary Bedrooms & Furniture",
          "Executive Office Suites & Chairs",
          "10-Year Certified Warranty",
          "Delivery & Assembly Across Egypt",
          "Live in Elegance with TERAZ",
        ];

  return (
    <div className="space-y-24 sm:space-y-32">
      {/* ============================================================ */}
      {/* 1. CINEMATIC HERO SECTION                                    */}
      {/* ============================================================ */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-espresso text-cream -mt-20 pt-24 pb-16">
        {/* Background Layer with Dark Gradient & Subtle Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
            alt="TERAZ Luxury Kitchen"
            fill
            priority
            className="object-cover opacity-25 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/80 to-espresso/60" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gold/10 rounded-full blur-[140px] pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          {/* Eyebrow Pill */}
          <Reveal direction="down" delay={0.1}>
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gold/15 text-gold-light border border-gold/40 backdrop-blur-md shadow-lg">
              <Sparkles className="w-4 h-4 text-gold animate-spin-slow" />
              <span className="text-xs font-bold tracking-widest uppercase">
                {language === "ar" ? "حرفية استثنائية • لمسات فندقية هادئة" : "Bespoke Egyptian Craftsmanship • Quiet Luxury"}
              </span>
            </div>
          </Reveal>

          {/* Headline with High-Contrast Typography */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-cream leading-[1.15]">
              <SplitText
                text={language === "ar" ? "حيث يلتقي الإبداع" : "Where Artistry Meets"}
                className="block text-cream"
              />
              <span className="text-gold-gradient font-serif italic block mt-1">
                {language === "ar" ? "بفخامة التفاصيل الخالدة" : "Architectural Precision"}
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <Reveal delay={0.3}>
            <p className="max-w-2xl mx-auto text-base sm:text-lg text-cream/80 font-normal leading-relaxed">
              {language === "ar"
                ? "نبتكر لك مطابخ عصرية، تجاليد كلادينج فاخرة، وقطع موبيليا تُصنع خصيصًا لتعكس ذوقك الرفيع بجودة متوارثة تدوم لأجيال."
                : "Tailor-made kitchens, architectural wall claddings, and statement furniture crafted to elevate your living and workspaces across Egypt."}
            </p>
          </Reveal>

          {/* Magnetic CTA Buttons */}
          <Reveal delay={0.4}>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Magnetic strength={0.25}>
                <Link
                  href="/quote"
                  className="px-8 py-4 rounded-full bg-gold text-espresso font-bold text-sm tracking-wide shadow-2xl hover:bg-gold-light transition-all flex items-center gap-2.5 pulse-gold"
                >
                  <Sparkles className="w-4 h-4 text-espresso" />
                  <span>{language === "ar" ? "اطلب استشارة وتصميم مجاني" : "Request Free Consultation & Quote"}</span>
                </Link>
              </Magnetic>

              <Magnetic strength={0.25}>
                <Link
                  href="/projects"
                  className="px-8 py-4 rounded-full bg-cream/10 text-cream font-semibold text-sm hover:bg-cream/20 border border-gold/40 transition-all flex items-center gap-2 backdrop-blur-sm"
                >
                  <span>{language === "ar" ? "استكشف أحدث أعمالنا" : "Explore Portfolio"}</span>
                  <span>{language === "ar" ? "←" : "→"}</span>
                </Link>
              </Magnetic>
            </div>
          </Reveal>

          {/* Trust Badges */}
          <Reveal delay={0.5}>
            <div className="pt-8 flex flex-wrap justify-center items-center gap-6 sm:gap-10 text-xs text-cream/70 border-t border-gold/20 max-w-2xl mx-auto">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-gold" />
                {language === "ar" ? "ضمان 10 سنوات معتمد" : "10-Year Certified Warranty"}
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-gold" />
                {language === "ar" ? "توريد وتركيب لكافة المحافظات" : "Nationwide Delivery & Assembly"}
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-gold" />
                {language === "ar" ? "متاحون 24/7 أونلاين" : "Available 24/7 Online"}
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. INFINITE MARQUEE STRIP                                    */}
      {/* ============================================================ */}
      <Marquee items={marqueeItems} speed={30} />

      {/* ============================================================ */}
      {/* 3. BRAND EDITORIAL INTRO & CRAFTSMANSHIP                     */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold text-gold uppercase tracking-widest block">
              {language === "ar" ? "فلسفة طِراز (TERAZ)" : "The TERAZ Philosophy"}
            </span>

            <h2 className="text-3xl sm:text-4xl font-bold text-espresso leading-snug">
              {language === "ar"
                ? "الأناقة الهادئة ليست مجرد مظهر، بل هي دقة في كل مليمتر ومفصل."
                : "Quiet luxury is not an aesthetic; it is engineering precision in every millimeter."}
            </h2>

            <div className="hairline-gold w-32" />

            <p className="text-sm sm:text-base text-taupe leading-relaxed">
              {language === "ar"
                ? "في طراز، نؤمن بأن المنزل المعاصر يستحق حلولاً تُفصّل بدقة هندسية لا تقبل المساومة. نعمل بدون معارض تقليدية باهظة لنوفر لك أعلى خامات الأخشاب الطبيعية المعالجة، الألومنيوم التركي الثقيل، ومفصلات بلوم (Blum) النمساوية بتكلفة تصنيع عادلة ومباشرة."
                : "At TERAZ, we champion custom architectural living. Operating direct-from-workshop allows us to channel maximum investment into premium hardwoods, Turkish aluminum, and Austrian Blum hardware without inflated retail overheads."}
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-cream-dark/60 border border-gold/20">
                <span className="text-2xl font-bold text-gold block">100%</span>
                <span className="text-xs text-espresso font-semibold block mt-1">
                  {language === "ar" ? "مقاومة للمياه والرطوبة" : "Moisture & Water Proof"}
                </span>
                <span className="text-[11px] text-taupe block mt-0.5">
                  {language === "ar" ? "شاسيهات معالجة للبيئة المصرية" : "Engineered for climate resilience"}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-cream-dark/60 border border-gold/20">
                <span className="text-2xl font-bold text-gold block">Blum</span>
                <span className="text-xs text-espresso font-semibold block mt-1">
                  {language === "ar" ? "مفصلات نمساوية أصلية" : "Austrian Soft-Close"}
                </span>
                <span className="text-[11px] text-taupe block mt-0.5">
                  {language === "ar" ? "سلاسة إغلاق مدى الحياة" : "Lifetime smooth closure"}
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative aspect-[4/3] rounded-3xl overflow-hidden border border-gold/30 shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"
              alt="TERAZ Bespoke Interior Craft"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 right-6 left-6 text-cream text-xs flex justify-between items-center">
              <span className="font-semibold tracking-wide">
                {language === "ar" ? "توريد مباشر من الورشة إلى موقعك" : "Direct Turnkey Delivery"}
              </span>
              <span className="text-gold font-bold">TERAZ Craftsmanship</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. PINNED STORYTELLING CATEGORIES                            */}
      {/* ============================================================ */}
      <section className="relative">
        <PinnedStory categories={categories} />
      </section>

      {/* ============================================================ */}
      {/* 5. FEATURED PROJECTS (HORIZONTAL SCROLL)                     */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HorizontalScroll projects={projects} />
      </section>

      {/* ============================================================ */}
      {/* 6. BEFORE & AFTER TRANSFORMATION HIGHLIGHT                   */}
      {/* ============================================================ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-8">
          <span className="text-xs font-bold text-gold uppercase tracking-widest">
            {language === "ar" ? "المقارنة الحية" : "Visual Transformation"}
          </span>
          <h2 className="text-3xl font-bold text-espresso">
            {language === "ar" ? "شاهد الفارق الملموس قبل وبعد التنفيذ" : "Compare Before & After Installation"}
          </h2>
          <p className="text-sm text-taupe max-w-xl mx-auto">
            {language === "ar"
              ? "اسحب المؤشر لترى كيف حوّل مهندسو طراز مطبخ قديم إلى تحفة عصرية متكاملة بوحدات أرو وكوارتز كالاكاتا."
              : "Drag the slider to witness how our design engineering revived an outdated kitchen space."}
          </p>
        </div>

        <BeforeAfter
          beforeImage="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80"
          afterImage="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
          caption={
            language === "ar"
              ? "مشروع فيلا التجمع الخامس — تجديد شامل للمطبخ وتجاليد الجدران"
              : "New Cairo Villa Project — Comprehensive Kitchen & Wall Cladding Renovation"
          }
        />
      </section>

      {/* ============================================================ */}
      {/* 7. INTERACTIVE KITCHEN CONFIGURATOR                          */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <span className="text-xs font-bold text-gold uppercase tracking-widest">
            {language === "ar" ? "المحاكي التفاعلي الذكي" : "Interactive Studio"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-espresso">
            {language === "ar" ? "صمّم مطبخك وشاهد نتيجتك التقديرية فورًا" : "Customize Your Bespoke Kitchen Live"}
          </h2>
          <p className="text-sm text-taupe max-w-xl mx-auto">
            {language === "ar"
              ? "اختر شكل التوزيع، نوع الدرف، الكوارتز أو الجرانيت، والمقابض واطلب تسعيرًا مباشرًا بنقرة واحدة."
              : "Select layout, door materials, countertops, and handles to visualize and request an instant tailored quote."}
          </p>
        </div>

        <KitchenConfigurator />
      </section>

      {/* ============================================================ */}
      {/* 8. OUR SEAMLESS PROCESS (HOW WE WORK)                        */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-bold text-gold uppercase tracking-widest">
            {language === "ar" ? "خطوات العمل المنظمة" : "Our Seamless Workflow"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-espresso">
            {language === "ar" ? "من الفكرة إلى التسليم بأعلى معايير الإتقان" : "From Concept to Turnkey Handover"}
          </h2>
          <p className="text-sm text-taupe max-w-xl mx-auto">
            {language === "ar"
              ? "خطوات مدروسة تضمن لك دقة المقاسات وجمال التنفيذ بدون مفاجآت."
              : "A transparent six-stage engineering journey ensuring precision, punctuality, and excellence."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              step: "01",
              icon: HeartHandshake,
              title: { ar: "استشارة وتحديد الرؤية", en: "Consultation & Vision" },
              desc: {
                ar: "نتواصل معك عبر واتساب أو الهاتف لمناقشة رغباتك والمساحة ونوعية الأثاث أو المطبخ المفضل.",
                en: "We review your design aspirations, floorplans, and functional kitchen/furniture needs via phone or WhatsApp.",
              },
            },
            {
              step: "02",
              icon: Ruler,
              title: { ar: "رفع المقاسات الهندسية بالليزر", en: "Laser Spatial Survey" },
              desc: {
                ar: "ينتقل مهندسنا المتخصص إلى موقعك لرفع أدق أبعاد المكان واختبار زوايا الجدران ومسارات السباكة والكهرباء.",
                en: "Our engineer conducts precision laser measurements on-site, surveying MEP pathways and wall angles.",
              },
            },
            {
              step: "03",
              icon: Compass,
              title: { ar: "تصميم ثلاثي الأبعاد (3D)", en: "3D Photorealistic Design" },
              desc: {
                ar: "نقدم لك مخططات واقعية ثلاثية الأبعاد لتشاهد مطبخك أو أثاثك بكافة تفاصيل الخامات والألوان قبل التصنيع.",
                en: "We generate full photorealistic 3D renders illustrating exact finishes, lighting, and countertop grains.",
              },
            },
            {
              step: "04",
              icon: Hammer,
              title: { ar: "التصنيع بماكينات CNC الحديثة", en: "Precision CNC Manufacture" },
              desc: {
                ar: "يتم تقطيع وتجميع الشاسيهات في ورشنا بأحدث ماكينات القص الأوتوماتيكية مع عزل الحواف بمواد مقاومة للمياه.",
                en: "Carving, milling, and edge-banding in our facilities utilizing computerized CNC machinery and waterproof seals.",
              },
            },
            {
              step: "05",
              icon: Truck,
              title: { ar: "التوريد والتركيب المحترف", en: "White-Glove Installation" },
              desc: {
                ar: "فريق تركيب مدرب يتولى تثبيت الوحدات ومحاذاة الأبواب بدقة متناهية وتنظيف الموقع بعد الانتهاء.",
                en: "Our specialized assembly technicians install, calibrate hinges, align doors, and clean the space meticulously.",
              },
            },
            {
              step: "06",
              icon: ShieldCheck,
              title: { ar: "شهادة الضمان وخدمة ما بعد البيع", en: "Warranty & Support" },
              desc: {
                ar: "تسليم رسمي مع شهادة ضمان معتمدة تصل إلى 10 سنوات، مع دعم دوري سريع لأي استفسار.",
                en: "Official handover accompanied by a certified 10-year warranty certificate and ongoing customer care.",
              },
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-cream-dark/50 border border-gold/25 hover:border-gold transition-all duration-300 relative group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-serif font-bold text-gold/60 group-hover:text-gold transition-colors">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-gold/15 text-gold flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-espresso">{localize(item.title)}</h3>
                  <p className="text-xs text-taupe leading-relaxed">{localize(item.desc)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 9. STATS COUNTERS                                            */}
      {/* ============================================================ */}
      <section className="bg-espresso text-cream py-16 border-y border-gold/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s) => (
              <div key={s.id} className="space-y-2">
                <div className="text-4xl sm:text-5xl font-bold font-serif text-gold-gradient">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-cream">{localize(s.label)}</h4>
                {s.description && (
                  <p className="text-[11px] text-cream/60 max-w-[180px] mx-auto">
                    {localize(s.description)}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 10. CLIENT TESTIMONIALS                                      */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-bold text-gold uppercase tracking-widest">
            {language === "ar" ? "شهادات نعتز بها" : "Client Voices"}
          </span>
          <h2 className="text-3xl font-bold text-espresso">
            {language === "ar" ? "ماذا يقول عملاؤنا عن تجربتهم مع طراز؟" : "Trusted by Discerning Homeowners & Designers"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="p-6 rounded-2xl bg-cream-dark/60 border border-gold/25 hover:border-gold transition-all duration-300 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex text-gold text-sm">
                  {"★".repeat(t.rating)}
                </div>
                <p className="text-xs text-espresso/90 leading-relaxed italic">
                  &ldquo;{localize(t.content)}&rdquo;
                </p>
              </div>

              <div className="pt-3 border-t border-gold/15">
                <h4 className="text-xs font-bold text-espresso">{localize(t.name)}</h4>
                <span className="text-[11px] text-taupe block">{localize(t.roleLocation)}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 11. FAQ ACCORDION                                            */}
      {/* ============================================================ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <span className="text-xs font-bold text-gold uppercase tracking-widest">
            {language === "ar" ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
          </span>
          <h2 className="text-3xl font-bold text-espresso">
            {language === "ar" ? "إجابات واضحة لكل ما يدور بذهنك" : "Everything You Need to Know"}
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => {
            const isOpen = openFaq === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl border border-gold/25 bg-cream-dark/50 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                  className="w-full p-5 text-start flex items-center justify-between gap-4"
                >
                  <span className="text-sm font-bold text-espresso">{localize(faq.question)}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-gold shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-taupe leading-relaxed border-t border-gold/15">
                    {localize(faq.answer)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 12. FINAL CTA BANNER                                         */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="relative rounded-3xl overflow-hidden bg-espresso text-cream p-8 sm:p-14 lg:p-16 border border-gold/40 shadow-2xl text-center space-y-6">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=80"
              alt="Kitchen Interior"
              fill
              className="object-cover opacity-15"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-espresso via-espresso/90 to-espresso" />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="text-xs font-bold text-gold-light uppercase tracking-widest inline-block">
              {language === "ar" ? "ابدأ اليوم • عِش الأناقة" : "Begin Today • Live in Elegance"}
            </span>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-cream leading-tight">
              {language === "ar"
                ? "جاهز لتحويل منزلك أو مكتبك إلى مساحة تفيض بالفخامة؟"
                : "Ready to Transform Your Living or Work Space?"}
            </h2>

            <p className="text-sm sm:text-base text-cream/80">
              {language === "ar"
                ? "تواصل مع مهندسينا الآن لطلب المعاينة المجانية، رفع المقاسات الهندسية، والحصول على عرض سعر مفصل."
                : "Connect with our engineering team now for a free spatial survey, consultation, and tailored estimate."}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                href="/quote"
                className="px-8 py-3.5 rounded-full bg-gold text-espresso font-bold text-xs uppercase tracking-wider hover:bg-gold-light transition-all flex items-center gap-2 shadow-xl"
              >
                <Sparkles className="w-4 h-4" />
                <span>{language === "ar" ? "طلب عرض سعر ومقايسة مجانية" : "Request a Quote & Survey"}</span>
              </Link>

              <a
                href="https://wa.me/201005423809"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-full bg-[#25D366] text-white font-bold text-xs flex items-center gap-2 hover:bg-green-600 transition-colors shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{language === "ar" ? "محادثة فورية على واتساب" : "Chat on WhatsApp"}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

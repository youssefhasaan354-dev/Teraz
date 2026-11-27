"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Check, ArrowRight, ArrowLeft, RefreshCw } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { getConfiguratorOptions } from "@/lib/firebase/firestore-service";
import { ConfiguratorOption } from "@/lib/types";

export function KitchenConfigurator() {
  const { language, localize } = useLanguage();
  const [options, setOptions] = useState<ConfiguratorOption[]>([]);
  const [activeStep, setActiveStep] = useState<"layouts" | "doorFinishes" | "countertops" | "handles">("layouts");

  // Selected state
  const [selectedLayout, setSelectedLayout] = useState<string>("cfg-layout-l-shape");
  const [selectedDoor, setSelectedDoor] = useState<string>("cfg-door-dark-oak");
  const [selectedTop, setSelectedTop] = useState<string>("cfg-top-calacatta-gold");
  const [selectedHandle, setSelectedHandle] = useState<string>("cfg-handle-gola-gold");

  useEffect(() => {
    getConfiguratorOptions().then((res) => {
      setOptions(res);
      // Set defaults
      const defLayout = res.find((o) => o.type === "layouts" && o.isDefault);
      const defDoor = res.find((o) => o.type === "doorFinishes" && o.isDefault);
      const defTop = res.find((o) => o.type === "countertops" && o.isDefault);
      const defHandle = res.find((o) => o.type === "handles" && o.isDefault);

      if (defLayout) setSelectedLayout(defLayout.id);
      if (defDoor) setSelectedDoor(defDoor.id);
      if (defTop) setSelectedTop(defTop.id);
      if (defHandle) setSelectedHandle(defHandle.id);
    });
  }, []);

  const layoutOpts = options.filter((o) => o.type === "layouts");
  const doorOpts = options.filter((o) => o.type === "doorFinishes");
  const topOpts = options.filter((o) => o.type === "countertops");
  const handleOpts = options.filter((o) => o.type === "handles");

  const curLayout = options.find((o) => o.id === selectedLayout);
  const curDoor = options.find((o) => o.id === selectedDoor);
  const curTop = options.find((o) => o.id === selectedTop);
  const curHandle = options.find((o) => o.id === selectedHandle);

  // Dynamic preview visual image based on door finish
  const getPreviewImage = () => {
    if (selectedDoor === "cfg-door-warm-cream") {
      return "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80";
    }
    if (selectedDoor === "cfg-door-matte-nero") {
      return "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80";
    }
    if (selectedDoor === "cfg-door-natural-walnut") {
      return "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80";
    }
    // Default dark oak
    return "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80";
  };

  const quoteParams = new URLSearchParams({
    service: "wooden_kitchens",
    layout: curLayout ? localize(curLayout.name) : "",
    door: curDoor ? localize(curDoor.name) : "",
    countertop: curTop ? localize(curTop.name) : "",
    handle: curHandle ? localize(curHandle.name) : "",
  }).toString();

  const steps = [
    { id: "layouts", label: language === "ar" ? "١. التوزيع" : "1. Layout" },
    { id: "doorFinishes", label: language === "ar" ? "٢. الدرف" : "2. Cabinets" },
    { id: "countertops", label: language === "ar" ? "٣. المسطح" : "3. Countertop" },
    { id: "handles", label: language === "ar" ? "٤. المقابض" : "4. Handles" },
  ] as const;

  return (
    <div className="bg-cream-dark/40 border border-gold/30 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-md">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Interactive Live Visualizer Preview */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden border border-gold/40 shadow-xl group">
            <Image
              src={getPreviewImage()}
              alt="Kitchen Custom Configuration Preview"
              fill
              priority
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Soft Ambient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-espresso/20" />

            {/* Selected Spec Pills Floating Overlay */}
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2 text-xs">
              {curLayout && (
                <span className="px-3 py-1 rounded-full bg-espresso/85 backdrop-blur-md text-cream border border-gold/40 font-medium">
                  {localize(curLayout.name)}
                </span>
              )}
              {curDoor && (
                <span className="px-3 py-1 rounded-full bg-espresso/85 backdrop-blur-md text-cream border border-gold/40 font-medium flex items-center gap-1.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full inline-block border border-cream/30"
                    style={{ backgroundColor: curDoor.hexColor || "#3D2B1F" }}
                  />
                  {localize(curDoor.name)}
                </span>
              )}
              {curTop && (
                <span className="px-3 py-1 rounded-full bg-espresso/85 backdrop-blur-md text-cream border border-gold/40 font-medium">
                  {localize(curTop.name)}
                </span>
              )}
              {curHandle && (
                <span className="px-3 py-1 rounded-full bg-espresso/85 backdrop-blur-md text-cream border border-gold/40 font-medium">
                  {localize(curHandle.name)}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-taupe px-1">
            <span>{language === "ar" ? "معاينة تقديرية للمطبخ المصمم خصيصًا" : "Photorealistic preview of your custom kitchen"}</span>
            <button
              onClick={() => {
                setSelectedLayout("cfg-layout-l-shape");
                setSelectedDoor("cfg-door-dark-oak");
                setSelectedTop("cfg-top-calacatta-gold");
                setSelectedHandle("cfg-handle-gola-gold");
              }}
              className="flex items-center gap-1 text-gold hover:underline"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{language === "ar" ? "إعادة ضبط" : "Reset"}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Customization Controls */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div>
            {/* Step Navigation Tabs */}
            <div className="flex items-center gap-1 pb-4 border-b border-gold/20 overflow-x-auto no-scrollbar">
              {steps.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveStep(s.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                    activeStep === s.id
                      ? "bg-espresso text-cream shadow-md border border-gold/50"
                      : "text-taupe hover:text-espresso hover:bg-cream"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Step 1: Layouts */}
            {activeStep === "layouts" && (
              <div className="pt-4 space-y-3">
                <p className="text-xs text-taupe">
                  {language === "ar"
                    ? "اختر توزيع المطبخ الهندسي الأنسب لمساحة منزلك:"
                    : "Select the architectural layout best suited for your floorplan:"}
                </p>
                <div className="grid grid-cols-2 gap-2.5">
                  {layoutOpts.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setSelectedLayout(opt.id)}
                      className={`p-3 rounded-xl border text-start transition-all flex items-center justify-between ${
                        selectedLayout === opt.id
                          ? "bg-espresso text-cream border-gold shadow-md"
                          : "bg-cream/80 text-espresso border-gold/20 hover:border-gold/50"
                      }`}
                    >
                      <span className="text-xs font-bold">{localize(opt.name)}</span>
                      {selectedLayout === opt.id && <Check className="w-4 h-4 text-gold shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Door Finishes */}
            {activeStep === "doorFinishes" && (
              <div className="pt-4 space-y-3">
                <p className="text-xs text-taupe">
                  {language === "ar"
                    ? "اختر نوع وخامة تشطيب الدرف (خشب طبيعي، بولي لاك، أو ألومنيوم):"
                    : "Choose cabinet front finish (natural veneer, polygloss, or aluminum):"}
                </p>
                <div className="grid grid-cols-2 gap-2.5">
                  {doorOpts.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setSelectedDoor(opt.id)}
                      className={`p-3 rounded-xl border text-start transition-all flex items-center gap-2.5 ${
                        selectedDoor === opt.id
                          ? "bg-espresso text-cream border-gold shadow-md"
                          : "bg-cream/80 text-espresso border-gold/20 hover:border-gold/50"
                      }`}
                    >
                      <span
                        className="w-5 h-5 rounded-full border border-cream/40 shrink-0 shadow-inner"
                        style={{ backgroundColor: opt.hexColor || "#3D2B1F" }}
                      />
                      <span className="text-xs font-bold truncate flex-1">{localize(opt.name)}</span>
                      {selectedDoor === opt.id && <Check className="w-4 h-4 text-gold shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Countertops */}
            {activeStep === "countertops" && (
              <div className="pt-4 space-y-3">
                <p className="text-xs text-taupe">
                  {language === "ar"
                    ? "اختر خامة مسطح العمل والجزيرة (كوارتز كالاكاتا، جرانيت، أو تيرازو):"
                    : "Select worktop & island material (quartz, granite, or terrazzo):"}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {topOpts.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setSelectedTop(opt.id)}
                      className={`p-3 rounded-xl border text-start transition-all flex items-center gap-2.5 ${
                        selectedTop === opt.id
                          ? "bg-espresso text-cream border-gold shadow-md"
                          : "bg-cream/80 text-espresso border-gold/20 hover:border-gold/50"
                      }`}
                    >
                      <span
                        className="w-5 h-5 rounded-md border border-cream/40 shrink-0 shadow-inner"
                        style={{ backgroundColor: opt.hexColor || "#F4F1EA" }}
                      />
                      <span className="text-xs font-bold truncate flex-1">{localize(opt.name)}</span>
                      {selectedTop === opt.id && <Check className="w-4 h-4 text-gold shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Handles */}
            {activeStep === "handles" && (
              <div className="pt-4 space-y-3">
                <p className="text-xs text-taupe">
                  {language === "ar"
                    ? "اختر نمط فتح الدرف (بروفايل جولا مخفي أو مقابض نحاسية):"
                    : "Choose opening style (concealed Gola profile or knurled brass hardware):"}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {handleOpts.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setSelectedHandle(opt.id)}
                      className={`p-3 rounded-xl border text-start transition-all flex items-center gap-2.5 ${
                        selectedHandle === opt.id
                          ? "bg-espresso text-cream border-gold shadow-md"
                          : "bg-cream/80 text-espresso border-gold/20 hover:border-gold/50"
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-cream/40 shrink-0"
                        style={{ backgroundColor: opt.hexColor || "#B38B54" }}
                      />
                      <span className="text-xs font-bold truncate flex-1">{localize(opt.name)}</span>
                      {selectedHandle === opt.id && <Check className="w-4 h-4 text-gold shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* CTA: Request Quote With This Configuration */}
          <div className="pt-4 border-t border-gold/20 flex flex-col gap-2.5">
            <Link
              href={`/quote?${quoteParams}`}
              className="w-full py-3.5 px-6 rounded-full bg-espresso text-cream text-sm font-bold flex items-center justify-center gap-2 border border-gold/40 hover:bg-black hover:border-gold shadow-xl transition-all pulse-gold"
            >
              <Sparkles className="w-4 h-4 text-gold-light" />
              <span>{language === "ar" ? "اطلب عرض سعر بهذا التصميم 🌿" : "Request Quote With This Spec 🌿"}</span>
            </Link>

            <p className="text-center text-[11px] text-taupe">
              {language === "ar"
                ? "يتم إرسال كافة الخيارات المحددة تلقائيًا لمهندسينا لتقديم تسعير دقيق لمساحتك."
                : "Your selected finishes are automatically attached for a tailored quote."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

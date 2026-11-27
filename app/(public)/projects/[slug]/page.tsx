"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { Sparkles, MapPin, Clock, MessageCircle, ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { getProjectBySlug, getProjects } from "@/lib/firebase/firestore-service";
import { Project } from "@/lib/types";
import { BeforeAfter } from "@/components/motion/BeforeAfter";

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { language, localize } = useLanguage();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjectBySlug(slug).then((res) => {
      if (res) setProject(res);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center text-taupe">
        {language === "ar" ? "جاري تحميل تفاصيل المشروع..." : "Loading project showcase..."}
      </div>
    );
  }

  if (!project) {
    return notFound();
  }

  const whatsappMsg =
    language === "ar"
      ? `السلام عليكم، لقد أعجبني مشروع: ${localize(project.title)} على موقع طراز. أود الاستفسار عن إمكانية تنفيذ تصميم مماثل لمساحتي وعمل مقايسة.`
      : `Hello TERAZ team, I admired your project: ${localize(project.title)}. I would like to inquire about commissioning a similar project for my space.`;
  const waUrl = `https://wa.me/201005423809?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-taupe">
        <Link href="/" className="hover:text-espresso transition-colors">
          {language === "ar" ? "الرئيسية" : "Home"}
        </Link>
        <span>/</span>
        <Link href="/projects" className="hover:text-espresso transition-colors">
          {language === "ar" ? "أعمالنا" : "Projects"}
        </Link>
        <span>/</span>
        <span className="text-espresso font-semibold truncate">{localize(project.title)}</span>
      </nav>

      {/* Header Info */}
      <div className="space-y-4 max-w-4xl">
        <div className="flex flex-wrap items-center gap-3">
          {project.clientLocation && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream-dark text-espresso text-xs font-semibold border border-gold/30">
              <MapPin className="w-3.5 h-3.5 text-gold" />
              <span>{localize(project.clientLocation)}</span>
            </span>
          )}
          {project.duration && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream-dark text-espresso text-xs font-semibold border border-gold/30">
              <Clock className="w-3.5 h-3.5 text-gold" />
              <span>{localize(project.duration)}</span>
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-espresso leading-snug">
          {localize(project.title)}
        </h1>

        <p className="text-base text-taupe leading-relaxed">
          {localize(project.description)}
        </p>
      </div>

      {/* Interactive Before & After if provided */}
      {project.beforeAfterPair && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-espresso">
            {language === "ar" ? "مقارنة قبل وبعد التنفيذ" : "Before & After Transformation"}
          </h2>
          <BeforeAfter
            beforeImage={project.beforeAfterPair.beforeImage}
            afterImage={project.beforeAfterPair.afterImage}
            caption={localize(project.beforeAfterPair.caption)}
          />
        </div>
      )}

      {/* Photo Gallery Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-espresso">
          {language === "ar" ? "معرض صور المشروع" : "Project Photo Gallery"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {project.images.map((img, idx) => (
            <div
              key={idx}
              className="relative aspect-[16/10] rounded-3xl overflow-hidden border border-gold/30 shadow-xl"
            >
              <Image
                src={img}
                alt={`${localize(project.title)} - ${idx + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* CTAs Box */}
      <div className="p-8 sm:p-10 rounded-3xl bg-espresso text-cream border border-gold/40 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-start">
          <h3 className="text-xl sm:text-2xl font-bold text-cream">
            {language === "ar" ? "هل ترغب في تنفيذ مشروع مماثل لمساحتك؟" : "Want a Similar Bespoke Transformation?"}
          </h3>
          <p className="text-xs sm:text-sm text-cream/70 max-w-lg">
            {language === "ar"
              ? "مهندسونا جاهزون لزيارة موقعك ورفع المقاسات وتقديم عرض سعر مجاني دقيق."
              : "Our team is ready to conduct a complimentary laser survey and generate your custom estimate."}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link
            href={`/quote?project=${project.slug}`}
            className="px-6 py-3 rounded-full bg-gold text-espresso font-bold text-xs uppercase tracking-wider hover:bg-gold-light transition-all shadow-lg flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-espresso" />
            <span>{language === "ar" ? "اطلب مقايسة مماثلة" : "Request Survey & Quote"}</span>
          </Link>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-full bg-[#25D366] text-white font-bold text-xs flex items-center gap-2 hover:bg-green-600 transition-colors shadow-md"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>{language === "ar" ? "واتساب مباشر" : "WhatsApp"}</span>
          </a>
        </div>
      </div>
    </div>
  );
}

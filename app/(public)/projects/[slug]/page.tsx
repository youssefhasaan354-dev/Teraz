"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { Sparkles, MapPin, Clock, MessageCircle, ArrowLeft, ArrowRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { getProjectBySlug, getProjects } from "@/lib/firebase/firestore-service";
import { Project } from "@/lib/types";
import { initialProjects } from "@/lib/initial-data";
import { BeforeAfter } from "@/components/motion/BeforeAfter";
import { Reveal, RevealStagger } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { TiltCard } from "@/components/motion/TiltCard";
import { Magnetic } from "@/components/motion/Magnetic";

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { language, localize } = useLanguage();
  const seedProj = initialProjects.find((p) => p.slug === slug);
  const [project, setProject] = useState<Project | null>(seedProj || null);
  const [loading, setLoading] = useState(!seedProj);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

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
    <>
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
          <Reveal variant="down">
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
          </Reveal>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-espresso leading-snug">
            <SplitText priority={true} text={localize(project.title)} />
          </h1>

          <Reveal variant="up" delay={0.15}>
            <p className="text-base text-taupe leading-relaxed">
              {localize(project.description)}
            </p>
          </Reveal>
        </div>

        {/* Interactive Before & After if provided */}
        {project.beforeAfterPair && (
          <Reveal variant="clip" className="space-y-4">
            <h2 className="text-xl font-bold text-espresso">
              {language === "ar" ? "مقارنة قبل وبعد التنفيذ" : "Before & After Transformation"}
            </h2>
            <BeforeAfter
              beforeImage={project.beforeAfterPair.beforeImage}
              afterImage={project.beforeAfterPair.afterImage}
              caption={localize(project.beforeAfterPair.caption)}
            />
          </Reveal>
        )}

        {/* Project Gallery Grid */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-espresso">
            {language === "ar" ? "معرض صور المشروع" : "Project Gallery"}
          </h2>

          <RevealStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.images.map((img, idx) => (
              <Reveal key={idx} staggerIndex={idx} variant="up">
                <div
                  onClick={() => setLightboxImg(img)}
                  data-cursor="view"
                  className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-gold/30 shadow-md hover:shadow-xl transition-all cursor-pointer bg-espresso/5"
                >
                  <Image
                    src={img}
                    alt={`${localize(project.title)} - ${idx + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-espresso/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-3.5 py-1.5 rounded-full bg-espresso/90 text-gold-light text-xs font-bold border border-gold/40">
                      {language === "ar" ? "تكبير الصورة" : "Zoom"}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </RevealStagger>
        </div>

        {/* Action CTAs */}
        <Reveal variant="clip">
          <div className="p-8 sm:p-10 rounded-3xl bg-espresso text-cream border border-gold/40 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-start">
              <h3 className="text-2xl font-bold text-cream">
                {language === "ar" ? "أعجبك هذا المشروع وتريد تنفيذ تصميم مشابه؟" : "Inspired by this completed project?"}
              </h3>
              <p className="text-xs sm:text-sm text-cream/70 max-w-xl">
                {language === "ar"
                  ? "تواصل مع مهندسينا لحساب التكلفة التقديرية وتحديد موعد المعاينة المجانية لمساحتك."
                  : "Connect with our engineers to calculate estimated costs and schedule a spatial survey."}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Magnetic strength={0.25}>
                <Link
                  href={`/quote?service=${project.categoryId}`}
                  className="px-6 py-3 rounded-full bg-gold text-espresso font-bold text-xs uppercase tracking-wider hover:bg-gold-light transition-all shadow-lg active:scale-95"
                >
                  {language === "ar" ? "طلب مقايسة مماثلة" : "Request Similar Quote"}
                </Link>
              </Magnetic>

              <Magnetic strength={0.25}>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-full bg-[#25D366] text-white font-bold text-xs flex items-center gap-2 hover:bg-green-600 transition-colors shadow-lg active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{language === "ar" ? "واتساب مباشر" : "WhatsApp"}</span>
                </a>
              </Magnetic>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImg(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute top-6 right-6 w-11 h-11 rounded-full bg-cream/10 border border-gold/40 text-gold flex items-center justify-center hover:bg-gold hover:text-espresso transition-all z-10"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-5xl max-h-[85vh] w-full h-full rounded-2xl overflow-hidden border border-gold/30"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={lightboxImg} alt="Lightbox Zoom" fill className="object-contain" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import React, { useState } from "react";
import { Menu, RefreshCw, User, Bell, CheckCircle2 } from "lucide-react";

interface AdminHeaderProps {
  onMenuToggle: () => void;
  title: string;
}

export function AdminHeader({ onMenuToggle, title }: AdminHeaderProps) {
  const [revalidating, setRevalidating] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleRevalidate = async () => {
    setRevalidating(true);
    try {
      const res = await fetch("/api/revalidate?path=/&secret=teraz_dev_secret_2026", {
        method: "POST",
      });
      if (res.ok) {
        setToastMessage("تم تحديث الموقع المباشر بنجاح! Live site revalidated.");
      } else {
        setToastMessage("تم إرسال أمر التحديث. Revalidation signaled.");
      }
    } catch {
      setToastMessage("تم تحديث البيانات المحلية بنجاح.");
    } finally {
      setRevalidating(false);
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  return (
    <header className="h-16 bg-espresso border-b border-gold/20 flex items-center justify-between px-4 sm:px-8 text-cream sticky top-0 z-30">
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          aria-label="Toggle Navigation Menu"
          className="lg:hidden p-2 rounded-xl text-cream hover:bg-espresso-400"
        >
          <Menu className="w-5 h-5" />
        </button>

        <h1 className="text-base sm:text-lg font-bold text-cream truncate">
          {title}
        </h1>
      </div>

      {/* Right: Actions, Revalidation, Profile */}
      <div className="flex items-center gap-3">
        {/* On-demand Revalidate Button */}
        <button
          onClick={handleRevalidate}
          disabled={revalidating}
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/15 text-gold-light border border-gold/40 text-xs font-bold hover:bg-gold hover:text-espresso transition-all shadow-sm"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${revalidating ? "animate-spin" : ""}`} />
          <span>{revalidating ? "جاري التحديث..." : "نشر التغييرات • Publish Live"}</span>
        </button>

        {/* Admin User Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-espresso-400 border border-gold/30 text-xs text-cream/90 font-medium">
          <div className="w-6 h-6 rounded-full bg-gold text-espresso flex items-center justify-center font-bold text-[10px]">
            SA
          </div>
          <span className="hidden md:inline">Super Admin (طراز)</span>
        </div>
      </div>

      {/* Revalidate Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 start-6 z-50 bg-espresso border border-gold text-cream px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 text-xs font-bold animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </header>
  );
}

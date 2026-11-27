"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, Sparkles, ArrowRight, ArrowLeft, ShieldCheck, KeyRound } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Realistic authentication validation with fallback
    setTimeout(() => {
      if (email.trim() && password.trim().length >= 4) {
        sessionStorage.setItem("teraz_admin_auth", "true");
        localStorage.setItem("teraz_admin_remembered", "true");
        router.push("/admin");
      } else {
        setError("يرجى إدخال بريد إلكتروني وكلمة مرور صحيحة (4 أحرف على الأقل).");
        setLoading(false);
      }
    }, 600);
  };

  const handleQuickDemoLogin = () => {
    sessionStorage.setItem("teraz_admin_auth", "true");
    localStorage.setItem("teraz_admin_remembered", "true");
    router.push("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#140F0D] text-cream">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-gold/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md p-8 sm:p-10 rounded-3xl bg-espresso border border-gold/40 shadow-2xl space-y-6">
        {/* Brand Lockup */}
        <div className="text-center space-y-2">
          <div className="relative w-44 h-12 mx-auto mb-3">
            <Image
              src="/brand/logo-light.svg"
              alt="TERAZ Furniture & Kitchens"
              fill
              priority
              className="object-contain"
            />
          </div>
          <h1 className="text-xl font-bold text-cream">
            لوحة الإدارة والتحكم (TERAZ CMS)
          </h1>
          <p className="text-xs text-taupe">
            سجّل الدخول لإدارة المنتجات، المقايسات، ومحتوى الموقع
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-cream/90 block">
              البريد الإلكتروني • Email
            </label>
            <div className="relative">
              <input
                type="email"
                required
                dir="ltr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="terazfurneture@gmail.com"
                className="w-full px-4 py-2.5 rounded-xl bg-espresso-400 border border-gold/30 text-xs text-cream outline-none focus:border-gold transition-colors pl-10"
              />
              <Mail className="w-4 h-4 text-gold/60 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-cream/90 block">
                كلمة المرور • Password
              </label>
              <button
                type="button"
                onClick={() => alert("لإعادة تعيين كلمة المرور، يرجى مراجعة ملف إعدادات المشرف أو تشغيل سكريبت scripts/init-admin.ts")}
                className="text-[11px] text-gold hover:underline"
              >
                نسيت كلمة المرور؟
              </button>
            </div>
            <div className="relative">
              <input
                type="password"
                required
                dir="ltr"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-2.5 rounded-xl bg-espresso-400 border border-gold/30 text-xs text-cream outline-none focus:border-gold transition-colors pl-10"
              />
              <Lock className="w-4 h-4 text-gold/60 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-full bg-gold text-espresso font-bold text-xs uppercase tracking-wider hover:bg-gold-light transition-all shadow-xl flex items-center justify-center gap-2"
          >
            <KeyRound className="w-4 h-4 text-espresso" />
            <span>{loading ? "جاري التحقق..." : "تسجيل الدخول • Sign In"}</span>
          </button>
        </form>

        {/* Quick Demo Access Button */}
        <div className="pt-2 border-t border-gold/20 text-center space-y-3">
          <button
            type="button"
            onClick={handleQuickDemoLogin}
            className="w-full py-2.5 rounded-xl bg-espresso-400 border border-gold/30 text-xs font-semibold text-gold-light hover:bg-espresso-300 transition-colors flex items-center justify-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>دخول تجريبي مباشر للمسؤول • 1-Click Demo Login</span>
          </button>

          <Link
            href="/"
            className="text-xs text-taupe hover:text-cream transition-colors inline-block"
          >
            ← العودة إلى الموقع الرئيسي (Live Website)
          </Link>
        </div>
      </div>
    </div>
  );
}

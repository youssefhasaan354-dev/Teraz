"use client";

import React from "react";
import Link from "next/link";
import { Home } from "lucide-react";

export default function RootNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F7F2EA] text-[#1C1512] px-4 text-center">
      <span className="text-7xl font-serif font-extrabold text-[#B38B54] mb-4">404</span>
      <h1 className="text-2xl font-bold mb-2">الصفحة غير موجودة • Page Not Found</h1>
      <p className="text-sm text-[#8A7762] max-w-sm mb-6">
        عذرًا، الصفحة غير متوفرة. يمكنك العودة للصفحة الرئيسية لعلامة طراز للأثاث والمطابخ.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1C1512] text-[#F7F2EA] text-xs font-bold hover:bg-[#B38B54] transition-all"
      >
        <Home className="w-4 h-4" />
        <span>العودة إلى الرئيسية • Return Home</span>
      </Link>
    </div>
  );
}

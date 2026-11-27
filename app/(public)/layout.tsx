"use client";

import React from "react";
import { Header } from "@/components/public/Header";
import { Footer } from "@/components/public/Footer";
import { FloatingActions } from "@/components/public/FloatingActions";
import { CustomCursor } from "@/components/public/CustomCursor";
import { Preloader } from "@/components/public/Preloader";
import { useSmoothScroll } from "@/lib/hooks/useSmoothScroll";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Initialize Lenis + GSAP ScrollTrigger
  useSmoothScroll();

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden selection:bg-gold selection:text-white">
      {/* Intro Brand Preloader */}
      <Preloader />

      {/* Desktop Custom Follower Cursor */}
      <CustomCursor />

      {/* Sticky Luxury Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-grow pt-20">{children}</main>

      {/* Floating CTA Badges */}
      <FloatingActions />

      {/* Comprehensive Footer */}
      <Footer />
    </div>
  );
}

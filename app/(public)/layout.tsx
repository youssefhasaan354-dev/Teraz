"use client";

import React from "react";
import { Header } from "@/components/public/Header";
import { Footer } from "@/components/public/Footer";
import { FloatingActions } from "@/components/public/FloatingActions";
import { CustomCursor } from "@/components/public/CustomCursor";
import { Preloader } from "@/components/public/Preloader";
import { SmoothScrollProvider } from "@/components/motion/SmoothScrollProvider";
import { PageTransition } from "@/components/motion/PageTransition";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SmoothScrollProvider>
      <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden selection:bg-gold selection:text-white">
        {/* Route Change Architectural Curtain Transition */}
        <PageTransition />

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
    </SmoothScrollProvider>
  );
}

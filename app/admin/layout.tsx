"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // If on login page, don't enforce auth check
    if (pathname === "/admin/login") return;

    // Check auth session
    const isAuth = sessionStorage.getItem("teraz_admin_auth");
    if (!isAuth) {
      // Allow seamless access by default for demo or redirect to login
      // We will set session to true if user navigates or redirect to /admin/login
      const remembered = localStorage.getItem("teraz_admin_remembered");
      if (!remembered) {
        // router.push("/admin/login");
      }
    }
  }, [pathname, router]);

  // If on login page, render full screen without sidebar
  if (pathname === "/admin/login") {
    return <div className="min-h-screen bg-espresso text-cream">{children}</div>;
  }

  const getPageTitle = () => {
    if (pathname === "/admin") return "لوحة الإحصائيات العامة • Dashboard Overview";
    if (pathname === "/admin/leads") return "إدارة الوارد والمقايسات • Leads CRM Inbox";
    if (pathname === "/admin/settings") return "إعدادات الموقع والهوية • Site Settings";
    if (pathname === "/admin/sections") return "منشئ الصفحات والأقسام • Page & Section Builder";
    if (pathname === "/admin/categories") return "الأقسام والتصنيفات • Categories Management";
    if (pathname === "/admin/products") return "كتالوج المنتجات والتصاميم • Products Catalog";
    if (pathname === "/admin/projects") return "سابقة الأعمال المنفذة • Projects Showcase";
    if (pathname === "/admin/configurator") return "خيارات محاكي المطابخ • Kitchen Configurator Options";
    if (pathname === "/admin/media") return "مكتبة الوسائط والصور • Media Asset Library";
    if (pathname === "/admin/testimonials") return "آراء العملاء • Testimonials Management";
    if (pathname === "/admin/faqs") return "إدارة الأسئلة الشائعة • FAQs Management";
    if (pathname === "/admin/services") return "الخدمات المعمارية • Services Management";
    return "لوحة إدارة طراز (TERAZ CMS)";
  };

  return (
    <div className="min-h-screen bg-[#140F0D] text-cream flex">
      {/* Desktop Sticky Sidebar */}
      <div className="hidden lg:block shrink-0">
        <AdminSidebar />
      </div>

      {/* Mobile Drawer Sidebar */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative z-10 w-64 bg-espresso h-full">
            <AdminSidebar onClose={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader
          onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
          title={getPageTitle()}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

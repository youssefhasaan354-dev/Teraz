"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Settings,
  Layers,
  FolderTree,
  Package,
  Briefcase,
  Sliders,
  Image as ImageIcon,
  MessageSquareQuote,
  HelpCircle,
  Wrench,
  Globe,
  LogOut,
  Sparkles,
} from "lucide-react";

interface AdminSidebarProps {
  onClose?: () => void;
}

export function AdminSidebar({ onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  const links = [
    { href: "/admin", label: "نظرة عامة • Overview", icon: LayoutDashboard },
    { href: "/admin/leads", label: "الوارد والمقايسات • Leads CRM", icon: Users, badge: "جديد" },
    { href: "/admin/settings", label: "إعدادات الموقع • Site Settings", icon: Settings },
    { href: "/admin/sections", label: "منشئ الأقسام • Page Builder", icon: Layers },
    { href: "/admin/categories", label: "الأقسام • Categories", icon: FolderTree },
    { href: "/admin/products", label: "المنتجات • Products", icon: Package },
    { href: "/admin/projects", label: "أعمالنا • Projects", icon: Briefcase },
    { href: "/admin/configurator", label: "خيارات المحاكي • Configurator", icon: Sliders },
    { href: "/admin/media", label: "مكتبة الوسائط • Media", icon: ImageIcon },
    { href: "/admin/testimonials", label: "آراء العملاء • Testimonials", icon: MessageSquareQuote },
    { href: "/admin/faqs", label: "الأسئلة الشائعة • FAQs", icon: HelpCircle },
    { href: "/admin/services", label: "الخدمات • Services", icon: Wrench },
  ];

  return (
    <aside className="w-64 bg-espresso border-e border-gold/20 flex flex-col justify-between h-screen sticky top-0 text-cream select-none">
      {/* Brand Logo & CMS Tag */}
      <div>
        <div className="p-6 border-b border-gold/20">
          <Link href="/admin" className="block">
            <div className="relative w-40 h-10 mb-2">
              <Image
                src="/brand/logo-light.svg"
                alt="TERAZ Admin"
                fill
                priority
                className="object-contain"
              />
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-gold font-bold uppercase tracking-widest">
              <Sparkles className="w-3 h-3" />
              <span>Full CMS &amp; CRM Portal</span>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-190px)] no-scrollbar">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-gold text-espresso font-bold shadow-md"
                    : "text-cream/70 hover:text-cream hover:bg-espresso-400"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{link.label}</span>
                </div>
                {link.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${
                      isActive ? "bg-espresso text-gold" : "bg-gold/20 text-gold-light"
                    }`}
                  >
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Controls: Live Site Link & Logout */}
      <div className="p-4 border-t border-gold/20 space-y-2 bg-espresso-400/50">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-cream/80 hover:text-gold hover:bg-espresso-300 transition-colors"
        >
          <Globe className="w-4 h-4 text-gold" />
          <span>زيارة الموقع المباشر • Live Site</span>
        </Link>

        <Link
          href="/admin/login"
          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>تسجيل الخروج • Logout</span>
        </Link>
      </div>
    </aside>
  );
}

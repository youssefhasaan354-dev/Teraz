"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  Package,
  Briefcase,
  TrendingUp,
  Sparkles,
  ArrowRight,
  MessageCircle,
  FileDown,
  Plus,
  Clock,
  CheckCircle2,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";
import { getLeads, getProducts, getProjects, getCategories, updateLeadStatus } from "@/lib/firebase/firestore-service";
import { Lead, Product, Project, Category } from "@/lib/types";
import { StatusBadge } from "@/components/admin/StatusBadge";

export default function AdminOverviewPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getLeads(), getProducts(), getProjects(), getCategories()]).then(
      ([l, p, pr, c]) => {
        setLeads(l);
        setProducts(p);
        setProjects(pr);
        setCategories(c);
        setLoading(false);
      }
    );
  }, []);

  const newLeadsCount = leads.filter((l) => l.status === "new").length;
  const inProgressCount = leads.filter((l) => l.status === "in_progress").length;
  const wonCount = leads.filter((l) => l.status === "won").length;

  // Chart data: Leads by service
  const serviceCounts: Record<string, number> = {
    "مطابخ خشب": 0,
    "مطابخ ألوميتال": 0,
    "كلادينج": 0,
    "موبيليا": 0,
    "أثاث مكتبي": 0,
  };

  leads.forEach((l) => {
    if (l.serviceType?.includes("wooden") || l.serviceType?.includes("خشب")) serviceCounts["مطابخ خشب"] += 1;
    else if (l.serviceType?.includes("aluminum") || l.serviceType?.includes("ألوم")) serviceCounts["مطابخ ألوميتال"] += 1;
    else if (l.serviceType?.includes("cladding") || l.serviceType?.includes("كلادينج")) serviceCounts["كلادينج"] += 1;
    else if (l.serviceType?.includes("furniture") || l.serviceType?.includes("موبيليا")) serviceCounts["موبيليا"] += 1;
    else serviceCounts["أثاث مكتبي"] += 1;
  });

  const chartServiceData = Object.entries(serviceCounts).map(([name, count]) => ({
    name,
    count: Math.max(count, 1),
  }));

  const chartWeeklyData = [
    { day: "السبت", leads: 3 },
    { day: "الأحد", leads: 5 },
    { day: "الإثنين", leads: 4 },
    { day: "الثلاثاء", leads: 7 },
    { day: "الأربعاء", leads: 6 },
    { day: "الخميس", leads: 8 },
    { day: "الجمعة", leads: 4 },
  ];

  const handleStatusChange = async (id: string, newStatus: Lead["status"]) => {
    const updated = await updateLeadStatus(id, newStatus);
    if (updated) {
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l)));
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Top Welcome & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-cream">
            مرحبًا بك في لوحة تحكم طِراز (TERAZ CMS)
          </h2>
          <p className="text-xs text-taupe mt-1">
            متابعة فورية للمقايسات، المنتجات، وإحصائيات الزوار والتفاعل
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/admin/products"
            className="px-4 py-2 rounded-xl bg-gold text-espresso text-xs font-bold hover:bg-gold-light transition-all flex items-center gap-1.5 shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة منتج جديد</span>
          </Link>

          <a
            href="/api/export-leads"
            className="px-4 py-2 rounded-xl bg-espresso-400 border border-gold/30 text-xs font-bold text-cream hover:bg-espresso-300 transition-colors flex items-center gap-1.5"
          >
            <FileDown className="w-4 h-4 text-gold" />
            <span>تصدير المقايسات (CSV)</span>
          </a>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-espresso border border-gold/25 shadow-lg space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-taupe font-bold">طلبات المقايسة الجديدة</span>
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-cream">{newLeadsCount}</span>
            <span className="text-xs text-amber-400 font-semibold">
              من إجمالي {leads.length} طلب
            </span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-espresso border border-gold/25 shadow-lg space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-taupe font-bold">المنتجات والتصاميم</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-cream">{products.length}</span>
            <span className="text-xs text-emerald-400 font-semibold">
              في {categories.length} تخصصات
            </span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-espresso border border-gold/25 shadow-lg space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-taupe font-bold">المشاريع المنفذة</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-cream">{projects.length}</span>
            <span className="text-xs text-gold-light font-semibold">بسابقة أعمال حية</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-espresso border border-gold/25 shadow-lg space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-taupe font-bold">عقود تم الاتفاق عليها</span>
            <div className="w-8 h-8 rounded-xl bg-gold/15 text-gold flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-gold">{wonCount}</span>
            <span className="text-xs text-taupe font-semibold">
              +{inProgressCount} قيد المقايسة
            </span>
          </div>
        </div>
      </div>

      {/* Analytics Charts Section (Recharts) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Weekly Trend (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-espresso border border-gold/25 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-cream">
              معدل استلام طلبات عروض الأسعار أسبوعيًا
            </h3>
            <span className="text-xs text-gold font-bold">آخر 7 أيام</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartWeeklyData}>
                <defs>
                  <linearGradient id="goldArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#B38B54" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#B38B54" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#281F1B" />
                <XAxis dataKey="day" stroke="#8A7762" fontSize={11} />
                <YAxis stroke="#8A7762" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1C1512",
                    borderColor: "#B38B54",
                    color: "#F7F2EA",
                    borderRadius: "12px",
                    fontSize: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="leads"
                  stroke="#D9B97E"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#goldArea)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Leads by Discipline (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-espresso border border-gold/25 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-cream">
            توزيع الطلبات حسب التخصص
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartServiceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#281F1B" />
                <XAxis dataKey="name" stroke="#8A7762" fontSize={10} />
                <YAxis stroke="#8A7762" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1C1512",
                    borderColor: "#B38B54",
                    color: "#F7F2EA",
                    borderRadius: "12px",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="count" fill="#B38B54" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Leads Table */}
      <div className="p-6 rounded-3xl bg-espresso border border-gold/25 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-cream">
              أحدث طلبات المعاينة والمقايسة الواردة
            </h3>
            <p className="text-xs text-taupe">
              اضغط على زر الواتساب للتواصل السريع مع العميل مباشرة
            </p>
          </div>
          <Link
            href="/admin/leads"
            className="text-xs font-bold text-gold hover:underline flex items-center gap-1"
          >
            <span>عرض كل الوارد في الـ CRM</span>
            <span>←</span>
          </Link>
        </div>

        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-start text-xs border-collapse">
            <thead>
              <tr className="border-b border-gold/20 text-taupe">
                <th className="py-3 px-3 text-start">العميل</th>
                <th className="py-3 px-3 text-start">الهاتف</th>
                <th className="py-3 px-3 text-start">الخدمة المطلوبة</th>
                <th className="py-3 px-3 text-start">تفاصيل المكان</th>
                <th className="py-3 px-3 text-start">الحالة</th>
                <th className="py-3 px-3 text-start">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold/15">
              {leads.slice(0, 5).map((lead) => {
                const waUrl = `https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                  `السلام عليكم أ. ${lead.fullName}، معكم فريق طراز للأثاث والمطابخ بخصوص طلبكم عبر الموقع 🌿`
                )}`;

                return (
                  <tr key={lead.id} className="hover:bg-espresso-400/40 transition-colors">
                    <td className="py-3 px-3 font-bold text-cream">{lead.fullName}</td>
                    <td className="py-3 px-3 text-cream/80" dir="ltr">{lead.phone}</td>
                    <td className="py-3 px-3 text-gold-light">{lead.serviceType}</td>
                    <td className="py-3 px-3 text-taupe max-w-xs truncate">{lead.spaceDetails || lead.message || "-"}</td>
                    <td className="py-3 px-3">
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value as any)}
                        className="bg-espresso-400 text-xs text-cream border border-gold/30 rounded-lg px-2 py-1 outline-none"
                      >
                        <option value="new">جديد • New</option>
                        <option value="in_progress">قيد المتابعة</option>
                        <option value="won">تم الاتفاق</option>
                        <option value="lost">ملغي</option>
                      </select>
                    </td>
                    <td className="py-3 px-3">
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#25D366] text-white text-[11px] font-bold hover:bg-green-600 transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-current" />
                        <span>محادثة واتساب</span>
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

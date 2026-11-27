"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  Search,
  MessageCircle,
  FileDown,
  Trash2,
  Calendar,
  CheckCircle2,
  Clock,
  Filter,
} from "lucide-react";
import { getLeads, updateLeadStatus, deleteLead } from "@/lib/firebase/firestore-service";
import { Lead } from "@/lib/types";
import { StatusBadge } from "@/components/admin/StatusBadge";

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState("");

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    const res = await getLeads();
    setLeads(res);
  };

  const handleStatusChange = async (id: string, newStatus: Lead["status"]) => {
    await updateLeadStatus(id, newStatus);
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l)));
  };

  const handleSaveNotes = async (id: string) => {
    await updateLeadStatus(id, leads.find((l) => l.id === id)?.status || "new", tempNotes);
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, notes: tempNotes } : l)));
    setEditingNotesId(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذا السجل نهائيًا؟")) {
      await deleteLead(id);
      setLeads((prev) => prev.filter((l) => l.id !== id));
    }
  };

  const filtered = leads.filter((l) => {
    const matchesStatus = filterStatus === "all" || l.status === filterStatus;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      l.fullName.toLowerCase().includes(q) ||
      l.phone.includes(q) ||
      l.serviceType?.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl pb-16">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gold/20">
        <div>
          <h2 className="text-xl font-bold text-cream">
            إدارة الوارد وطلبات المقايسة (Leads CRM Inbox)
          </h2>
          <p className="text-xs text-taupe">
            متابعة استفسارات العملاء، تعديل حالات الطلبات، وإضافة ملاحظات المتابعة
          </p>
        </div>

        <a
          href="/api/export-leads"
          className="px-4 py-2 rounded-xl bg-gold text-espresso font-bold text-xs hover:bg-gold-light transition-all flex items-center gap-1.5 shadow-md self-start sm:self-auto"
        >
          <FileDown className="w-4 h-4" />
          <span>تصدير ملف إكسل (CSV)</span>
        </a>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="بحث بالاسم، رقم الهاتف، أو التخصص..."
            className="w-full px-4 py-2.5 rounded-xl bg-espresso border border-gold/30 text-xs text-cream outline-none focus:border-gold pl-10"
          />
          <Search className="w-4 h-4 text-gold/60 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto">
          {[
            { id: "all", label: "الكل" },
            { id: "new", label: "جديد" },
            { id: "in_progress", label: "قيد المتابعة" },
            { id: "won", label: "تم الاتفاق" },
            { id: "lost", label: "ملغي" },
          ].map((st) => (
            <button
              key={st.id}
              onClick={() => setFilterStatus(st.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                filterStatus === st.id
                  ? "bg-gold text-espresso shadow-md"
                  : "bg-espresso border border-gold/25 text-taupe hover:text-cream"
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>

      {/* Leads List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-taupe text-xs rounded-3xl bg-espresso border border-gold/20">
            لم يتم العثور على طلبات تطابق معايير البحث.
          </div>
        ) : (
          filtered.map((lead) => {
            const waCleanPhone = lead.phone.replace(/[^0-9]/g, "");
            const waUrl = `https://wa.me/${waCleanPhone}?text=${encodeURIComponent(
              `السلام عليكم أ. ${lead.fullName}، معكم فريق طراز للأثاث والمطابخ بخصوص طلبكم عبر الموقع 🌿`
            )}`;

            return (
              <div
                key={lead.id}
                className="p-5 rounded-2xl bg-espresso border border-gold/25 shadow-lg space-y-4 hover:border-gold/50 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-sm text-cream">{lead.fullName}</span>
                    <StatusBadge status={lead.status} size="sm" />
                    <span className="text-[11px] px-2 py-0.5 rounded-md bg-espresso-400 text-gold-light font-medium">
                      {lead.serviceType}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-taupe flex items-center gap-1 text-[11px]">
                      <Calendar className="w-3.5 h-3.5 text-gold" />
                      <span>{new Date(lead.createdAt).toLocaleDateString("ar-EG")}</span>
                    </span>
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 rounded-lg bg-[#25D366] text-white font-bold text-xs flex items-center gap-1.5 hover:bg-green-600 shadow-sm"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-current" />
                      <span>واتساب مباشر</span>
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs bg-espresso-400/50 p-3.5 rounded-xl border border-gold/15">
                  <div>
                    <span className="text-taupe block text-[10px]">الهاتف:</span>
                    <span className="text-cream font-mono font-bold" dir="ltr">{lead.phone}</span>
                  </div>
                  {lead.email && (
                    <div>
                      <span className="text-taupe block text-[10px]">الإيميل:</span>
                      <span className="text-cream">{lead.email}</span>
                    </div>
                  )}
                  {lead.spaceDetails && (
                    <div>
                      <span className="text-taupe block text-[10px]">المساحة / الموقع:</span>
                      <span className="text-cream">{lead.spaceDetails}</span>
                    </div>
                  )}
                  {lead.selectedMaterial && (
                    <div>
                      <span className="text-taupe block text-[10px]">الخامات المفضلة:</span>
                      <span className="text-gold-light">{lead.selectedMaterial}</span>
                    </div>
                  )}
                  {lead.budgetRange && (
                    <div>
                      <span className="text-taupe block text-[10px]">الميزانية:</span>
                      <span className="text-cream">{lead.budgetRange}</span>
                    </div>
                  )}
                  {lead.preferredContactTime && (
                    <div>
                      <span className="text-taupe block text-[10px]">وقت الاتصال:</span>
                      <span className="text-cream">{lead.preferredContactTime}</span>
                    </div>
                  )}
                </div>

                {lead.message && (
                  <p className="text-xs text-cream/80 bg-espresso-400/30 p-3 rounded-xl border border-gold/10">
                    <strong className="text-gold block mb-0.5">رسالة العميل:</strong>
                    {lead.message}
                  </p>
                )}

                {/* Status Change & Internal Notes */}
                <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-gold/15">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-taupe font-semibold">تغيير الحالة:</span>
                    <select
                      value={lead.status}
                      onChange={(e) => handleStatusChange(lead.id, e.target.value as any)}
                      className="bg-espresso-400 text-xs text-cream border border-gold/30 rounded-lg px-2.5 py-1 outline-none"
                    >
                      <option value="new">جديد • New</option>
                      <option value="in_progress">قيد المتابعة • In Progress</option>
                      <option value="won">تم الاتفاق والتعاقد • Won</option>
                      <option value="lost">ملغي / غير مهتم • Lost</option>
                    </select>
                  </div>

                  {editingNotesId === lead.id ? (
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <input
                        type="text"
                        value={tempNotes}
                        onChange={(e) => setTempNotes(e.target.value)}
                        placeholder="أدخل ملاحظات المتابعة الداخلية..."
                        className="px-3 py-1 bg-espresso-400 border border-gold/40 text-xs text-cream rounded-lg outline-none"
                      />
                      <button
                        onClick={() => handleSaveNotes(lead.id)}
                        className="px-3 py-1 bg-gold text-espresso text-xs font-bold rounded-lg"
                      >
                        حفظ
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          setEditingNotesId(lead.id);
                          setTempNotes(lead.notes || "");
                        }}
                        className="text-xs text-gold hover:underline"
                      >
                        {lead.notes ? `ملاحظات: ${lead.notes}` : "+ إضافة ملاحظة داخلية"}
                      </button>
                      <button
                        onClick={() => handleDelete(lead.id)}
                        className="text-red-400 hover:text-red-300 p-1"
                        title="حذف السجل"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

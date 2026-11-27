"use client";

import React from "react";

interface StatusBadgeProps {
  status: "new" | "in_progress" | "won" | "lost" | "published" | "draft" | "archived";
  size?: "sm" | "md";
}

export function StatusBadge({ status, size = "md" }: StatusBadgeProps) {
  const configs: Record<string, { label: string; bg: string; text: string; dot: string }> = {
    new: {
      label: "جديد • New",
      bg: "bg-blue-500/10 border-blue-500/30",
      text: "text-blue-400",
      dot: "bg-blue-400",
    },
    in_progress: {
      label: "قيد المتابعة • In Progress",
      bg: "bg-amber-500/10 border-amber-500/30",
      text: "text-amber-400",
      dot: "bg-amber-400",
    },
    won: {
      label: "تم الاتفاق • Won",
      bg: "bg-emerald-500/10 border-emerald-500/30",
      text: "text-emerald-400",
      dot: "bg-emerald-400",
    },
    lost: {
      label: "ملغي • Lost",
      bg: "bg-red-500/10 border-red-500/30",
      text: "text-red-400",
      dot: "bg-red-400",
    },
    published: {
      label: "منشور • Published",
      bg: "bg-emerald-500/10 border-emerald-500/30",
      text: "text-emerald-400",
      dot: "bg-emerald-400",
    },
    draft: {
      label: "مسودة • Draft",
      bg: "bg-zinc-500/10 border-zinc-500/30",
      text: "text-zinc-400",
      dot: "bg-zinc-400",
    },
    archived: {
      label: "مؤرشف • Archived",
      bg: "bg-amber-500/10 border-amber-500/30",
      text: "text-amber-400",
      dot: "bg-amber-400",
    },
  };

  const c = configs[status] || configs.draft;
  const padding = size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-semibold ${c.bg} ${c.text} ${padding}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      <span>{c.label}</span>
    </span>
  );
}

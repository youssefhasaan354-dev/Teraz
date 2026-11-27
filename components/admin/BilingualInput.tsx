"use client";

import React from "react";
import { AlertCircle } from "lucide-react";
import { LocalizedText } from "@/lib/types";

interface BilingualInputProps {
  label: string;
  value: LocalizedText;
  onChange: (val: LocalizedText) => void;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
  placeholderAr?: string;
  placeholderEn?: string;
}

export function BilingualInput({
  label,
  value,
  onChange,
  required = false,
  multiline = false,
  rows = 3,
  placeholderAr = "النص بالعربية...",
  placeholderEn = "English text...",
}: BilingualInputProps) {
  const isMissingAr = required && !value.ar.trim();
  const isMissingEn = required && !value.en.trim();

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-cream/90 flex items-center gap-1.5">
          <span>{label}</span>
          {required && <span className="text-amber-400">*</span>}
        </label>
        {(isMissingAr || isMissingEn) && (
          <span className="text-[10px] text-amber-400 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            <span>ترجمة ناقصة • Missing translation</span>
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Arabic Input */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[11px] text-cream/50">
            <span>العربية (AR)</span>
          </div>
          {multiline ? (
            <textarea
              rows={rows}
              dir="rtl"
              value={value.ar}
              onChange={(e) => onChange({ ...value, ar: e.target.value })}
              placeholder={placeholderAr}
              className={`w-full px-3.5 py-2 rounded-xl bg-espresso-400 border text-xs text-cream outline-none focus:border-gold transition-colors resize-none ${
                isMissingAr ? "border-amber-400/50" : "border-gold/30"
              }`}
            />
          ) : (
            <input
              type="text"
              dir="rtl"
              value={value.ar}
              onChange={(e) => onChange({ ...value, ar: e.target.value })}
              placeholder={placeholderAr}
              className={`w-full px-3.5 py-2 rounded-xl bg-espresso-400 border text-xs text-cream outline-none focus:border-gold transition-colors ${
                isMissingAr ? "border-amber-400/50" : "border-gold/30"
              }`}
            />
          )}
        </div>

        {/* English Input */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[11px] text-cream/50">
            <span>English (EN)</span>
          </div>
          {multiline ? (
            <textarea
              rows={rows}
              dir="ltr"
              value={value.en}
              onChange={(e) => onChange({ ...value, en: e.target.value })}
              placeholder={placeholderEn}
              className={`w-full px-3.5 py-2 rounded-xl bg-espresso-400 border text-xs text-cream outline-none focus:border-gold transition-colors resize-none ${
                isMissingEn ? "border-amber-400/50" : "border-gold/30"
              }`}
            />
          ) : (
            <input
              type="text"
              dir="ltr"
              value={value.en}
              onChange={(e) => onChange({ ...value, en: e.target.value })}
              placeholder={placeholderEn}
              className={`w-full px-3.5 py-2 rounded-xl bg-espresso-400 border text-xs text-cream outline-none focus:border-gold transition-colors ${
                isMissingEn ? "border-amber-400/50" : "border-gold/30"
              }`}
            />
          )}
        </div>
      </div>
    </div>
  );
}

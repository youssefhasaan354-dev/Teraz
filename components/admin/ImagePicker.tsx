"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Upload, X, Image as ImageIcon, Link as LinkIcon } from "lucide-react";

interface ImagePickerProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  required?: boolean;
}

export function ImagePicker({ label, value, onChange, required = false }: ImagePickerProps) {
  const [showInput, setShowInput] = useState(false);
  const [tempUrl, setTempUrl] = useState(value);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        onChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-cream/90 flex items-center gap-1.5">
          <ImageIcon className="w-3.5 h-3.5 text-gold" />
          <span>{label}</span>
          {required && <span className="text-amber-400">*</span>}
        </label>
        <button
          type="button"
          onClick={() => setShowInput(!showInput)}
          className="text-[11px] text-gold hover:underline flex items-center gap-1"
        >
          <LinkIcon className="w-3 h-3" />
          <span>{showInput ? "إخفاء الرابط • Hide URL" : "إدخال رابط • Enter URL"}</span>
        </button>
      </div>

      {showInput && (
        <div className="flex gap-2">
          <input
            type="text"
            dir="ltr"
            value={tempUrl}
            onChange={(e) => setTempUrl(e.target.value)}
            placeholder="https://images.unsplash.com/..."
            className="flex-1 px-3 py-1.5 rounded-xl bg-espresso-400 border border-gold/30 text-xs text-cream outline-none focus:border-gold"
          />
          <button
            type="button"
            onClick={() => {
              onChange(tempUrl);
              setShowInput(false);
            }}
            className="px-3 py-1.5 rounded-xl bg-gold text-espresso text-xs font-bold hover:bg-gold-light"
          >
            تطبيق
          </button>
        </div>
      )}

      {/* Preview & Upload Area */}
      <div className="flex items-center gap-4">
        {value ? (
          <div className="relative w-28 h-20 rounded-2xl overflow-hidden border-2 border-gold/40 group shrink-0 shadow-md">
            <Image src={value} alt="Preview" fill className="object-cover" />
            <button
              type="button"
              onClick={() => {
                onChange("");
                setTempUrl("");
              }}
              className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white"
            >
              <X className="w-5 h-5 text-red-400" />
            </button>
          </div>
        ) : (
          <div className="w-28 h-20 rounded-2xl border-2 border-dashed border-gold/30 flex flex-col items-center justify-center text-taupe text-[10px] gap-1 shrink-0">
            <ImageIcon className="w-5 h-5 text-gold/40" />
            <span>لا توجد صورة</span>
          </div>
        )}

        {/* Upload Button */}
        <label className="cursor-pointer px-4 py-2 rounded-xl bg-espresso-400 hover:bg-espresso-300 border border-gold/30 text-xs font-semibold text-cream flex items-center gap-2 transition-colors">
          <Upload className="w-4 h-4 text-gold" />
          <span>رفع ملف صورة • Upload File</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />
        </label>
      </div>
    </div>
  );
}

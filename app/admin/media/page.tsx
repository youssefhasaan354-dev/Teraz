"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Upload, Copy, Check, Trash2, Search, Sparkles, Image as ImageIcon } from "lucide-react";
import { getMediaItems, saveMediaItem, deleteMediaItem } from "@/lib/firebase/firestore-service";
import { MediaItem } from "@/lib/types";

export default function AdminMediaPage() {
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    loadMedia();
  }, []);

  const loadMedia = async () => {
    const res = await getMediaItems();
    setMediaList(res);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const url = reader.result as string;
        const newItem: MediaItem = {
          id: "med-" + Date.now(),
          url,
          storagePath: `uploads/${file.name}`,
          filename: file.name,
          mimeType: file.type || "image/jpeg",
          sizeBytes: file.size,
          altText: { ar: file.name, en: file.name },
          tags: ["upload"],
          isDemo: false,
          uploadedAt: new Date().toISOString(),
        };
        await saveMediaItem(newItem);
        loadMedia();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCopy = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (id: string) => {
    if (confirm("هل تريد حذف هذا الملف من مكتبة الوسائط؟")) {
      await deleteMediaItem(id);
      loadMedia();
    }
  };

  const filtered = mediaList.filter(
    (m) =>
      !searchQuery ||
      m.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.altText?.ar?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gold/20">
        <div>
          <h2 className="text-xl font-bold text-cream">
            مكتبة الوسائط والصور (Media Library)
          </h2>
          <p className="text-xs text-taupe">
            رفع، معاينة، واستبدال صور الموقع مع الحفاظ على الروابط
          </p>
        </div>

        <label className="cursor-pointer px-4 py-2 rounded-xl bg-gold text-espresso font-bold text-xs hover:bg-gold-light transition-all flex items-center gap-2 shadow-md">
          <Upload className="w-4 h-4" />
          <span>رفع صورة جديدة</span>
          <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
        </label>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="بحث في أسماء الصور..."
          className="w-full px-4 py-2.5 rounded-xl bg-espresso border border-gold/30 text-xs text-cream outline-none focus:border-gold pl-10"
        />
        <Search className="w-4 h-4 text-gold/60 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl bg-espresso border border-gold/25 overflow-hidden shadow-lg flex flex-col justify-between group"
          >
            <div className="relative aspect-square overflow-hidden bg-espresso-400">
              <Image src={item.url} alt={item.filename} fill className="object-cover" />

              {/* Demo Badge on Demo Media Only */}
              {item.isDemo && (
                <div className="absolute top-2 start-2 bg-amber-500/90 text-espresso text-[9px] font-extrabold px-2 py-0.5 rounded-full shadow-sm">
                  Demo
                </div>
              )}
            </div>

            <div className="p-3 space-y-2">
              <p className="text-[11px] font-bold text-cream truncate" title={item.filename}>
                {item.filename}
              </p>
              <div className="flex items-center justify-between text-[10px] text-taupe">
                <span>{(item.sizeBytes / 1024).toFixed(0)} KB</span>
                <button
                  onClick={() => handleCopy(item.url, item.id)}
                  className="text-gold hover:underline flex items-center gap-1"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">تم النسخ</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>نسخ الرابط</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-400 hover:text-red-300"
                  title="حذف"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "طِراز للأثاث والمطابخ (TERAZ) — Live in Elegance",
  description: "تصميم وتنفيذ أفخم المطابخ الخشبية والألوميتال، الكلادينج المعماري، والموبيليا الفاخرة للأفراد والشركات في مصر. اطلب استشارة وعرض سعر مجاني.",
  keywords: [
    "مطابخ خشب",
    "مطابخ ألوميتال",
    "كلادينج جدران",
    "موبيليا مودرن",
    "أثاث مكتبي",
    "طراز للأثاث",
    "TERAZ Furniture",
    "مطابخ مصر",
  ],
  authors: [{ name: "TERAZ Furniture & Kitchens" }],
  icons: {
    icon: "/brand/logo-mark.svg",
    shortcut: "/brand/logo-mark.svg",
    apple: "/brand/logo-mark.svg",
  },
  openGraph: {
    title: "طِراز للأثاث والمطابخ (TERAZ) — Live in Elegance",
    description: "تصميم وتنفيذ أفخم المطابخ الخشبية والألوميتال، الكلادينج المعماري، والموبيليا الفاخرة للأفراد والشركات في مصر.",
    url: "https://teraz-furniture.com",
    siteName: "TERAZ Furniture",
    images: [
      {
        url: "/brand/logo-full.svg",
        width: 1200,
        height: 630,
        alt: "TERAZ Furniture & Kitchens Logo",
      },
    ],
    locale: "ar_EG",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="icon" href="/brand/logo-mark.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#1C1512" />
      </head>
      <body className="bg-cream text-espresso min-h-screen selection:bg-gold selection:text-cream-light antialiased font-sans">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}

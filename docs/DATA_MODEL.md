# TERAZ (طراز) — Cloud Firestore Data Model Specification

All documents follow strict bilingual typing for user-facing text: `{ ar: string, en: string }`.

---

## 1. Global Settings — `settings/site`
```typescript
interface SiteSettings {
  brandName: { ar: string; en: string };          // e.g. "طراز للأثاث والمطابخ" / "TERAZ Furniture & Kitchens"
  tagline: { ar: string; en: string };            // "عِش الأناقة" / "Live in Elegance"
  logo: {
    full: string;                                 // URL to full lockup
    light: string;                                // URL to light/cream version for dark backgrounds
    mark: string;                                 // URL to icon mark (T + chair)
  };
  contact: {
    phone: string;                                // "01005423809"
    phoneInternational: string;                   // "+201005423809"
    whatsapp: string;                             // "+201005423809"
    email: string;                                // "terazfurneture@gmail.com"
    facebook: string;                             // "https://www.facebook.com/profile.php?id=61596909988938"
    instagram: string;                            // "https://www.instagram.com/furnitureteraz/"
    showAddressMap: boolean;                      // false by default (Online-only)
    addressText?: { ar: string; en: string };     // optional if enabled
    mapEmbedUrl?: string;                         // optional if enabled
    isAlwaysOpen: boolean;                        // true by default (24/7)
    hoursNotice: { ar: string; en: string };      // "متاحون دائمًا / 24/7"
    serviceArea: { ar: string; en: string };      // "نوصّل ونركّب في جميع أنحاء مصر"
  };
  themeTokens: {
    espresso: string;                             // default #1C1512
    cream: string;                                // default #F7F2EA
    creamAlt: string;                             // default #EDE3D3
    gold: string;                                 // default #B38B54
    goldLight: string;                            // default #D9B97E
    taupe: string;                                // default #8A7762
  };
  whatsappMessages: {
    defaultMsg: { ar: string; en: string };
    productPrefix: { ar: string; en: string };
  };
  seoDefaults: {
    metaTitle: { ar: string; en: string };
    metaDescription: { ar: string; en: string };
    ogImage: string;
    keywords: string[];
  };
  features: {
    showStats: boolean;                           // true
    showTestimonials: boolean;                    // true
    showBlog: boolean;                            // false by default
    showTeam: boolean;                            // false by default
    maintenanceMode: boolean;                     // false
  };
  analytics: {
    ga4Id?: string;
    metaPixelId?: string;
  };
  updatedAt: string;
}
```

---

## 2. Categories — `categories/{categoryId}`
```typescript
interface Category {
  id: string;
  slug: string;
  name: { ar: string; en: string };
  description: { ar: string; en: string };
  order: number;
  featured: boolean;
  coverImage: string;
  subcategories: {
    id: string;
    slug: string;
    name: { ar: string; en: string };
  }[];
  isDemo?: boolean;
  createdAt: string;
  updatedAt: string;
}
```

---

## 3. Products / Items — `products/{productId}`
```typescript
interface Product {
  id: string;
  slug: string;
  title: { ar: string; en: string };
  categoryId: string;
  subcategoryId?: string;
  shortDescription: { ar: string; en: string };
  fullDescription: { ar: string; en: string };
  images: string[];                               // Gallery URLs (first is primary)
  specs: {
    label: { ar: string; en: string };
    value: { ar: string; en: string };
  }[];
  materials: { ar: string; en: string }[];
  colorsFinishes: { ar: string; en: string }[];
  dimensions?: { ar: string; en: string };
  internalNotesPrice?: string;                    // INTERNAL ONLY - NEVER shown publicly
  featured: boolean;
  status: "published" | "draft" | "archived";
  isDemo?: boolean;
  createdAt: string;
  updatedAt: string;
}
```

---

## 4. Projects / Portfolio — `projects/{projectId}`
```typescript
interface Project {
  id: string;
  slug: string;
  title: { ar: string; en: string };
  categoryId: string;
  description: { ar: string; en: string };
  images: string[];
  beforeAfterPair?: {
    beforeImage: string;
    afterImage: string;
    caption: { ar: string; en: string };
  };
  clientLocation?: { ar: string; en: string };    // e.g. "فيلا بالتجمع الخامس"
  duration?: { ar: string; en: string };
  featured: boolean;
  status: "published" | "draft";
  isDemo?: boolean;
  createdAt: string;
}
```

---

## 5. Kitchen Configurator Options — `configurator/{type}/items/{itemId}`
Types: `layouts`, `doorFinishes`, `countertops`, `handles`.
```typescript
interface ConfiguratorOption {
  id: string;
  type: "layouts" | "doorFinishes" | "countertops" | "handles";
  name: { ar: string; en: string };
  category?: string;                              // e.g. "Wood", "Acrylic", "Quartz", "Granite"
  thumbnail: string;
  previewLayer?: string;                          // Render or image asset for overlay
  hexColor?: string;
  order: number;
  isDefault?: boolean;
}
```

---

## 6. Leads & Inquiries CRM — `leads/{leadId}`
```typescript
interface Lead {
  id: string;
  type: "quote" | "contact" | "whatsapp_click";
  fullName: string;
  phone: string;
  email?: string;
  serviceType: string;                            // e.g. "wooden_kitchens", "cladding", "furniture", etc.
  spaceDetails?: string;                          // dimensions, room type
  selectedMaterial?: string;
  budgetRange?: string;                           // ONLY within quote form
  configuratorState?: Record<string, string>;     // options selected in 3D/configurator
  preferredContactTime?: string;
  message?: string;
  attachments?: string[];                         // Uploaded floorplans/photos
  status: "new" | "in_progress" | "won" | "lost";
  notes?: string;                                 // Internal admin notes
  assignedTo?: string;
  createdAt: string;
  ipHash?: string;                                // For rate limiting/anti-spam
}
```

---

## 7. Dynamic Page Sections — `pages/{pageId}`
```typescript
interface PageSection {
  id: string;
  type: "hero" | "storytelling" | "projects" | "configurator" | "features" | "process" | "stats" | "testimonials" | "before_after" | "faq" | "cta";
  order: number;
  visible: boolean;
  data: {
    heading?: { ar: string; en: string };
    subheading?: { ar: string; en: string };
    body?: { ar: string; en: string };
    ctaText?: { ar: string; en: string };
    ctaLink?: string;
    mediaUrl?: string;
    mediaType?: "image" | "video";
    customFields?: Record<string, any>;
  };
}
```

---

## 8. Media Library — `media/{mediaId}`
```typescript
interface MediaItem {
  id: string;
  url: string;
  storagePath: string;
  filename: string;
  mimeType: string;
  sizeBytes: number;
  width?: number;
  height?: number;
  altText: { ar: string; en: string };
  tags: string[];
  isDemo?: boolean;
  uploadedAt: string;
}
```

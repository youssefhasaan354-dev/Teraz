export interface LocalizedText {
  ar: string;
  en: string;
}

export interface SiteSettings {
  brandName: LocalizedText;
  tagline: LocalizedText;
  logo: {
    full: string;
    light: string;
    mark: string;
  };
  contact: {
    phone: string;
    phoneInternational: string;
    whatsapp: string;
    email: string;
    facebook: string;
    instagram: string;
    showAddressMap: boolean;
    addressText?: LocalizedText;
    mapEmbedUrl?: string;
    isAlwaysOpen: boolean;
    hoursNotice: LocalizedText;
    serviceArea: LocalizedText;
  };
  themeTokens: {
    espresso: string;
    cream: string;
    creamAlt: string;
    gold: string;
    goldLight: string;
    taupe: string;
  };
  whatsappMessages: {
    defaultMsg: LocalizedText;
    productPrefix: LocalizedText;
  };
  seoDefaults: {
    metaTitle: LocalizedText;
    metaDescription: LocalizedText;
    ogImage: string;
    keywords: string[];
  };
  features: {
    showStats: boolean;
    showTestimonials: boolean;
    showBlog: boolean;
    showTeam: boolean;
    maintenanceMode: boolean;
  };
  analytics: {
    ga4Id?: string;
    metaPixelId?: string;
  };
  updatedAt: string;
}

export interface SubCategory {
  id: string;
  slug: string;
  name: LocalizedText;
}

export interface Category {
  id: string;
  slug: string;
  name: LocalizedText;
  description: LocalizedText;
  order: number;
  featured: boolean;
  coverImage: string;
  subcategories: SubCategory[];
  isDemo?: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface ProductSpec {
  label: LocalizedText;
  value: LocalizedText;
}

export interface Product {
  id: string;
  slug: string;
  title: LocalizedText;
  categoryId: string;
  subcategoryId?: string;
  shortDescription: LocalizedText;
  fullDescription: LocalizedText;
  images: string[];
  specs: ProductSpec[];
  materials: LocalizedText[];
  colorsFinishes: LocalizedText[];
  dimensions?: LocalizedText;
  internalNotesPrice?: string; // Internal admin only, NEVER shown publicly
  featured: boolean;
  status: "published" | "draft" | "archived";
  isDemo?: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: LocalizedText;
  categoryId: string;
  description: LocalizedText;
  images: string[];
  beforeAfterPair?: {
    beforeImage: string;
    afterImage: string;
    caption: LocalizedText;
  };
  clientLocation?: LocalizedText;
  duration?: LocalizedText;
  featured: boolean;
  status: "published" | "draft";
  isDemo?: boolean;
  createdAt: string;
}

export interface ConfiguratorOption {
  id: string;
  type: "layouts" | "doorFinishes" | "countertops" | "handles";
  name: LocalizedText;
  category?: string;
  thumbnail: string;
  previewLayer?: string;
  hexColor?: string;
  order: number;
  isDefault?: boolean;
}

export interface Lead {
  id: string;
  type: "quote" | "contact" | "whatsapp_click";
  fullName: string;
  phone: string;
  email?: string;
  serviceType: string;
  spaceDetails?: string;
  selectedMaterial?: string;
  budgetRange?: string; // Captured in multi-step quote only
  configuratorState?: Record<string, string>;
  preferredContactTime?: string;
  message?: string;
  attachments?: string[];
  status: "new" | "in_progress" | "won" | "lost";
  notes?: string;
  assignedTo?: string;
  createdAt: string;
}

export interface PageSection {
  id: string;
  type: "hero" | "storytelling" | "projects" | "configurator" | "features" | "process" | "stats" | "testimonials" | "before_after" | "faq" | "cta";
  order: number;
  visible: boolean;
  data: {
    heading?: LocalizedText;
    subheading?: LocalizedText;
    body?: LocalizedText;
    ctaText?: LocalizedText;
    ctaLink?: string;
    mediaUrl?: string;
    mediaType?: "image" | "video";
    customFields?: Record<string, any>;
  };
}

export interface Testimonial {
  id: string;
  name: LocalizedText;
  roleLocation: LocalizedText;
  content: LocalizedText;
  rating: number;
  avatar?: string;
  verified: boolean;
  isDemo?: boolean;
}

export interface FAQItem {
  id: string;
  question: LocalizedText;
  answer: LocalizedText;
  category: string;
  order: number;
}

export interface ServiceItem {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  iconName: string;
  features: LocalizedText[];
  order: number;
}

export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: LocalizedText;
  description?: LocalizedText;
  order: number;
}

export interface MediaItem {
  id: string;
  url: string;
  storagePath: string;
  filename: string;
  mimeType: string;
  sizeBytes: number;
  width?: number;
  height?: number;
  altText: LocalizedText;
  tags: string[];
  isDemo?: boolean;
  uploadedAt: string;
}

export interface AdminUser {
  uid: string;
  email: string;
  displayName: string;
  role: "super_admin" | "editor" | "sales";
  lastLogin?: string;
}

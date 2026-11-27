import {
  db,
  isFirebaseConfigured,
} from "./config";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import {
  SiteSettings,
  Category,
  Product,
  Project,
  ConfiguratorOption,
  Testimonial,
  FAQItem,
  ServiceItem,
  StatItem,
  Lead,
  MediaItem,
} from "../types";
import {
  initialSiteSettings,
  initialCategories,
  initialProducts,
  initialProjects,
  initialConfiguratorOptions,
  initialTestimonials,
  initialFAQs,
  initialStats,
  initialServices,
} from "../initial-data";

// In-Memory & LocalStorage Resilient Store for immediate functionality
class ResilientLocalStore {
  private settings: SiteSettings = initialSiteSettings;
  private categories: Category[] = initialCategories;
  private products: Product[] = initialProducts;
  private projects: Project[] = initialProjects;
  private configurator: ConfiguratorOption[] = initialConfiguratorOptions;
  private testimonials: Testimonial[] = initialTestimonials;
  private faqs: FAQItem[] = initialFAQs;
  private stats: StatItem[] = initialStats;
  private services: ServiceItem[] = initialServices;
  private leads: Lead[] = [
    {
      id: "lead-1",
      type: "quote",
      fullName: "م. كريم الشناوي",
      phone: "01099887766",
      email: "karim.shennawy@gmail.com",
      serviceType: "wooden_kitchens",
      spaceDetails: "مساحة المطبخ 4.5 * 3.8 متر في كمبوند بالم هيلز التجمع",
      selectedMaterial: "أرو طبيعي مع كوارتز كالاكاتا",
      budgetRange: "150,000 - 250,000 ج.م",
      preferredContactTime: "مساءً بعد الساعة 5",
      notes: "نود عمل جزيرة عريضة وإضاءة ليد بالرفوف الزجاجية",
      status: "new",
      createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    },
    {
      id: "lead-2",
      type: "whatsapp_click",
      fullName: "د. هالة فهمي",
      phone: "01233445566",
      serviceType: "cladding",
      spaceDetails: "تجاليد جدار التلفزيون في صالة الاستقبال بالشيخ زايد",
      status: "in_progress",
      notes: "تم التواصل هاتفياً وتحديد موعد للمعاينة الهندسية يوم الخميس",
      createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    },
    {
      id: "lead-3",
      type: "contact",
      fullName: "أ. أحمد الصاوي",
      phone: "01001122334",
      serviceType: "office",
      message: "نحتاج تأثيث مقر شركة استيراد وتصدير بالمنصورة يشمل 8 مكاتب وطاولة اجتماعات",
      status: "won",
      notes: "تم توقيع العقد وبدء مرحلة التصنيع",
      createdAt: new Date(Date.now() - 3600000 * 72).toISOString(),
    },
  ];
  private media: MediaItem[] = [
    {
      id: "med-1",
      url: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
      storagePath: "demo/kitchen-1.jpg",
      filename: "kitchen-royal-oak.jpg",
      mimeType: "image/jpeg",
      sizeBytes: 845000,
      altText: { ar: "مطبخ رويال أوك ذو الجزيرة الرخامية", en: "Royal Oak Island Kitchen" },
      tags: ["kitchen", "wood", "quartz"],
      isDemo: true,
      uploadedAt: new Date().toISOString(),
    },
    {
      id: "med-2",
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      storagePath: "demo/kitchen-aluminum.jpg",
      filename: "kitchen-nero-aluminum.jpg",
      mimeType: "image/jpeg",
      sizeBytes: 912000,
      altText: { ar: "مطبخ ألوميتال أسود غير لامع", en: "Matte Black Aluminum Kitchen" },
      tags: ["kitchen", "aluminum", "modern"],
      isDemo: true,
      uploadedAt: new Date().toISOString(),
    },
    {
      id: "med-3",
      url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
      storagePath: "demo/cladding-slat.jpg",
      filename: "cladding-walnut-slats.jpg",
      mimeType: "image/jpeg",
      sizeBytes: 742000,
      altText: { ar: "تجاليد خشبية مضلعة مع إضاءة ليد", en: "Acoustic Slatted Walnut Cladding" },
      tags: ["cladding", "wood", "lighting"],
      isDemo: true,
      uploadedAt: new Date().toISOString(),
    },
  ];

  constructor() {
    this.hydrateFromStorage();
  }

  private hydrateFromStorage() {
    if (typeof window === "undefined") return;
    try {
      const s = localStorage.getItem("teraz_store_settings");
      if (s) this.settings = JSON.parse(s);

      const c = localStorage.getItem("teraz_store_categories");
      if (c) this.categories = JSON.parse(c);

      const p = localStorage.getItem("teraz_store_products");
      if (p) this.products = JSON.parse(p);

      const pr = localStorage.getItem("teraz_store_projects");
      if (pr) this.projects = JSON.parse(pr);

      const cf = localStorage.getItem("teraz_store_configurator");
      if (cf) this.configurator = JSON.parse(cf);

      const l = localStorage.getItem("teraz_store_leads");
      if (l) this.leads = JSON.parse(l);

      const m = localStorage.getItem("teraz_store_media");
      if (m) this.media = JSON.parse(m);
    } catch (e) {
      console.warn("Storage hydration error, using initial defaults:", e);
    }
  }

  private saveToStorage(key: string, data: any) {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error("Local storage save error:", e);
    }
  }

  // Settings
  getSettings(): SiteSettings {
    return this.settings;
  }
  updateSettings(data: Partial<SiteSettings>): SiteSettings {
    this.settings = { ...this.settings, ...data, updatedAt: new Date().toISOString() };
    this.saveToStorage("teraz_store_settings", this.settings);
    return this.settings;
  }

  // Categories
  getCategories(): Category[] {
    return [...this.categories].sort((a, b) => a.order - b.order);
  }
  getCategoryBySlug(slug: string): Category | undefined {
    return this.categories.find((c) => c.slug === slug);
  }
  saveCategory(cat: Category): Category {
    const idx = this.categories.findIndex((c) => c.id === cat.id);
    if (idx >= 0) {
      this.categories[idx] = cat;
    } else {
      this.categories.push(cat);
    }
    this.saveToStorage("teraz_store_categories", this.categories);
    return cat;
  }
  deleteCategory(id: string): void {
    this.categories = this.categories.filter((c) => c.id !== id);
    this.saveToStorage("teraz_store_categories", this.categories);
  }

  // Products
  getProducts(): Product[] {
    return [...this.products];
  }
  getProductBySlug(slug: string): Product | undefined {
    return this.products.find((p) => p.slug === slug);
  }
  saveProduct(prod: Product): Product {
    const idx = this.products.findIndex((p) => p.id === prod.id);
    if (idx >= 0) {
      this.products[idx] = prod;
    } else {
      this.products.unshift(prod);
    }
    this.saveToStorage("teraz_store_products", this.products);
    return prod;
  }
  deleteProduct(id: string): void {
    this.products = this.products.filter((p) => p.id !== id);
    this.saveToStorage("teraz_store_products", this.products);
  }

  // Projects
  getProjects(): Project[] {
    return [...this.projects];
  }
  getProjectBySlug(slug: string): Project | undefined {
    return this.projects.find((p) => p.slug === slug);
  }
  saveProject(proj: Project): Project {
    const idx = this.projects.findIndex((p) => p.id === proj.id);
    if (idx >= 0) {
      this.projects[idx] = proj;
    } else {
      this.projects.unshift(proj);
    }
    this.saveToStorage("teraz_store_projects", this.projects);
    return proj;
  }
  deleteProject(id: string): void {
    this.projects = this.projects.filter((p) => p.id !== id);
    this.saveToStorage("teraz_store_projects", this.projects);
  }

  // Configurator
  getConfiguratorOptions(): ConfiguratorOption[] {
    return [...this.configurator].sort((a, b) => a.order - b.order);
  }
  saveConfiguratorOption(opt: ConfiguratorOption): ConfiguratorOption {
    const idx = this.configurator.findIndex((o) => o.id === opt.id);
    if (idx >= 0) {
      this.configurator[idx] = opt;
    } else {
      this.configurator.push(opt);
    }
    this.saveToStorage("teraz_store_configurator", this.configurator);
    return opt;
  }
  deleteConfiguratorOption(id: string): void {
    this.configurator = this.configurator.filter((o) => o.id !== id);
    this.saveToStorage("teraz_store_configurator", this.configurator);
  }

  // Testimonials, FAQs, Stats, Services
  getTestimonials(): Testimonial[] {
    return [...this.testimonials];
  }
  getFAQs(): FAQItem[] {
    return [...this.faqs].sort((a, b) => a.order - b.order);
  }
  getStats(): StatItem[] {
    return [...this.stats].sort((a, b) => a.order - b.order);
  }
  getServices(): ServiceItem[] {
    return [...this.services].sort((a, b) => a.order - b.order);
  }

  // Leads CRM
  getLeads(): Lead[] {
    return [...this.leads].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
  createLead(data: Omit<Lead, "id" | "createdAt" | "status">): Lead {
    const newLead: Lead = {
      ...data,
      id: "lead-" + Date.now(),
      status: "new",
      createdAt: new Date().toISOString(),
    };
    this.leads.unshift(newLead);
    this.saveToStorage("teraz_store_leads", this.leads);
    return newLead;
  }
  updateLeadStatus(id: string, status: Lead["status"], notes?: string): Lead | undefined {
    const lead = this.leads.find((l) => l.id === id);
    if (lead) {
      lead.status = status;
      if (notes !== undefined) lead.notes = notes;
      this.saveToStorage("teraz_store_leads", this.leads);
    }
    return lead;
  }
  deleteLead(id: string): void {
    this.leads = this.leads.filter((l) => l.id !== id);
    this.saveToStorage("teraz_store_leads", this.leads);
  }

  // Media
  getMedia(): MediaItem[] {
    return [...this.media];
  }
  saveMedia(item: MediaItem): MediaItem {
    this.media.unshift(item);
    this.saveToStorage("teraz_store_media", this.media);
    return item;
  }
  deleteMedia(id: string): void {
    this.media = this.media.filter((m) => m.id !== id);
    this.saveToStorage("teraz_store_media", this.media);
  }
}

// Singleton local store instance
export const localStore = new ResilientLocalStore();

// ==========================================
// ASYNC FIRESTORE SERVICE WRAPPERS
// ==========================================

export async function getSiteSettings(): Promise<SiteSettings> {
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDoc(doc(db, "settings", "site"));
      if (snap.exists()) {
        return snap.data() as SiteSettings;
      }
    } catch (e) {
      console.warn("Firestore settings read failed, falling back to local:", e);
    }
  }
  return localStore.getSettings();
}

export async function updateSiteSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, "settings", "site"), settings, { merge: true });
    } catch (e) {
      console.warn("Firestore settings write failed:", e);
    }
  }
  return localStore.updateSettings(settings);
}

export async function getCategories(): Promise<Category[]> {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, "categories"), orderBy("order", "asc"));
      const snap = await getDocs(q);
      if (!snap.empty) {
        return snap.docs.map((d) => ({ ...d.data(), id: d.id } as Category));
      }
    } catch (e) {
      console.warn("Firestore categories read failed, falling back to local:", e);
    }
  }
  return localStore.getCategories();
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  const categories = await getCategories();
  return categories.find((c) => c.slug === slug);
}

export async function saveCategory(category: Category): Promise<Category> {
  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, "categories", category.id), category);
    } catch (e) {
      console.warn("Firestore category save failed:", e);
    }
  }
  return localStore.saveCategory(category);
}

export async function deleteCategory(id: string): Promise<void> {
  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, "categories", id));
    } catch (e) {
      console.warn("Firestore category delete failed:", e);
    }
  }
  localStore.deleteCategory(id);
}

export async function getProducts(categoryId?: string): Promise<Product[]> {
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDocs(collection(db, "products"));
      if (!snap.empty) {
        let items = snap.docs.map((d) => ({ ...d.data(), id: d.id } as Product));
        if (categoryId) items = items.filter((p) => p.categoryId === categoryId);
        return items;
      }
    } catch (e) {
      console.warn("Firestore products read failed, falling back to local:", e);
    }
  }
  let prods = localStore.getProducts();
  if (categoryId) prods = prods.filter((p) => p.categoryId === categoryId);
  return prods;
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const prods = await getProducts();
  return prods.find((p) => p.slug === slug);
}

export async function saveProduct(product: Product): Promise<Product> {
  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, "products", product.id), product);
    } catch (e) {
      console.warn("Firestore product save failed:", e);
    }
  }
  return localStore.saveProduct(product);
}

export async function deleteProduct(id: string): Promise<void> {
  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, "products", id));
    } catch (e) {
      console.warn("Firestore product delete failed:", e);
    }
  }
  localStore.deleteProduct(id);
}

export async function getProjects(): Promise<Project[]> {
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDocs(collection(db, "projects"));
      if (!snap.empty) {
        return snap.docs.map((d) => ({ ...d.data(), id: d.id } as Project));
      }
    } catch (e) {
      console.warn("Firestore projects read failed, falling back to local:", e);
    }
  }
  return localStore.getProjects();
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug);
}

export async function saveProject(project: Project): Promise<Project> {
  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, "projects", project.id), project);
    } catch (e) {
      console.warn("Firestore project save failed:", e);
    }
  }
  return localStore.saveProject(project);
}

export async function deleteProject(id: string): Promise<void> {
  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, "projects", id));
    } catch (e) {
      console.warn("Firestore project delete failed:", e);
    }
  }
  localStore.deleteProject(id);
}

export async function getConfiguratorOptions(): Promise<ConfiguratorOption[]> {
  return localStore.getConfiguratorOptions();
}

export async function saveConfiguratorOption(opt: ConfiguratorOption): Promise<ConfiguratorOption> {
  return localStore.saveConfiguratorOption(opt);
}

export async function deleteConfiguratorOption(id: string): Promise<void> {
  localStore.deleteConfiguratorOption(id);
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return localStore.getTestimonials();
}

export async function getFAQs(): Promise<FAQItem[]> {
  return localStore.getFAQs();
}

export async function getStats(): Promise<StatItem[]> {
  return localStore.getStats();
}

export async function getServices(): Promise<ServiceItem[]> {
  return localStore.getServices();
}

export async function getLeads(): Promise<Lead[]> {
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDocs(collection(db, "leads"));
      if (!snap.empty) {
        return snap.docs.map((d) => ({ ...d.data(), id: d.id } as Lead));
      }
    } catch (e) {
      console.warn("Firestore leads read failed, falling back to local:", e);
    }
  }
  return localStore.getLeads();
}

export async function createLead(data: Omit<Lead, "id" | "createdAt" | "status">): Promise<Lead> {
  if (isFirebaseConfigured && db) {
    try {
      const newId = "lead-" + Date.now();
      const payload: Lead = {
        ...data,
        id: newId,
        status: "new",
        createdAt: new Date().toISOString(),
      };
      await setDoc(doc(db, "leads", newId), payload);
      return localStore.createLead(data);
    } catch (e) {
      console.warn("Firestore lead create failed, saving locally:", e);
    }
  }
  return localStore.createLead(data);
}

export async function updateLeadStatus(id: string, status: Lead["status"], notes?: string): Promise<Lead | undefined> {
  if (isFirebaseConfigured && db) {
    try {
      const payload: any = { status };
      if (notes !== undefined) payload.notes = notes;
      await updateDoc(doc(db, "leads", id), payload);
    } catch (e) {
      console.warn("Firestore lead update failed:", e);
    }
  }
  return localStore.updateLeadStatus(id, status, notes);
}

export async function deleteLead(id: string): Promise<void> {
  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, "leads", id));
    } catch (e) {
      console.warn("Firestore lead delete failed:", e);
    }
  }
  localStore.deleteLead(id);
}

export async function getMediaItems(): Promise<MediaItem[]> {
  return localStore.getMedia();
}

export async function saveMediaItem(item: MediaItem): Promise<MediaItem> {
  return localStore.saveMedia(item);
}

export async function deleteMediaItem(id: string): Promise<void> {
  localStore.deleteMedia(id);
}

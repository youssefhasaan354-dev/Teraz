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
} from "./types";

export const initialSiteSettings: SiteSettings = {
  brandName: {
    ar: "طِراز للأثاث والمطابخ",
    en: "TERAZ Furniture & Kitchens",
  },
  tagline: {
    ar: "عِش الأناقة",
    en: "Live in Elegance",
  },
  logo: {
    full: "/brand/logo-full.svg",
    light: "/brand/logo-light.svg",
    mark: "/brand/logo-mark.svg",
  },
  contact: {
    phone: "01005423809",
    phoneInternational: "+201005423809",
    whatsapp: "+201005423809",
    email: "terazfurneture@gmail.com",
    facebook: "https://www.facebook.com/profile.php?id=61596909988938",
    instagram: "https://www.instagram.com/furnitureteraz/",
    showAddressMap: false, // Online-only, client requirement
    addressText: {
      ar: "نخدمكم أونلاين في كافة محافظات جمهورية مصر العربية",
      en: "Operating online serving all governorates across Egypt",
    },
    isAlwaysOpen: true, // 24/7
    hoursNotice: {
      ar: "متاحون دائمًا (24/7) لتلقي استفساراتكم والرد على واتساب",
      en: "Always available (24/7) to assist your inquiries via WhatsApp and phone",
    },
    serviceArea: {
      ar: "نوصّل ونركّب في جميع أنحاء مصر",
      en: "We deliver and install nationwide across Egypt",
    },
  },
  themeTokens: {
    espresso: "#1C1512",
    cream: "#F7F2EA",
    creamAlt: "#EDE3D3",
    gold: "#B38B54",
    goldLight: "#D9B97E",
    taupe: "#8A7762",
  },
  whatsappMessages: {
    defaultMsg: {
      ar: "السلام عليكم، أنا مهتم بخدماتكم من خلال موقع تيراز للأثاث. أود الاستفسار والحصول على عرض سعر. ممكن تساعدوني؟ 🌿",
      en: "Hello TERAZ team, I found you through your website and I'm interested in your furniture and kitchens. Could you please help me with details and a quote?",
    },
    productPrefix: {
      ar: "السلام عليكم، أود الاستفسار وطلب عرض سعر بخصوص: ",
      en: "Hello TERAZ team, I would like to request a quote regarding: ",
    },
  },
  seoDefaults: {
    metaTitle: {
      ar: "طراز (TERAZ) — أفخم المطابخ، تجاليد الكلادينج، والموبيليا المودرن في مصر",
      en: "TERAZ Furniture — Bespoke Luxury Kitchens, Cladding & Fine Furniture in Egypt",
    },
    metaDescription: {
      ar: "طراز للأثاث والمطابخ: رواد تصميم وتفصيل المطابخ الخشبية والألوميتال، الكلادينج الديكوري، والأثاث المكتبي والمنزلي بأعلى معايير الحرفية في مصر. اطلب عرض سعرك الآن.",
      en: "Bespoke custom kitchens, architectural wall claddings, and tailored luxury furniture engineered for elegant residences and offices across Egypt.",
    },
    ogImage: "/brand/logo-full.svg",
    keywords: [
      "مطابخ خشب مصر",
      "مطابخ ألوميتال حديثة",
      "كلادينج جدران",
      "موبيليا مودرن",
      "أثاث مكتبي وكراسي",
      "مطابخ المنصورة",
      "طراز للأثاث",
      "Teraz Kitchens",
    ],
  },
  features: {
    showStats: true,
    showTestimonials: true,
    showBlog: false,
    showTeam: false,
    maintenanceMode: false,
  },
  analytics: {
    ga4Id: "",
    metaPixelId: "",
  },
  updatedAt: new Date().toISOString(),
};

export const initialCategories: Category[] = [
  {
    id: "cat-wooden-kitchens",
    slug: "wooden-kitchens",
    name: { ar: "مطابخ خشب", en: "Wooden Kitchens" },
    description: {
      ar: "مطابخ خشبية فاخرة تُصنع من أرقى الأخشاب المعالجة المقاومة للرطوبة والحرارة بتشطيبات قشرة طبيعية وأكريليك وبولي لاك بأعلى متانة.",
      en: "Master-crafted bespoke wooden kitchens utilizing moisture-resistant hardwoods, natural veneers, acrylic, and polygloss finishes.",
    },
    order: 1,
    featured: true,
    coverImage: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
    subcategories: [
      { id: "sub-wood-natural", slug: "natural-veneer", name: { ar: "قشرة طبيعية وأرو", en: "Natural Oak & Walnut Veneer" } },
      { id: "sub-wood-polygloss", slug: "polygloss-acrylic", name: { ar: "بولي لاك وأكريليك", en: "Polygloss & Acrylic" } },
      { id: "sub-wood-hpl", slug: "hpl-modern", name: { ar: "إتش بي إل (HPL) عالي التحمل", en: "Heavy-Duty HPL" } },
    ],
    isDemo: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "cat-aluminum-kitchens",
    slug: "aluminum-kitchens",
    name: { ar: "مطابخ ألوميتال", en: "Aluminum Kitchens" },
    description: {
      ar: "مطابخ ألومنيوم مودرن مقاومة للمياه والحشرات بنسبة 100%، تجمع بين خفة الوزن والصلابة الفائقة والواجهات الزجاجية المعاصرة.",
      en: "Sleek, 100% moisture and pest-proof modern aluminum kitchens featuring reinforced profiles and contemporary fluted glass fronts.",
    },
    order: 2,
    featured: true,
    coverImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    subcategories: [
      { id: "sub-alum-cladding", slug: "cladding-cabinets", name: { ar: "درف كلادينج معتمة", en: "Matte Cladding Fronts" } },
      { id: "sub-alum-glass", slug: "fluted-glass-profile", name: { ar: "بروفايل ألومنيوم وزجاج مضلع", en: "Fluted Glass & Black Profiles" } },
      { id: "sub-alum-turkish", slug: "heavy-turkish-alum", name: { ar: "قطاعات ألومنيوم تركي ثقيل", en: "Heavy Turkish Aluminum Profiles" } },
    ],
    isDemo: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "cat-cladding",
    slug: "cladding",
    name: { ar: "كلادينج وتجاليد جدران", en: "Architectural Cladding" },
    description: {
      ar: "أحدث صيحات تجاليد الجدران الداخلية والخارجية: بديل الخشب، بديل الرخام، وبانوهات الكلادينج المزودة بمجاري إضاءة ليد خفية.",
      en: "Architectural interior and exterior wall paneling: wood composite, marble alternatives, and acoustic acoustic slatted claddings with integrated LED channels.",
    },
    order: 3,
    featured: true,
    coverImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    subcategories: [
      { id: "sub-clad-wood", slug: "wood-slat-panels", name: { ar: "تجاليد خشبية مضلعة (Slat Wood)", en: "Acoustic Slatted Wood" } },
      { id: "sub-clad-marble", slug: "marble-pvc-sheets", name: { ar: "بديل الرخام والبولي فينيل", en: "Marble Sheet Cladding" } },
      { id: "sub-clad-facades", slug: "exterior-facade-cladding", name: { ar: "كلادينج واجهات ومداخل", en: "Entrance & Facade Cladding" } },
    ],
    isDemo: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "cat-furniture",
    slug: "furniture",
    name: { ar: "موبيليا وأثاث منزلي", en: "Luxury Home Furniture" },
    description: {
      ar: "غرف نوم رئيسية، أطقم معيشة مريحة، غرف سفرة فاخرة، وكونسولات مصنوعة بأخشاب طبيعية وأقمشة مستوردة بتصاميم استثنائية.",
      en: "Bespoke master bedrooms, refined living suites, sculptural dining sets, and reception consoles crafted from solid woods and tailored textiles.",
    },
    order: 4,
    featured: true,
    coverImage: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
    subcategories: [
      { id: "sub-furn-bedroom", slug: "master-bedrooms", name: { ar: "غرف نوم ماستر ودواليب دريسنج", en: "Master Bedrooms & Walk-in Closets" } },
      { id: "sub-furn-living", slug: "luxury-living-rooms", name: { ar: "صالونات وأنتريهات مودرن", en: "Modern Sofas & Living Suites" } },
      { id: "sub-furn-dining", slug: "dining-tables-credenza", name: { ar: "طاولات طعام وبوفيهات", en: "Dining Tables & Credenzas" } },
    ],
    isDemo: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "cat-office",
    slug: "office-furniture",
    name: { ar: "أثاث مكتبي وكراسي", en: "Office Furniture & Chairs" },
    description: {
      ar: "مكاتب إدارية وتنفيذية فخمة، كراسي مديرين طبية مريحة، محطات عمل مشتركة (Workstations)، وطاولات اجتماعات راقية للشركات.",
      en: "Executive desks, ergonomic managerial mesh & leather chairs, collaborative workstations, and bespoke boardroom conference tables.",
    },
    order: 5,
    featured: true,
    coverImage: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80",
    subcategories: [
      { id: "sub-off-desks", slug: "executive-desks", name: { ar: "مكاتب مديرين وتنفيذيين", en: "Executive & Managerial Desks" } },
      { id: "sub-off-chairs", slug: "ergonomic-chairs", name: { ar: "كراسي طبية ومريحة", en: "Ergonomic & Task Chairs" } },
      { id: "sub-off-meeting", slug: "meeting-boardroom", name: { ar: "طاولات اجتماعات كبرى", en: "Conference & Meeting Tables" } },
    ],
    isDemo: true,
    createdAt: new Date().toISOString(),
  },
];

export const initialProducts: Product[] = [
  {
    id: "prod-kitchen-royal-oak",
    slug: "royal-oak-kitchen",
    title: { ar: "مطبخ رويال أوك ذو الجزيرة الرخامية", en: "Royal Oak Island Kitchen" },
    categoryId: "cat-wooden-kitchens",
    subcategoryId: "sub-wood-natural",
    shortDescription: {
      ar: "مطبخ مودرن بلمسات خشب الأرو الطبيعي الداكن مع جزيرة مركزية من كوارتز كالاكاتا ومقابض مخفية وإضاءة ليد دافئة.",
      en: "Bespoke contemporary kitchen blending natural dark oak veneer, Calacatta quartz waterfall island, and recessed LED accent lighting.",
    },
    fullDescription: {
      ar: "صُمم مطبخ رويال أوك ليكون المحور الجمالي الأبرز للمنزل العصري. يعتمد على درف خشبية ذات قشرة أرو طبيعية معالجة بطلاء بولي يوريثان إيطالي غير لامع للحماية التامة من بخار الطهي والرطوبة. يتميز بجزيرة عمل ضخمة بكونترتوب كوارتز متصل، ومفصلات وأدراج بلوم (Blum) نمساوية بنظام الغلق السلس.",
      en: "Engineered to stand as the visual centerpiece of the home. Crafted from natural oak veneer sealed with matte Italian polyurethane, fitted with an integrated waterfall quartz island and Austrian Blum soft-close mechanisms.",
    },
    images: [
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    ],
    specs: [
      { label: { ar: "نوع الخشب", en: "Wood Structure" }, value: { ar: "أرو طبيعي مع كونتر روسي معالج", en: "Natural Oak Veneer on Russian Plywood" } },
      { label: { ar: "المسطح (الكونترتوب)", en: "Countertop" }, value: { ar: "كوارتز كالاكاتا مقاوم للبقع والخدش", en: "Stain & Scratch Resistant Calacatta Quartz" } },
      { label: { ar: "الإكسسوارات والمفصلات", en: "Hardware & Hinges" }, value: { ar: "بلوم نمساوي هيدروليك أصلي (Blum)", en: "Authentic Austrian Blum Soft-Close" } },
      { label: { ar: "الضمان", en: "Warranty" }, value: { ar: "ضمان 10 سنوات على الهيكل والإكسسوار", en: "10 Years Full Structural & Hardware Warranty" } },
    ],
    materials: [
      { ar: "قشرة أرو طبيعية", en: "Natural Oak Veneer" },
      { ar: "كوارتز معالج", en: "Engineered Quartz" },
      { ar: "شاسيه خشب زان وأبلكاش روسي", en: "Beech Solid Accents & Marine Plywood" },
    ],
    colorsFinishes: [
      { ar: "بني إسبريسو غامق مع عروق خشبية", en: "Espresso Deep Brown with Natural Grain" },
      { ar: "أبيض رخامي بعروق ذهبية", en: "Calacatta White with Gold Veins" },
    ],
    dimensions: { ar: "تفصيل حسب أبعاد المكان (Custom Dimensions)", en: "Tailor-made to room architectural drawings" },
    internalNotesPrice: "Approx 8,500 - 12,000 EGP per linear meter depending on quartz tier.",
    featured: true,
    status: "published",
    isDemo: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "prod-kitchen-lumina-polygloss",
    slug: "lumina-cream-polygloss-kitchen",
    title: { ar: "مطبخ لومينا بولي لاك كريمي دافئ", en: "Lumina Warm Cream Polygloss Kitchen" },
    categoryId: "cat-wooden-kitchens",
    subcategoryId: "sub-wood-polygloss",
    shortDescription: {
      ar: "مطبخ ألترا مودرن بدرف بولي لاك تركي لامعة بلون كريمي هادئ متناغمة مع رفوف خشبية مفتوحة وبروفايل ذهبي مطفي.",
      en: "Ultra-modern seamless kitchen with high-gloss Turkish polygloss fronts in warm cream, accented by open walnut shelving and brushed brass profiles.",
    },
    fullDescription: {
      ar: "مطبخ لومينا يمنح المساحات الضيقة والمتوسطة شعورًا بالاتساع والضوء بفضل انعكاس أسطح البولي لاك الفائقة النقاء. يتميز بمقاومته الفائقة للخدوش والحرارة، وخلوه التام من المقابض الظاهرة (Gola Profile) باللون الذهبي البرونزي.",
      en: "The Lumina kitchen maximizes ambient reflection and visual depth. Engineered with high-durability Turkish polygloss panels and an ergonomic Gola profile handleless system finished in brushed gold.",
    },
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
    ],
    specs: [
      { label: { ar: "الدرف والواجهات", en: "Front Panels" }, value: { ar: "بولي لاك تركي عالي اللمعان والصلابة", en: "Turkish High-Gloss Polygloss" } },
      { label: { ar: "نظام الفتح", en: "Opening Mechanism" }, value: { ar: "بروفايل جولا ذهبي بدون مقابض (Handleless)", en: "Integrated Gola Gold Profile" } },
      { label: { ar: "المسطح", en: "Countertop" }, value: { ar: "جرانيت أسود أسواني دبل بلاك معالج", en: "Honed Double Black Granite" } },
    ],
    materials: [
      { ar: "بولي لاك", en: "Polygloss" },
      { ar: "ألومنيوم جولا ذهبي", en: "Anodized Gold Aluminum" },
      { ar: "كونتر معزول", en: "Moisture Sealed Core" },
    ],
    colorsFinishes: [
      { ar: "كريمي فانيليا لامع", en: "High Gloss Vanilla Cream" },
      { ar: "ذهبي مطفي هادئ", en: "Brushed Champagne Gold" },
    ],
    featured: true,
    status: "published",
    isDemo: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "prod-kitchen-matte-aluminum",
    slug: "nero-aluminum-fluted-kitchen",
    title: { ar: "مطبخ نيرو ألوميتال بزجاج مضلع وفل فريم", en: "Nero Aluminum & Fluted Glass Kitchen" },
    categoryId: "cat-aluminum-kitchens",
    subcategoryId: "sub-alum-glass",
    shortDescription: {
      ar: "مطبخ ألوميتال أسود غير لامع مدعم بشاسيه حديدي مجلفن ودرف زجاج مضلع مستورد مع إضاءات ليد داخلية ذكية.",
      en: "Matte black architectural aluminum kitchen featuring fluted ribbed glass fronts, anodized slim frames, and sensor-driven interior shelf lighting.",
    },
    fullDescription: {
      ar: "الحل النهائي لعشاق العملية والأناقة الخالدة. ألومنيوم تركي ثقيل مطلي إلكتروستاتيك باللون الأسود الفحمي المقاوم للخدوش والمنظفات المنزلية بنسبة 100%، مع واجهات زجاجية مضلعة فخمة تسمح بانعكاس الإضاءة وتخفي محتويات الأرفف بأسلوب شاعري.",
      en: "Combines zero maintenance longevity with boutique industrial elegance. Powder-coated aerospace-grade aluminum frames paired with reeded glass panels and concealed LED tracks.",
    },
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
    ],
    specs: [
      { label: { ar: "خامة القطاع", en: "Profile Material" }, value: { ar: "ألومنيوم تركي مقوى سماكة 2 مم", en: "2mm Reinforced Anodized Aluminum" } },
      { label: { ar: "الزجاج", en: "Glass Type" }, value: { ar: "زجاج مضلع مسكر سيكوريت عالي الأمان", en: "Tempered Fluted Reeded Glass" } },
      { label: { ar: "مقاومة المياه", en: "Water Resistance" }, value: { ar: "100% مقاوم للماء والرطوبة والصدأ", en: "100% Waterproof, Rust-Proof, & Washable" } },
    ],
    materials: [
      { ar: "ألومنيوم معالج", en: "Architectural Aluminum" },
      { ar: "زجاج سيكوريت مضلع", en: "Tempered Reeded Glass" },
    ],
    colorsFinishes: [
      { ar: "أسود فحمي غير لامع (Matte Black)", en: "Matte Charcoal Black" },
      { ar: "زجاج عسلي مدخن", en: "Smoked Bronze Tint Glass" },
    ],
    featured: true,
    status: "published",
    isDemo: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "prod-clad-slat-walnut",
    slug: "architectural-walnut-slat-cladding",
    title: { ar: "تجاليد خشبية مضلعة (سلات وود) مع إضاءة ليد", en: "Architectural Slat Walnut Wall Cladding" },
    categoryId: "cat-cladding",
    subcategoryId: "sub-clad-wood",
    shortDescription: {
      ar: "ألواح خشبية مضلعة مع عازل صوتي متطور مدمج بها شرائح ليد بروفايل لإضفاء دفء استثنائي على غرف المعيشة والمداخل.",
      en: "Vertical acoustic walnut fluted wall slats with recessed micro LED channels designed to enrich reception foyers and living feature walls.",
    },
    fullDescription: {
      ar: "حل معماري راقٍ لتحويل الجدران الصامتة إلى لوحات فنية حية. تصنع الأعواد المضلعة من الخشب المعالج المكسو بقشرة الجوز الأمريكي الطبيعية والمثبتة على ألواح عازلة للصدى بلمسة نهائية فائقة النعومة.",
      en: "Transforms bare walls into bespoke architectural masterpieces. Features precision-milled acoustic slats surfaced in American walnut veneer with concealed ambient lighting channels.",
    },
    images: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
    ],
    specs: [
      { label: { ar: "المادة الأساسية", en: "Base Material" }, value: { ar: "خشب طبيعي مع طبقة لباد عازلة للصوت", en: "Natural Wood Slats over Acoustic Felt Base" } },
      { label: { ar: "طريقة التثبيت", en: "Mounting Method" }, value: { ar: "تثبيت مخفي بدون مسامير ظاهرة", en: "Concealed Cleat System, No Visible Screws" } },
      { label: { ar: "الإضاءة", en: "Lighting" }, value: { ar: "ليد بروفايل دافئ 3000K خافت للضوء", en: "Integrated 3000K Warm Dimmable LED" } },
    ],
    materials: [
      { ar: "قشرة جوز أمريكي", en: "American Walnut Veneer" },
      { ar: "لباد عازل للصوت", en: "Acoustic Backing Panel" },
    ],
    colorsFinishes: [
      { ar: "جوز طبيعي دافئ", en: "Warm Natural Walnut" },
      { ar: "أسود غير لامع بين الفواصل", en: "Matte Black Recessed Shadow Gaps" },
    ],
    featured: true,
    status: "published",
    isDemo: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "prod-clad-marble-wood-tv",
    slug: "calacatta-marble-wood-tv-wall",
    title: { ar: "بانوه تلفزيون بديل رخام وبديل خشب فاخر", en: "Calacatta Marble & Fluted TV Unit Wall" },
    categoryId: "cat-cladding",
    subcategoryId: "sub-clad-marble",
    shortDescription: {
      ar: "جدارية تلفزيون مودرن متكاملة تجمع بين لوح بديل رخام كالاكاتا عريض وتجاليد بديل خشب مع كونسول معلق وإضاءة خلفية.",
      en: "Integrated luxury TV feature wall pairing backlit Calacatta marble slab, vertical reeded panels, and a floating soft-close console.",
    },
    fullDescription: {
      ar: "تجمع هذه الجدارية بين فخامة الرخام الإيطالي ودفء الخشب. اللوح الرخامي مطلي بطبقة حماية من الأشعة فوق البنفسجية لضمان ثبات اللمعان، مع تفريغ دقيق لتمرير كافة الأسلاك وشاشات التلفزيون بدقة هندسية مطلقة.",
      en: "The ultimate centerpiece for grand living spaces. Integrates full-height faux marble with UV cured high-gloss finish, flanked by timber fins and a floating multimedia console.",
    },
    images: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    ],
    specs: [
      { label: { ar: "اللوح المركزي", en: "Center Slab" }, value: { ar: "بديل رخام PVC سماكة 3.8 مم عالي اللمعة", en: "High Gloss 3.8mm Calacatta Marble Sheet" } },
      { label: { ar: "الأجنحة الجانبية", en: "Side Wings" }, value: { ar: "تجاليد WPC مقاومة للرطوبة والحرارة", en: "Moisture-Resistant WPC Slat Profiles" } },
      { label: { ar: "الكونسول المعلق", en: "Floating Console" }, value: { ar: "خشب MDF إسباني معالج بأدراج هيدروليك", en: "Spanish Moisture-Proof MDF with Blum Slides" } },
    ],
    materials: [
      { ar: "بديل رخام PVC", en: "Faux Marble Sheet" },
      { ar: "بديل خشب WPC", en: "WPC Wood Composite" },
      { ar: "خشب إسباني", en: "Spanish Engineered Wood" },
    ],
    colorsFinishes: [
      { ar: "كالاكاتا أبيض بعروق رمادية وذهبية", en: "Calacatta White with Grey & Gold Veining" },
      { ar: "خشب أوك رمادي مدخن", en: "Smoked Grey Oak Finish" },
    ],
    featured: true,
    status: "published",
    isDemo: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "prod-bed-velvet-elysian",
    slug: "elysian-master-bedroom-suite",
    title: { ar: "غرفة نوم إليزيان ماستر مع ظهر سرير فندقي", en: "Elysian Master Bedroom Suite" },
    categoryId: "cat-furniture",
    subcategoryId: "sub-furn-bedroom",
    shortDescription: {
      ar: "غرفة نوم متكاملة بظهر سرير منجد كابوتونيه فندقي يمتد بكامل عرض الجدار مع تسريحة عائمة ودولاب دريسنج زجاجي مضيء.",
      en: "Full master bedroom suite featuring an expansive upholstered hotel headboard, floating vanity desk, and tinted glass wardrobe with internal LEDs.",
    },
    fullDescription: {
      ar: "تمنحك غرفة نوم إليزيان تجربة الإقامة في أفخم الأجنحة الفندقية العالمية. الهيكل مصنع من خشب الزان الروماني المجفف عالي الكثافة، مع تنجيد من قماش البوكليه والكتان المعالج المقاوم للاتساخ، ودولاب ملابس بواجهات زجاجية عاكسة وبروفايل ذهبي.",
      en: "Designed to evoke the refined tranquility of presidential hotel suites. Constructed on a kiln-dried European solid beech foundation, upholstered in performance bouclé linen.",
    },
    images: [
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=1200&q=80",
    ],
    specs: [
      { label: { ar: "الهيكل الداخلي", en: "Inner Frame" }, value: { ar: "خشب زان أحمر روماني طبيعي 100%", en: "100% Solid European Red Beech" } },
      { label: { ar: "الأقمشة", en: "Upholstery" }, value: { ar: "قماش بوكليه كتان تركي مستورد طارد للسوائل", en: "Imported Water-Repellent Turkish Bouclé Linen" } },
      { label: { ar: "الدولاب", en: "Wardrobe" }, value: { ar: "زجاج سيكوريت عسلي مع مجسات حركة ليد", en: "Tinted Safety Glass with Motion-Activated LEDs" } },
    ],
    materials: [
      { ar: "خشب زان أحمر", en: "Solid Red Beech" },
      { ar: "قماش بوكليه", en: "Bouclé Textile" },
      { ar: "زجاج سيكوريت وإضاءات ذكية", en: "Tempered Glass & Smart LEDs" },
    ],
    colorsFinishes: [
      { ar: "أوف وايت كريمي مع خشب دافئ", en: "Warm Oat Cream & Honey Oak Accents" },
      { ar: "إكسسوارات ذهب شامبين", en: "Champagne Brushed Gold Hardware" },
    ],
    featured: true,
    status: "published",
    isDemo: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "prod-sofa-curved-atelier",
    slug: "atelier-curved-luxury-sofa",
    title: { ar: "كنبة أتيليه المنحنية من الكشمير والصوف", en: "Atelier Curved Sculptural Sofa" },
    categoryId: "cat-furniture",
    subcategoryId: "sub-furn-living",
    shortDescription: {
      ar: "كنبة معيشة عضوية الانحناءات مستوحاة من العمارة المعاصرة، مكسوة بأقمشة فاخرة مع حشوات إسفنجية عالية المرونة (HR).",
      en: "Architectural curved statement sofa wrapped in tailored woven bouclé, cushioned with high-resilience ergonomic foams for supreme comfort.",
    },
    fullDescription: {
      ar: "قطعة فنية تجسد مفهوم الأناقة الهادئة (Quiet Luxury). تصميم انسيابي منحني يكسر جمود الخطوط المستقيمة ويخلق جوًا من الألفة والاسترخاء، مدعمة بقاعدة مخفية من الخشب الصلب.",
      en: "An artistic testament to quiet luxury. Its gentle curves invite effortless conversation while providing anatomical support through multiple densities of cold-cured foam.",
    },
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
    ],
    specs: [
      { label: { ar: "الشاسيه", en: "Chassis" }, value: { ar: "شاسيه مدمج من خشب الزان المقوى", en: "Solid Hardwood Reinforced Framework" } },
      { label: { ar: "الحشو الداخلي", en: "Foam Cushioning" }, value: { ar: "إسفنج سوفت كثافة 36 مع طبقة فايبر حراري", en: "Density 36 HR Foam with Thermal Fiber Layer" } },
    ],
    materials: [
      { ar: "خشب زان", en: "Beech Hardwood" },
      { ar: "إسفنج فندقي HR", en: "High Resilience Foam" },
      { ar: "نسيج إسباني مقاوم للتآكل", en: "Heavy-Duty Spanish Textile" },
    ],
    colorsFinishes: [
      { ar: "بيج رملي دافئ", en: "Warm Sand Beige" },
      { ar: "رمادي حجري هادئ", en: "Soft Stone Grey" },
    ],
    featured: true,
    status: "published",
    isDemo: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "prod-off-desk-monarch",
    slug: "monarch-executive-desk",
    title: { ar: "مكتب مونارك التنفيذي بقشرة الجوز والجلد", en: "Monarch Executive Leather & Walnut Desk" },
    categoryId: "cat-office",
    subcategoryId: "sub-off-desks",
    shortDescription: {
      ar: "مكتب كبار المديرين بتصميم نحتي يدمج خشب الجوز الأمريكي بسطح جلدي إيطالي مطرز ووحدة خدمات جانبية مدمجة.",
      en: "Commanding presidential executive desk pairing American walnut veneer, handcrafted Italian leather inlay pad, and integrated wire management.",
    },
    fullDescription: {
      ar: "يعكس مكتب مونارك الهيبة والوقار في مكاتب كبار المسؤولين ورؤساء مجالس الإدارة. مزود بمجاري كهرباء وشواحن لاسلكية خفية داخل السطح، ووحدة أدراج مركزية بقفل رقمي ذكي لضمان الخصوصية التامة.",
      en: "Engineered for executive leadership. Features a seamless wireless charging desk pad, concealed cable raceways, soft-close stationery pedestals, and biometric lock drawers.",
    },
    images: [
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80",
    ],
    specs: [
      { label: { ar: "الخشب", en: "Timber" }, value: { ar: "قشرة جوز طبيعية مع أطراف زان مسيف", en: "Natural American Walnut Veneer with Solid Edge Banding" } },
      { label: { ar: "المسطح المكتبي", en: "Desk Pad" }, value: { ar: "جلد طبيعي بقري معالج بنقش يدوي دقيق", en: "Full-Grain Italian Leather Blotter Inset" } },
      { label: { ar: "نظام الكهرباء", en: "Cable Management" }, value: { ar: "بكس كهرباء وشاحن وايرلس مدمج بالسطح", en: "Flush Pop-up Hub with Wireless Fast-Charging" } },
    ],
    materials: [
      { ar: "خشب جوز طبيعي", en: "American Walnut" },
      { ar: "جلد إيطالي طبيعي", en: "Full Grain Leather" },
      { ar: "معدن مطلي بالذهب المات", en: "Matte Gold Coated Steel" },
    ],
    colorsFinishes: [
      { ar: "بني جوزي داكن مع جلد أسود", en: "Deep Walnut Brown with Obsidian Leather" },
    ],
    dimensions: { ar: "240 سم طول × 110 سم عرض × 78 سم ارتفاع", en: "240cm W x 110cm D x 78cm H" },
    featured: true,
    status: "published",
    isDemo: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "prod-off-chair-aero-pro",
    slug: "aero-pro-ergonomic-mesh-chair",
    title: { ar: "كرسي إيرو برو الطبي المريح للمديرين", en: "Aero Pro Ergonomic Managerial Chair" },
    categoryId: "cat-office",
    subcategoryId: "sub-off-chairs",
    shortDescription: {
      ar: "كرسي مكتبي شبكي فائق المرونة مع دعم ديناميكي لفقرات الظهر ومساند أذرع رباعية الأبعاد (4D) وقاعدة ألومنيوم مصقول.",
      en: "State-of-the-art ergonomic mesh task chair equipped with dynamic lumbar support, 4D adjustable armrests, and polished cast aluminum base.",
    },
    fullDescription: {
      ar: "صُمم كرسي إيرو برو لمن يقضون ساعات عمل طويلة أمام الشاشات. يوزع وزن الجسم بشكل متساوٍ ويقلل الضغط على العمود الفقري بفضل الميش الكوري المسامي المضاد للتعرق، وماكينة الميل المتزامن بـ 4 أوضاع إقفال مختلفة.",
      en: "Certified for 12+ hour daily performance. Features responsive breathable Korean mesh, synchronous multi-angle tilt lock, and pneumatic gas lift certified to BIFMA standards.",
    },
    images: [
      "https://images.unsplash.com/photo-1580481077195-731da03fed74?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80",
    ],
    specs: [
      { label: { ar: "نوع الشبك", en: "Mesh Fabric" }, value: { ar: "ميش كوري مرن عالي التحمل ضد التمدد", en: "High-Tension Breathable Korean Elastomeric Mesh" } },
      { label: { ar: "مساند الذراع", en: "Armrests" }, value: { ar: "حركة 4D (ارتفاع، عمق، زاوية، وعرض)", en: "4D Multi-Directional Polyurethane Armrests" } },
      { label: { ar: "القاعدة والعجلات", en: "Base & Castors" }, value: { ar: "ألومنيوم داي كاست مع عجلات سيليكون صامتة", en: "Die-Cast Aluminum Base with Silent PU Floor-Safe Wheels" } },
    ],
    materials: [
      { ar: "ألومنيوم داي كاست", en: "Die-Cast Aluminum" },
      { ar: "شبك إيلاستومير طبي", en: "Polymer Mesh" },
    ],
    colorsFinishes: [
      { ar: "أسود مات فخم", en: "All-Black Stealth" },
      { ar: "رمادي فضي مع ألومنيوم لامع", en: "Silver Grey Mesh with Polished Aluminum" },
    ],
    featured: true,
    status: "published",
    isDemo: true,
    createdAt: new Date().toISOString(),
  },
];

export const initialProjects: Project[] = [
  {
    id: "proj-villa-tagamoa",
    slug: "villa-tagamoa-luxury-kitchen-cladding",
    title: { ar: "تجهيز مطبخ وتجاليد فيلا فاخرة — التجمع الخامس", en: "Luxury Kitchen & Cladding Fit-out — New Cairo Villa" },
    categoryId: "cat-wooden-kitchens",
    description: {
      ar: "تنفيذ مطبخ رئيسي مفتوح على صالة الاستقبال مع تجاليد جدارية مضلعة بطول 14 مترًا بارتفاع 3.20 متر، واستخدام كوارتز كالاكاتا إيطالي لأسطح الجزيرة المركزية.",
      en: "Turnkey fit-out comprising an open-concept chef's kitchen, a 14-meter architectural reeded wall cladding, and an Italian Calacatta waterfall island.",
    },
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    ],
    beforeAfterPair: {
      beforeImage: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80",
      afterImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
      caption: {
        ar: "تحويل مساحة المطبخ القديمة المظلمة إلى فضاء عصري مضيء ومفتوح",
        en: "Transformation from an outdated enclosed space to an illuminated open-concept kitchen",
      },
    },
    clientLocation: { ar: "التجمع الخامس، القاهرة الجديدة", en: "5th Settlement, New Cairo" },
    duration: { ar: "30 يوم عمل من المقايسة حتى التسليم", en: "30 working days from survey to handover" },
    featured: true,
    status: "published",
    isDemo: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "proj-zayed-penthouse",
    slug: "sheikh-zayed-penthouse-modern-living",
    title: { ar: "فرش بنتهاوس عصري بالكامل — الشيخ زايد", en: "Contemporary Penthouse Full Fit-out — Sheikh Zayed" },
    categoryId: "cat-furniture",
    description: {
      ar: "تصميم وتنفيذ غرف النوم الماستر، غرفة ملابس زجاجية بإضاءات ذكية، وركن صالون منحني متصل مع تجاليد خشبية فاخرة تطل على التراس.",
      en: "Custom manufacture of the master bedroom, illuminated glass dressing suite, curved living furniture, and terrace wall cladding.",
    },
    images: [
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
    ],
    beforeAfterPair: {
      beforeImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80",
      afterImage: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=80",
      caption: {
        ar: "الجدار الفاصل قبل وبعد تكسيته بتجاليد الخشب والرخام المضيء",
        en: "The partition wall before and after being clad in acoustic timber & stone",
      },
    },
    clientLocation: { ar: "الشيخ زايد، 6 أكتوبر", en: "Sheikh Zayed, 6th of October" },
    duration: { ar: "45 يوم عمل", en: "45 working days" },
    featured: true,
    status: "published",
    isDemo: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "proj-mansoura-corporate-hq",
    slug: "mansoura-corporate-headquarters",
    title: { ar: "تأثيث المقر الإداري لشركة استثمارية — المنصورة", en: "Investment Firm Corporate HQ — El-Mansoura" },
    categoryId: "cat-office",
    description: {
      ar: "تصنيع مكاتب مجلس الإدارة التنفيذية، طاولة اجتماعات تتسع لـ 18 شخصًا مزودة بمنافذ بيانات وشواحن لاسلكية، وتوريد 45 كرسيًا طبيًا مريحًا.",
      en: "Manufacture of executive boardroom tables seating 18 with integrated data ports, custom managerial desks, and 45 ergonomic task chairs.",
    },
    images: [
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80",
    ],
    clientLocation: { ar: "المنصورة، الدقهلية", en: "El-Mansoura, Dakahlia" },
    duration: { ar: "25 يوم عمل", en: "25 working days" },
    featured: true,
    status: "published",
    isDemo: true,
    createdAt: new Date().toISOString(),
  },
];

export const initialConfiguratorOptions: ConfiguratorOption[] = [
  // Layouts
  {
    id: "cfg-layout-l-shape",
    type: "layouts",
    name: { ar: "توزيع حرف L (L-Shape)", en: "L-Shape Layout" },
    category: "layout",
    thumbnail: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=300&q=80",
    order: 1,
    isDefault: true,
  },
  {
    id: "cfg-layout-u-shape",
    type: "layouts",
    name: { ar: "توزيع حرف U (U-Shape)", en: "U-Shape Layout" },
    category: "layout",
    thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=300&q=80",
    order: 2,
  },
  {
    id: "cfg-layout-island",
    type: "layouts",
    name: { ar: "مطبخ مع جزيرة مركزية (Island)", en: "Island Layout" },
    category: "layout",
    thumbnail: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=300&q=80",
    order: 3,
  },
  {
    id: "cfg-layout-linear",
    type: "layouts",
    name: { ar: "مطبخ خطي مستقيم (Linear)", en: "Linear One-Wall" },
    category: "layout",
    thumbnail: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=300&q=80",
    order: 4,
  },

  // Door Finishes
  {
    id: "cfg-door-dark-oak",
    type: "doorFinishes",
    name: { ar: "أرو طبيعي داكن (Dark Oak)", en: "Dark Natural Oak" },
    hexColor: "#3D2B1F",
    thumbnail: "https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?auto=format&fit=crop&w=200&q=80",
    order: 1,
    isDefault: true,
  },
  {
    id: "cfg-door-warm-cream",
    type: "doorFinishes",
    name: { ar: "كريمي بولي لاك (Warm Cream)", en: "Warm Cream Polygloss" },
    hexColor: "#EDE3D3",
    thumbnail: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=200&q=80",
    order: 2,
  },
  {
    id: "cfg-door-matte-nero",
    type: "doorFinishes",
    name: { ar: "أسود فحمي مات (Matte Nero)", en: "Matte Nero Black" },
    hexColor: "#1C1512",
    thumbnail: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=200&q=80",
    order: 3,
  },
  {
    id: "cfg-door-natural-walnut",
    type: "doorFinishes",
    name: { ar: "جوز طبيعي معتق (Smoked Walnut)", en: "Smoked Walnut" },
    hexColor: "#5C4033",
    thumbnail: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=200&q=80",
    order: 4,
  },

  // Countertops
  {
    id: "cfg-top-calacatta-gold",
    type: "countertops",
    name: { ar: "كوارتز كالاكاتا ذهبي (Calacatta Gold)", en: "Calacatta Gold Quartz" },
    hexColor: "#F4F1EA",
    thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=200&q=80",
    order: 1,
    isDefault: true,
  },
  {
    id: "cfg-top-black-granite",
    type: "countertops",
    name: { ar: "جرانيت أسود أسواني دبل بلاك", en: "Honed Double Black Granite" },
    hexColor: "#1A1A1A",
    thumbnail: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=200&q=80",
    order: 2,
  },
  {
    id: "cfg-top-terrazzo-oat",
    type: "countertops",
    name: { ar: "تيرازو كريمي إيطالي", en: "Italian Cream Terrazzo" },
    hexColor: "#DED6C9",
    thumbnail: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=200&q=80",
    order: 3,
  },

  // Handles
  {
    id: "cfg-handle-gola-gold",
    type: "handles",
    name: { ar: "بروفايل جولا مخفي ذهبي (Gola Gold)", en: "Concealed Gold Gola" },
    hexColor: "#B38B54",
    thumbnail: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=200&q=80",
    order: 1,
    isDefault: true,
  },
  {
    id: "cfg-handle-gola-black",
    type: "handles",
    name: { ar: "بروفايل جولا أسود فحمي (Gola Black)", en: "Concealed Black Gola" },
    hexColor: "#1C1512",
    thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=200&q=80",
    order: 2,
  },
  {
    id: "cfg-handle-brass-knurled",
    type: "handles",
    name: { ar: "مقابض نحاسية محفورة (Knurled Brass)", en: "Knurled Brass Bar Handles" },
    hexColor: "#D9B97E",
    thumbnail: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=200&q=80",
    order: 3,
  },
];

export const initialTestimonials: Testimonial[] = [
  {
    id: "test-1",
    name: { ar: "د. طارق الشناوي", en: "Dr. Tarek El-Shennawy" },
    roleLocation: { ar: "مالك فيلا — التجمع الخامس", en: "Villa Owner — New Cairo" },
    content: {
      ar: "تعاملت مع طراز لتفصيل مطبخ الفيلا وتجاليد غرفة المعيشة. الحرفية في تنفيذ تفاصيل خشب الأرو والكوارتز كانت مذهلة والتسليم تم في الموعد المحدد بالضبط رغم أننا قمنا بطلب كل شيء أونلاين.",
      en: "We commissioned TERAZ for our villa kitchen and living room wall cladding. The craftsmanship in the natural oak and quartz details was breathtaking, and delivery was right on schedule.",
    },
    rating: 5,
    verified: true,
    isDemo: true,
  },
  {
    id: "test-2",
    name: { ar: "م. نورهان المهدي", en: "Eng. Nourhan El-Mahdy" },
    roleLocation: { ar: "مهندسة ديكور — القاهرة", en: "Interior Designer — Cairo" },
    content: {
      ar: "كمصممة ديكور، أهم ما أبحث عنه هو دقة المقاسات ونظافة التشطيب النهائي. طراز وفروا لي شريك تصنيع موثوق ومفصلات بلوم الأصلية جعلت عميلتي في غاية السعادة.",
      en: "As an interior designer, dimensional precision and pristine edge finishes are paramount. TERAZ proved to be an impeccable manufacturing partner.",
    },
    rating: 5,
    verified: true,
    isDemo: true,
  },
  {
    id: "test-3",
    name: { ar: "أ. محمود سالم", en: "Mahmoud Salem" },
    roleLocation: { ar: "الرئيس التنفيذي — المنصورة", en: "Managing Director — El-Mansoura" },
    content: {
      ar: "قمنا بفرش مقر شركتنا الجديد بالكامل من مكاتب وكراسي طبية وطاولة اجتماعات ضخمة. الجودة مريحة جدًا للموظفين والمظهر العام أمام عملائنا يعكس فخامة لا تُضاهى.",
      en: "We furnished our corporate headquarters with executive desks, ergonomic chairs, and a grand boardroom table. Exceptional quality that impressed our visitors.",
    },
    rating: 5,
    verified: true,
    isDemo: true,
  },
  {
    id: "test-4",
    name: { ar: "أ. هبة علام", en: "Heba Allam" },
    roleLocation: { ar: "الشيخ زايد", en: "Sheikh Zayed" },
    content: {
      ar: "مطبخ الألوميتال مع الزجاج المضلع كان تحفة هندسية! سهل التنظيف ومقاوم للماء بنسبة 100% وشكله شيك للغاية، وفريق التركيب كان في قمة الاحترافية والأدب.",
      en: "The aluminum and reeded glass kitchen was an absolute masterpiece! Incredibly easy to clean, totally waterproof, and the installation team was courteous and meticulous.",
    },
    rating: 5,
    verified: true,
    isDemo: true,
  },
];

export const initialFAQs: FAQItem[] = [
  {
    id: "faq-1",
    category: "ordering",
    order: 1,
    question: {
      ar: "كيف تتم المقايسة والطلب بدون معرض فعلي؟",
      en: "How does the site survey and ordering process work without a physical showroom?",
    },
    answer: {
      ar: "نحن نعمل بنظام التوريد المباشر من ورشنا ومصانعنا لنوفر لك أعلى خامة بأفضل تكلفة تنفيذية بعيدًا عن هوامش المعارض الباهظة. فور تواصلك معنا عبر نموذج الموقع أو الواتساب، ينتقل مهندس مختص إلى مكانك لمعاينة المساحة ورفع المقاسات بدقة واطلاعك على عينات الخامات والكتالوجات الواقعية قبل بدء التصميم ثلاثي الأبعاد والتصنيع.",
      en: "We operate on a direct-to-client manufacturing model, delivering supreme quality without inflated retail showroom margins. Once you submit a quote request, our engineer visits your site to perform precise laser measurements and present material finish swatches directly to you.",
    },
  },
  {
    id: "faq-2",
    category: "materials",
    order: 2,
    question: {
      ar: "ما هي الضمانات التي تقدمونها على المطابخ والموبيليا؟",
      en: "What warranties do you provide on kitchens and custom furniture?",
    },
    answer: {
      ar: "نقدم ضمانًا معتمدًا يصل إلى 10 سنوات على الهياكل الخشبية والألوميتال ضد عيوب التصنيع والرطوبة، وضمان مدى الحياة على المفصلات ومجاري الأدراج النمساوية (Blum) ضد الصدأ والتلف.",
      en: "We provide an official warranty of up to 10 years on wood and aluminum cabinet carcasses against moisture and manufacturing defects, and a lifetime warranty on authentic Austrian Blum soft-close hardware.",
    },
  },
  {
    id: "faq-3",
    category: "shipping",
    order: 3,
    question: {
      ar: "ما هي المحافظات التي يشملها التوريد والتركيب؟",
      en: "Which governorates in Egypt do you deliver and install to?",
    },
    answer: {
      ar: "نخدم ونركّب في جميع محافظات مصر بلا استثناء: القاهرة الكبرى، الجيزة، الإسكندرية، الدقهلية (المنصورة)، مدن القناة، محافظات الدلتا، والساحل الشمالي.",
      en: "We deliver and assemble nationwide across all Egyptian governorates: Greater Cairo, Giza, Alexandria, Dakahlia (El-Mansoura), Canal cities, Delta, and the North Coast.",
    },
  },
  {
    id: "faq-4",
    category: "pricing",
    order: 4,
    question: {
      ar: "لماذا لا تظهر الأسعار مباشرة على الموقع؟",
      en: "Why are prices not displayed directly on the public website?",
    },
    answer: {
      ar: "لأن كل قطعة ومطبخ في طراز تُصنع خصيصًا (Custom-Made) بمقاسات وخامات وإكسسوارات ونوعيات رخام وكوارتز تختلف كليًا من عميل لآخر. عرض السعر يُحسب بدقة بعد معرفة الأبعاد والخامات المختارة لنعطيك أدق وأنسب تسعير لمشروعك دون أي مبالغة.",
      en: "Every piece and kitchen at TERAZ is custom engineered to bespoke dimensions, selected quartz/granite surfaces, and specific hardware options. We calculate precise, transparent quotes tailored specifically to your architectural drawings.",
    },
  },
];

export const initialStats: StatItem[] = [
  {
    id: "stat-years",
    value: 10,
    suffix: "+",
    label: { ar: "سنوات من الحرفية المتوارثة", en: "Years of Master Craftsmanship" },
    description: { ar: "خبرة متراكمة في تفصيل الأخشاب والألومنيوم", en: "Deep mastery in architectural woodwork & aluminum" },
    order: 1,
  },
  {
    id: "stat-projects",
    value: 250,
    suffix: "+",
    label: { ar: "مشروع سكني وتجاري منفذ", en: "Residential & Commercial Projects" },
    description: { ar: "في أرقى الكمبوندات والمقرات الإدارية بمصر", en: "Across premier compounds and executive suites" },
    order: 2,
  },
  {
    id: "stat-clients",
    value: 200,
    suffix: "+",
    label: { ar: "عميل يثق في طراز", en: "Delighted Clients & Families" },
    description: { ar: "بنسبة رضا وتقييمات إيجابية تتجاوز 99%", en: "Maintaining a 99%+ positive satisfaction rating" },
    order: 3,
  },
  {
    id: "stat-warranty",
    value: 10,
    suffix: " سنوات",
    label: { ar: "ضمان حقيقي معتمد", en: "Years Certified Warranty" },
    description: { ar: "على الهيكل وجودة التشطيب", en: "Covering structural integrity and hardware" },
    order: 4,
  },
];

export const initialServices: ServiceItem[] = [
  {
    id: "srv-kitchens",
    title: { ar: "تصميم وتنفيذ المطابخ الفاخرة", en: "Bespoke Kitchen Design & Manufacture" },
    description: {
      ar: "مطابخ خشبية وألوميتال مصممة هندسيًا لاستغلال كل سنتيمتر، مع حلول تخزين ذكية ومفصلات هيدروليكية فائقة النعومة.",
      en: "Custom wood and aluminum kitchens ergonomically designed to optimize spatial efficiency with smart storage and Austrian hardware.",
    },
    iconName: "ChefHat",
    features: [
      { ar: "شاسيهات معالجة ضد الرطوبة والمياه 100%", en: "100% Moisture and Humidity Resistant Carcasses" },
      { ar: "أسطح كوارتز وجرانيت رخامي متصلة", en: "Seamless Calacatta Quartz and Granite Countertops" },
      { ar: "إضاءات ليد داخلية مدمجة بحساسات حركة", en: "Motion-Activated Sensor LED Cabinet Lighting" },
    ],
    order: 1,
  },
  {
    id: "srv-cladding",
    title: { ar: "التجاليد المعمارية والكلادينج", en: "Architectural Wall Cladding & Paneling" },
    description: {
      ar: "تحويل الجدران إلى لمسات ديكورية ساحرة باستخدام خشب السلات وود، بديل الرخام، والإضاءات الخفية.",
      en: "Elevating plain walls into breathtaking focal surfaces using acoustic timber slats, porcelain slabs, and hidden illumination.",
    },
    iconName: "Layers",
    features: [
      { ar: "عزل صوتي فندقي وتكسيات فخمة", en: "Hotel-Grade Acoustic Sound Dampening" },
      { ar: "بديل رخام وخشب عالي المقاومة للخدش", en: "Scratch & Impact Resistant Composite Cladding" },
      { ar: "تثبيت خفي تمامًا بدون بروز مسامير", en: "Completely Concealed Mounting Systems" },
    ],
    order: 2,
  },
  {
    id: "srv-furniture",
    title: { ar: "الموبيليا والأثاث المنزلي المخصص", en: "Bespoke Residential Furniture" },
    description: {
      ar: "تفصيل غرف النوم الماستر، الصالونات، غرف الطعام، ووحدات الدريسنج روم بأجود الأخشاب الطبيعية.",
      en: "Tailor-made master bedroom suites, sculptural living sets, credenzas, and walk-in dressing rooms built from solid hardwoods.",
    },
    iconName: "Sofa",
    features: [
      { ar: "أخشاب زان أحمر وأرو طبيعي مجفف", en: "Kiln-Dried European Red Beech & Natural Oak" },
      { ar: "أقمشة مستوردة طاردة للسوائل والبقع", en: "Imported Stain-Repellent Performance Fabrics" },
      { ar: "حشوات إسفنجية بكثافات طبية مريحة", en: "Anatomical High-Density Foam Fillings" },
    ],
    order: 3,
  },
  {
    id: "srv-office",
    title: { ar: "تأثيث المكاتب والشركات", en: "Corporate & Office Furniture Solutions" },
    description: {
      ar: "تجهيز مقرات الشركات وغرف الاجتماعات ومكاتب الإدارة العليا بكراسي مريحة وطاولات تفاعلية.",
      en: "Complete corporate turnkey fit-outs, executive presidential suites, boardroom tables, and ergonomic task seating.",
    },
    iconName: "Briefcase",
    features: [
      { ar: "كراسي طبية معتمدة لساعات العمل الطويلة", en: "Certified Ergonomic Seating for Extended Work Hours" },
      { ar: "إدارة كابلات ذكية ومنافذ شحن لاسلكي", en: "Integrated Cable Pathways & Wireless Charging" },
      { ar: "تصاميم تعكس هوية الشركة الاحترافية", en: "Modern Aesthetics Aligning with Corporate Identity" },
    ],
    order: 4,
  },
];

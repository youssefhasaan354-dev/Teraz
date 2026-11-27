# TERAZ (طراز) — System Architecture & Implementation Plan

## 1. Overview
TERAZ (طراز) is a high-end, editorial-grade furniture, kitchens, and cladding brand based in Egypt.
This application is a unified Next.js (App Router) full-stack web platform consisting of:
1. **Public Website:** Award-level, scroll-driven, bilingual (Arabic default / English secondary), SEO-optimized showcase and lead generator.
2. **Admin Dashboard (`/admin`):** Full Content Management System (CMS) and CRM-lite for managing site settings, dynamic pages/sections, media library, categories, products, projects, kitchen configurator, testimonials, FAQs, and leads.
3. **Backend & Data Layer:** Firebase (Firestore, Auth, Storage) with resilient local/mock fallback mode so the site and dashboard are immediately operational even before cloud API keys are provisioned, seamlessly migrating to live Firebase with environment variables.

---

## 2. Tech Stack Specification

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | Next.js 14+ (App Router, Server Components + Client Islands) | High-performance SSR/SSG/ISR, optimal SEO & speed |
| **Language** | TypeScript (Strict mode) | Type safety across entire codebase |
| **Styling** | Tailwind CSS + CSS Variables Tokens | Fluid typography, theme switcher, responsive & RTL-first logical properties |
| **Icons** | `lucide-react` | Lightweight, consistent iconography |
| **Smooth Scroll** | Lenis (`@studio-freight/lenis` / `lenis`) | 60fps smooth momentum scrolling |
| **Scroll-Driven Motion** | GSAP 3 + ScrollTrigger | Pinned storytelling, scrub animations, horizontal galleries, mask reveals |
| **UI Motion & Transitions** | Framer Motion | Page transitions, modal transitions, magnetic buttons, micro-interactions |
| **Database & Auth** | Firebase 10+ (Firestore, Auth, Storage) | Cloud database, authentication, file storage |
| **Data Fetching / State** | SWR / TanStack Query + React Context | Optimistic UI, caching, live updates in admin |
| **Forms & Validation** | React Hook Form + Zod | Multi-step quote request, contact forms, CMS inputs |
| **Charts** | Recharts | Admin analytics and lead distribution graphs |

---

## 3. Directory Structure

```
teraz/
├── app/
│   ├── (public)/                     # Public customer-facing routes
│   │   ├── layout.tsx                # Master root layout (Lenis, RTL, Navbar, Footer, Floating Actions)
│   │   ├── page.tsx                  # Home page (cinematic hero, pinned storytelling, horizontal gallery, configurator, etc.)
│   │   ├── categories/               # Dynamic categories listing
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx       # Category detail with sub-category filters
│   │   ├── products/                 # Products catalog
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx       # Product detail (Quote-only CTA, WhatsApp pre-fill, specs, gallery)
│   │   ├── projects/                 # Portfolio / Completed works
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx       # Project detail (Before/After, specs, gallery)
│   │   ├── configurator/page.tsx     # Full Interactive Kitchen Configurator
│   │   ├── materials/page.tsx        # Materials & Finishes library
│   │   ├── about/page.tsx            # Brand story, craftsmanship, values
│   │   ├── services/page.tsx         # Custom design, manufacturing, installation
│   │   ├── contact/page.tsx          # Contact page (online notice, 24/7 hours, inquiry form)
│   │   ├── quote/page.tsx            # Multi-step animated quote request wizard
│   │   ├── faq/page.tsx              # Interactive accordion FAQ
│   │   ├── privacy/page.tsx          # Legal privacy policy
│   │   ├── terms/page.tsx            # Terms of service
│   │   └── not-found.tsx             # Luxury 404 page
│   ├── admin/                        # Admin Dashboard CMS routes
│   │   ├── layout.tsx                # Admin layout (Sidebar, Topbar, Auth guard, Notifications)
│   │   ├── login/page.tsx            # Luxury secure admin login & forgot password
│   │   ├── page.tsx                  # Dashboard overview (KPIs, Recharts graphs, recent leads)
│   │   ├── settings/page.tsx         # Brand settings, contact, 24/7 toggle, colors, SEO
│   │   ├── sections/page.tsx         # Dynamic Page & Section Manager (reorder, edit copy/media)
│   │   ├── categories/page.tsx       # Categories & Sub-categories CRUD
│   │   ├── products/page.tsx         # Products CRUD (specs, gallery, materials, quote flags)
│   │   ├── projects/page.tsx         # Portfolio CRUD (before/after, specs, photos)
│   │   ├── configurator/page.tsx     # Kitchen Configurator options CRUD (layouts, doors, counters, handles)
│   │   ├── leads/page.tsx            # CRM inbox (leads, quote requests, status, CSV export, WhatsApp click)
│   │   ├── media/page.tsx            # Media Library (upload, tag, replace, demo badges)
│   │   ├── testimonials/page.tsx     # Testimonials management
│   │   ├── faqs/page.tsx             # FAQ management
│   │   └── services/page.tsx         # Services management
│   ├── api/                          # Next.js API route handlers
│   │   ├── leads/route.ts            # Public lead submission handler with anti-spam & notification hooks
│   │   ├── revalidate/route.ts       # On-demand ISR revalidation endpoint
│   │   └── export-leads/route.ts     # CSV lead exporter
│   ├── globals.css                   # Tailwind imports & CSS custom properties
│   └── layout.tsx                    # Top-level HTML/Body layout with font definitions
├── components/
│   ├── ui/                           # Base UI primitives (Button, Input, Modal, Badge, Dropdown, Slider, etc.)
│   ├── public/                       # Public site components
│   │   ├── Header.tsx                # Luxury sticky header with mega-menu & language switch
│   │   ├── Footer.tsx                # Rich footer with links, brand bio, contact, copyright
│   │   ├── FloatingActions.tsx       # Sticky pulsing WhatsApp, Call & Quote CTAs
│   │   ├── CustomCursor.tsx          # Desktop interactive cursor follower with "View / عرض"
│   │   ├── Preloader.tsx             # Elegant brand reveal intro (≤ 2s, skippable)
│   │   ├── GlobalSearch.tsx          # Instant search modal for products, projects, categories
│   │   └── KitchenConfigurator.tsx   # Interactive 4-step kitchen material & layout configurator
│   ├── motion/                       # Reusable motion components
│   │   ├── Reveal.tsx                # Scroll reveal with clip-path/fade
│   │   ├── SplitText.tsx             # Letter/word staggered text animation
│   │   ├── Parallax.tsx              # Depth-based scroll parallax wrapper
│   │   ├── Magnetic.tsx              # Magnetic hover attractor for CTAs
│   │   ├── HorizontalScroll.tsx      # Smooth horizontal project scroll
│   │   ├── PinnedStory.tsx           # Pinned category transition storytelling
│   │   ├── BeforeAfter.tsx           # Interactive draggable before/after image slider
│   │   ├── Counter.tsx               # Animated number counter
│   │   └── Marquee.tsx               # Infinite luxury text & logo marquee
│   └── admin/                        # Dashboard CMS components
│       ├── AdminSidebar.tsx
│       ├── AdminHeader.tsx
│       ├── ImagePicker.tsx           # Visual media selector & uploader
│       ├── BilingualInput.tsx        # Side-by-side Arabic & English input with missing indicators
│       └── StatusBadge.tsx
├── lib/
│   ├── firebase/
│   │   ├── config.ts                 # Firebase client initialization
│   │   ├── admin.ts                  # Firebase admin SDK helper (server-side)
│   │   └── firestore-service.ts      # Abstracted DB operations (with resilient fallback store)
│   ├── hooks/
│   │   ├── useLanguage.ts            # Bilingual context & translations hook
│   │   ├── useSmoothScroll.ts        # Lenis smooth scroll hook
│   │   └── useMediaQuery.ts          # Responsive & prefers-reduced-motion hook
│   ├── i18n/
│   │   ├── dictionaries.ts           # Core static bilingual strings (ar / en)
│   │   └── LanguageContext.tsx       # Context provider for AR/EN state
│   ├── utils/
│   │   ├── cn.ts                     # Tailwind class merge utility
│   │   ├── formatters.ts             # Date and number formatting (Arabic/English)
│   │   └── seo.ts                    # Dynamic JSON-LD & meta tag generator
│   └── initial-data.ts               # Complete initial seed data (settings, categories, products, projects)
├── public/
│   ├── brand/                        # Logo SVGs, PNGs, favicon, icons
│   └── demo/                         # High-res curated demo images for kitchens, cladding, furniture
├── scripts/
│   ├── seed.ts                       # Firestore seed script
│   └── init-admin.ts                 # Super admin creator script
├── firestore.rules                   # Strict Firestore security rules
├── storage.rules                     # Storage security rules
├── firestore.indexes.json            # Firestore composite index definitions
└── README.md                         # Full deployment, env, and operation guide
```

---

## 4. Key Motion & UX Principles
1. **Lenis + GSAP ScrollTrigger Integration:** A single unified RAF loop drives both Lenis smooth scrolling and GSAP ScrollTrigger updates, eliminating jitter or desync.
2. **Respect for `prefers-reduced-motion`:** If a user prefers reduced motion, smooth scrolling and heavy scroll-driven triggers are bypassed gracefully, maintaining instant accessibility and clarity.
3. **Mobile-First Responsiveness:** On touch devices, desktop cursor followers are disabled, pinned storytelling falls back to clean swipeable/stacked layouts, and horizontal scroll sections gracefully support native touch-swipe.
4. **Bilingual RTL / LTR Switching:** The application dynamically toggles `dir="rtl"` (Arabic) and `dir="ltr"` (English). Horizontal motions and directional layout icons automatically mirror correctly.

# TERAZ Furniture & Kitchens (طِراز للأثاث والمطابخ)
### Award-Level Brand Website + Full Admin Dashboard (CMS & CRM)

> **"عِش الأناقة • Live in Elegance"**  
> A bespoke, editorial-grade digital experience and content management platform for Egypt's premier custom furniture, architectural wall cladding, and luxury kitchen brand.

---

## 1. Tech Stack

- **Framework:** Next.js 14+ (App Router, Server Components + Client Islands)
- **Language:** TypeScript (Strict Mode)
- **Styling:** Tailwind CSS + CSS Custom Property Tokens
- **Animations:** GSAP 3 + ScrollTrigger, Lenis Smooth Scroll, Framer Motion
- **Icons:** `lucide-react`
- **Charts:** `recharts`
- **Database & Auth:** Firebase 10+ (Cloud Firestore, Auth, Storage) + Resilient In-Memory/LocalStorage Store
- **Forms & Validation:** React Hook Form + Zod
- **Documentation:** Complete architectural specs, data models, and deployment guides in the [`/docs`](./docs) directory.

---

## 2. Quick Start & Local Setup

### 1. Prerequisites
- Node.js 18+ or 20+ LTS
- npm or pnpm

### 2. Installation
```bash
git clone https://github.com/youssefhasaan354-dev/Teraz.git
cd Teraz
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env.local` and add your configuration:
```bash
cp .env.example .env.local
```

### 4. Run Development Server
```bash
npm run dev
```
- Open [http://localhost:3000](http://localhost:3000) to view the public website.
- Open [http://localhost:3000/admin](http://localhost:3000/admin) to access the Admin CMS.

---

## 3. Documentation Directory

Detailed architectural documents and deployment guides are available in [`/docs`](./docs):
- [**Deployment from GitHub & Vercel Guide (Arabic + English)**](./docs/DEPLOY_FROM_GITHUB.md)
- [**System Architecture & Technical Plan**](./docs/ARCHITECTURE.md)
- [**Data Model & Schema Specifications**](./docs/DATA_MODEL.md)
- [**Assumptions & Business Logic**](./docs/ASSUMPTIONS.md)

---

## 4. Admin CMS Access

- **Admin URL:** `/admin` (or `/admin/login`)
- **Local / Demo Evaluation:** Click the **"1-Click Demo Login"** button on the login screen for instant offline access.
- **Production Admin Setup:** Initialize your production admin credentials using the secure CLI script:
  ```bash
  npx tsx scripts/init-admin.ts <admin-email> <strong-password>
  ```

---

## 5. Dual Storage Resilience Architecture

The application is engineered with a **Zero-Crash Resilience Layer**:
1. **Local Resilient Mode:** Functions out of the box with zero external dependencies. Edits made in the Admin CMS persist across sessions in local storage.
2. **Cloud Firestore Mode:** Automatically activates as soon as valid Firebase credentials (`NEXT_PUBLIC_FIREBASE_*`) are provided in `.env.local`.

### Seeding Cloud Firestore
Once your Firebase project is created:
```bash
npx tsx scripts/seed.ts
npx tsx scripts/init-admin.ts <your-email> <your-password>
```

### Deploying Firebase Rules & Indexes
```bash
npm install -g firebase-tools
firebase login
firebase deploy --only firestore:rules,firestore:indexes,storage
```

---

## 6. Git Workflow & CI/CD Rules

To maintain production stability and seamless synchronization with GitHub:
1. **Pre-commit Verification:** Always run `npm run lint` and `npm run build` before committing. Never commit failing code or broken types.
2. **Conventional Commits:** Use clear conventional commit messages (`feat:`, `fix:`, `style:`, `refactor:`, `docs:`, `chore:`).
3. **Branch Protection & Pull Requests:**
   - The default branch is `main`.
   - Continuous Integration (`.github/workflows/ci.yml`) runs on every push and PR to `main`.
   - Feature branches follow the pattern `feat/<feature-name>`.
4. **Secret Hygiene:** Never commit `.env.local`, API keys, private keys, or credentials. Only `.env.example` with empty placeholders is tracked.
5. **No Force-Pushes:** Avoid `git push --force` or rewriting history on `main`. If remote changes occur, use `git pull --rebase origin main`, resolve conflicts, verify build, and push cleanly.

---

## 7. Official Contact Details Configured
- **Phone & WhatsApp:** 01005423809 (`+201005423809`)
- **Email:** `terazfurneture@gmail.com`
- **Facebook:** [TERAZ Facebook Page](https://www.facebook.com/profile.php?id=61596909988938)
- **Instagram:** [@furnitureteraz](https://www.instagram.com/furnitureteraz/)
- **Working Hours:** 24/7 ("متاحون دائمًا / Always available")
- **Service Area:** Nationwide across Egypt ("نوصّل ونركّب في جميع أنحاء مصر")

---
*Created with architectural precision for TERAZ (طراز) Furniture & Kitchens.*

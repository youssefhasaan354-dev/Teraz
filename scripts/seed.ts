/**
 * TERAZ Furniture & Kitchens (طراز) — Cloud Firestore Seeding Script
 * 
 * Usage:
 *   npx tsx scripts/seed.ts
 *   or
 *   node scripts/seed.js
 */

import { initializeApp, getApps } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
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
} from "../lib/initial-data";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

async function seedFirestore() {
  console.log("🌿 [TERAZ] Starting Cloud Firestore Seed Process...");

  if (!firebaseConfig.projectId || firebaseConfig.apiKey === "your_firebase_api_key_here") {
    console.warn("⚠️ Firebase environment variables are placeholder or not provided.");
    console.log("💡 The application uses the built-in resilient local storage automatically!");
    console.log("   To seed real Cloud Firestore, provide valid NEXT_PUBLIC_FIREBASE_* variables in .env.local.");
    return;
  }

  const app = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);
  const db = getFirestore(app);

  try {
    // 1. Settings
    console.log("→ Seeding Site Settings...");
    await setDoc(doc(db, "settings", "site"), initialSiteSettings, { merge: true });

    // 2. Categories
    console.log("→ Seeding Categories...");
    for (const cat of initialCategories) {
      await setDoc(doc(db, "categories", cat.id), cat, { merge: true });
    }

    // 3. Products
    console.log("→ Seeding Products Catalog...");
    for (const prod of initialProducts) {
      await setDoc(doc(db, "products", prod.id), prod, { merge: true });
    }

    // 4. Projects
    console.log("→ Seeding Completed Projects...");
    for (const proj of initialProjects) {
      await setDoc(doc(db, "projects", proj.id), proj, { merge: true });
    }

    // 5. Configurator Options
    console.log("→ Seeding Kitchen Configurator Options...");
    for (const opt of initialConfiguratorOptions) {
      await setDoc(doc(db, "configurator", opt.type, "items", opt.id), opt, { merge: true });
    }

    // 6. Testimonials
    console.log("→ Seeding Testimonials...");
    for (const test of initialTestimonials) {
      await setDoc(doc(db, "testimonials", test.id), test, { merge: true });
    }

    // 7. FAQs
    console.log("→ Seeding FAQs...");
    for (const faq of initialFAQs) {
      await setDoc(doc(db, "faqs", faq.id), faq, { merge: true });
    }

    // 8. Stats
    console.log("→ Seeding Stats...");
    for (const stat of initialStats) {
      await setDoc(doc(db, "stats", stat.id), stat, { merge: true });
    }

    // 9. Services
    console.log("→ Seeding Services...");
    for (const srv of initialServices) {
      await setDoc(doc(db, "services", srv.id), srv, { merge: true });
    }

    console.log("✅ [TERAZ] Cloud Firestore Seeding Completed Successfully! 🌿");
  } catch (err) {
    console.error("❌ Seed Error:", err);
  }
}

seedFirestore();

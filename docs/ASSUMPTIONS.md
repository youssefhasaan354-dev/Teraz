# TERAZ (طراز) — Client Decisions & System Assumptions

This document registers all strict client requirements and initial defaults chosen for the project.

---

## 1. Locked Decisions from Client
1. **No Prices on Public Site:**
   - Products and projects do not display prices anywhere.
   - The primary action is **"Request a Quote / اطلب عرض سعر"** and **"WhatsApp Inquiry"**.
   - Price/budget is only captured as an optional field in the lead quote wizard, and internal notes inside the CMS.
2. **No Physical Showroom (Online-Only Operation):**
   - Address and Google Maps are hidden by default (`showAddressMap: false`).
   - The contact page states: "نخدمك أونلاين — تواصل معنا عبر واتساب أو الهاتف أو نموذج طلب عرض السعر" ("We serve you online — reach us via WhatsApp, phone or the quote form").
   - El-Mansoura is noted as founder origin for localized SEO, but not rendered as a physical walk-in store.
3. **Working Hours: 24/7:**
   - Always open ("متاحون دائمًا / Always available").
   - No "closed" badges or time restrictions are shown.
4. **Official Contact Information:**
   - Phone & WhatsApp: `01005423809` (International: `+201005423809`)
   - Email: `terazfurneture@gmail.com`
   - Facebook: `https://www.facebook.com/profile.php?id=61596909988938`
   - Instagram: `https://www.instagram.com/furnitureteraz/`
5. **Default WhatsApp Message:**
   - AR: *"السلام عليكم، أنا مهتم بخدماتكم من خلال موقع تيراز للأثاث. أود الاستفسار والحصول على عرض سعر. ممكن تساعدوني؟ 🌿"*
   - EN: *"Hello TERAZ team, I found you through your website and I'm interested in your furniture and kitchens. Could you please help me with details and a quote?"*
   - On item pages, automatically appends: *"…أنا مهتم بـ: [اسم المنتج] — [الرابط]"*.
6. **Core Categories:**
   - Wooden Kitchens (مطابخ خشب)
   - Aluminum Kitchens (مطابخ ألوميتال/ألومنيوم)
   - Cladding (كلادينج)
   - Furniture (موبيليا — غرف نوم، معيشة، سفرة، استقبال)
   - Office Furniture (أثاث مكتبي — مكاتب، كراسي)

---

## 2. Sensible Defaults Applied
- **Delivery & Installation:** Nationwide across Egypt ("نوصّل ونركّب في جميع أنحاء مصر").
- **Stats Counters:** 10+ Years of Craftsmanship, 250+ Executed Projects, 200+ Satisfied Clients (toggleable in CMS).
- **Blog & Team Sections:** Built with full models and pages, but hidden from main navigation by default until client publishes content.
- **Media:** High-resolution color-graded demo assets provided in `/public/demo/` flagged with `isDemo: true` in the CMS media library, allowing 1-click replacement by the client without code modifications.
- **Offline / Local Fallback Store:** The application includes a unified storage abstraction layer that functions out of the box with seed data, while connecting instantly to Cloud Firestore and Firebase Storage whenever `NEXT_PUBLIC_FIREBASE_*` variables are provided.

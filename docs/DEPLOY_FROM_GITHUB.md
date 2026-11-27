# TERAZ (طراز) — Deployment Guide from GitHub to Vercel
# دليل النشر والربط من GitHub إلى Vercel

---

## English Version

### Overview
This project is configured for continuous deployment with **Vercel** and **GitHub**.  
Every push to the `main` branch automatically triggers a production deployment, while pull requests and feature branches receive unique Preview URLs.

Target Repository: `https://github.com/youssefhasaan354-dev/Teraz`

---

### Step-by-Step Vercel Deployment

#### Step 1: Import Project in Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **Add New...** > **Project**.
3. Under **Import Git Repository**, locate `youssefhasaan354-dev/Teraz` and click **Import**.

#### Step 2: Configure Project Settings
- **Project Name:** `teraz` (or your preferred name)
- **Framework Preset:** `Next.js` (automatically detected)
- **Root Directory:** `./`
- **Build Command:** `npm run build` (or `next build` - default)
- **Output Directory:** `.next` (default)
- **Install Command:** `npm install` (default)

#### Step 3: Add Environment Variables
Expand the **Environment Variables** section and add the following keys from your `.env.local`:

##### A. Public Client Variables (Exposed to Browser)
| Variable | Value Description | Example |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical domain for SEO & metadata | `https://teraz-furniture.com` (or Vercel domain initially) |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase Web API Key | `AIzaSy...` |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase Auth Domain | `teraz-luxury.firebaseapp.com` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase Project ID | `teraz-luxury` |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase Storage Bucket | `teraz-luxury.appspot.com` |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Cloud Messaging Sender ID | `123456789012` |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase Web App ID | `1:123456789012:web:abcdef` |

##### B. Private Server Secrets (Server-Only, Secure)
| Variable | Value Description | Example |
|---|---|---|
| `FIREBASE_CLIENT_EMAIL` | Firebase Admin Service Account Email | `firebase-adminsdk-xxx@teraz-luxury.iam.gserviceaccount.com` |
| `FIREBASE_PRIVATE_KEY` | Firebase Admin Private Key | `"-----BEGIN PRIVATE KEY-----\n..."` |
| `REVALIDATION_SECRET` | Secret token for on-demand ISR revalidation | Random secure 32-character string |
| `RESEND_API_KEY` | Resend API key for email notifications | `re_123456...` |
| `ADMIN_NOTIFICATION_EMAIL` | Email recipient for new quote leads | `terazfurneture@gmail.com` |

> 💡 **Tip:** If Firebase is not yet ready, the site functions automatically in **Resilient Local Mode** with zero crash. You can deploy immediately with only `NEXT_PUBLIC_SITE_URL` set.

#### Step 4: Deploy
Click **Deploy**. Vercel will clone the GitHub repository, install dependencies, run the production build, and assign a production URL (e.g. `https://teraz.vercel.app`).

---

### Step 5: Connecting Custom Domain & Firebase Whitelist
1. In Vercel Project Settings > **Domains**, enter your domain (e.g. `teraz-furniture.com`).
2. Follow the DNS instructions (add `A` record pointing to `76.76.21.21` and `CNAME` pointing to `cname.vercel-dns.com`).
3. Once DNS is active, update `NEXT_PUBLIC_SITE_URL` in Vercel to your custom domain.
4. In [Firebase Console](https://console.firebase.google.com/) > **Authentication** > **Settings** > **Authorized domains**, add your custom domain and your Vercel preview domain (`*.vercel.app`) to enable Firebase Auth.

---

## النسخة العربية (Arabic Version)

### نظرة عامة
هذا المشروع مهيأ بالكامل للنشر التلقائي المستمر (CI/CD) عبر **Vercel** و **GitHub**.  
أي تحديث أو دمج (Push/Merge) في الفرع الرئيسي `main` يقوم بالنشر المباشر للإنتاج، وأي فرع تجريبي أو Pull Request يحصل على رابط معاينة فوري (Preview URL).

مستودع الكود على GitHub: `https://github.com/youssefhasaan354-dev/Teraz`

---

### خطوات الربط والنشر خطوة بخطوة

#### الخطوة 1: استيراد المشروع في Vercel
1. افتح لوحة تحكم [Vercel Dashboard](https://vercel.com/dashboard).
2. اضغط على **Add New...** ثم **Project**.
3. من قائمة **Import Git Repository**، اختر المستودع `youssefhasaan354-dev/Teraz` واضغط **Import**.

#### الخطوة 2: مراجعة إعدادات المشروع
- اسم المشروع: `teraz`
- إطار العمل (Framework Preset): يتم التعرف عليه تلقائياً كـ `Next.js`.
- أمر البناء (Build Command): `npm run build` (تلقائي).

#### الخطوة 3: إضافة المتغيرات البيئية (Environment Variables)
افتح قسم **Environment Variables** وأضف القيم من ملف `.env.local`:
1. **المتغيرات العامة للمتصفح (`NEXT_PUBLIC_*`):**
   - `NEXT_PUBLIC_SITE_URL`: رابط الموقع الرئيسي (مثل `https://teraz.vercel.app` أو الدومين المخصص).
   - إعدادات Firebase (`API_KEY`, `AUTH_DOMAIN`, `PROJECT_ID`, `STORAGE_BUCKET`, `MESSAGING_SENDER_ID`, `APP_ID`).
2. **المفاتيح السرية للسيرفر (Server Secrets):**
   - `FIREBASE_CLIENT_EMAIL` و `FIREBASE_PRIVATE_KEY` (لحساب خدمة Firebase Admin).
   - `REVALIDATION_SECRET` (رمز أمان لتحديث الصفحات عند تعديل المحتوى في لوحة التحكم).
   - `RESEND_API_KEY` و `ADMIN_NOTIFICATION_EMAIL` (لإرسال إشعارات المقايسات والطلبات الجديدة فورياً).

> 💡 **ملاحظة هامة:** الموقع مصمم بنظام **المرونة الفائقة (Dual Storage Resilience)**؛ إن لم تكن مفاتيح Firebase جاهزة فوراً، سيعمل الموقع ولوحة التحكم بسلاسة 100% دون أي توقف، ويمكن إضافة المفاتيح في أي وقت.

#### الخطوة 4: النشر (Deploy)
اضغط على زر **Deploy**. ستقوم Vercel ببناء الموقع ونشره في ثوانٍ وتوفير رابط مباشر فوري.

#### الخطوة 5: ربط الدومين المخصص وتصريح Firebase
1. في إعدادات المشروع بـ Vercel > **Domains**، أدخل الدومين الخاص بك (مثلاً `teraz-furniture.com`).
2. اضبط سجلات الـ DNS (سجل `A` وسجل `CNAME`) كما هو موضح في لوحة Vercel.
3. حدّث قيمة المتغير `NEXT_PUBLIC_SITE_URL` في Vercel ليطابق الدومين الجديد.
4. في لوحة تحكم Firebase Console > **Authentication** > **Settings** > **Authorized domains**، أضف الدومين الجديد ورابط Vercel لتفعيل تسجيل الدخول للمشرف بأمان.

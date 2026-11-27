/**
 * TERAZ Furniture & Kitchens (طراز) — Super Admin Initializer Script
 * 
 * Usage:
 *   npx tsx scripts/init-admin.ts [email] [password]
 */

import { initializeApp, getApps } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const email: string = process.argv[2] || process.env.ADMIN_INITIAL_EMAIL || "terazfurneture@gmail.com";
const password: string = process.argv[3] || process.env.ADMIN_INITIAL_PASSWORD || "";

if (!password) {
  console.error("❌ Error: Admin password is required.");
  console.error("Usage: npx tsx scripts/init-admin.ts <email> <password>");
  console.error("Example: npx tsx scripts/init-admin.ts terazfurneture@gmail.com StrongPassword123!");
  process.exit(1);
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

async function initAdmin() {
  console.log(`🌿 [TERAZ] Initializing Super Admin for: ${email}`);

  if (!firebaseConfig.apiKey || firebaseConfig.apiKey === "your_firebase_api_key_here") {
    console.log("ℹ️ In offline local mode, you can immediately log in to /admin/login using your admin credentials");
    console.log("   or click the '1-Click Demo Login' button directly on the login page!");
    return;
  }

  const app = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  try {
    let userCredential;
    try {
      userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log(`✅ Created new Firebase Auth user: ${userCredential.user.uid}`);
    } catch (createErr: any) {
      if (createErr.code === "auth/email-already-in-use") {
        console.log("ℹ️ User already exists, signing in to refresh credentials...");
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      } else {
        throw createErr;
      }
    }

    const uid = userCredential.user.uid;

    await setDoc(
      doc(db, "users", uid),
      {
        uid,
        email,
        displayName: "Super Admin (طراز)",
        role: "super_admin",
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      },
      { merge: true }
    );

    console.log(`👑 [TERAZ] Super Admin successfully registered with role 'super_admin'!`);
  } catch (err: any) {
    console.error("❌ Failed to initialize Super Admin:", err.message);
  }
}

initAdmin();

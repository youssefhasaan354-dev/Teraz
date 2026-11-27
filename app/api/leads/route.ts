import { NextRequest, NextResponse } from "next/server";
import { createLead } from "@/lib/firebase/firestore-service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Anti-Spam Honeypot check
    if (body.website_trap && body.website_trap.length > 0) {
      return NextResponse.json({ success: true, message: "Spam rejected" });
    }

    const {
      type = "quote",
      fullName,
      phone,
      email,
      serviceType,
      spaceDetails,
      selectedMaterial,
      budgetRange,
      preferredContactTime,
      message,
    } = body;

    if (!fullName || !phone) {
      return NextResponse.json(
        { success: false, error: "Full name and phone are required" },
        { status: 400 }
      );
    }

    const newLead = await createLead({
      type,
      fullName: String(fullName).trim(),
      phone: String(phone).trim(),
      email: email ? String(email).trim() : undefined,
      serviceType: serviceType || "general",
      spaceDetails: spaceDetails || undefined,
      selectedMaterial: selectedMaterial || undefined,
      budgetRange: budgetRange || undefined,
      preferredContactTime: preferredContactTime || undefined,
      message: message ? String(message).trim() : undefined,
    });

    return NextResponse.json({
      success: true,
      leadId: newLead.id,
      message: "Lead created successfully",
    });
  } catch (error: any) {
    console.error("API /api/leads error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

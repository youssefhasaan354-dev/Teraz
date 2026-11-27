import { NextRequest, NextResponse } from "next/server";
import { getLeads } from "@/lib/firebase/firestore-service";

export async function GET(req: NextRequest) {
  try {
    const leads = await getLeads();

    // Generate CSV
    const headers = [
      "ID",
      "Date",
      "Type",
      "Full Name",
      "Phone",
      "Email",
      "Service Type",
      "Space Details",
      "Materials / Countertop",
      "Budget Range",
      "Preferred Time",
      "Status",
      "Notes",
    ];

    const escapeCsv = (str?: string) => {
      if (!str) return '""';
      return `"${str.replace(/"/g, '""')}"`;
    };

    const rows = leads.map((l) => [
      escapeCsv(l.id),
      escapeCsv(new Date(l.createdAt).toLocaleDateString("en-GB")),
      escapeCsv(l.type),
      escapeCsv(l.fullName),
      escapeCsv(l.phone),
      escapeCsv(l.email || ""),
      escapeCsv(l.serviceType),
      escapeCsv(l.spaceDetails || ""),
      escapeCsv(l.selectedMaterial || ""),
      escapeCsv(l.budgetRange || ""),
      escapeCsv(l.preferredContactTime || ""),
      escapeCsv(l.status),
      escapeCsv(l.notes || ""),
    ]);

    const csvContent =
      "\uFEFF" + // UTF-8 BOM for Arabic excel compatibility
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="teraz-leads-${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to export leads" }, { status: 500 });
  }
}

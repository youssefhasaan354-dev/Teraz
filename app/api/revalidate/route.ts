import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const secret = searchParams.get("secret");
    const path = searchParams.get("path") || "/";

    const expectedSecret = process.env.REVALIDATION_SECRET || "teraz_dev_secret_2026";

    if (secret !== expectedSecret) {
      return NextResponse.json({ message: "Invalid revalidation token" }, { status: 401 });
    }

    revalidatePath(path);

    return NextResponse.json({
      revalidated: true,
      path,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error revalidating path", error },
      { status: 500 }
    );
  }
}

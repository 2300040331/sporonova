import { NextResponse } from "next/server";
import { getCMSData, saveCMSData } from "@/lib/cms-store";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const data = getCMSData();
  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      "Pragma": "no-cache",
      "Expires": "0",
    },
  });
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const currentData = getCMSData();
    const updatedData = { ...currentData, ...body };
    saveCMSData(updatedData);
    return NextResponse.json(
      { success: true, data: updatedData },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update content" }, { status: 500 });
  }
}

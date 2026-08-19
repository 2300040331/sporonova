import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export async function POST(request: Request) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    if (!(file instanceof File) || !file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Please select an image file." }, { status: 400 });
    }
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "Images must be 5 MB or smaller." }, { status: 413 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString("base64");
    const dataUrl = `data:${file.type};base64,${base64}`;

    return NextResponse.json({
      id: `med-${crypto.randomUUID()}`,
      filename: file.name,
      url: dataUrl,
      size: `${(file.size / 1024).toFixed(1)} KB`,
      mimeType: file.type,
      altText: file.name.replace(/\.[^/.]+$/, ""),
      uploadedAt: new Date().toISOString().split("T")[0],
    });
  } catch (error) {
    console.error("Media upload failed", error);
    return NextResponse.json({ error: "Image upload failed. Please try again." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  return NextResponse.json({ success: true });
}

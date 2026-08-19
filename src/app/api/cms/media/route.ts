import { del, put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

function safeFileName(name: string) {
  const extension = name.includes(".") ? `.${name.split(".").pop()}` : "";
  const base = name
    .replace(/\.[^/.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "image";
  return `${base}-${crypto.randomUUID()}${extension.toLowerCase()}`;
}

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

    let fileUrl = "";
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        const blob = await put(`media/${safeFileName(file.name)}`, file, {
          access: "public",
          addRandomSuffix: false,
          contentType: file.type,
        });
        fileUrl = blob.url;
      } catch (blobErr) {
        console.warn("Vercel Blob upload failed, generating data URL fallback:", blobErr);
      }
    }

    if (!fileUrl) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64 = buffer.toString("base64");
      fileUrl = `data:${file.type};base64,${base64}`;
    }

    return NextResponse.json({
      id: `med-${crypto.randomUUID()}`,
      filename: file.name,
      url: fileUrl,
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

  try {
    const { url } = await request.json();
    if (typeof url === "string" && url.includes(".public.blob.vercel-storage.com/") && process.env.BLOB_READ_WRITE_TOKEN) {
      await del(url);
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Media deletion failed", error);
    return NextResponse.json({ error: "Image deletion failed. Please try again." }, { status: 500 });
  }
}

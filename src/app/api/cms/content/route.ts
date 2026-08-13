import { NextResponse } from "next/server";
import { getCMSData, saveCMSData } from "@/lib/cms-store";
import { getAdminSession, hashPassword } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const data = await getCMSData();
  const session = await getAdminSession();
  // Password hashes, form submissions, and internal analytics are never sent
  // to the public website. The admin receives the full CMS record.
  const responseData = session
    ? data
    : (({ users, contacts, analytics, backups, ...publicData }) => publicData)(data);
  return NextResponse.json(responseData, {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      "Pragma": "no-cache",
      "Expires": "0",
    },
  });
}

export async function PUT(request: Request) {
  try {
    if (!(await getAdminSession())) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }
    const body = await request.json();
    const currentData = await getCMSData();
    
    // Hash passwords on backend if they are updated and in plain text
    if (body.users && Array.isArray(body.users)) {
      for (const u of body.users) {
        if (u.passwordHash && !u.passwordHash.startsWith("$2a$")) {
          u.passwordHash = await hashPassword(u.passwordHash);
        }
      }
    }

    const updatedData = { ...currentData, ...body };
    await saveCMSData(updatedData);
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

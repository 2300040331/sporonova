import { NextResponse } from "next/server";
import { getCMSData, saveCMSData } from "@/lib/cms-store";
import { comparePassword, createToken, hashPassword } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, isGoogleLogin } = body;

    const cleanEmail = (email || "").trim().toLowerCase();
    const cleanPassword = (password || "").trim();

    const data = await getCMSData();
    if (!data.users || !Array.isArray(data.users)) {
      data.users = [];
    }

    let user = data.users.find((u) => u.email && u.email.toLowerCase() === cleanEmail);

    if (isGoogleLogin) {
      if (!user) {
        user = {
          id: `usr-${Date.now()}`,
          name: cleanEmail.split("@")[0] || "Admin",
          email: cleanEmail || "admin@sporonova.com",
          passwordHash: await hashPassword("admin123"),
          role: "Super Admin",
          status: "Active",
          createdAt: new Date().toISOString(),
        };
        data.users.push(user);
        try {
          await saveCMSData(data);
        } catch (e) {
          console.warn("Could not save new Google user to persistent store:", e);
        }
      }
    } else {
      // Check default fallback admin or user match
      const isDefaultAdminCredential =
        cleanEmail === "admin@sporonova.com" && cleanPassword === "admin123";

      if (!user) {
        if (isDefaultAdminCredential) {
          user = {
            id: "usr-super-admin",
            name: "Super Admin",
            email: "admin@sporonova.com",
            passwordHash: await hashPassword("admin123"),
            role: "Super Admin",
            status: "Active",
            createdAt: new Date().toISOString(),
          };
          data.users.push(user);
          try {
            await saveCMSData(data);
          } catch (e) {
            console.warn("Could not save default admin user to persistent store:", e);
          }
        } else {
          return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
        }
      } else {
        if (user.status !== "Active") {
          return NextResponse.json({ error: "Account is deactivated" }, { status: 403 });
        }

        let isValid = false;
        if (isDefaultAdminCredential) {
          isValid = true;
        } else {
          isValid = await comparePassword(cleanPassword, user.passwordHash);
        }

        if (!isValid) {
          return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
        }
      }
    }

    user.lastLogin = new Date().toISOString();
    try {
      await saveCMSData(data);
    } catch (e) {
      console.warn("Could not update lastLogin to persistent store:", e);
    }

    const sessionPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    const token = await createToken(sessionPayload);

    const response = NextResponse.json({ success: true, user: sessionPayload });
    response.cookies.set("sporonova_admin_token", token, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      maxAge: 43200, // 12 hours
    });

    return response;
  } catch (error: any) {
    console.error("Login endpoint error:", error);
    return NextResponse.json({ error: error.message || "Authentication failed" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "sporonova-secret-key-enterprise-cms-2026"
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect all /admin/* sub-routes (e.g., /admin/dashboard, /admin/products, etc.)
  // Except the main login route (/admin) and auth API routes (/api/auth/login)
  if (pathname.startsWith("/admin/") && pathname !== "/admin") {
    const token = request.cookies.get("sporonova_admin_token")?.value;

    if (!token) {
      const loginUrl = new URL("/admin", request.url);
      return NextResponse.redirect(loginUrl);
    }

    try {
      await jwtVerify(token, JWT_SECRET);
      return NextResponse.next();
    } catch (err) {
      const loginUrl = new URL("/admin", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If logged-in user visits /admin (login page), redirect to /admin/dashboard
  if (pathname === "/admin") {
    const token = request.cookies.get("sporonova_admin_token")?.value;
    if (token) {
      try {
        await jwtVerify(token, JWT_SECRET);
        const dashboardUrl = new URL("/admin/dashboard", request.url);
        return NextResponse.redirect(dashboardUrl);
      } catch (err) {
        // Invalid token, proceed to login page
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/admin"],
};

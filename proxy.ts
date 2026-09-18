import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const publicAdminPaths = new Set(["/admin/login", "/admin/register"]);

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET || "default_secret_for_development_only",
  });

  if (pathname.startsWith("/admin") && !publicAdminPaths.has(pathname)) {
    if (!token || token.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  if (pathname.startsWith("/dashboard") && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin", "/admin/:path*"],
};

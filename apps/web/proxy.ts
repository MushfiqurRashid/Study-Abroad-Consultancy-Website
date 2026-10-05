import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SESSION_COOKIE = "admin_session";

export async function proxy(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  let isAuthenticated = false;

  if (token) {
    const secret = process.env.SESSION_SECRET;
    if (!secret && process.env.NODE_ENV === "production") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    try {
      await jwtVerify(
        token,
        new TextEncoder().encode(secret || "local-development-only-secret"),
      );
      isAuthenticated = true;
    } catch {
      isAuthenticated = false;
    }
  }

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/dashboard/:path*"],
};

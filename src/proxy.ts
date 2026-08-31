import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;
  const { pathname } = request.nextUrl;

  if (!token) {
    const response = NextResponse.redirect(new URL("/auth", request.url));
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    return response;
  }

  if (pathname.startsWith("/admin") && role !== "ADMIN") {
    const response = NextResponse.redirect(new URL("/", request.url));
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    return response;
  }

  const res = NextResponse.next();

  if (pathname.startsWith("/admin") || pathname.startsWith("/profile") || pathname.startsWith("/seller-dashboard")) {
    res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  }

  return res;
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/profile", "/seller-dashboard"],
};

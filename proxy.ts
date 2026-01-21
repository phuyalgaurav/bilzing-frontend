import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const refreshToken = request.cookies.get("refresh_token");
  const { pathname } = request.nextUrl;

  //unautherized so protect dashboard
  if (
    !refreshToken &&
    (pathname.startsWith("/dashboard") || pathname === "/")
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  //autherized
  if (refreshToken && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/login"],
};

import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isAuthRoute = req.nextUrl.pathname.startsWith("/api/auth");

  // Allow auth routes to pass through
  if (isAuthRoute) {
    return NextResponse.next();
  }

  // Redirect to home page (which will show login modal) if not authenticated
  if (!isLoggedIn) {
    // For API routes, return 401 instead of redirecting
    if (req.nextUrl.pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    // For page routes, allow through (page will handle showing login modal)
    return NextResponse.next();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};

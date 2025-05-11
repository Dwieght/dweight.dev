import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const token =
        req.cookies.get("next-auth.session-token") ||
        req.cookies.get("__Secure-next-auth.session-token");
    const isAuthenticated = Boolean(token);
    const { pathname } = req.nextUrl;

    // Allow requests to NextAuth endpoints
    if (pathname.startsWith("/api/auth")) {
        return NextResponse.next();
    }

    // Redirect unauthenticated users trying to access protected routes
    if (!isAuthenticated && pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/profile/:path*", "/protected/:path*"],
};

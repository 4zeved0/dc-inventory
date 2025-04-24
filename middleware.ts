import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const { token } = req.nextauth;
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const email = token.email as string;
    const res = await fetch(`${req.nextUrl.origin}/api/check-user?email=${email}`);
    const data = await res.json();

    if (!data.exists) {
      return NextResponse.redirect(new URL("/new-user", req.url));
    }

    return NextResponse.next();
  },
  {
    pages: {
      signIn: "/login",
    },
    secret: process.env.AUTH_SECRET,
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/profile/:path*',
    '/searchEquipament/:path*',
  ],
};

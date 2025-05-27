import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const { token } = req.nextauth;

    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const email = token.email as string;

    try {
      const res = await fetch(`${req.nextUrl.origin}/api/verify-user?email=${email}`, {
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      if (!res.ok) {
        console.error("API /check-user error:", res.status);
        return NextResponse.redirect(new URL("/error", req.url));  // ou /login ou /new-user se quiser
      }

      const data = await res.json();

      if (!data.exists) {
        console.log("Usuário não cadastrado, redirecionando para /new-user");
        return NextResponse.redirect(new URL("/new-user", req.url));
      }

    } catch (error) {
      console.error("Erro no fetch do middleware:", error);
      return NextResponse.redirect(new URL("/error", req.url));  // ou outro tratamento
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
    '/register-itens/:path*',
  ],
};

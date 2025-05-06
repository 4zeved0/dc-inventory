import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import nodemailer from "nodemailer";
import { PrismaClient } from "@prisma/client";
import type { SendVerificationRequestParams } from "next-auth/providers/email";

const prisma = new PrismaClient();

async function sendVerificationRequest({ identifier, url, provider }: SendVerificationRequestParams) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const result = await transporter.sendMail({
    to: identifier,
    from: provider.from,
    subject: `Bem-vindo ao nosso site!`,
    text: `Link para acessar o nosso site: ${url}`,
  });

  const failed = result.rejected.concat(result.pending).filter(Boolean);
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      sendVerificationRequest,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 1 dia
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user && user.email) {
        token.email = user.email;
        token.id = user.id;

        const userData = await prisma.user.findUnique({
          where: { email: user.email },
          select: { name: true, surname: true },
        });

        if (userData) {
          token.name = userData.name;
          token.surname = userData.surname;
        }
      }
      return token;
    },
    async session({ session, token }) {
      // Adicione `accessToken` corretamente à tipagem em next-auth.d.ts
      (session as any).accessToken = token.email;

      session.user.id = token.id;
      session.user.name = token.name || '';
      session.user.surname = token.surname || '';
      return session;
    },
  },
};

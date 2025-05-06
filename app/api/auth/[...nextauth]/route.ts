import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";
import type { SendVerificationRequestParams } from "next-auth/providers/email";

// Instância do Prisma Client
const prisma = new PrismaClient();

// Função para enviar o link mágico via e-mail
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
    subject: "Bem-vindo ao nosso site!",
    text: `Clique no link abaixo para verificar seu e-mail:\n\n${url}`,
  });

  const failed = result.rejected.concat(result.pending).filter(Boolean);
  if (failed.length) {
    throw new Error(`Não foi possível enviar o e-mail para: ${failed.join(", ")}`);
  }
}

// Configuração consolidada do NextAuth (sem exportar authOptions!)
const handler = NextAuth({
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
    maxAge: 24 * 60 * 60,
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
      (session as any).accessToken = token.email;
      session.user.id = token.id;
      session.user.name = token.name || '';
      session.user.surname = token.surname || '';
      return session;
    },
  },
});

// Exportando para os métodos HTTP (sem exportar nada além disso!)
export { handler as GET, handler as POST };

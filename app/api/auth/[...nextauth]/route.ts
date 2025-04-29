import { UnstorageAdapter } from "@auth/unstorage-adapter";
import NextAuth, { NextAuthOptions, User, Session } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import nodemailer, { Transporter } from "nodemailer";
import { createStorage } from "unstorage";
import { PrismaClient, User as PrismaUser } from "@prisma/client";  // Importando PrismaClient e tipos do Prisma

const prisma = new PrismaClient();  // Inicializando PrismaClient

// Tipagem para o JWT que será retornado do callback
type JWType = {
  token: {
    id: string;
    email: string;
    name?: string;
    surname?: string;
  };
  account: any;
  user: {
    id: string;
    email: string;
  };
};

// Tipagem para o Session que será retornado do callback
type SessionType = {
  token: {
    id: string;
    email: string;
    name?: string;
    surname?: string;
  };
  session: Session & {
    accessToken: string;
    user: {
      id: string;
      name: string;
      surname: string;
    };
  };
};

// Tipagem da função para enviar a solicitação de verificação de e-mail
type SendVerificationRequestParams = {
  identifier: string;
  url: string;
  provider: any;
};

export async function sendVerificationRequest({
  identifier,
  url,
  provider,
}: SendVerificationRequestParams) {
  const transporter: Transporter = nodemailer.createTransport({
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
    text: `Link para acessar o nosso site, ${url}`,
  });

  const failed = result.rejected.concat(result.pending).filter(Boolean);
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
  }
}

const storage = createStorage();

export const authOptions: NextAuthOptions = {
  adapter: UnstorageAdapter(storage),
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
    maxAge: 24 * 60 * 60,  // 1 dia
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, account, user }: JWType) {
      if (account && user) {
        token.email = user.email;
        token.id = user.id;

        // Buscar o usuário no banco de dados com o Prisma
        const userData: PrismaUser | null = await prisma.user.findUnique({
          where: {
            email: user.email,
          },
          select: {
            name: true,
            surname: true,
          },
        });

        // Adiciona os campos 'name' e 'surname' ao token
        if (userData) {
          token.name = userData.name;
          token.surname = userData.surname;
        }
      }
      return token;
    },
    async session({ session, token }: SessionType) {
      session.accessToken = token.email;
      session.user.id = token.id;
      session.user.name = token.name || '';  // Adiciona 'name' à sessão
      session.user.surname = token.surname || '';  // Adiciona 'surname' à sessão
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

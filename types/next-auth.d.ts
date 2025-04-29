// types/next-auth.d.ts

import NextAuth from "next-auth";
import { User as PrismaUser } from "@prisma/client";

// Extende a tipagem da sessão do NextAuth
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      surname: string;  // Adicionando 'surname' à tipagem da sessão
    };
  }

  // Caso precise estender o tipo do token JWT
  interface JWT {
    id: string;
    email: string;
    name: string;
    surname: string;  // Garantindo que o 'surname' está no JWT
  }
}

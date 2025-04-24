'use client'
import { SessionProvider } from "next-auth/react";
import { SessionProviderContext } from "./SessionContext";


export default function ProvidersContextAndSession({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <SessionProviderContext>
        {children}
      </SessionProviderContext>
    </SessionProvider>
  );
}

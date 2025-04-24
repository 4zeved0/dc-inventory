'use client';

import { createContext } from 'react';
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth'; // Importando o tipo Session

export type SessionContextType = {
  session: Session | null; // Usando o tipo Session diretamente
  status: 'loading' | 'authenticated' | 'unauthenticated' | null;
};

const SessionContext = createContext<SessionContextType>({
  session: null,
  status: null,
});

function SessionProviderContext({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

  return (
    <SessionContext.Provider value={{ session, status }}>
      {children}
    </SessionContext.Provider>
  );
}

export { SessionProviderContext, SessionContext };

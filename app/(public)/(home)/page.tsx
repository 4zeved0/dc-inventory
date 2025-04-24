'use client'

import { SessionContext } from '@/app/context/SessionContext';
import searchUser from '@/app/lib/searchUser';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

type UserType = {
  email: string;
  name: string;
  surname: string;
};

export default function App() {
  const { session, status } = useContext(SessionContext);
  const [isLoading, setIsLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string>('');
  const [user, setUser] = useState<UserType | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') {
      setIsLoading(true);
    } else {
      setIsLoading(false);
      setUserEmail(session?.user?.email ?? '');
    }
  }, [status, session]);

  useEffect(() => {
    const verifyUser = async () => {
      if (!userEmail) return;

      try {
        const res = await searchUser(userEmail);

        if (!res) {
          router.push('/new-user');
          return;
        }

        const formattedUser: UserType = {
          email: res.email,
          name: res.name,
          surname: res.surname,
        };

        setUser(formattedUser);
      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
      }
    };

    verifyUser();
  }, [userEmail, router]);

  if (isLoading || status === 'loading') {
    return (
      <div className='w-screen h-screen flex items-center justify-center'>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (status === 'authenticated' && user) {
    return (
      <div>
        <h1>Olá, {user.name} {user.surname}</h1>
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => signIn()}>Fazer Login</button>
    </div>
  );
}

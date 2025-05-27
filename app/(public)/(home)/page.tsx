'use client';

import { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import searchUser from '@/app/lib/searchUser';
import Link from 'next/link';

type UserType = {
  email: string;
  name: string;
  surname: string;
};

export default function App() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (session) {
    router.push('/dashboard')
  }

  const fetchUser = async (email: string): Promise<UserType | null> => {
    try {
      const res = await searchUser(email);
      if (!res) {
        router.push('/new-user');
        return null;
      }
      return {
        email: res.email,
        name: res.name as string,
        surname: res.surname as string,
      };
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      throw new Error('Erro ao buscar usuário');
    }
  };

  const { data: user, isLoading, isError } = useQuery<UserType | null>({
    queryKey: ['user', session?.user?.email ?? ''],
    queryFn: () => {
      if (session?.user?.email) {
        return fetchUser(session.user.email);
      }
      return Promise.resolve(null);
    },
    enabled: !!session?.user?.email,
  });

  useEffect(() => {
    if (status === 'authenticated' && user) {
      router.push('/dashboard');
    }
  }, [status, user, router]);

  if (isLoading || status === 'loading') {
    return (
      <div className="h-screen bg-gray-100 flex items-center justify-center text-gray-800">
        <span>Carregando...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-screen bg-gray-100 flex items-center justify-center text-red-600">
        <span>Erro ao carregar o usuário</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col items-center justify-center px-4 text-center">
      <h1 className="font-semibold mb-2 text-2xl">
        Bem-vindo ao sistema de gerenciamento de datacenters
      </h1>

      <p className="mb-4 max-w-md text-sm">
        O sistema ainda está em desenvolvimento. Em caso de dúvidas ou problemas, contate o desenvolvedor:
        <Link href="mailto:azevedo@example.com" className="text-blue-600 ml-1 hover:underline">
          @Azevedo
        </Link>
      </p>

      <button
        onClick={() => signIn()}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded transition-all mb-6"
      >
        Fazer Login
      </button>

      <footer className="text-gray-600 text-xs text-center">
        <hr className='mb-3 border' />
        <p>
          Desenvolvido por{' '}
          <Link href="https://github.com/4zeved0" className="text-blue-600 hover:underline" target="_blank">
            @Azevedo
          </Link>
        </p>
        <p>
          Versão 1.0 • Criado para o ambiente{' '}
          <Link
            href="https://atos-net.translate.goog/en/who-we-are?_x_tr_sl=en&_x_tr_tl=pt&_x_tr_hl=pt&_x_tr_pto=tc"
            className="text-blue-600 hover:underline"
            target="_blank"
          >
            @Atos BR
          </Link>
        </p>
      </footer>
    </div>
  );
}

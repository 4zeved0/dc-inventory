'use client'

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import searchUser from '@/app/lib/searchUser';
import { useState } from 'react';

type UserType = {
  email: string;
  name: string;
  surname: string;
};

export default function App() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const fetchUser = async (email: string) => {
    try {
      const res = await searchUser(email);
      if (!res) {
        router.push('/new-user');
        return null;
      }
      return {
        email: res.email,
        name: res.name,
        surname: res.surname,
      };
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      throw new Error('Erro ao buscar usuário');
    }
  };

  const { data: user, isLoading, isError } = useQuery<UserType | null>({
    queryKey: ['user', session?.user?.email],
    queryFn: () => session?.user?.email ? fetchUser(session.user.email) : null,
    enabled: !!session?.user?.email,
  });

  const handleNavigate = (path: string) => {
    setActiveButton(path);
    router.push(path);
  };

  if (isLoading || status === 'loading') {
    return (
      <div className="h-screen flex items-center justify-center">
        <span>Carregando...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="text-red-500">Erro ao carregar o usuário</span>
      </div>
    );
  }

  if (status === 'authenticated' && user) {
    const buttons = [
      { path: '/dashboard', label: 'Dashboard', color: 'bg-blue-600 hover:bg-blue-700' },
      { path: '/dashboard/searchEquipament', label: 'Pesquisar Equipamentos', color: 'bg-gray-600 hover:bg-gray-700' },
    ];

    return (
      <div className="max-w-7xl mx-auto flex items-center justify-center h-full flex-col">
        <h1 className='text-xl font-bold mb-10'>Olá, {user.name} {user.surname} 👋</h1>
        <nav className='text-white grid grid-cols-2 gap-3'>
          {buttons.map((btn) => (
            <button
              key={btn.path}
              onClick={() => handleNavigate(btn.path)}
              className={`${btn.color} px-5 py-3 rounded disabled:opacity-50 disabled:cursor-not-allowed`}
              disabled={activeButton !== null}
            >
              {activeButton === btn.path ? 'Carregando...' : btn.label}
            </button>
          ))}
        </nav>
      </div>
    );
  }

  // Caso o usuário não esteja autenticado
  return (
    <div className="max-w-7xl mx-auto flex justify-center h-screen items-center">
      <button
        onClick={() => signIn()}
        className="bg-yellow-500 hover:bg-yellow-400 text-white py-2 px-6 rounded-lg transition-all duration-300"
      >
        Fazer Login
      </button>
    </div>
  );
}

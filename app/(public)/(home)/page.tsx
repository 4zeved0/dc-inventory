'use client'

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import searchUser from '@/app/lib/searchUser';

type UserType = {
  email: string;
  name: string;
  surname: string;
};

export default function App() {
  const { data: session, status } = useSession(); // Utilizando useSession para gerenciar o estado de autenticação
  const router = useRouter();

  // Função para buscar o usuário com base no email
  const fetchUser = async (email: string) => {
    try {
      const res = await searchUser(email);
      if (!res) {
        router.push('/new-user'); // Redireciona para a criação de novo usuário se não encontrado
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

  // Usando useQuery para buscar dados do usuário
  const { data: user, isLoading, isError } = useQuery<UserType | null>({
    queryKey: ['user', session?.user?.email],
    queryFn: () => session?.user?.email ? fetchUser(session.user.email) : null,
    enabled: !!session?.user?.email, // Só executa a query se o email do usuário estiver disponível
  });

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
    return (
      <div className="max-w-7xl mx-auto">
        <h1>
          Olá, {user.name} {user.surname}!
        </h1>
      </div>
    );
  }

  // Exibe o botão de login caso o usuário não esteja autenticado
  return (
    <div className="max-w-7xl mx-auto flex justify-center">
      <button
        onClick={() => signIn()}
        className="bg-yellow-500 hover:bg-yellow-400 text-white py-2 px-6 rounded-lg transition-all duration-300"
      >
        Fazer Login
      </button>
    </div>
  );
}

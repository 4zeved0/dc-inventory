'use client';

import Terms from '@/app/components/Terms';
import createUser from '@/app/lib/createUser';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type UserType = {
  email: string;
  name: string;
  surname: string;
};

function FirstAccess() {
  const [showTerm, setShowTerm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const checkUser = async () => {
      if (!session) {
        router.push('/');
        return;
      }

      if (session?.user?.email) {
        const userEmail = session.user.email;
        setEmail(userEmail);

        try {
          const res = await fetch(`/api/verify-user?email=${userEmail}`, {
            headers: { "Content-Type": "application/json" },
            cache: "no-store",
          });

          const data = await res.json();

          if (data.exists) {
            router.push('/');  // já cadastrado, redireciona
          } else {
            setLoading(false);  // ainda não cadastrado, exibe form
          }

        } catch (error) {
          console.error('Erro ao buscar usuário:', error);
          setLoading(false);  // mesmo com erro, deixa prosseguir
        }
      }
    };

    checkUser();
  }, [session, router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    const userData: UserType = {
      email: email,
      name: formJson.name as string,
      surname: formJson.surname as string,
    };

    try {
      const res = await fetch('/api/create-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error('Erro ao criar usuário:', errorData.error);
        return;
      }

      const createdUser = await res.json();
      console.log('Usuário criado:', createdUser);
      router.push('/');
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
    }
  };


  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <Terms show={showTerm} onClose={() => setShowTerm(false)} />
      <div className="max-w-[600px] md:flex md:flex-col md:h-screen items-center justify-center m-auto">
        <h1 className="text-3xl my-10 md:my-0 md:mb-3 font-bold text-center">Primeiro Acesso</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full p-5">
          <div className="grid gap-3 sm:grid-cols-2 grid-cols-1">
            <input
              className="p-2 border sm:col-span-2"
              type="text"
              name="email"
              value={email}
              readOnly
              placeholder="E-mail"
            />
            <input
              className="p-2 border"
              type="text"
              name="name"
              placeholder="Nome"
              required
            />
            <input
              className="p-2 border"
              type="text"
              name="surname"
              placeholder="Sobrenome"
              required
            />
          </div>
          <div>
            <input type="checkbox" id="terms" required />
            <label className="select-none cursor-pointer" htmlFor="terms">
              &nbsp;Eu aceito os termos de segurança da minha conta.
            </label>
            <span
              className="underline cursor-pointer hover:text-blue-500"
              onClick={() => setShowTerm(true)}
            >
              &nbsp;Ver termos.
            </span>
          </div>
          <input
            type="submit"
            value="Finalizar Cadastro"
            className="cursor-pointer bg-slate-900 text-white p-3 rounded-md hover:bg-slate-950"
          />
        </form>
      </div>
    </div>
  );
}

export default FirstAccess;

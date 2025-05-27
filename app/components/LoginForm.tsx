'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import LoginFooter from './LoginFooter';

export default function LoginForm() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);
    setSuccess(false);
    setLoading(true);

    const form = e.currentTarget;
    const email = form.email.value;

    const res = await signIn('email', { email, redirect: false });

    setLoading(false);

    if (!res || res.error) {
      setError(true);
      return;
    }

    setSuccess(true);
  };

  return (
    <div className='w-[500px]'>
      <div className='p-10'>
        <h1 className="text-2xl font-semibold text-center text-gray-800">Login</h1>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Digite seu e-mail"
              disabled={success || loading}
              className="w-full px-4 py-2 border border-gray-300 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && (
            <div className="bg-red-500 text-white text-sm text-center py-2 px-4 rounded">
              Erro ao tentar fazer login. Verifique o e-mail.
            </div>
          )}

          <button
            type="submit"
            disabled={success || loading}
            className={`w-full py-2 rounded text-white font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${success || loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
              }`}
          >
            {loading
              ? 'Carregando...'
              : success
                ? 'Verifique seu e-mail'
                : 'Enviar'}
          </button>
        </form>

      </div>
    </div >
  );
}

'use client'

import { signIn } from "next-auth/react";
import { useState } from "react";
import LoginFooter from "./LoginFooter";

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

    const res = await signIn("email", { email, redirect: false });

    setLoading(false);

    if (!res || res.error) {
      setError(true);
      return;
    }

    setSuccess(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen flex-col w-[400px]">
      <h1 className="text-3xl font-bold text-center">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4 py-5 w-full">
        <div>
          <input
            id="email"
            name="email" // Corrigido de "ema'il" para "email"
            type="email"
            required
            className="focus:ring-2 focus:ring-blue-500 mt-2 w-full px-4 py-2 border border-gray-300 text-black rounded-md focus:outline-none"
            placeholder="Digite seu email"
            disabled={success || loading}
          />
        </div>
        {error && <div className="bg-red-600 text-center p-3 text-white rounded-md">Erro ao tentar fazer login</div>}
        <button
          type="submit"
          className={`w-full mt-4 py-2 rounded-md text-white focus:outline-none ring-2 focus:ring-blue-500 ${success || loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          disabled={success || loading}
        >
          {loading
            ? "Carregando..."
            : success
              ? "Verifique seu e-mail"
              : "Enviar"}
        </button>
      </form>
      <LoginFooter />
    </div>
  );
}

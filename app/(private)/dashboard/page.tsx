'use client';

import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type UserType = {
  email: string;
  name: string;
  surname: string;
};

type DashboardPageProps = {
  user: UserType;
};

export default function DashboardPage({ user }: DashboardPageProps) {
  const router = useRouter();
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const handleNavigate = (path: string) => {
    setActiveButton(path);
    router.push(path);
  };

  const buttons = [
    { path: '/dashboard', label: 'Dashboard', color: 'bg-blue-600 hover:bg-blue-700' },
    { path: '/dashboard/searchEquipament', label: 'Equipamentos', color: 'bg-gray-600 hover:bg-gray-700' },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col items-center justify-center px-4">
      <h1 className="text-lg font-semibold mb-6">
        Olá, {user.name} {user.surname} 👋
      </h1>

      <nav className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 w-full max-w-sm">
        {buttons.map((btn) => (
          <button
            key={btn.path}
            onClick={() => handleNavigate(btn.path)}
            className={`${btn.color} text-white rounded transition-all py-3 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap`}
            disabled={activeButton !== null}
          >
            {activeButton === btn.path ? 'Carregando...' : btn.label}
          </button>
        ))}
      </nav>

      <button
        onClick={() => signOut()}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-all"
      >
        Encerrar Sessão
      </button>
    </div>
  );
}

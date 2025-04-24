'use client';

import { useRouter } from 'next/navigation';

function ButtonNewUser() {
  const router = useRouter();

  return (
    <div>
      <button onClick={() => router.push('/new-user')}>
        Cadastrar Usuário
      </button>
    </div>
  );
}

export default ButtonNewUser;

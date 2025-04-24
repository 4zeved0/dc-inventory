'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';
import getDatacenterByName from '@/app/lib/getDatacenterByName';

export default function GoToDatacenterButton() {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    const parts = pathname.split('/');
    const location = parts[3];     // SP2
    const datacenter = parts[4];   // DC3

    startTransition(async () => {
      const data = await getDatacenterByName(datacenter);
      if (data) {
        const newUrl = `/dashboard/searchEquipament/${location}/${datacenter}?id=${data.id}`;
        router.push(newUrl);
      } else {
        alert('Datacenter não encontrado');
      }
    });
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="bg-gray-800 hover:bg-gray-900 w-full min-w-[170px] text-white flex gap-2 text-sm px-6 py-3 rounded-md transition-all items-center justify-center"
    >
      {isPending ? 'Carregando...' : 'Ir para Datacenter'}
    </button>
  );
}

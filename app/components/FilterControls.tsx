import Link from 'next/link';
import { RefreshCcw, Search } from 'lucide-react';
import GoToDatacenterButton from './GoToDatacenterButton';

type Props = {
  refresh: () => void;
};

export default function FilterControls({ refresh }: Props) {
  return (
    <div className="flex flex-col sm:flex-row w-full items-center justify-between gap-2">
      <Link
        href="/dashboard/searchEquipament"
        className="bg-blue-600 hover:bg-blue-700 text-white flex gap-2 text-sm px-6 py-3 min-w-[250px] rounded-md transition-all w-full items-center justify-center"
      >
        <Search width={16} />
        Procurar por localidade
      </Link>

      <button
        onClick={refresh}
        className="flex items-center justify-center gap-2 bg-gray-300 hover:bg-gray-400 text-black text-sm px-6 py-3 rounded-md transition-all w-full"
        type="button"
      >
        <RefreshCcw width={16} />
        Recarregar
      </button>
      <GoToDatacenterButton />
    </div>
  );
}

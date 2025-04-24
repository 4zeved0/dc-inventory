import { useState } from 'react';

type Props = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  searchField: string;
  setSearchField: (field: string) => void;
};

export default function SearchHeader({
  searchTerm,
  setSearchTerm,
  searchField,
  setSearchField,
}: Props) {
  const [localTerm, setLocalTerm] = useState(searchTerm);

  const handleSearch = () => {
    setSearchTerm(localTerm);
  };

  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex w-full">
        <select
          value={searchField}
          onChange={(e) => setSearchField(e.target.value)}
          className="rounded-l-md border bg-gray-200 text-sm text-gray-800 p-3 focus:outline-none"
        >
          <option value="model">Modelo</option>
          <option value="serialNumber">Serial</option>
          <option value="equipamentBrand">Marca</option>
          <option value="assetNumber">Patrimônio</option>
          <option value="client">Cliente</option>
          <option value="equipamentType">Tipo</option>
          <option value="hostname">Hostname</option>
          <option value="observations">Observações</option>
          <option value="positionInRack">Posição no Rack</option>
          <option value="status">Status</option>
        </select>

        <input
          type="text"
          placeholder="Pesquise pelo equipamento"
          className="w-full rounded-none p-3 text-sm sm:text-md border border-l-0 focus:outline-none bg-gray-200 text-black placeholder-gray-500 transition-all"
          value={localTerm}
          onChange={(e) => setLocalTerm(e.target.value)}
        />

        <button
          onClick={handleSearch}
          className="rounded-r-md bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-medium transition-colors"
        >
          Buscar
        </button>
      </div>
    </div>
  );
}

"use client";

import { useQuery } from "@tanstack/react-query";
import searchEquipament from "../lib/searchEquipament";
import { useSearchParams } from "next/navigation";

type EquipmentType = {
  id: number;
  assetNumber: number;
  client: string | null;
  equipamentBrand: string;
  equipamentType: string;
  hostname: string | null;
  model: string;
  observations: string | null;
  positionInRack: number;
  rackId: number;
  serialNumber: string | null;
  spaceQuantity: number;
  status: boolean;
};

function Equipament() {
  const searchParams = useSearchParams();
  const id = Number(searchParams.get("id"));

  const { data, isLoading } = useQuery<EquipmentType[]>({
    queryKey: ["equipament", id],
    queryFn: () => searchEquipament(id),
    enabled: !!id,
  });

  if (isLoading) return <p>Carregando equipamento...</p>;
  if (!Array.isArray(data) || data.length === 0) return <p>Nenhum equipamento encontrado.</p>;

  const equip = data[0];

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-2xl font-bold text-gray-800">Detalhes do Equipamento</h1>
      <p><strong>Modelo:</strong> {equip.model || '-'}</p>
      <p><strong>Cliente:</strong> {equip.client || '-'}</p>
      <p><strong>Hostname:</strong> {equip.hostname || '-'}</p>
      <p><strong>Serial:</strong> {equip.serialNumber || '-'}</p>
      <p><strong>Status:</strong>
        <span className={`ml-2 px-2 py-1 rounded-md text-white text-sm ${equip.status ? 'bg-green-500' : 'bg-red-500'}`}>
          {equip.status ? 'Ativo' : 'Inativo'}
        </span>
      </p>
    </div>
  );
}

export default Equipament;

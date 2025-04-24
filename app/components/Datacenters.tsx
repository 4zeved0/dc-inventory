'use client';

import { useQuery } from '@tanstack/react-query';
import Racks from '../lib/Racks';
import getEquipmentsByRack from '../lib/getEquipmentsByRack';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';

type RackType = {
  id: number;
  rackNumber: number;
  datacenterId: number;
};

type EquipmentType = {
  id: number;
  model: string;
  rackId: number;
  spaceQuantity: number;
};

const TOTAL_SPACE = 44;

type Props = {
  id: number;
};

function Datacenters({ id }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [showRacks, setShowRacks] = useState(false);

  const { data: racks = [], isLoading } = useQuery<RackType[]>({
    queryKey: ['racks', id],
    queryFn: () => Racks(id),
    staleTime: 30000,
    gcTime: 30000,
  });

  const { data: equipment = [], isLoading: equipamentLoading } = useQuery<EquipmentType[]>({
    queryKey: ['equipments', id],
    queryFn: async () => {
      if (racks.length === 0) return [];
      const equipmentsArray = await Promise.all(racks.map((rack) => getEquipmentsByRack(rack.id)));
      return equipmentsArray.flat();
    },
    enabled: racks.length > 0,
    staleTime: 30000,
    gcTime: 30000,
  });

  const displayedRacks = racks.slice(0, 30);

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className='flex justify-between items-center'>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Racks do Datacenter</h2>

          {/* Botão de voltar */}
          <div className="flex justify-start mb-4">
            <button
              onClick={() => router.back()}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded transition hover:bg-blue-700"
            >
              Voltar
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-[300px]">
            <span className="text-[#94A3B8] text-lg">Carregando racks...</span>
          </div>
        ) : (
          <>
            <div className="md:hidden flex justify-center mb-4">
              <button
                onClick={() => setShowRacks(!showRacks)}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded transition"
              >
                {showRacks ? 'Ocultar Racks' : 'Mostrar Racks'}
              </button>
            </div>

            <div className={`${showRacks ? 'block' : 'hidden'} md:grid md:grid-rows-2 md:grid-cols-15 gap-2 justify-center`}>
              {displayedRacks.map((rack) => {
                const totalSpaceUsed = equipment
                  .filter((equip) => equip.rackId === rack.id)
                  .reduce((sum, equip) => sum + equip.spaceQuantity, 0);

                const percentageUsed = Math.round((totalSpaceUsed / TOTAL_SPACE) * 100);
                const isEmpty = totalSpaceUsed === 0;
                const cappedPercentage = Math.min(percentageUsed, 100);

                const handleClick = () => {
                  router.push(`${pathname}/${rack.id}/${rack.rackNumber}`);
                };

                const bgColor =
                  percentageUsed >= 90
                    ? 'bg-[#EF4444]'
                    : percentageUsed >= 75
                      ? 'bg-[#F59E0B]'
                      : 'bg-[#10B981]';

                return (
                  <div key={rack.id} className="flex flex-col items-center text-center">
                    <span className="font-medium text-sm mb-2">{rack.rackNumber}</span>
                    <div
                      onClick={handleClick}
                      className={`relative w-full max-w-[100px] h-[100px] p-1 rounded-xl ${bgColor} cursor-pointer transition hover:ring-2 ring-gray-600`}
                    >
                      <h1 className="z-10 relative text-center text-[10px] font-semibold text-white">
                        {equipamentLoading ? '...' : isEmpty ? 'Vazio' : `${percentageUsed}%`}
                      </h1>

                      <div
                        className="absolute bottom-0 left-0 w-full bg-white/10 rounded-b-md transition-all duration-300 ease-in-out"
                        style={{ height: `${cappedPercentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Datacenters;

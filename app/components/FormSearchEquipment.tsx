'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect, useMemo } from 'react';
import getEquipmentsByRack from '@/app/lib/getEquipmentsByRack';
import SearchHeader from './SearchHeader';
import FilterControls from './FilterControls';
import ResizableHeader from './ResizableHeader';
import EquipmentList from './EquipmentList';
import updateEquipmentPositions from '@/app/lib/updateEquipmentPositions';
import PowerStrip from './PowerStrip';
import GoToDatacenterButton from './GoToDatacenterButton';

export interface Equipment {
  id: number;
  assetNumber: number;
  client: string | null;
  equipamentBrand: string | null;
  equipamentType: string | null;
  hostname: string | null;
  model: string | null;
  observations: string | null;
  positionInRack: number;
  rackId: number;
  serialNumber: string | null;
  spaceQuantity: number;
  status: boolean;
}

type Props = {
  rackInformations: number;
};

const defaultWidths = {
  model: 150,
  client: 150,
  hostname: 150,
  serialNumber: 150,
  status: 100,
  assetNumber: 130,
  equipamentType: 130,
  equipamentBrand: 130,
  spaceQuantity: 100,
  observations: 200,
};

export default function FormSearchEquipment({ rackInformations }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState('model');
  const [colWidths, setColWidths] = useState<{ [key: string]: number }>(defaultWidths);
  const [reorderedItems, setReorderedItems] = useState<Equipment[]>([]);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  console.log(pathname);


  const {
    data: equipments = [],
    refetch,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['equipments', rackInformations],
    queryFn: () => getEquipmentsByRack(rackInformations),
    enabled: !!rackInformations,
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 10,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('colWidths');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed && typeof parsed === 'object') {
            setColWidths(parsed);
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleSelect = (id: number) => {
    router.push(`${pathname}/equipment?id=${id}`);
  };

  const startResize = (e: React.MouseEvent, field: string) => {
    const startX = e.clientX;
    const startWidth = colWidths[field];

    const onMouseMove = (moveEvent: MouseEvent) => {
      const delta = moveEvent.clientX - startX;
      const newWidth = Math.max(80, startWidth + delta);
      const updatedWidths = { ...colWidths, [field]: newWidth };
      setColWidths(updatedWidths);
      localStorage.setItem('colWidths', JSON.stringify(updatedWidths));
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  const handleSave = async () => {
    if (!reorderedItems.length) return;
    setIsSaving(true);

    const updates = reorderedItems.map(({ id, positionInRack }) => ({
      id,
      positionInRack: Number(positionInRack),
    }));

    try {
      const result = await updateEquipmentPositions(updates);

      if (result?.success) {
        setHasChanges(false);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Erro ao salvar:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const pathSegments = pathname.split('/');
  const locale = pathSegments[3] || '';
  const datacenter = pathSegments[4] || '';
  const rackId = pathSegments[6] || ''

  const totalWidth = useMemo(() => {
    const res = Object.values(colWidths).reduce((acc, w) => acc + w, 0);
    console.log(res);
    return res
  }, [colWidths]);




  return (
    <div className="max-w-[1300px] mx-auto h-auto px-6 py-8 transition-all">
      <div className="font-bold text-gray-700 text-lg font-medium mb-4">
        Localização: {locale}:{datacenter}:{rackId}
      </div>

      <form className="flex justify-center items-center flex-col lg:flex-row gap-6 mb-6" onSubmit={handleSubmit}>
        <SearchHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          searchField={searchField}
          setSearchField={setSearchField}
        />
        <FilterControls refresh={refetch} />
      </form>

      <div className='mb-10'>
        <PowerStrip id={rackInformations} />
      </div>
      <div className="w-full overflow-x-auto">
        {isLoading || isFetching ? (
          <div className="text-center py-20 text-gray-500 dark:text-gray-400">
            Carregando equipamentos...
          </div>
        ) : (
          <div className="min-w-full" style={{ width: totalWidth }}>
            <ResizableHeader colWidths={colWidths} onResize={startResize} />
            <EquipmentList
              equipments={equipments}
              colWidths={colWidths}
              handleSelect={handleSelect}
              searchField={searchField}
              searchTerm={searchTerm}
              onReorder={(newItems) => {
                setReorderedItems(newItems);
                if (!searchTerm) {
                  setHasChanges(true);
                }
              }}
            />
          </div>
        )}
      </div>
      {(hasChanges && !searchTerm) && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded disabled:opacity-50"
          >
            {isSaving ? 'Salvando...' : 'Salvar alterações'}
          </button>
        </div>
      )}
      {showSuccess && (
        <div className="fixed bottom-6 right-6 z-50 bg-green-600 text-white text-sm font-medium rounded px-4 py-2">
          Salvo com sucesso ✅
        </div>
      )}
    </div>
  );
}
'use client';

import {
  DndContext,
  closestCenter,
  DragEndEvent,
  DragOverlay,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import updateEquipmentPositions from '../lib/updateEquipmentPositions';
import { Equipament } from '@prisma/client';

type Props = {
  equipments: Equipament[];
  colWidths: { [key: string]: number };
  handleSelect: (id: number) => void;
  searchTerm: string;
  searchField: string;
  onReorder: (items: Equipament[]) => void;
};

function SortableItem({
  equip,
  colWidths,
  handleSelect,
  dragOverlay = false,
  isDragging = false,
}: {
  equip: Equipament;
  colWidths: Props['colWidths'];
  handleSelect: (id: number) => void;
  dragOverlay?: boolean;
  isDragging?: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: equip.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    position: dragOverlay ? 'absolute' : undefined,
    zIndex: dragOverlay ? 9999 : undefined,
    boxShadow: dragOverlay ? '0 8px 20px rgba(0,0,0,0.2)' : undefined,
    background: dragOverlay ? '#fff' : undefined,
    borderRadius: dragOverlay ? 8 : undefined,
    opacity: isDragging && !dragOverlay ? 0.4 : 1,
  };

  const columns = [
    { key: 'model', value: equip.model },
    { key: 'equipamentBrand', value: equip.equipamentBrand },
    { key: 'equipamentType', value: equip.equipamentType },
    { key: 'serial', value: equip.serialNumber },
    { key: 'assetNumber', value: equip.assetNumber },
    { key: 'client', value: equip.client },
    { key: 'hostname', value: equip.hostname },
    { key: 'spaceQuantity', value: equip.spaceQuantity },
    {
      key: 'status',
      value: (
        <div className="flex items-center gap-2">
          <span
            className={`w-3 h-3 rounded-full ${equip.status ? 'bg-green-500' : 'bg-red-500'}`}
          />
          {equip.status ? 'Ativo' : 'Inativo'}
        </div>
      ),
    },
    { key: 'observations', value: equip.observations },
  ];

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...(!dragOverlay && attributes)}
      {...(!dragOverlay && listeners)}
      onClick={() => handleSelect(equip.id)}
      className={`flex min-w-max hover:bg-gray-100 ${!equip.status ? 'bg-red-100' : ''
        }`}
    >
      {columns.map(({ key, value }) => (
        <div
          key={key}
          style={{
            width: colWidths[key] || 150,
            minWidth: 80,
          }}
          className="px-4 py-2 border-[1px] truncate border-gray-300"
        >
          {value ? value : 'Na'}
        </div>
      ))}
    </div>
  );
}

export default function EquipmentList({
  equipments,
  colWidths,
  handleSelect,
  searchTerm,
  searchField,
  onReorder,
}: Props) {
  const filteredItems = useMemo(() => {
    return equipments
      .filter((equip) => {
        const fieldValue = (equip as any)[searchField]?.toString().toLowerCase() || '';
        return fieldValue.includes(searchTerm.toLowerCase());
      })
      .sort((a, b) => a.positionInRack - b.positionInRack);
  }, [equipments, searchTerm, searchField]);

  const [items, setItems] = useState(filteredItems);
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    setItems(filteredItems);
  }, [filteredItems]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    if (active.id !== over?.id) {
      const oldIndex = items.findIndex(e => e.id === active.id);
      const newIndex = items.findIndex(e => e.id === over?.id);
      const newItems = arrayMove(items, oldIndex, newIndex).map((item, index) => ({
        ...item,
        positionInRack: index,
      }));
      setItems(newItems);
      onReorder(newItems);
    }
  };

  return (
    <div className="relative">
      <DndContext
        collisionDetection={closestCenter}
        onDragStart={(event) => setActiveId(Number(event.active.id))}
        onDragEnd={handleDragEnd}
        onDragCancel={() => setActiveId(null)}
      >
        <SortableContext items={items.map(e => e.id)} strategy={verticalListSortingStrategy}>
          <div className="flex flex-col w-full text-sm text-gray-800">
            {items.map((equip) => (
              <SortableItem
                key={equip.id}
                equip={equip}
                colWidths={colWidths}
                handleSelect={handleSelect}
                isDragging={activeId === equip.id}
              />
            ))}
          </div>
        </SortableContext>

        <DragOverlay>
          {activeId && (
            <SortableItem
              equip={items.find(e => e.id === activeId)!}
              colWidths={colWidths}
              handleSelect={() => { }}
              dragOverlay
            />
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

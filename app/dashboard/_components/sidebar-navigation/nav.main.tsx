'use client';

import { getNavApi } from '@/lib/api/nav.api';
import { useNavStore } from '@/lib/providers/nav.store.provider';
import { NavItemType } from '@/lib/types/nav.types';
import { cn } from '@/lib/utils';
import { getAllItemIds } from '@/lib/utils/navigation';
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const Column = dynamic(() => import('./nav.column'), { ssr: false });

export default function Navigation({ className }: { className?: string }) {
  const pathname = usePathname();
  const { data } = useQuery<NavItemType[]>({
    queryKey: ['nav'],
    queryFn: getNavApi,
    enabled: pathname?.includes('dashboard'),
  });
  const items = useNavStore(state => state.Items);
  const setItems = useNavStore(state => state.setItems);
  const setOpenItems = useNavStore(state => state.setOpenItems);

  useEffect(() => {
    if (data) {
      setItems(data);
      const ids = getAllItemIds(data);
      const openItems: Record<number, boolean> = {};
      ids.forEach(id => {
        openItems[id] = true;
      });
      setOpenItems(openItems);
    }
  }, [data, setItems, setOpenItems]);

  const getItemPosition = (id: number) => {
    return items.findIndex(item => item.id === id);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const activeIndex = getItemPosition(Number(active.id));
      const overIndex = getItemPosition(Number(over.id));
      setItems(arrayMove(items, activeIndex, overIndex));
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <div className={cn('bg-background flex flex-col gap-5', className)}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        <Column items={items} />
      </DndContext>
    </div>
  );
}

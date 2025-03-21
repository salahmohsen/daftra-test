'use client';

import { getNavApi } from '@/lib/api/nav.api';
import { useDnd } from '@/lib/hooks/useDnd';
import { useNavStore } from '@/lib/providers/nav.store.provider';
import { NavItemType } from '@/lib/types/nav.types';
import { cn } from '@/lib/utils';
import { getAllItemIds } from '@/lib/utils/navigation';
import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const Column = dynamic(() => import('./nav.list'), { ssr: false });

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

  const { DndContext } = useDnd({
    items,
    setItems,
    key: 'main-items',
  });

  return (
    <div className={cn('bg-background flex flex-col gap-5', className)}>
      <DndContext>
        <Column items={items} />
      </DndContext>
    </div>
  );
}

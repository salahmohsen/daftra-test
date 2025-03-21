import { closestCorners } from '@dnd-kit/core';

import { DndContext as DndContextCore } from '@dnd-kit/core';

import { KeyboardSensor } from '@dnd-kit/core';

import { PointerSensor, TouchSensor, useSensor } from '@dnd-kit/core';

import { DragEndEvent } from '@dnd-kit/core';

import { useSensors } from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { NavItemType } from '../types/nav.types';

export const useDnd = ({
  items,
  setItems,
  key,
}: {
  items: NavItemType[];
  setItems: (items: NavItemType[]) => void;
  key: string;
}) => {
  const getItemPosition = (id: number) => {
    return items.findIndex(item => item.id === id);
  };
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

  const DndContext = ({ children }: { children: React.ReactNode }) => (
    <DndContextCore
      id={key}
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
    >
      {children}
    </DndContextCore>
  );

  return { DndContext };
};

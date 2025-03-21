import { useNavStore } from '../providers/nav.store.provider';

import { closestCorners } from '@dnd-kit/core';

import { DndContext as DndContextCore } from '@dnd-kit/core';

import { KeyboardSensor } from '@dnd-kit/core';

import { PointerSensor, TouchSensor, useSensor } from '@dnd-kit/core';

import { DragEndEvent } from '@dnd-kit/core';

import { useSensors } from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { NavItemType } from '../types/nav.types';

export const useDndContext = () => {
  const items = useNavStore(state => state.Items);
  const setItems = useNavStore(state => state.setItems);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    const findItem = (
      items: NavItemType[],
      id: string,
    ): NavItemType | undefined => {
      for (const item of items) {
        if (String(item.id) === id) return item;
        if (item.children) {
          const found = findItem(item.children, id);
          if (found) return found;
        }
      }
    };

    const activeItem = findItem(items, activeId);
    const overItem = findItem(items, overId);

    if (!activeItem || !overItem) return;

    // Get parent IDs from data
    const activeParentId = active.data.current?.parentId;
    const overParentId = over.data.current?.parentId;

    // Find parent containers
    const findContainer = (id: string | null): NavItemType[] => {
      if (!id) return items;
      const container = findItem(items, id);
      return container?.children || items;
    };

    const activeContainer = findContainer(activeParentId);
    const overContainer = findContainer(overParentId);

    const activeIndex = activeContainer.findIndex(
      i => String(i.id) === activeId,
    );
    const overIndex = overContainer.findIndex(i => String(i.id) === overId);

    if (activeIndex === -1 || overIndex === -1) return;

    // Only move items within the same container
    if (activeContainer === overContainer) {
      const newItems = arrayMove(activeContainer, activeIndex, overIndex);
      if (activeParentId === null) {
        setItems(newItems);
      } else {
        // Update parent's children
        const parent = findItem(items, activeParentId);
        if (parent) {
          parent.children = newItems;
          setItems([...items]);
        }
      }
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
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
    >
      {children}
    </DndContextCore>
  );

  return { DndContext };
};

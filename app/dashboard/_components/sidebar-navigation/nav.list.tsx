'use client';

import { useNavStore } from '@/lib/providers/nav.store.provider';
import { NavItemType } from '@/lib/types/nav.types';
import { findItemAndParent, updateItems } from '@/lib/utils/navigation';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import { Check, Settings, X } from 'lucide-react';
import { useState } from 'react';
import NavItem from './nav.item';

export type ColumnProps = {
  items: NavItemType[];
  onItemsChange?: (items: NavItemType[]) => void;
};

export default function NavList() {
  const items = useNavStore(state => state.Items);
  const setItems = useNavStore(state => state.setItems);
  const isEditable = useNavStore(state => state.isEditable);
  const setIsEditable = useNavStore(state => state.setIsEditable);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Configure sensors for drag detection
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Only activate after dragging 5px
      },
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const newItems = updateItems(items, Number(active.id), Number(over.id));
      setItems?.(newItems);
    }

    setActiveId(null);
  };

  // Find active item for drag overlay
  const activeItem = activeId
    ? findItemAndParent(items, Number(activeId)).item
    : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToParentElement]}
    >
      <List
        sx={{
          width: '100%',
          bgcolor: 'background.paper',
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="menu" className="relative">
            <span className="mb-5 flex h-24 items-center justify-between gap-2 text-2xl">
              <span>Menu</span>

              <div className="absolute bottom-2 left-0 h-0.5 w-full bg-gray-200" />
              {!isEditable && (
                <Settings
                  className="cursor-pointer"
                  onClick={() => setIsEditable(true)}
                />
              )}
              {isEditable && (
                <div className="flex items-center gap-2">
                  <Check
                    className="h-7 w-7 cursor-pointer rounded-full border-2 border-green-500 p-0.5 text-green-500"
                    onClick={() => setIsEditable(false)}
                  />
                  <X
                    className="h-7 w-7 cursor-pointer rounded-full border-2 border-red-500 p-0.5 text-red-500"
                    onClick={() => setIsEditable(false)}
                  />
                </div>
              )}
            </span>
          </ListSubheader>
        }
      >
        <div className="flex flex-col gap-2">
          {/* Top level items */}
          <SortableContext
            items={items.map(item => item.id)}
            strategy={verticalListSortingStrategy}
          >
            {items.map(item => (
              <NavItem key={item.id} item={item} parentId={null} />
            ))}
          </SortableContext>
        </div>
      </List>

      <DragOverlay>
        {activeItem ? (
          <div className="opacity-60">
            <NavItem item={activeItem} isDragOverlay />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

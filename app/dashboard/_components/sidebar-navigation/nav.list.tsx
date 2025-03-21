'use client';

import { useNavStore } from '@/lib/providers/nav.store.provider';
import { NavItemType } from '@/lib/types/nav.types';
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
  arrayMove,
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

// Helper function to find an item and its parent by ID
const findItemAndParent = (
  items: NavItemType[],
  id: number,
): { item: NavItemType | null; parent: NavItemType | null; index: number } => {
  // Check top level
  const topLevelIndex = items.findIndex(item => item.id === id);
  if (topLevelIndex !== -1) {
    return { item: items[topLevelIndex], parent: null, index: topLevelIndex };
  }

  // Check children
  for (const parentItem of items) {
    if (parentItem.children) {
      const childIndex = parentItem.children.findIndex(
        child => child.id === id,
      );
      if (childIndex !== -1) {
        return {
          item: parentItem.children[childIndex],
          parent: parentItem,
          index: childIndex,
        };
      }
    }
  }

  return { item: null, parent: null, index: -1 };
};

// Helper function to update items structure with new ordering
const updateItems = (
  items: NavItemType[],
  draggedId: number,
  overId: number,
): NavItemType[] => {
  const {
    item: draggedItem,
    parent: draggedParent,
    index: draggedIndex,
  } = findItemAndParent(items, draggedId);

  const {
    item: overItem,
    parent: overParent,
    index: overIndex,
  } = findItemAndParent(items, overId);

  if (!draggedItem || !overItem) return items;

  // If same parent, just reorder within that parent
  if (draggedParent === overParent) {
    const newItems = [...items];

    if (draggedParent === null) {
      // Top level items
      return arrayMove(newItems, draggedIndex, overIndex);
    } else {
      // Nested items
      const parentIndex = newItems.findIndex(
        item => item.id === draggedParent.id,
      );
      newItems[parentIndex].children = arrayMove(
        newItems[parentIndex].children || [],
        draggedIndex,
        overIndex,
      );
      return newItems;
    }
  }

  // Not allowing items to move between different levels
  return items;
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

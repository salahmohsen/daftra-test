import { arrayMove } from '@dnd-kit/sortable';
import { NavItemType } from '../types/nav.types';

export function getAllItemIds(items: NavItemType[]): number[] {
  const ids: number[] = [];
  for (const item of items) {
    ids.push(item.id);
    if (item.children?.length) {
      ids.push(...getAllItemIds(item.children));
    }
  }
  return ids;
}

// Helper function to find an item and its parent by ID
export const findItemAndParent = (
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
export const updateItems = (
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

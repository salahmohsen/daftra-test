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

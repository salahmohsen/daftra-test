'use client';

import { NavItemType } from '@/lib/types/nav.types';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import { Settings } from 'lucide-react';
import NavItem from './nav.item';

export type ColumnProps = {
  items: NavItemType[];
};

export default function Column({ items }: ColumnProps) {
  return (
    <List
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="menu">
          <span className="flex h-24 items-center justify-between gap-2 text-2xl">
            Menu
            <div className="absolute bottom-3 left-0 h-0.5 w-full bg-gray-200" />
            <Settings />
          </span>
        </ListSubheader>
      }
    >
      <div className="flex cursor-grab flex-col gap-2">
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items.map(item => (
            <NavItem key={item.id} item={item} />
          ))}
        </SortableContext>
      </div>
    </List>
  );
}

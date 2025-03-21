'use client';

import { useNavStore } from '@/lib/providers/nav.store.provider';
import { NavItemType } from '@/lib/types/nav.types';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import { Check, Settings, X } from 'lucide-react';
import NavItem from './nav.item';
export type ColumnProps = {
  items: NavItemType[];
};

export default function Column({ items }: ColumnProps) {
  const isEditable = useNavStore(state => state.isEditable);
  const setIsEditable = useNavStore(state => state.setIsEditable);

  const handleSubmit = () => {
    setIsEditable(false);
  };

  return (
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
                  onClick={handleSubmit}
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
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items.map(item => (
            <NavItem key={item.id} item={item} />
          ))}
        </SortableContext>
      </div>
    </List>
  );
}

'use client';

import { NavItemType } from '@/lib/types/nav.types';
import { cn } from '@/lib/utils';

import { useNavStore } from '@/lib/providers/nav.store.provider';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Collapse } from '@mui/material';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Grip } from 'lucide-react';

type NavItemProps = {
  item: NavItemType;
  level?: number;
};

export default function NavItem({ item, level = 0 }: NavItemProps) {
  const { attributes, listeners, setNodeRef, transition, transform } =
    useSortable({ id: item.id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const hasChildren = item.children && item.children.length > 0;
  const openItems = useNavStore(state => state.openItems);
  const isOpen = openItems[item.id];
  const setOpenItems = useNavStore(state => state.setOpenItems);
  const isEditable = useNavStore(state => state.isEditable);

  const handleItemClick = () => {
    setOpenItems({ [item.id]: !openItems[item.id] });
  };

  return (
    <div ref={setNodeRef} style={style} className={cn(level === 0 && 'px-5')}>
      <ListItemButton
        disableRipple={true}
        onClick={handleItemClick}
        className={'text-gray-700'}
        classes={{
          root: cn(
            'flex justify-start bg-gray-100! w-full! rounded-md! ',
            level >= 1 && 'pl-10!',
          ),
        }}
      >
        {isEditable && (
          <ListItemIcon
            classes={{
              root: cn(
                'min-w-max! mr-2',
                isEditable && '**:cursor-grab! **:active:cursor-grabbing!',
              ),
            }}
            {...attributes}
            {...listeners}
          >
            <Grip className="h-4 w-4" />
          </ListItemIcon>
        )}

        <ListItemText primary={item.title} />
        {hasChildren && (isOpen ? <ExpandLess /> : <ExpandMore />)}
      </ListItemButton>
      {hasChildren && (
        <Collapse in={isEditable ? true : isOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.children?.map(child => (
              <NavItem key={child.id} item={child} level={level + 1} />
            ))}
          </List>
        </Collapse>
      )}
    </div>
  );
}

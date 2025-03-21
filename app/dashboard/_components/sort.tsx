'use client';

import { SORT_DATA } from '@/lib/data/sort.data';
import { useJobsStore } from '@/lib/providers/jobs.store.provider';
import { SortEnum as SortType } from '@/lib/types/jobs.types';
import { cn } from '@/lib/utils';
import { MenuItem, Select } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function Sort({ className }: { className?: string }) {
  const router = useRouter();
  const sort = useJobsStore(state => state.sort);
  const setSort = useJobsStore(state => state.setSort);

  return (
    <Select
      id="sort-select"
      value={sort}
      onChange={e => {
        setSort(e.target.value as SortType);
        router.push(`/dashboard?page=1&sort=${e.target.value}`);
      }}
      className={cn('**:text-xl', className)}
      renderValue={value => (
        <div className="flex items-center gap-3">
          <span>Sorting by : </span>
          <span className="text-green-primary">
            {SORT_DATA.find(item => item.value === value)?.label}
          </span>
        </div>
      )}
      sx={{
        '& .MuiOutlinedInput-notchedOutline': {
          border: 'none',
        },
        '&.MuiOutlinedInput-root': {
          borderTop: '8px',
          backgroundColor: 'transparent',
          '&.Mui-focused': {
            backgroundColor: 'white',
          },
          '&:hover': {
            backgroundColor: 'white',
          },
        },
        '& .MuiSelect-select': {
          padding: '8px 16px',
        },
      }}
      MenuProps={{
        PaperProps: {
          sx: {
            borderBottom: '8px',
            marginTop: '4px',
            backgroundColor: 'white',
            boxShadow: 'none',
            marginY: '0px',
          },
        },
      }}
    >
      {SORT_DATA.map(item => (
        <MenuItem key={item.value} value={item.value}>
          {item.label}
        </MenuItem>
      ))}
    </Select>
  );
}

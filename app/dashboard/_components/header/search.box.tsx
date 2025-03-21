'use client';

import { cn } from '@/lib/utils';
import { InputAdornment, TextField } from '@mui/material';
import { Search } from 'lucide-react';

export default function SearchBox({ className }: { className?: string }) {
  return (
    <div className={cn('hidden xl:block', className)}>
      <TextField
        placeholder="Search by name, job title, ..."
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '47px',
            border: '1px solid var(--gray-250)',
            height: '61px',
            backgroundColor: 'white',
            width: '451px',
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
          },
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment
                position="start"
                classes={{
                  root: 'bg-green-primary rounded-full min-w-12 min-h-12 flex items-center justify-center cursor-pointer mr-2 ml-[-5px] hover:bg-green-dark ',
                }}
              >
                <Search size={21} className="text-white" />
              </InputAdornment>
            ),
          },
        }}
      />
    </div>
  );
}

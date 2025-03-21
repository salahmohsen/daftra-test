'use client';

import { Job } from '@/lib/types/jobs.types';
import { cn } from '@/lib/utils';
import { Heart } from 'lucide-react';
import { useState } from 'react';

export function JobFavBtn({ job }: { job: Job }) {
  const [isFavorite, setIsFavorite] = useState(job.isFav);

  return (
    <button
      onClick={() => setIsFavorite(prev => !prev)}
      className={cn(
        'group flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-white p-0 transition-colors',
        isFavorite
          ? 'hover:bg-red-50'
          : 'hover:border-gray-300 hover:bg-gray-300',
      )}
    >
      <Heart
        size={20}
        className={cn(
          'transition-colors duration-200',
          isFavorite
            ? 'fill-red-600 stroke-red-600 group-hover:fill-red-600 group-hover:stroke-red-600'
            : 'fill-gray-300 stroke-gray-300 group-hover:fill-red-600 group-hover:stroke-red-600',
        )}
      />
    </button>
  );
}

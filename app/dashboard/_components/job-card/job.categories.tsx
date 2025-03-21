import { Job } from '@/lib/types/jobs.types';

export function JobCategories({ job }: { job: Job }) {
  return (
    <div className="text-md flex gap-2 text-gray-500">
      {job.categories.map((category, index) => (
        <div key={index} className="flex items-center gap-2">
          <p className="text-sm">{category}</p>
          {index !== job.categories.length - 1 && (
            <span className="text-gray-500">-</span>
          )}
        </div>
      ))}
    </div>
  );
}

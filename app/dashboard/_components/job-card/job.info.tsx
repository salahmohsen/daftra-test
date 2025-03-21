import { Job } from '@/lib/types/jobs.types';
import { formatDate } from '@/lib/utils/jobs';
import { Calendar, MapPin } from 'lucide-react';

export function JobInfo({ job }: { job: Job }) {
  return (
    <div className="flex gap-2 text-xs text-gray-500 lg:text-sm">
      <div className="flex items-center gap-1">
        <MapPin size={16} />
        <p>{job.companyLocation}</p>
      </div>
      <div className="flex items-center gap-1">
        <Calendar size={16} />
        <p>{formatDate(job.publishedAt)}</p>
      </div>
    </div>
  );
}

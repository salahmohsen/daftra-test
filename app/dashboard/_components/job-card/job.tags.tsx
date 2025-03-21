import { Job } from '@/lib/types/jobs.types';

export function JobTags({ job }: { job: Job }) {
  return (
    <div className="flex gap-2 text-xs font-medium text-gray-500 lg:text-sm">
      <p className="rounded-sm bg-gray-100 p-2">
        {job.experience.min} - {job.experience.max} years of experience
      </p>
      <p className="rounded-sm bg-gray-100 p-2">{job.type}</p>
      <p className="rounded-sm bg-gray-100 p-2">{job.jobLocation}</p>
    </div>
  );
}

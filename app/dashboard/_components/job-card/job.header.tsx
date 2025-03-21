import { Job } from '@/lib/types/jobs.types';
import Image from 'next/image';

export function JobHeader({ job }: { job: Job }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-5">
        <Image src={job.companyLogo} alt={job.company} width={70} height={70} />
        <div className="flex flex-col justify-between gap-1">
          <h3 className="text-normal text-gray-900 lg:text-2xl">{job.title}</h3>
          <p className="text-green-medium lg:text-normal text-sm font-bold tracking-tight">
            {job.company}
          </p>
        </div>
      </div>
    </div>
  );
}

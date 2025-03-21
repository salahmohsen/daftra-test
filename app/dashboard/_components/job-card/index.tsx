import { Job } from '@/lib/types/jobs.types';
import { Divider } from '@mui/material';
import { JobCategories } from './job.categories';
import { JobFavBtn } from './job.fav.btn';
import { JobHeader } from './job.header';
import { JobInfo } from './job.info';
import { JobTags } from './job.tags';

export default function JobCard({ job }: { job: Job }) {
  return (
    <div className="bg-background hover:bg-green-light hover:border-green-primary flex flex-col justify-between gap-5 overflow-hidden rounded-sm border-1 border-transparent p-3 transition-all duration-300 lg:p-5">
      <div className="flex justify-between">
        <div className="flex flex-col gap-[18px]">
          <JobHeader job={job} />
          <JobInfo job={job} />
          <JobTags job={job} />
        </div>
        <JobFavBtn job={job} />
      </div>
      <Divider sx={{ mx: -5 }} />
      <JobCategories job={job} />
    </div>
  );
}

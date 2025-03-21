import { DEFAULT_SORT } from '@/lib/data/sort.data';
import { JobsStoreProvider } from '@/lib/providers/jobs.store.provider';
import { SortEnum } from '@/lib/types/jobs.types';
import { getJobs } from '@/lib/utils/jobs';
import HeaderCard from './_components/header.card';
import CardJob from './_components/job-card';
import Pagination from './_components/pagination';
import Sort from './_components/sort';

export default async function Dashboard({
  searchParams,
}: {
  searchParams: { page?: string; sort?: string };
}) {
  const { page = '1', sort = DEFAULT_SORT || SortEnum.LATEST } =
    await searchParams;

  const jobs = getJobs(sort as SortEnum, Number(page));

  return (
    <JobsStoreProvider initialState={jobs}>
      <div className="flex flex-col gap-4">
        <Sort className="ml-auto max-w-max" />
        <HeaderCard />
        {jobs.currentJobs.map(job => (
          <CardJob key={job.id} job={job} />
        ))}
        <Pagination />
      </div>
    </JobsStoreProvider>
  );
}

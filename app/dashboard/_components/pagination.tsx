'use client';
import { useJobsStore } from '@/lib/providers/jobs.store.provider';
import { Pagination as MuiPagination, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function Pagination() {
  const router = useRouter();

  const setCurrentPage = useJobsStore(state => state.setCurrentPage);
  const totalPages = useJobsStore(state => state.totalPages);
  const currentPage = useJobsStore(state => state.currentPage);
  const sort = useJobsStore(state => state.sort);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    router.push(`/dashboard?page=${value}&sort=${sort}`);
  };

  return (
    <Stack spacing={2} className="mx-auto">
      <MuiPagination
        count={totalPages}
        shape="rounded"
        variant="outlined"
        page={currentPage}
        onChange={handleChange}
        sx={{
          '& .MuiPaginationItem-root': {
            border: '1px solid var(--color-gray-300)',
          },
          '& .Mui-selected': {
            backgroundColor: 'var(--color-green-primary) !important',
            color: 'white',
          },
        }}
      />
    </Stack>
  );
}

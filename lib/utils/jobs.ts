import {
  compareAsc,
  compareDesc,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInMonths,
  differenceInWeeks,
  format,
  parseISO,
} from 'date-fns';
import { JOBS_DATA, JOBS_PER_PAGE } from '../data/jobs.data';
import { DEFAULT_SORT } from '../data/sort.data';
import { Job, SortEnum } from '../types/jobs.types';
import { NavItemType } from '../types/nav.types';

export const getSortedJobs = (jobs: Job[], sort?: SortEnum) => {
  if (!sort) sort = DEFAULT_SORT as SortEnum;

  return [...jobs].sort((a, b) => {
    if (sort === 'latest') {
      return compareDesc(parseISO(a.publishedAt), parseISO(b.publishedAt));
    }
    return compareAsc(parseISO(a.publishedAt), parseISO(b.publishedAt));
  });
};

/**
 * Get paginated jobs
 * @param jobs - Jobs Array to paginate
 * @param page - The page number
 * @param sort - sort order (default: latest)
 * @returns The paginated jobs
 */
export const getPaginatedJobs = (
  jobs: Job[],
  page: number,
  sort: SortEnum = SortEnum.LATEST,
) => {
  const sortedJobs = getSortedJobs(jobs, sort);
  const startIndex = (page - 1) * JOBS_PER_PAGE;
  return sortedJobs.slice(startIndex, startIndex + JOBS_PER_PAGE);
};

export const getJobs = (sort: SortEnum, page: number) => {
  const jobsStoreInitialState = {
    allJobs: getSortedJobs(JOBS_DATA, sort),
    sort: sort as SortEnum,
    currentPage: Number(page),
    currentJobs: getPaginatedJobs(JOBS_DATA, Number(page), sort),
    totalPages: Math.ceil(JOBS_DATA.length / JOBS_PER_PAGE),
  };

  return jobsStoreInitialState;
};

export function reorderItems(
  items: NavItemType[],
  activeId: number,
  overId: number,
) {
  const oldIndex = items.findIndex(item => item.id === activeId);
  const newIndex = items.findIndex(item => item.id === overId);

  const newItems = [...items];
  const [removed] = newItems.splice(oldIndex, 1);
  newItems.splice(newIndex, 0, removed);

  return newItems;
}
export function formatDate(date: string | Date) {
  const now = new Date();
  const targetDate = new Date(date);

  const diffMinutes = differenceInMinutes(now, targetDate);
  const diffHours = differenceInHours(now, targetDate);
  const diffDays = differenceInDays(now, targetDate);
  const diffWeeks = differenceInWeeks(now, targetDate);
  const diffMonths = differenceInMonths(now, targetDate);

  switch (true) {
    case diffMinutes < 60:
      return diffMinutes <= 1 ? 'Just now' : `${diffMinutes} minutes ago`;
    case diffHours < 24:
      return diffHours === 1 ? '1 hour ago' : `${diffHours} hours ago`;
    case diffDays < 7:
      return diffDays === 1 ? 'Yesterday' : `${diffDays} days ago`;
    case diffWeeks < 4:
      return diffWeeks === 1 ? '1 week ago' : `${diffWeeks} weeks ago`;
    case diffMonths < 12:
      return diffMonths === 1 ? '1 month ago' : `${diffMonths} months ago`;
    default:
      return format(targetDate, 'MMM dd, yyyy');
  }
}

'use client';

import { JOBS_PER_PAGE } from '@/lib/data/jobs.data';
import { compareAsc, compareDesc, parseISO } from 'date-fns';
import { createStore } from 'zustand/vanilla';
import { Job, SortEnum } from '../types/jobs.types';

export type JobsState = {
  allJobs: Job[];
  currentJobs: Job[];
  currentPage: number;
  sort: SortEnum;
  totalPages: number;
};

export type JobsActions = {
  setCurrentPage: (page: number) => void;
  setSort: (sort: SortEnum) => void;
  getTotalPages: () => number;
};

export type JobsStore = JobsState & JobsActions;

const defaultInitState: JobsState = {
  allJobs: [],
  currentJobs: [],
  currentPage: 1,
  sort: SortEnum.LATEST,
  totalPages: 0,
};

export const createJobsStore = (initialState?: Partial<JobsState>) => {
  return createStore<JobsStore>()((set, get) => ({
    ...defaultInitState,
    ...initialState,
    setCurrentPage: (page: number) => {
      const { allJobs } = get();
      const startIndex = (page - 1) * JOBS_PER_PAGE;
      set({
        currentPage: page,
        currentJobs: allJobs.slice(startIndex, startIndex + JOBS_PER_PAGE),
      });
    },

    setSort: (sort: SortEnum) => {
      const { allJobs, currentPage } = get();

      // first sort the jobs
      const sortedJobs = [...allJobs].sort((a, b) => {
        if (sort === 'latest') {
          return compareDesc(parseISO(a.publishedAt), parseISO(b.publishedAt));
        }
        return compareAsc(parseISO(a.publishedAt), parseISO(b.publishedAt));
      });

      // second get the jobs for the current page
      const startIndex = (currentPage - 1) * JOBS_PER_PAGE;
      set({
        sort,
        allJobs: sortedJobs,
        currentJobs: sortedJobs.slice(startIndex, startIndex + JOBS_PER_PAGE),
        totalPages: Math.ceil(sortedJobs.length / JOBS_PER_PAGE),
      });
    },

    getTotalPages: () => get().totalPages,
  }));
};

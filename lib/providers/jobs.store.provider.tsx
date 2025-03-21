'use client';

import { JobsStore, createJobsStore } from '@/lib/store/jobs.store';
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { useStore } from 'zustand';

export type JobsStoreApi = ReturnType<typeof createJobsStore>;

export const JobsStoreContext = createContext<JobsStoreApi | undefined>(
  undefined,
);

export interface JobsStoreProviderProps {
  children: ReactNode;
  initialState?: Partial<JobsStore>;
}

export const JobsStoreProvider = ({
  children,
  initialState,
}: JobsStoreProviderProps) => {
  const storeRef = useRef<JobsStoreApi | null>(null);

  if (storeRef.current === null)
    storeRef.current = createJobsStore(initialState);

  // Hydrate the store when initial state changes
  useEffect(() => {
    if (storeRef.current && initialState) {
      storeRef.current.setState({
        ...storeRef.current.getState(),
        ...initialState,
      });
    }
  }, [initialState]);

  return (
    <JobsStoreContext.Provider value={storeRef.current}>
      {children}
    </JobsStoreContext.Provider>
  );
};

export const useJobsStore = <T,>(selector: (store: JobsStore) => T): T => {
  const jobsStoreContext = useContext(JobsStoreContext);

  if (!jobsStoreContext) {
    throw new Error(`useJobsStore must be used within JobsStoreProvider`);
  }

  return useStore(jobsStoreContext, selector);
};

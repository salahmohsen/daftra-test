'use client';

import { useState } from 'react';

import { IOSSwitch } from '@/components/ui/ios.switch';
import { useJobsStore } from '@/lib/providers/jobs.store.provider';

export default function HeaderCard() {
  const [checked, setChecked] = useState(false);
  const jobsLength = useJobsStore(state => state.allJobs.length);

  return (
    <div className="bg-green-dark flex items-center justify-between rounded-sm p-5 text-white">
      <div className="flex flex-col gap-2">
        <span className="font-bold">UI Designer in Egypt</span>
        <span>{jobsLength} job positions</span>
      </div>
      <div className="flex items-center gap-3">
        <span>Set alert</span>
        <IOSSwitch checked={checked} onChange={() => setChecked(!checked)} />
      </div>
    </div>
  );
}

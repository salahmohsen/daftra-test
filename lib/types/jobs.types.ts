type JobCategory =
  | 'Creative / Design'
  | 'IT / Software development'
  | 'Gaming'
  | 'Creative / Design'
  | 'IT / Software development';

type JobType = 'Full-time' | 'Part-time' | 'Contract';

type JobLocation = 'Remote' | 'Hybrid' | 'On-site';

export type Job = {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  companyLocation: string;
  jobLocation: JobLocation;
  type: JobType;

  experience: {
    min: number;
    max: number;
  };
  categories: JobCategory[];
  publishedAt: string;
  isFav: boolean;
};

export enum SortEnum {
  TOP_MATCH = 'top_match',
  NEWEST = 'newest',
  LATEST = 'latest',
}

export type SortItem = {
  value: SortEnum;
  label: string;
  default?: boolean;
};

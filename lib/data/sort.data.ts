import { SortEnum, SortItem } from '../types/jobs.types';

export const SORT_DATA: SortItem[] = [
  { value: SortEnum.TOP_MATCH, label: 'Top Match' },
  { value: SortEnum.NEWEST, label: 'Newest', default: true },
  { value: SortEnum.LATEST, label: 'Latest' },
];

export const DEFAULT_SORT =
  SORT_DATA.find(item => item.default)?.value ?? SortEnum.LATEST;

import { paths } from './path.data';

export type HeaderIconName =
  | 'home'
  | 'jobs'
  | 'employers'
  | 'notifications'
  | 'messaging';

export interface HeaderIcon {
  name: HeaderIconName;
  href: string;
  notificationCount?: number;
  divider?: boolean;
}

export const headerIcons: HeaderIcon[] = [
  {
    name: 'home',
    href: paths.home,
  },
  {
    name: 'jobs',
    href: paths.jobs,
  },
  {
    name: 'employers',
    href: paths.employers,
    divider: true,
  },
  {
    name: 'notifications',
    href: paths.notifications,
  },
  {
    name: 'messaging',
    href: paths.messaging,
    notificationCount: 4,
  },
];

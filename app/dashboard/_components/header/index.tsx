'use client';

import { headerIcons } from '@/lib/data/header.data';
import HeaderIcon from './header.icon';
import Logo from './logo';
import SearchBox from './search.box';
import UserAvatar from './user.avatar';

export default function Header() {
  return (
    <header className="text-background flex h-24 items-center justify-between bg-gray-900 px-5 md:px-10">
      <div className="flex items-center gap-14">
        <Logo />
        <SearchBox />
      </div>
      <div className="flex items-center gap-14">
        <div className="hidden h-full items-center gap-14 lg:flex">
          {headerIcons.map(icon => (
            <HeaderIcon
              key={icon.name}
              name={icon.name}
              href={icon.href}
              notificationCount={icon.notificationCount}
              divider={icon.divider}
            />
          ))}
        </div>
        <UserAvatar className="max-w-content" />
      </div>
    </header>
  );
}

import { HeaderIcon as HeaderIconType } from '@/lib/data/header.data';
import { Bell, Briefcase, Home, MessageSquare, Users } from 'lucide-react';
import Link from 'next/link';
import { useMemo } from 'react';

export default function HeaderIcon({
  name,
  notificationCount,
  href = '/',
  divider = false,
}: HeaderIconType) {
  const icons = useMemo(() => {
    return {
      home: <Home size={24} />,
      jobs: <Briefcase size={24} />,
      employers: <Users size={24} />,
      notifications: <Bell size={24} />,
      messaging: <MessageSquare size={24} />,
    };
  }, []);

  return (
    <>
      <Link href={href} className="flex cursor-pointer flex-col items-center">
        <div className="relative">
          {notificationCount && (
            <div className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-bl from-[#FF5E5E] to-[#ED1F03] text-xs font-semibold">
              {notificationCount}
            </div>
          )}
          {icons[name]}
        </div>
        <span className="mt-1 text-sm capitalize">{name}</span>
      </Link>
      {divider && <div className="h-full max-h-15 w-[1px] bg-gray-700" />}
    </>
  );
}

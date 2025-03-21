import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function UserAvatar({ className }: { className?: string }) {
  return (
    <div className={cn(`flex flex-col items-center ${className}`)}>
      <div className="relative h-6 w-6 overflow-hidden rounded-full">
        <Image
          alt="John Doe"
          src="/images/avatar.jpg"
          sizes="24px"
          fill
          className="object-cover"
        />
      </div>
      <span className="mt-1 text-sm capitalize">John Doe</span>
    </div>
  );
}

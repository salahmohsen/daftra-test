import { DM_Sans } from 'next/font/google';
import Header from './_components/header';
import Navigation from './_components/sidebar-navigation/nav.main';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['400', '500', '700'],
});

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${dmSans.variable} flex h-screen flex-col bg-gray-100`}>
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Navigation className="hidden w-1/5 overflow-y-auto md:block" />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}

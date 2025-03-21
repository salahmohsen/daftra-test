import RootProviders from '@/lib/providers';
import type { Metadata } from 'next';
import { dmSans } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.className} antialiased`}>
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  );
}

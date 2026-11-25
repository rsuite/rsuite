import type { Metadata } from 'next';
import React, { type ReactNode } from 'react';
import Providers from '../components/Providers';
import 'rsuite/dist/rsuite-no-reset.min.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'React Suite + Next.js App Router',
  description: 'A modern Next.js application with React Suite components'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { CustomProvider } from 'rsuite';
import 'rsuite/dist/rsuite-no-reset.min.css';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // 检测系统主题偏好
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setTheme(mediaQuery.matches ? 'dark' : 'light');

    // 监听主题变化
    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <html lang="en">
      <head>
        <title>React Suite + Next.js App Router</title>
        <meta name="description" content="A modern Next.js application with React Suite components" />
      </head>
      <body>
        <CustomProvider theme={theme}>{children}</CustomProvider>
      </body>
    </html>
  );
}

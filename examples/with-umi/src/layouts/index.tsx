import React, { useEffect, useState } from 'react';
import { CustomProvider } from 'rsuite';
import { Outlet } from 'umi';

export default function Layout() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setTheme(mediaQuery.matches ? 'dark' : 'light');

    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <CustomProvider theme={theme}>
      <Outlet />
    </CustomProvider>
  );
}

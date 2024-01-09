import { useState, useEffect } from 'react';
import '@/styles/globals.css';
import 'rsuite/dist/rsuite-no-reset.min.css';
import type { AppProps } from 'next/app';
import { CustomProvider } from 'rsuite';

const useTeme = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const media = matchMedia('(prefers-color-scheme: dark)');
    setTheme(media.matches ? 'dark' : 'light');
  }, []);

  return { theme };
};

export default function App({ Component, pageProps }: AppProps) {
  const { theme } = useTeme();
  return (
    <CustomProvider theme={theme}>
      <Component {...pageProps} />
    </CustomProvider>
  );
}

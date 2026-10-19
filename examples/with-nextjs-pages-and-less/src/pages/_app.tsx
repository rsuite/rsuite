import '@/styles/globals.css';
import '@/styles/globals.less';
import useSystemTheme from '@/hooks/useSystemTheme';
import type { AppProps } from 'next/app';
import { CustomProvider } from 'rsuite';

export default function App({ Component, pageProps }: AppProps) {
  const theme = useSystemTheme();
  return (
    <CustomProvider theme={theme}>
      <Component {...pageProps} />
    </CustomProvider>
  );
}

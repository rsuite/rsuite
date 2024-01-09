import '@/styles/globals.css';
import '@/styles/globals.less';
import type { AppProps } from 'next/app';
import { CustomProvider } from 'rsuite';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CustomProvider>
      <Component {...pageProps} />
    </CustomProvider>
  );
}

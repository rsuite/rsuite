import React from 'react';
import type { AppProps } from 'next/app';
import { CustomProvider } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

interface CustomAppProps extends AppProps {
  styleCollector?: any;
}

export default function App({ Component, pageProps, styleCollector }: CustomAppProps) {
  return (
    <CustomProvider styleCollector={styleCollector}>
      <Component {...pageProps} />
    </CustomProvider>
  );
}

import React from 'react';
import type { AppProps } from 'next/app';
import '../styles/global.less';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

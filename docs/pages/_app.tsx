import * as React from 'react';
import { ThemeContext } from '../components/Context';
import { IntlProvider as RSIntlProvider } from 'rsuite';
import zhCN from 'rsuite/lib/IntlProvider/locales/zh_CN';
//import enUS from 'rsuite/lib/IntlProvider/locales/en_US';

import { getMessages } from '../locales';
import { readTheme } from '../utils/themeHelpers';

interface MyAppProps {
  Component: React.ElementType;
  pageProps: any;
}

function handleToggleDirection() {
  console.log('handleToggleDirection');
}

function handleToggleTheme() {
  console.log('handleToggleTheme');
}

function MyApp({ Component, pageProps }: MyAppProps) {
  return (
    <RSIntlProvider locale={zhCN} rtl={false}>
      <ThemeContext.Provider
        value={{
          theme: readTheme(),
          messages: getMessages(),
          handleToggleDirection,
          handleToggleTheme
        }}
      >
        <Component {...pageProps} />
      </ThemeContext.Provider>
    </RSIntlProvider>
  );
}

export default MyApp;

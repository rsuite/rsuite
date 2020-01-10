import * as React from 'react';
import { Grid } from 'rsuite';
import { ThemeContext } from '../components/Context';
import { IntlProvider as RSIntlProvider } from 'rsuite';
import zhCN from 'rsuite/lib/IntlProvider/locales/zh_CN';
import enUS from 'rsuite/lib/IntlProvider/locales/en_US';

import { getMessages } from '../locales';
import { readTheme } from '../utils/themeHelpers';

import '../less/index.less';

interface AppProps {
  Component: React.ElementType;
  pageProps: any;
}

function handleToggleDirection() {
  console.log('handleToggleDirection');
}

function handleToggleTheme() {
  console.log('handleToggleTheme');
}

function App({ Component, pageProps }: AppProps) {
  const { userLanguage } = pageProps;
  const locale = userLanguage === 'en' ? enUS : zhCN;

  return (
    <Grid fluid className="app-container">
      <RSIntlProvider locale={locale} rtl={false}>
        <ThemeContext.Provider
          value={{
            theme: readTheme(),
            messages: getMessages(userLanguage),
            handleToggleDirection,
            handleToggleTheme
          }}
        >
          <Component {...pageProps} />
        </ThemeContext.Provider>
      </RSIntlProvider>
    </Grid>
  );
}

App.getInitialProps = ({ ctx }) => {
  let pageProps = {};

  if (!process.browser) {
    pageProps = {
      userLanguage: ctx.query.userLanguage
    };
  }

  return {
    pageProps
  };
};

export default App;

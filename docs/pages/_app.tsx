import * as React from 'react';
import { useMemo, useState, useCallback } from 'react';
import { Grid, IntlProvider as RSIntlProvider } from 'rsuite';
import NProgress from 'nprogress';
import Router from 'next/router';
import AppContext from '@/components/AppContext';
import zhCN from 'rsuite/lib/IntlProvider/locales/zh_CN';
import enUS from 'rsuite/lib/IntlProvider/locales/en_US';

import { getMessages } from '../locales';
import {
  DirectionType,
  getThemeCssPath,
  getThemeId,
  readTheme,
  ThemeType,
  writeTheme
} from '../utils/themeHelpers';
import loadCssFile from '../utils/loadCssFile';
import StyleHead from '../components/StyleHead';

Router.events.on('routeChangeStart', url => {
  console.log(`Loading: ${url}`);
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

interface AppProps {
  Component: React.ElementType;
  pageProps: any;
}

function App({ Component, pageProps }: AppProps) {
  const { userLanguage } = pageProps;
  const locale = userLanguage === 'en' ? enUS : zhCN;

  const [defaultThemeName, defaultDirection] = useMemo<[ThemeType, DirectionType]>(readTheme, []);
  const [themeName, setThemeName] = useState(defaultThemeName);
  const [direction, setDirection] = useState(defaultDirection);

  const loadTheme = useCallback((themeName: ThemeType, direction: DirectionType) => {
    const themeId = getThemeId(themeName, direction);
    loadCssFile(getThemeCssPath(themeName, direction), themeId).then(() => {
      const html = document.querySelector('html');
      html.dir = direction;
      writeTheme(themeName, direction);
      Array.from(document.querySelectorAll('[id^=theme]')).forEach(css => {
        if (css.id !== themeId) {
          css.remove();
        }
      });
    });
  }, []);

  const handleToggleTheme = useCallback(() => {
    const newThemeName = themeName === 'default' ? 'dark' : 'default';
    setThemeName(newThemeName);
    loadTheme(newThemeName, direction);
  }, [themeName, direction]);

  const handleToggleDirection = useCallback(() => {
    const newDirection = direction === 'ltr' ? 'rtl' : 'ltr';
    setDirection(newDirection);
    loadTheme(themeName, newDirection);
  }, [themeName, direction]);
  const messages = getMessages(userLanguage);
  return (
    <Grid fluid className="app-container">
      <RSIntlProvider locale={locale} rtl={false}>
        <AppContext.Provider
          value={{
            messages,
            localePath: messages?.id === 'en-US' ? '/en' : '',
            theme: [themeName, direction],
            handleToggleDirection,
            handleToggleTheme
          }}
        >
          <StyleHead />
          <Component {...pageProps} />
        </AppContext.Provider>
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

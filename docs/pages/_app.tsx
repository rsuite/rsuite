import * as React from 'react';
import { Grid, IntlProvider as RSIntlProvider, DOMHelper } from 'rsuite';
import NProgress from 'nprogress';
import Router from 'next/router';
import AppContext from '@/components/AppContext';
import zhCN from '@rsuite-locales/zh_CN';
import enUS from '@rsuite-locales/en_US';
import { default as dateFns } from 'date-fns';

import { getMessages } from '../locales';
import {
  DirectionType,
  getDefaultTheme,
  getThemeCssPath,
  getThemeId,
  readTheme,
  ThemeType,
  writeTheme
} from '../utils/themeHelpers';
import loadCssFile from '../utils/loadCssFile';
import StyleHead from '../components/StyleHead';
import { canUseDOM } from 'dom-lib';

Router.events.on('routeChangeStart', url => {
  NProgress.start();
  if (process.env.__DEV__) {
    console.log(`Loading: ${url}`);
  }
});
Router.events.on('routeChangeComplete', () => {
  NProgress.done();
  window['_ha']?.('send', 'pageview');
});
Router.events.on('routeChangeError', () => NProgress.done());

interface AppProps {
  Component: React.ElementType;
  pageProps: any;
}

function App({ Component, pageProps }: AppProps) {
  const [defaultThemeName, defaultDirection] = React.useMemo<[ThemeType, DirectionType]>(
    readTheme,
    [getDefaultTheme()]
  );
  const [themeName, setThemeName] = React.useState(defaultThemeName);
  const [direction, setDirection] = React.useState(defaultDirection);
  const [language, setLanguage] = React.useState(pageProps.userLanguage);
  const [styleLoaded, setStyleLoaded] = React.useState(false);
  const locale = language === 'en' ? enUS : zhCN;
  React.useEffect(() => {
    NProgress.start();
  }, []);

  const handleStyleHeadLoaded = React.useCallback(() => {
    NProgress.done();
    setStyleLoaded(true);
  }, []);

  const loadTheme = React.useCallback((themeName: ThemeType, direction: DirectionType) => {
    const themeId = getThemeId(themeName, direction);
    NProgress.start();
    loadCssFile(getThemeCssPath(themeName, direction), themeId).then(() => {
      const html = document.querySelector('html');
      html.dir = direction;
      writeTheme(themeName, direction);
      NProgress.done();
      Array.from(document.querySelectorAll('[id^=theme]')).forEach(css => {
        if (css.id !== themeId) {
          css.remove();
        }
      });
    });
  }, []);

  const onChangeTheme = React.useCallback(() => {
    const newThemeName = themeName === 'default' ? 'dark' : 'default';
    setThemeName(newThemeName);
    loadTheme(newThemeName, direction);
  }, [themeName, direction]);
  React.useEffect(() => {
    if (dateFns.isAfter(new Date(), new Date(2020, 4, 5, 0, 0, 0, 0)) || !canUseDOM) {
      return;
    }
    DOMHelper.addClass(document.body, 'mourning-theme');
  }, []);

  React.useEffect(() => {
    if (!canUseDOM) {
      return;
    }
    const media = matchMedia('(prefers-color-scheme: dark)');
    media?.addEventListener?.('change', onChangeTheme);
    return () => {
      media?.removeEventListener?.('change', onChangeTheme);
    };
  }, [themeName, direction]);

  const onChangeDirection = React.useCallback(() => {
    const newDirection = direction === 'ltr' ? 'rtl' : 'ltr';
    setDirection(newDirection);
    loadTheme(themeName, newDirection);
  }, [themeName, direction]);

  const onChangeLanguage = React.useCallback((value: string) => {
    setLanguage(value);
  }, []);

  const messages = getMessages(language);

  return (
    <Grid fluid className="app-container">
      <RSIntlProvider locale={locale} rtl={direction === 'rtl'}>
        <AppContext.Provider
          value={{
            messages,
            language,
            localePath: language === 'en' ? '/en' : '',
            theme: [themeName, direction],
            onChangeDirection,
            onChangeTheme,
            onChangeLanguage,
            styleLoaded
          }}
        >
          <StyleHead onLoaded={handleStyleHeadLoaded} />
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

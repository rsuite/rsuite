import React from 'react';
import { Grid, CustomProvider } from 'rsuite';
import NProgress from 'nprogress';
import Router from 'next/router';
import AppContext from '@/components/AppContext';
import zhCN from '@rsuite-locales/zh_CN';
import enUS from '@rsuite-locales/en_US';
import * as Sentry from '@sentry/browser';
import '../less/index.less';

// Connecting the SDK to Sentry
if (!process.env.DEV) {
  Sentry.init({
    dsn: 'https://be402c47cb1a4d79b78ad283191299f7@sentry-prd.hypers.cc/7',
    release: `v${process.env.VERSION}`
  });
}

import { getMessages } from '../locales';
import {
  DirectionType,
  getDefaultTheme,
  getStylesheetPath,
  readTheme,
  ThemeType,
  writeTheme
} from '../utils/themeHelpers';
import StyleHead from '../components/StyleHead';
import { canUseDOM } from 'dom-lib';
import loadCssFile from '@/utils/loadCssFile';

Router.events.on('routeChangeStart', url => {
  NProgress.start();
  if (process.env.DEV) {
    console.log(`Loading: ${url}`);
  }
});
Router.events.on('routeChangeComplete', () => {
  NProgress.done();

  window['_ha']?.('send', 'pageview', {
    title: document.title,
    url: document.location.href
  });
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
  const locale = language === 'zh' ? zhCN : enUS;

  const handleStyleHeadLoaded = React.useCallback(() => {
    setStyleLoaded(true);
  }, []);

  const onChangeTheme = React.useCallback(() => {
    const newThemeName = themeName === 'default' ? 'dark' : 'default';
    setThemeName(newThemeName);
    writeTheme(newThemeName, direction);
  }, [themeName, direction]);

  React.useEffect(() => {
    if (!canUseDOM) {
      return;
    }
    const media = matchMedia('(prefers-color-scheme: dark)');
    media?.addEventListener?.('change', onChangeTheme);

    return () => {
      media?.removeEventListener?.('change', onChangeTheme);
    };
  }, [themeName, direction, onChangeTheme]);

  const loadStylesheetForDirection = React.useCallback(
    async (direction: DirectionType) => {
      console.group(`Changing direction: ${direction}`);

      NProgress.start();

      const id = `stylesheet-${direction}`;
      const stylesheetPath = getStylesheetPath(direction);

      console.log('Loading stylesheet: ', stylesheetPath);
      const loaded = await loadCssFile(stylesheetPath, id);
      console.log(loaded.target);

      const html = document.querySelector('html');
      html.setAttribute('dir', direction);
      writeTheme(themeName, direction);
      NProgress.done();

      for (const css of document.querySelectorAll('[rel=stylesheet]')) {
        if (/_app(-rtl)?\.css/.test(css.getAttribute('href')) && css.getAttribute('id') !== id) {
          console.log('Removing stylesheet: ', css);
          css.remove();
        }
      }
      console.groupEnd();
    },
    [themeName]
  );

  const onChangeDirection = React.useCallback(async () => {
    const newDirection = direction === 'ltr' ? 'rtl' : 'ltr';
    setDirection(newDirection);
  }, [direction]);

  const onChangeLanguage = React.useCallback((value: string) => {
    setLanguage(value);
  }, []);

  const messages = getMessages(language);

  React.useEffect(() => {
    const oppositeThemeName = themeName === 'default' ? 'dark' : 'light';

    document.body.classList.add(`rs-theme-${themeName === 'default' ? 'light' : 'dark'}`);
    document.body.classList.remove(`rs-theme-${oppositeThemeName}`);
  }, [themeName]);

  React.useEffect(() => {
    loadStylesheetForDirection(direction);
  }, [direction]);

  return (
    <React.StrictMode>
      <Grid fluid className="app-container">
        <CustomProvider locale={locale} rtl={direction === 'rtl'}>
          <AppContext.Provider
            value={{
              messages,
              language,
              localePath: language === 'zh' ? '/zh-CN' : '/en-US',
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
        </CustomProvider>
      </Grid>
    </React.StrictMode>
  );
}

App.getInitialProps = ({ ctx }) => {
  let pageProps = {
    userLanguage: 'en'
  };

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

import React from 'react';
import { Grid, CustomProvider, CustomProviderProps } from 'rsuite';
import NProgress from 'nprogress';
import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';
import Router, { useRouter } from 'next/router';
import AppContext from '@/components/AppContext';
import zhCN from 'rsuite/locales/zh_CN';
import enUS from 'rsuite/locales/en_US';
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
import canUseDOM from 'dom-lib/canUseDOM';
import loadCssFile from '@/utils/loadCssFile';
import TypedPrompt from '@/components/TypedPrompt';

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

function App({ Component, pageProps }: AppProps) {
  const [defaultThemeName, defaultDirection] = React.useMemo<[ThemeType, DirectionType]>(
    readTheme,
    [getDefaultTheme()]
  );
  const [themeName, setThemeName] = React.useState<CustomProviderProps['theme']>(defaultThemeName);
  const [direction, setDirection] = React.useState(defaultDirection);
  const router = useRouter();
  const [styleLoaded, setStyleLoaded] = React.useState(false);

  const handleStyleHeadLoaded = React.useCallback(() => {
    setStyleLoaded(true);
  }, []);

  const onChangeTheme = React.useCallback(
    newThemeName => {
      setThemeName(newThemeName);
      writeTheme(newThemeName, direction);
    },
    [direction]
  );

  React.useEffect(() => {
    if (!canUseDOM) {
      return;
    }
    const media = matchMedia('(prefers-color-scheme: dark)');

    // todo Improve the preference logic
    // e.g. whether use prefers high-contrast theme when in dark mode
    function handlePrefersColorSchemeChange(e: MediaQueryListEvent) {
      // prefers dark
      if (e.matches) {
        onChangeTheme('dark');
      } else {
        onChangeTheme('light');
      }
    }

    media?.addEventListener?.('change', handlePrefersColorSchemeChange);

    return () => {
      media?.removeEventListener?.('change', handlePrefersColorSchemeChange);
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

  const onChangeDirection = React.useCallback(() => {
    const newDirection = direction === 'ltr' ? 'rtl' : 'ltr';
    setDirection(newDirection);
  }, [direction]);

  const messages = getMessages(router.locale);

  React.useEffect(() => {
    loadStylesheetForDirection(direction);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [direction]);

  return (
    <React.StrictMode>
      <CustomProvider
        locale={router.locale === 'zh' ? zhCN : enUS}
        rtl={direction === 'rtl'}
        theme={themeName}
      >
        <Grid fluid className="app-container">
          <AppContext.Provider
            value={{
              messages,
              language: router.locale,
              localePath: router.locale === 'zh' ? '/zh-CN' : '/en-US',
              theme: [themeName, direction],
              onChangeDirection,
              onChangeTheme,
              styleLoaded
            }}
          >
            <StyleHead onLoaded={handleStyleHeadLoaded} />
            <Component {...pageProps} />
          </AppContext.Provider>
        </Grid>
        <TypedPrompt />
      </CustomProvider>
      <Analytics />
    </React.StrictMode>
  );
}

export default App;

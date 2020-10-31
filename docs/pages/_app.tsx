import React from 'react';
import { Grid, CustomProvider } from 'rsuite';
import NProgress from 'nprogress';
import Router from 'next/router';
import AppContext from '@/components/AppContext';
import zhCN from '@rsuite-locales/zh_CN';
import enUS from '@rsuite-locales/en_US';

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
  }, [themeName, loadTheme, direction]);

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

  const onChangeDirection = React.useCallback(() => {
    const newDirection = direction === 'ltr' ? 'rtl' : 'ltr';
    setDirection(newDirection);
    loadTheme(themeName, newDirection);
  }, [direction, loadTheme, themeName]);

  const onChangeLanguage = React.useCallback((value: string) => {
    setLanguage(value);
  }, []);

  const messages = getMessages(language);

  return (
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

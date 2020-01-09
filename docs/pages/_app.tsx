import * as React from 'react';
import { useMemo, useState, useCallback } from 'react';
import { Grid } from 'rsuite';
import { ThemeContext } from '../components/Context';
import { IntlProvider as RSIntlProvider } from 'rsuite';
import zhCN from 'rsuite/lib/IntlProvider/locales/zh_CN';
//import enUS from 'rsuite/lib/IntlProvider/locales/en_US';

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

interface AppProps {
  Component: React.ElementType;
  pageProps: any;
}

function App({ Component, pageProps }: AppProps) {
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
  return (
    <Grid fluid className="app-container">
      <RSIntlProvider locale={zhCN} rtl={false}>
        <ThemeContext.Provider
          value={{
            theme: [themeName, direction],
            messages: getMessages(),
            handleToggleDirection,
            handleToggleTheme
          }}
        >
          <StyleHead />
          <Component {...pageProps} />
        </ThemeContext.Provider>
      </RSIntlProvider>
    </Grid>
  );
}

export default App;

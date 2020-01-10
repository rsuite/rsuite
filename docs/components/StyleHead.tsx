import * as React from 'react';
import { canUseDOM } from 'dom-lib';
import { getThemeCssPath, getThemeId, readTheme } from '../utils/themeHelpers';
import { useState, useEffect } from 'react';
import GlobalLoader from './GlobalLoader';
import loadCssFile from '../utils/loadCssFile';

const StyleHead = React.memo(() => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const [defaultThemeName, defaultDirection] = readTheme();
    const html = document.querySelector('html');
    html.dir = defaultDirection;
    loadCssFile(
      getThemeCssPath(defaultThemeName, defaultDirection),
      getThemeId(defaultThemeName, defaultDirection)
    ).then(() => {
      setLoading(false);
    });
  }, [canUseDOM]);
  return <>{loading && <GlobalLoader />}</>;
});

StyleHead.displayName = 'StyleHead';

export default StyleHead;

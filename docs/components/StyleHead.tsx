import React, { useState, useEffect } from 'react';
import GlobalLoader from './GlobalLoader';
import { readTheme } from '../utils/themeHelpers';

interface StyleHeadProps {
  onLoaded?: () => void;
}

const StyleHead = React.memo((props: StyleHeadProps) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const [, defaultDirection] = readTheme();
    document.documentElement.setAttribute('dir', defaultDirection);
    setLoading(false);
    props.onLoaded?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <>{loading && <GlobalLoader />}</>;
});

StyleHead.displayName = 'StyleHead';

export default StyleHead;

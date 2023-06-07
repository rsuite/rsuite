import { useEffect, useState } from 'react';
import canUseDOM from 'dom-lib/canUseDOM';

export const mediaQuerySizeMap = {
  xs: '(max-width: 575px)',
  sm: '(min-width: 576px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 992px)',
  xl: '(min-width: 1200px)',
  xxl: '(min-width: 1400px)'
};

const getMatches = (query: string) => {
  if (canUseDOM) {
    return window.matchMedia(query).matches;
  }
  return false;
};

function useMediaQuery(query: string | keyof typeof mediaQuerySizeMap) {
  const mediaQuery = mediaQuerySizeMap[query] || query;

  const [matches, setMatches] = useState(getMatches(mediaQuery));

  function handleChange() {
    setMatches(getMatches(mediaQuery));
  }

  useEffect(() => {
    const matchMedia = window.matchMedia(mediaQuery);

    // Triggered at the first client-side load and if query changes
    handleChange();

    // Listen matchMedia
    matchMedia.addEventListener('change', handleChange);

    return () => {
      matchMedia.removeEventListener('change', handleChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediaQuery]);

  return matches;
}

export default useMediaQuery;

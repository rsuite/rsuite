import { useSyncExternalStore } from 'react';

const query = '(prefers-color-scheme: dark)';
const getServerSnapshot = () => false;
const getSnapshot = () => window.matchMedia(query).matches;

function subscribe(onChange: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener('change', onChange);
  return () => media.removeEventListener('change', onChange);
}

export default function useSystemTheme() {
  const dark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return dark ? 'dark' : 'light';
}

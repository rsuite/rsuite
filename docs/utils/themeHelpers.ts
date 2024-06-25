import canUseDOM from 'dom-lib/canUseDOM';
import { CustomProviderProps } from 'rsuite';

export type ThemeType = CustomProviderProps['theme'];
export type DirectionType = 'rtl' | 'ltr';

export const getDefaultTheme = (): ThemeType => {
  if (!canUseDOM) {
    return 'light';
  }
  if (matchMedia?.('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
};

export const THEME_KEY = 'theme';
export const THEME_DEFAULT = getDefaultTheme();
export const DIRECTION_KEY = 'direction';
export const DIRECTION_DEFAULT = 'ltr';

export function getStylesheetPath(dir: DirectionType): string {
  return `/_next/static/css/pages/_app${dir === 'rtl' ? '-rtl' : ''}.css`;
}

export const readThemeName = (): ThemeType => {
  if (!canUseDOM) {
    return THEME_DEFAULT;
  }
  return (localStorage.getItem(THEME_KEY) || THEME_DEFAULT) as ThemeType;
};
export const writeThemeName = (themeName: ThemeType): void => {
  return localStorage.setItem(THEME_KEY, themeName);
};
export const readDirection = (): DirectionType => {
  if (!canUseDOM) {
    return DIRECTION_DEFAULT;
  }
  return (localStorage.getItem(DIRECTION_KEY) || DIRECTION_DEFAULT) as DirectionType;
};
export const writeDirection = (dir: DirectionType): void =>
  localStorage.setItem(DIRECTION_KEY, dir);
export const readTheme = (): [ThemeType, DirectionType] => [readThemeName(), readDirection()];

export const writeTheme = (themeName: ThemeType, direction: DirectionType): void => {
  writeThemeName(themeName);
  writeDirection(direction);
};

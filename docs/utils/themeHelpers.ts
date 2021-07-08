import { canUseDOM } from 'dom-lib';

export type ThemeType = 'default' | 'dark';
export type DirectionType = 'rtl' | 'ltr';

export const getDefaultTheme = (): ThemeType => {
  if (!canUseDOM) {
    return 'default';
  }
  if (matchMedia?.('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'default';
};

export const THEME_KEY = 'theme';
export const THEME_DEFAULT = getDefaultTheme();
export const DIRECTION_KEY = 'direction';
export const DIRECTION_DEFAULT = 'ltr';

const __DEV__ = process.env.NODE_ENV !== 'production';

export const getThemeId = (themeName: ThemeType, direction: DirectionType): string =>
  `theme-${themeName}-${direction}`;
export const getThemeCssPath = (themeName: ThemeType, direction: DirectionType): string =>
  `${__DEV__ ? '//127.0.0.1:3001' : ''}/css/theme-${themeName}${
    !__DEV__ && direction === 'rtl' ? '.rtl' : ''
  }.css`;

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

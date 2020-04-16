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

export const getThemeId = (themeName: ThemeType, direction: DirectionType) =>
  `theme-${themeName}-${direction}`;
export const getThemeCssPath = (themeName: ThemeType, direction: DirectionType) =>
  `${__DEV__ ? `//${process.env.__LOCAL_IP__}:3001` : ''}/css/theme-${themeName}${
    !__DEV__ && direction === 'rtl' ? '.rtl' : ''
  }.css`;

export const readThemeName = (): ThemeType => {
  if (!canUseDOM) {
    return THEME_DEFAULT;
  }
  return (localStorage.getItem(THEME_KEY) || THEME_DEFAULT) as ThemeType;
};
export const writeThemeName = (themeName: ThemeType) => {
  return localStorage.setItem(THEME_KEY, themeName);
};
export const readDirection = (): DirectionType => {
  if (!canUseDOM) {
    return DIRECTION_DEFAULT;
  }
  return (localStorage.getItem(DIRECTION_KEY) || DIRECTION_DEFAULT) as DirectionType;
};
export const writeDirection = (dir: DirectionType) => localStorage.setItem(DIRECTION_KEY, dir);
export const readTheme = (): [ThemeType, DirectionType] => [readThemeName(), readDirection()];

export const writeTheme = (themeName: ThemeType, direction: DirectionType) => {
  writeThemeName(themeName);
  writeDirection(direction);
};

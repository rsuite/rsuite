import { canUseDOM } from 'dom-lib';

export type ThemeType = 'default' | 'dark';
export type DirectionType = 'rtl' | 'ltr';

export const THEME_KEY = 'theme';
export const THEME_DEFAULT = 'default';
export const DIRECTION_KEY = 'direction';
export const DIRECTION_DEFAULT = 'ltr';

export const getThemeId = (themeName: ThemeType, direction: 'default' | 'rtl') =>
  `theme-${themeName}-${direction}`;
export const getThemeCssPath = (themeName: ThemeType, direction: DirectionType) =>
  `/resources/css/theme-${themeName}${direction === 'rtl' ? '.rtl' : ''}.css`;

export const readThemeName = () => {
  if (!canUseDOM) {
    return THEME_DEFAULT;
  }
  return localStorage.getItem(THEME_KEY) || THEME_DEFAULT;
};
export const writeThemeName = (themeName: ThemeType) => {
  return localStorage.setItem(THEME_KEY, themeName);
};
export const readDirection = () => {
  if (!canUseDOM) {
    return DIRECTION_DEFAULT;
  }
  localStorage.getItem(DIRECTION_KEY) || DIRECTION_DEFAULT;
};
export const writeDirection = (dir: DirectionType) => localStorage.setItem(DIRECTION_KEY, dir);
export const readTheme = () => [readThemeName(), readDirection()];

export const writeTheme = (themeName: ThemeType, direction: DirectionType) => {
  writeThemeName(themeName);
  writeDirection(direction);
};

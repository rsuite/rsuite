import { canUseDOM } from 'dom-lib';
import { __DEBUG__ } from '../pages/_config';

export type ThemeType = 'default' | 'dark';
export type DirectionType = 'rtl' | 'ltr';

export const THEME_KEY = 'theme';
export const THEME_DEFAULT = 'default';
export const DIRECTION_KEY = 'direction';
export const DIRECTION_DEFAULT = 'ltr';

export const getThemeId = (themeName: ThemeType, direction: DirectionType) =>
  `theme-${themeName}-${direction}`;
export const getThemeCssPath = (themeName: ThemeType, direction: DirectionType) =>
  `${__DEBUG__ ? '//0.0.0.0:3001' : ''}/css/theme-${themeName}${
    direction === 'rtl' ? '.rtl' : ''
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

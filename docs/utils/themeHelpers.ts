import canUseDOM from 'dom-lib/canUseDOM';
import { CustomProviderProps } from 'rsuite';

/**
 * Type representing the theme options for the application.
 * Inherited from RSuite's CustomProvider theme prop types.
 */
export type ThemeType = CustomProviderProps['theme'];

/**
 * Type representing the text direction options.
 * - 'ltr': Left-to-right text direction
 * - 'rtl': Right-to-left text direction
 */
export type DirectionType = 'rtl' | 'ltr';

/**
 * Determines the default theme based on system preferences.
 * Checks for dark mode preference if running in a browser environment.
 *
 * @returns {ThemeType} The default theme ('light' or 'dark')
 */
export const getDefaultTheme = (): ThemeType => {
  if (!canUseDOM) {
    return 'light';
  }
  if (matchMedia?.('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
};

/** Key used to store theme preference in localStorage */
export const THEME_KEY = 'theme';

/** Default theme for the application */
export const THEME_DEFAULT = getDefaultTheme();

/** Key used to store text direction preference in localStorage */
export const DIRECTION_KEY = 'direction';

/** Default text direction for the application */
export const DIRECTION_DEFAULT = 'ltr';


/**
 * Reads the current theme from localStorage or returns the default theme
 *
 * @returns {ThemeType} The current theme
 */
export const readThemeName = (): ThemeType => {
  if (!canUseDOM) {
    return THEME_DEFAULT;
  }
  return (localStorage.getItem(THEME_KEY) || THEME_DEFAULT) as ThemeType;
};

/**
 * Saves the theme preference to localStorage
 *
 * @param {ThemeType} themeName - The theme to save ('light' or 'dark')
 */
export const writeThemeName = (themeName: ThemeType): void => {
  return localStorage.setItem(THEME_KEY, themeName);
};

/**
 * Reads the current text direction from localStorage or returns the default direction
 *
 * @returns {DirectionType} The current text direction ('ltr' or 'rtl')
 */
export const readDirection = (): DirectionType => {
  if (!canUseDOM) {
    return DIRECTION_DEFAULT;
  }
  return (localStorage.getItem(DIRECTION_KEY) || DIRECTION_DEFAULT) as DirectionType;
};

/**
 * Saves the text direction preference to localStorage
 *
 * @param {DirectionType} dir - The text direction to save
 */
export const writeDirection = (dir: DirectionType): void =>
  localStorage.setItem(DIRECTION_KEY, dir);

/**
 * Reads both theme and direction preferences
 *
 * @returns {[ThemeType, DirectionType]} A tuple containing [theme, direction]
 */
export const readTheme = (): [ThemeType, DirectionType] => [readThemeName(), readDirection()];

/**
 * Saves both theme and direction preferences
 *
 * @param {ThemeType} themeName - The theme to save
 * @param {DirectionType} direction - The text direction to save
 */
export const writeTheme = (themeName: ThemeType, direction: DirectionType): void => {
  writeThemeName(themeName);
  writeDirection(direction);
};

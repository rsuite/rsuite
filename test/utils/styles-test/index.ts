import tinycolor from 'tinycolor2';
import { getPalette } from './getPalette';

export { getStyle } from 'dom-lib';
export const toRGB = (color: string) => tinycolor(color).toRgbString();
export const inChrome = window.navigator.userAgent.includes('Chrome');

/**
 * Only run test in Chrome
 * @param args - Arguments for `it`
 *
 * @example
 *
 * ```js
 * import { itChrome } from '@test/utils';
 *
 * itChrome('Should render a button', () => {
 *  // ...
 * });
 * ```
 */
export const itChrome = (...args: any) => {
  if (inChrome) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    it(...args);
  }
};

/**
 * Get rgb color string identified by given key
 *
 * @param {string} key Less variable name @B000-B900
 *
 * @return {string} CSS color in rgb() notation
 */
export const getGrayScale = (key: string) => {
  // See Figma design
  const lessVariables = {
    B900: '#272c36',
    B800: '#575757',
    B700: '#7a7a7a',
    B600: '#8e8e93',
    B500: '#a6a6a6',
    B400: '#c5c6c7',
    B300: '#d9d9d9',
    B200: '#e5e5e5',
    B100: '#f2f2f5',
    B050: '#f7f7fa',
    B000: '#fff'
  };

  const hexColor = lessVariables[key];

  return tinycolor(hexColor).toRgbString();
};

const DEFAULT_PRIMARY_COLOR = '#3498ff';
const DARK_PRIMARY_COLOR = '#34c3ff';

export const getDefaultPalette = (key?: string) => {
  if (!key) {
    return getPalette(DEFAULT_PRIMARY_COLOR);
  }
  return getDefaultPalette()[key];
};
export const getDarkPalette = () => getPalette(DARK_PRIMARY_COLOR);

export function getCssVarValue(element: HTMLElement, variableName: string) {
  if (!element || !variableName.startsWith('--')) return '';

  // 1. Try to get directly from `element.style`
  const rawValue = element.style.getPropertyValue(variableName).trim();
  if (rawValue) return rawValue;

  // 2. Parse from `style=""` attribute
  const inlineStyle = element.getAttribute('style') || '';
  const match = inlineStyle.match(new RegExp(`${variableName}:\\s*([^;]+)`));

  return match ? match[1].trim() : '';
}

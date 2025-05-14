import tinycolor from 'tinycolor2';
import { it } from 'vitest';

export * from './palette';
export * from './getCssVarValue';
export * from './getGrayScale';
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

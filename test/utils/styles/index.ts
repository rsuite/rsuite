import tinycolor from 'tinycolor2';

export { getStyle } from 'dom-lib';
export * from './palette';
export * from './getCssVarValue';
export * from './getGrayScale';

export const toRGB = (color: string) => tinycolor(color).toRgbString();
export const inChrome = window.navigator.userAgent.includes('Chrome');

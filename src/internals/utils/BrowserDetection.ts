// from http://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser

import canUseDOM from 'dom-lib/canUseDOM';

// Internet Explorer 6-11
export const isIE = () => canUseDOM && /MSIE |Trident\/|Edge\//.test(window.navigator.userAgent);

export const isIE11 = () =>
  canUseDOM &&
  window.navigator.userAgent.indexOf('Trident') > -1 &&
  window.navigator.userAgent.indexOf('rv:11.0') > -1;

export const isAndroid = () => canUseDOM && /Android/i.test(navigator.userAgent);

export const getChromeVersion = () => {
  if (canUseDOM) {
    const match = window.navigator.userAgent.match(/Chrom(e|ium)\/([\d\.]+)\./);
    return match ? parseFloat(match[2]) : false;
  }

  return false;
};

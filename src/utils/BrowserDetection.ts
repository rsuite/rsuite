// from http://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser

import canUseDOM from 'dom-lib/canUseDOM';

// Internet Explorer 6-11
export const isIE = () => canUseDOM && /MSIE |Trident\/|Edge\//.test(window.navigator.userAgent);

export const isIE10 = () => canUseDOM && !!window.navigator.userAgent.match(/MSIE 10.0/);

export const isIE11 = () =>
  canUseDOM &&
  window.navigator.userAgent.indexOf('Trident') > -1 &&
  window.navigator.userAgent.indexOf('rv:11.0') > -1;

// Edge 20+
export const isEdge = () => canUseDOM && !isIE() && 'styleMedia' in window;

export const isAndroid = () => canUseDOM && /Android/i.test(navigator.userAgent);

export const getChromeVersion = () => {
  if (canUseDOM) {
    const match = window.navigator.userAgent.match(/Chrom(e|ium)\/([\d\.]+)\./);
    return match ? parseFloat(match[2]) : false;
  }

  return false;
};

export const getSafariVersion = () => {
  if (canUseDOM) {
    const match = window.navigator.userAgent.match(/Version\/([\d\.]+).*Safari/);
    return match ? parseFloat(match[1]) : false;
  }
  return false;
};

/**
 * flexbox-gap compatibility
 * @see https://caniuse.com/flexbox-gap
 */
export const isSupportFlexGap = () => {
  if (isIE()) {
    return false;
  }
  const chromeVersion = getChromeVersion();
  const safariVersion = getSafariVersion();

  // edge consider as chrome
  if (chromeVersion) {
    // flex-gap is support in Chrome 84+
    return chromeVersion >= 84;
  }

  if (safariVersion) {
    // flex-gap is support in Safari 14.1+
    return safariVersion >= 14.1;
  }

  return true;
};

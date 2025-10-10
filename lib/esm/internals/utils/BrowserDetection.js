'use client';
// from http://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser

import canUseDOM from 'dom-lib/canUseDOM';

// Internet Explorer 6-11
export var isIE = function isIE() {
  return canUseDOM && /MSIE |Trident\/|Edge\//.test(window.navigator.userAgent);
};
export var isIE10 = function isIE10() {
  return canUseDOM && !!window.navigator.userAgent.match(/MSIE 10.0/);
};
export var isIE11 = function isIE11() {
  return canUseDOM && window.navigator.userAgent.indexOf('Trident') > -1 && window.navigator.userAgent.indexOf('rv:11.0') > -1;
};

// Edge 20+
export var isEdge = function isEdge() {
  return canUseDOM && !isIE() && 'styleMedia' in window;
};
export var isAndroid = function isAndroid() {
  return canUseDOM && /Android/i.test(navigator.userAgent);
};
export var getChromeVersion = function getChromeVersion() {
  if (canUseDOM) {
    var match = window.navigator.userAgent.match(/Chrom(e|ium)\/([\d\.]+)\./);
    return match ? parseFloat(match[2]) : false;
  }
  return false;
};
export var getSafariVersion = function getSafariVersion() {
  if (canUseDOM) {
    var match = window.navigator.userAgent.match(/Version\/([\d\.]+).*Safari/);
    return match ? parseFloat(match[1]) : false;
  }
  return false;
};

/**
 * flexbox-gap compatibility
 * @see https://caniuse.com/flexbox-gap
 */
export var isSupportFlexGap = function isSupportFlexGap() {
  // Check if the browser supports the `gap` property
  if (typeof CSS !== 'undefined' && typeof CSS.supports !== 'undefined') {
    return CSS.supports('(gap: 1px)');
  }

  // IE does not support flex-gap
  if (isIE()) {
    return false;
  }
  var chromeVersion = getChromeVersion();
  var safariVersion = getSafariVersion();

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
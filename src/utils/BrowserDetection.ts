// from http://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser

import canUseDOM from 'dom-lib/lib/query/canUseDOM';

// Internet Explorer 6-11
export const isIE = () => canUseDOM && /MSIE |Trident\/|Edge\//.test(window.navigator.userAgent);

export const isIE10 = () => canUseDOM && !!window.navigator.userAgent.match(/MSIE 10.0/);

export const isIE11 = () =>
  canUseDOM &&
  window.navigator.userAgent.indexOf('Trident') > -1 &&
  window.navigator.userAgent.indexOf('rv:11.0') > -1;

// Edge 20+
export const isEdge = () => canUseDOM && !isIE() && !!window.styleMedia;

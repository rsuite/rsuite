// from http://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser

import canUseDOM from 'dom-lib/canUseDOM';

// Internet Explorer 6-11
export const isIE = () => canUseDOM && /MSIE |Trident\/|Edge\//.test(window.navigator.userAgent);

export const isAndroid = () => canUseDOM && /Android/i.test(navigator.userAgent);

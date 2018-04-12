// from http://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser

// Opera 8.0+
export const isOpera =
  (!!window.opr && !!window.opr.addons) ||
  !!window.opera ||
  navigator.userAgent.indexOf(' OPR/') >= 0;

// Firefox 1.0+
export const isFirefox = typeof InstallTrigger !== 'undefined';

// Safari 3.0+ "[object HTMLElementConstructor]"
export const isSafari =
  Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0 ||
  (p => p.toString() === '[object SafariRemoteNotification]')(
    !window.safari || window.safari.pushNotification
  );

/*eslint-disable */
// Internet Explorer 6-11
export const isIE = !!navigator.userAgent.match(/MSIE/);

export const isIE8 = !!navigator.userAgent.match(/MSIE 8.0/);
export const isIE9 = !!navigator.userAgent.match(/MSIE 9.0/);
export const isIE10 = !!navigator.userAgent.match(/MSIE 10.0/);

export const isIE11 =
  navigator.userAgent.indexOf('Trident') > -1 && navigator.userAgent.indexOf('rv:11.0') > -1;

// Edge 20+
export const isEdge = !isIE && !!window.StyleMedia;

// Chrome 1+
export const isChrome = !!window.chrome && !!window.chrome.webstore;

// Blink engine detection
export const isBlink = (isChrome || isOpera) && !!window.CSS;

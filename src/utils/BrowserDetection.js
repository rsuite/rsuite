// from http://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser

/*eslint-disable */
// Internet Explorer 6-11
export const isIE = () => /MSIE |Trident\/|Edge\//.test(window.navigator.userAgent);

export const isIE9 = () => !!navigator.userAgent.match(/MSIE 9.0/);
export const isIE10 = () => !!navigator.userAgent.match(/MSIE 10.0/);

export const isIE11 = () =>
  navigator.userAgent.indexOf('Trident') > -1 && navigator.userAgent.indexOf('rv:11.0') > -1;

// Edge 20+
export const isEdge = () => !isIE && !!window.StyleMedia;

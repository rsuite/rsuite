'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.isSupportFlexGap = exports.isIE11 = exports.isIE10 = exports.isIE = exports.isEdge = exports.isAndroid = exports.getSafariVersion = exports.getChromeVersion = void 0;
var _canUseDOM = _interopRequireDefault(require("dom-lib/canUseDOM"));
// from http://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser

// Internet Explorer 6-11
var isIE = exports.isIE = function isIE() {
  return _canUseDOM.default && /MSIE |Trident\/|Edge\//.test(window.navigator.userAgent);
};
var isIE10 = exports.isIE10 = function isIE10() {
  return _canUseDOM.default && !!window.navigator.userAgent.match(/MSIE 10.0/);
};
var isIE11 = exports.isIE11 = function isIE11() {
  return _canUseDOM.default && window.navigator.userAgent.indexOf('Trident') > -1 && window.navigator.userAgent.indexOf('rv:11.0') > -1;
};

// Edge 20+
var isEdge = exports.isEdge = function isEdge() {
  return _canUseDOM.default && !isIE() && 'styleMedia' in window;
};
var isAndroid = exports.isAndroid = function isAndroid() {
  return _canUseDOM.default && /Android/i.test(navigator.userAgent);
};
var getChromeVersion = exports.getChromeVersion = function getChromeVersion() {
  if (_canUseDOM.default) {
    var match = window.navigator.userAgent.match(/Chrom(e|ium)\/([\d\.]+)\./);
    return match ? parseFloat(match[2]) : false;
  }
  return false;
};
var getSafariVersion = exports.getSafariVersion = function getSafariVersion() {
  if (_canUseDOM.default) {
    var match = window.navigator.userAgent.match(/Version\/([\d\.]+).*Safari/);
    return match ? parseFloat(match[1]) : false;
  }
  return false;
};

/**
 * flexbox-gap compatibility
 * @see https://caniuse.com/flexbox-gap
 */
var isSupportFlexGap = exports.isSupportFlexGap = function isSupportFlexGap() {
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
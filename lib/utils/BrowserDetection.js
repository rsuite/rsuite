"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.isEdge = exports.isIE11 = exports.isIE10 = exports.isIE = void 0;

var _canUseDOM = _interopRequireDefault(require("dom-lib/lib/query/canUseDOM"));

// from http://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
// Internet Explorer 6-11
var isIE = function isIE() {
  return _canUseDOM.default && /MSIE |Trident\/|Edge\//.test(window.navigator.userAgent);
};

exports.isIE = isIE;

var isIE10 = function isIE10() {
  return _canUseDOM.default && !!window.navigator.userAgent.match(/MSIE 10.0/);
};

exports.isIE10 = isIE10;

var isIE11 = function isIE11() {
  return _canUseDOM.default && window.navigator.userAgent.indexOf('Trident') > -1 && window.navigator.userAgent.indexOf('rv:11.0') > -1;
}; // Edge 20+


exports.isIE11 = isIE11;

var isEdge = function isEdge() {
  return _canUseDOM.default && !isIE() && !!window.styleMedia;
};

exports.isEdge = isEdge;
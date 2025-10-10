'use client';
"use strict";

exports.__esModule = true;
exports.default = void 0;
exports.mergeRefs = mergeRefs;
var toFnRef = function toFnRef(ref) {
  return !ref || typeof ref === 'function' ? ref : function (value) {
    ref.current = value;
  };
};

/**
 * Merges two React refs into a single ref callback.
 */
function mergeRefs(refA, refB) {
  var a = toFnRef(refA);
  var b = toFnRef(refB);
  return function (value) {
    if (typeof a === 'function') a(value);
    if (typeof b === 'function') b(value);
  };
}
var _default = exports.default = mergeRefs;
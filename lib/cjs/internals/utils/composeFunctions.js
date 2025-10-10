'use client';
"use strict";

exports.__esModule = true;
exports.composeFunctions = composeFunctions;
exports.default = void 0;
/**
 * Composes multiple functions into a single function.
 *
 * @example
 * ```
 * const a = () => console.log('a');
 * const b = () => console.log('b');
 * const c = () => console.log('c');
 *
 * const d = composeFunctions(a, b, c);
 *
 * d(); // a b c
 * ```
 */
function composeFunctions() {
  for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }
  return function (first) {
    return fns.reduce(function (previousValue, fn) {
      return fn(previousValue);
    }, first);
  };
}
var _default = exports.default = composeFunctions;
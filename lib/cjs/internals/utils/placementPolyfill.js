'use client';
"use strict";

exports.__esModule = true;
exports.default = void 0;
exports.placementPolyfill = placementPolyfill;
/**
 * Replaces the placement string with its polyfilled counterpart based on the given RTL (Right-to-Left) value.
 * @example
 * ```
 * placementPolyfill('bottomLeft');
 * // 'bottomStart'
 * ```
 */
function placementPolyfill(placement, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  if (typeof placement === 'string') {
    if (rtl) {
      placement = placement.replace(/left|right/, function (m) {
        return m === 'left' ? 'right' : 'left';
      });
    }
    return placement.replace(/Left|Top/, 'Start').replace(/Right|Bottom/, 'End');
  }
  return placement;
}
var _default = exports.default = placementPolyfill;
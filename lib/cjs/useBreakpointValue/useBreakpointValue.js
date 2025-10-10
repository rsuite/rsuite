'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
exports.useBreakpointValue = useBreakpointValue;
var _useMediaQuery = _interopRequireDefault(require("../useMediaQuery"));
/**
 * A React Hook that returns different values based on different screen sizes in responsive design.
 * @version 5.63.0
 * @unstable Please note that this API is not stable and may change in the future.
 * @see https://rsuitejs.com/components/use-breakpoint-value
 *
 * @example
 * ```ts
 * const fontSize = useBreakpointValue({ sm: "14px", lg: "24px" }, { defaultValue: "16px" });
 * const direction = useBreakpointValue({ sm: 'row' }, { defaultValue:'column' });
 * ```
 *
 */
function useBreakpointValue(breakpoints, options) {
  var _ref = options || {},
    defaultValue = _ref.defaultValue;
  var keys = Object.keys(breakpoints);
  var values = Object.values(breakpoints);
  var matches = (0, _useMediaQuery.default)(keys);
  var index = matches.indexOf(true);
  return index !== -1 ? values[index] : defaultValue;
}
var _default = exports.default = useBreakpointValue;
'use client';
"use strict";

exports.__esModule = true;
exports.default = void 0;
exports.useUpdatedRef = useUpdatedRef;
var _react = require("react");
/**
 * Returns a ref that is immediately updated with the new value
 *
 * @param value The Ref value
 * @category refs
 */
function useUpdatedRef(value) {
  var valueRef = (0, _react.useRef)(value);
  valueRef.current = value;
  return valueRef;
}
var _default = exports.default = useUpdatedRef;
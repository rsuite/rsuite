'use client';
"use strict";

exports.__esModule = true;
exports.default = void 0;
exports.useIsFocused = useIsFocused;
var _react = require("react");
function useIsFocused(_ref) {
  var onFocusProp = _ref.onFocus,
    onBlurProp = _ref.onBlur;
  var _useState = (0, _react.useState)(false),
    isFocused = _useState[0],
    setIsFocused = _useState[1];
  var onFocus = (0, _react.useCallback)(function (event) {
    setIsFocused(true);
    onFocusProp === null || onFocusProp === void 0 || onFocusProp(event);
  }, [onFocusProp]);
  var onBlur = (0, _react.useCallback)(function (event) {
    setIsFocused(false);
    onBlurProp === null || onBlurProp === void 0 || onBlurProp(event);
  }, [onBlurProp]);
  return [isFocused, {
    onFocus: onFocus,
    onBlur: onBlur
  }];
}
var _default = exports.default = useIsFocused;
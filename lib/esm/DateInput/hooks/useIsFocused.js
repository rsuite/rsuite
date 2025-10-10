'use client';
import { useState, useCallback } from 'react';
export function useIsFocused(_ref) {
  var onFocusProp = _ref.onFocus,
    onBlurProp = _ref.onBlur;
  var _useState = useState(false),
    isFocused = _useState[0],
    setIsFocused = _useState[1];
  var onFocus = useCallback(function (event) {
    setIsFocused(true);
    onFocusProp === null || onFocusProp === void 0 || onFocusProp(event);
  }, [onFocusProp]);
  var onBlur = useCallback(function (event) {
    setIsFocused(false);
    onBlurProp === null || onBlurProp === void 0 || onBlurProp(event);
  }, [onBlurProp]);
  return [isFocused, {
    onFocus: onFocus,
    onBlur: onBlur
  }];
}
export default useIsFocused;
'use client';
import { useEffect, useRef } from 'react';
export function useClickOutside(_ref) {
  var _ref$enabled = _ref.enabled,
    enabled = _ref$enabled === void 0 ? true : _ref$enabled,
    isOutside = _ref.isOutside,
    handle = _ref.handle;
  var isOutsideRef = useRef(isOutside);
  var handleRef = useRef(handle);
  useEffect(function () {
    isOutsideRef.current = isOutside;
    handleRef.current = handle;
  }, [isOutside, handle]);
  useEffect(function () {
    if (enabled) {
      var eventHandler = function eventHandler(event) {
        var _isOutsideRef$current;
        if ((_isOutsideRef$current = isOutsideRef.current) !== null && _isOutsideRef$current !== void 0 && _isOutsideRef$current.call(isOutsideRef, event)) {
          var _handleRef$current;
          (_handleRef$current = handleRef.current) === null || _handleRef$current === void 0 || _handleRef$current.call(handleRef, event);
        }
      };
      window.addEventListener('mousedown', eventHandler);
      return function () {
        window.removeEventListener('mousedown', eventHandler);
      };
    }
  }, [enabled]);
}
export default useClickOutside;
'use client';
import { useCallback, useRef } from 'react';
export function useFocus(elementRef) {
  // When grabbing focus, keep track of previous activeElement
  // so that we can return focus later
  var previousActiveElementRef = useRef(null);

  // Focus the element itself
  var grab = useCallback(function () {
    requestAnimationFrame(function () {
      if (document.activeElement !== elementRef.current) {
        var _elementRef$current;
        previousActiveElementRef.current = document.activeElement;
        (_elementRef$current = elementRef.current) === null || _elementRef$current === void 0 || _elementRef$current.focus();
      }
    });
  }, [elementRef]);

  // Return focus to previous active element
  var release = useCallback(function (options) {
    requestAnimationFrame(function () {
      var _previousActiveElemen;
      (_previousActiveElemen = previousActiveElementRef.current) === null || _previousActiveElemen === void 0 || _previousActiveElemen.focus(options);
    });
  }, []);
  return {
    grab: grab,
    release: release
  };
}
export default useFocus;
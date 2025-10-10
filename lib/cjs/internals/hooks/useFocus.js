'use client';
"use strict";

exports.__esModule = true;
exports.default = void 0;
exports.useFocus = useFocus;
var _react = require("react");
function useFocus(elementRef) {
  // When grabbing focus, keep track of previous activeElement
  // so that we can return focus later
  var previousActiveElementRef = (0, _react.useRef)(null);

  // Focus the element itself
  var grab = (0, _react.useCallback)(function () {
    requestAnimationFrame(function () {
      if (document.activeElement !== elementRef.current) {
        var _elementRef$current;
        previousActiveElementRef.current = document.activeElement;
        (_elementRef$current = elementRef.current) === null || _elementRef$current === void 0 || _elementRef$current.focus();
      }
    });
  }, [elementRef]);

  // Return focus to previous active element
  var release = (0, _react.useCallback)(function (options) {
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
var _default = exports.default = useFocus;
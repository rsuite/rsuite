'use client';
"use strict";

exports.__esModule = true;
exports.default = void 0;
exports.useClickOutside = useClickOutside;
var _react = require("react");
function useClickOutside(_ref) {
  var _ref$enabled = _ref.enabled,
    enabled = _ref$enabled === void 0 ? true : _ref$enabled,
    isOutside = _ref.isOutside,
    handle = _ref.handle;
  var isOutsideRef = (0, _react.useRef)(isOutside);
  var handleRef = (0, _react.useRef)(handle);
  (0, _react.useEffect)(function () {
    isOutsideRef.current = isOutside;
    handleRef.current = handle;
  }, [isOutside, handle]);
  (0, _react.useEffect)(function () {
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
var _default = exports.default = useClickOutside;
'use client';
"use strict";

exports.__esModule = true;
exports.default = void 0;
exports.useIsMounted = useIsMounted;
var _react = require("react");
function useIsMounted() {
  var isMounted = (0, _react.useRef)(false);
  (0, _react.useEffect)(function () {
    isMounted.current = true;
    return function () {
      isMounted.current = false;
    };
  }, []);
  return (0, _react.useCallback)(function () {
    return isMounted.current;
  }, []);
}
var _default = exports.default = useIsMounted;
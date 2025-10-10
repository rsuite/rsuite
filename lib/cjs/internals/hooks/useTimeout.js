'use client';
"use strict";

exports.__esModule = true;
exports.default = void 0;
exports.useTimeout = useTimeout;
var _react = require("react");
/**
 * A timer hook
 * @param fn Timer callback function
 * @param ms Milliseconds of the timer
 * @param enabled Whether to open the timer
 */
function useTimeout(fn, ms, enabled) {
  if (ms === void 0) {
    ms = 0;
  }
  if (enabled === void 0) {
    enabled = true;
  }
  var timeout = (0, _react.useRef)();
  var callback = (0, _react.useRef)(fn);
  var clear = (0, _react.useCallback)(function () {
    timeout.current && clearTimeout(timeout.current);
  }, []);
  var set = (0, _react.useCallback)(function () {
    timeout.current && clearTimeout(timeout.current);
    if (enabled) {
      timeout.current = setTimeout(function () {
        var _callback$current;
        (_callback$current = callback.current) === null || _callback$current === void 0 || _callback$current.call(callback);
      }, ms);
    }
  }, [ms, enabled]);

  // update ref when function changes
  (0, _react.useEffect)(function () {
    callback.current = fn;
  }, [fn]);
  (0, _react.useEffect)(function () {
    set();
    return clear;
  }, [ms, enabled, set, clear]);
  return {
    clear: clear,
    reset: set
  };
}
var _default = exports.default = useTimeout;
'use client';
"use strict";

exports.__esModule = true;
exports.default = void 0;
exports.useFieldCursor = useFieldCursor;
var _react = require("react");
var _utils = require("../utils");
var _hooks = require("../../internals/hooks");
function useFieldCursor(format, value) {
  var typeCount = (0, _react.useRef)(0);
  var increment = (0, _react.useCallback)(function () {
    typeCount.current += 1;
  }, []);
  var reset = (0, _react.useCallback)(function () {
    typeCount.current = 0;
  }, []);
  var isResetValue = (0, _react.useCallback)(function () {
    return typeCount.current === 0;
  }, []);

  // Check if the cursor should move to the next field
  var isMoveCursor = (0, _react.useCallback)(function (value, pattern) {
    var patternGroup = (0, _utils.getPatternGroups)(format, pattern);
    if (value.toString().length === patternGroup.length) {
      return true;
    } else if (pattern === 'y' && typeCount.current === 4) {
      return true;
    } else if (pattern !== 'y' && typeCount.current === 2) {
      return true;
    }
    switch (pattern) {
      case 'M':
        return parseInt(value + "0") > 12;
      case 'd':
        return parseInt(value + "0") > 31;
      case 'H':
        return parseInt(value + "0") > 23;
      case 'h':
        return parseInt(value + "0") > 12;
      case 'm':
      case 's':
        return parseInt(value + "0") > 59;
      default:
        return false;
    }
  }, [format]);
  (0, _hooks.useUpdateEffect)(function () {
    if (!value) {
      reset();
    }
  }, [value]);
  return {
    increment: increment,
    reset: reset,
    isMoveCursor: isMoveCursor,
    isResetValue: isResetValue
  };
}
var _default = exports.default = useFieldCursor;
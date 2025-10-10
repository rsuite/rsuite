'use client';
import { useCallback, useRef } from 'react';
import { getPatternGroups } from "../utils.js";
import { useUpdateEffect } from "../../internals/hooks/index.js";
export function useFieldCursor(format, value) {
  var typeCount = useRef(0);
  var increment = useCallback(function () {
    typeCount.current += 1;
  }, []);
  var reset = useCallback(function () {
    typeCount.current = 0;
  }, []);
  var isResetValue = useCallback(function () {
    return typeCount.current === 0;
  }, []);

  // Check if the cursor should move to the next field
  var isMoveCursor = useCallback(function (value, pattern) {
    var patternGroup = getPatternGroups(format, pattern);
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
  useUpdateEffect(function () {
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
export default useFieldCursor;
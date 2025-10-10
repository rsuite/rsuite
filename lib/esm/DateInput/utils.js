'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import { setYear, setMonth, setDate, setHours, setMinutes, setSeconds } from "../internals/utils/date/index.js";
import { safeSetSelection } from "../internals/utils/index.js";
export function getPatternGroups(format, pattern) {
  var _format$match;
  return ((_format$match = format.match(new RegExp("(" + pattern + ")+"))) === null || _format$match === void 0 ? void 0 : _format$match[0]) || '';
}
export function getSelectIndexGap(options) {
  var pattern = options.pattern,
    formatStr = options.formatStr,
    valueOffset = options.valueOffset,
    selectedMonth = options.selectedMonth,
    localize = options.localize;
  var gap = 0;
  var monthIsAbbreviated = formatStr.includes('MMM');
  var monthIsFull = formatStr.includes('MMMM');

  // If the month is abbreviated or full, the gap needs to be adjusted.
  if (monthIsAbbreviated || monthIsFull) {
    var isSelectedMonth = pattern === 'M';

    // If the selected is the month, and the valueOffset is null,
    // it means that the delete key is pressed, and the default pattern is displayed, and the gap is 0 at this time.
    if (isSelectedMonth && valueOffset === null) {
      return 0;
    }

    // If the month is null and the valueOffset is 0, the month will not be updated, and the gap is 0 at this time.
    if (selectedMonth === null && valueOffset === 0) {
      return 0;
    }
    var month = selectedMonth ? selectedMonth + (isSelectedMonth ? valueOffset || 0 : 0) : 1;
    if (month > 12) {
      month = 1;
    } else if (month === 0) {
      month = 12;
    }
    var monthStr = localize === null || localize === void 0 ? void 0 : localize.month(month - 1, {
      width: monthIsFull ? 'wide' : 'abbreviated'
    });
    gap = monthStr.length - (monthIsFull ? 4 : 3);
  }
  return gap;
}
export function getDatePattern(options) {
  var selectionIndex = options.selectionIndex,
    _options$positionOffs = options.positionOffset,
    positionOffset = _options$positionOffs === void 0 ? -1 : _options$positionOffs,
    formatStr = options.formatStr,
    dateString = options.dateString,
    valueOffset = options.valueOffset,
    selectedMonth = options.selectedMonth,
    localize = options.localize;
  var pattern = formatStr.charAt(selectionIndex || 0);
  if (selectionIndex < 0 || selectionIndex > dateString.length - 1) {
    pattern = formatStr.trim().charAt(0);
    return pattern;
  }
  var gap = 0;
  if (isCursorAfterMonth(selectionIndex, formatStr)) {
    gap = getSelectIndexGap({
      pattern: pattern,
      formatStr: formatStr,
      valueOffset: valueOffset,
      selectedMonth: selectedMonth,
      localize: localize
    });
  }
  pattern = formatStr.charAt(selectionIndex - gap);

  // If the pattern is not a letter, then get the pattern from the previous or next letter.
  if (!pattern.match(/[y|d|M|H|h|m|s|a]/)) {
    var nextIndex = selectionIndex + positionOffset;
    pattern = getDatePattern(_extends({}, options, {
      selectionIndex: nextIndex
    }));
  }
  return pattern;
}

// Determine whether the cursor is after the month.
// If the currently operated field is after the month, the selected field needs to be moved backward.
export function isCursorAfterMonth(cursorIndex, formatStr) {
  return cursorIndex > formatStr.indexOf('M');
}
export function getInputSelectedState(options) {
  var input = options.input,
    direction = options.direction,
    formatStr = options.formatStr,
    localize = options.localize,
    selectedMonth = options.selectedMonth,
    dateString = options.dateString,
    _options$valueOffset = options.valueOffset,
    valueOffset = _options$valueOffset === void 0 ? 0 : _options$valueOffset;
  var getPatternSelectedIndexes = function getPatternSelectedIndexes(pattern) {
    var selectionStart = formatStr.indexOf(pattern);
    var selectionEnd = formatStr.lastIndexOf(pattern) + 1;
    var gap = getSelectIndexGap({
      pattern: pattern,
      formatStr: formatStr,
      valueOffset: valueOffset,
      selectedMonth: selectedMonth,
      localize: localize
    });
    var isSelectedMonth = pattern === 'M';
    var isNullMonth = selectedMonth === null && !(isSelectedMonth && valueOffset !== 0);

    // If the month is null and the valueOffset is 0, the month will not be updated, and the gap is 0 at this time.
    if (isNullMonth) {
      return {
        selectionStart: selectionStart,
        selectionEnd: selectionEnd
      };
    }
    if (isSelectedMonth) {
      return {
        selectionStart: selectionStart,
        selectionEnd: selectionEnd + gap
      };
    }
    if (isCursorAfterMonth(selectionStart, formatStr)) {
      return {
        selectionStart: selectionStart + gap,
        selectionEnd: selectionEnd + gap
      };
    }
    return {
      selectionStart: selectionStart,
      selectionEnd: selectionEnd
    };
  };
  if (typeof input.selectionEnd === 'number' && typeof input.selectionStart === 'number') {
    var selectionIndex = input.selectionStart;
    var positionOffset = -1;
    if (direction === 'left') {
      selectionIndex = input.selectionStart - 1;
    } else if (direction === 'right') {
      selectionIndex = input.selectionEnd + 1;
      positionOffset = 1;
    }
    var datePattern = getDatePattern({
      selectionIndex: selectionIndex,
      positionOffset: positionOffset,
      formatStr: formatStr,
      dateString: dateString,
      valueOffset: valueOffset,
      selectedMonth: selectedMonth,
      localize: localize
    });
    var indexes = getPatternSelectedIndexes(datePattern);
    return _extends({
      selectedPattern: datePattern
    }, indexes);
  }
  return {
    selectedPattern: 'y',
    selectionStart: 0,
    selectionEnd: 0
  };
}
export function validateDateTime(type, value) {
  switch (type) {
    case 'year':
      if (value < 1 || value > 9999) {
        return false;
      }
      break;
    case 'month':
      if (value < 1 || value > 12) {
        return false;
      }
      break;
    case 'day':
      if (value < 1 || value > 31) {
        return false;
      }
      break;
    case 'hour':
      if (value < 0 || value > 23) {
        return false;
      }
      break;
    case 'minute':
      if (value < 0 || value > 59) {
        return false;
      }
      break;
    case 'second':
      if (value < 0 || value > 59) {
        return false;
      }
      break;
    default:
      return false;
    // Invalid type
  }
  return true;
}
export function modifyDate(date, type, value) {
  switch (type) {
    case 'year':
      return setYear(date, value);
    case 'month':
      return setMonth(date, value - 1);
    case 'day':
      return setDate(date, value);
    case 'hour':
      return setHours(date, value);
    case 'minute':
      return setMinutes(date, value);
    case 'second':
      return setSeconds(date, value);
  }
  return date;
}
export function useInputSelection(input) {
  return function setSelectionRange(selectionStart, selectionEnd) {
    var isTest = input.current.dataset.test === 'true';
    if (isTest) {
      safeSetSelection(input.current, selectionStart, selectionEnd);
      return;
    }
    requestAnimationFrame(function () {
      safeSetSelection(input.current, selectionStart, selectionEnd);
    });
  };
}
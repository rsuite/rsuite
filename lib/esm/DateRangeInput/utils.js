'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import { getSelectIndexGap, isCursorAfterMonth, getDatePattern } from "../DateInput/index.js";
export var DateType = /*#__PURE__*/function (DateType) {
  DateType["Start"] = "Start";
  DateType["End"] = "End";
  return DateType;
}({});
export function getInputSelectedState(options) {
  var input = options.input,
    direction = options.direction,
    formatStr = options.formatStr,
    rangeFormatStr = options.rangeFormatStr,
    localize = options.localize,
    selectedMonth = options.selectedMonth,
    _options$valueOffset = options.valueOffset,
    valueOffset = _options$valueOffset === void 0 ? 0 : _options$valueOffset,
    character = options.character,
    dateType = options.dateType,
    dateString = options.dateString;
  var getPatternSelectedIndexes = function getPatternSelectedIndexes(pattern) {
    var selectionStart = 0;
    var selectionEnd = 0;
    if (dateType === DateType.Start) {
      selectionStart = rangeFormatStr.indexOf(pattern);
      selectionEnd = rangeFormatStr.split(character)[0].lastIndexOf(pattern) + 1;
    } else if (dateType === DateType.End) {
      var position = rangeFormatStr.indexOf(character) + character.length;
      selectionStart = rangeFormatStr.indexOf(pattern, position);
      selectionEnd = rangeFormatStr.lastIndexOf(pattern) + 1;
    }
    var endDateGap = dateString.indexOf(character) - rangeFormatStr.indexOf(character);

    // If the date type is end, and the end date is not selected, the selection range needs to be adjusted.
    if (dateType === DateType.End && endDateGap > 0) {
      selectionStart += endDateGap;
      selectionEnd += endDateGap;
    }
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
    var index = input.selectionStart;
    var positionOffset = -1;
    if (direction === 'left') {
      index = input.selectionStart - 1;
    } else if (direction === 'right') {
      index = input.selectionEnd + 1;
      positionOffset = 1;
    }

    // The start position of the index of the end date
    var endDateIndex = dateString.indexOf(character) + character.length;
    var datePattern = getDatePattern({
      selectionIndex: dateType === DateType.End ? index - endDateIndex : index,
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
export function getDateType(dateString, character, cursorIndex) {
  var splitIndex = dateString.indexOf(character);
  if (cursorIndex > splitIndex) {
    return DateType.End;
  }
  return DateType.Start;
}
export function isSwitchDateType(dateString, character, cursorIndex, direction) {
  var characterIndex = dateString.indexOf(character);
  var startIndex = cursorIndex;
  var endIndex = startIndex + character.length;
  if (direction === 'left') {
    endIndex = cursorIndex;
    startIndex = endIndex - character.length;
  }

  // Check whether the cursor is a separator before and after
  if (dateString.substring(startIndex, endIndex) === character) {
    return true;
  }

  // Check whether the cursor is a number or letter before and after. If not, switch the date type.
  // eg: `2020年12月01日`, the cursor is behind 01, press the right key, and switch to the end date.
  if (direction === 'right') {
    if (!dateString.substring(cursorIndex, characterIndex).match(/[0-9a-zA-Z]/)) {
      return true;
    }
  }
  if (!dateString.substring(characterIndex, cursorIndex).match(/[0-9a-zA-Z]/)) {
    return true;
  }
  return false;
}
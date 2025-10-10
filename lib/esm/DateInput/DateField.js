'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import _wrapNativeSuper from "@babel/runtime/helpers/esm/wrapNativeSuper";
import { useReducer } from 'react';
import isValid from 'date-fns/isValid';
import { modifyDate } from "./utils.js";
export var patternMap = {
  y: 'year',
  M: 'month',
  d: 'day',
  H: 'hour',
  h: 'hour',
  m: 'minute',
  s: 'second',
  a: 'meridiem'
};
export var DateField = /*#__PURE__*/function (_Object) {
  function DateField(format, value) {
    var _this;
    _this = _Object.call(this) || this;
    _this.format = void 0;
    _this.patternArray = [];
    _this.year = null;
    _this.month = null;
    _this.day = null;
    _this.hour = null;
    _this.minute = null;
    _this.second = null;
    _this.format = format;
    var formatArray = format.match(new RegExp('([y|d|M|H|h|m|s|a])+', 'ig')) || [];
    _this.patternArray = formatArray.map(function (pattern) {
      return {
        pattern: pattern,
        key: patternMap[pattern[0]]
      };
    });
    if (value && isValid(value)) {
      _this.year = value.getFullYear();
      _this.month = value.getMonth() + 1;
      _this.day = value.getDate();
      _this.hour = value.getHours();
      _this.minute = value.getMinutes();
      _this.second = value.getSeconds();
    }
    return _this;
  }
  _inheritsLoose(DateField, _Object);
  return DateField;
}(/*#__PURE__*/_wrapNativeSuper(Object));

/**
 * Pad a number with zeros to the left.
 */
function padNumber(number, length) {
  var numberString = String(number);
  if (numberString.length >= length) {
    return numberString;
  }
  var paddingCount = length - numberString.length;
  for (var i = 0; i < paddingCount; i++) {
    numberString = '0' + numberString;
  }
  return numberString;
}
export var useDateField = function useDateField(format, localize, date) {
  var _useReducer = useReducer(function (state, action) {
      switch (action.type) {
        case 'setYear':
          return _extends({}, state, {
            year: action.value
          });
        case 'setMonth':
          return _extends({}, state, {
            month: action.value
          });
        case 'setDay':
          return _extends({}, state, {
            day: action.value
          });
        case 'setHour':
          return _extends({}, state, {
            hour: action.value
          });
        case 'setMinute':
          return _extends({}, state, {
            minute: action.value
          });
        case 'setSecond':
          return _extends({}, state, {
            second: action.value
          });
        case 'setNewDate':
          return new DateField(format, action.value);
        default:
          return state;
      }
    }, new DateField(format, date)),
    dateField = _useReducer[0],
    dispatch = _useReducer[1];
  var toDateString = function toDateString() {
    var str = format;
    dateField.patternArray.forEach(function (item) {
      var key = item.key,
        pattern = item.pattern;
      var hour = dateField.hour;
      var value = dateField[key];
      if (value !== null) {
        if (pattern === 'MMM' && typeof value === 'number') {
          value = localize === null || localize === void 0 ? void 0 : localize.month(value - 1, {
            width: 'abbreviated'
          });
        } else if (pattern === 'MMMM' && typeof value === 'number') {
          value = localize === null || localize === void 0 ? void 0 : localize.month(value - 1, {
            width: 'wide'
          });
        } else if (pattern === 'aa') {
          if (typeof hour === 'number') {
            value = hour > 12 ? 'PM' : 'AM';
          } else {
            value = 'aa';
          }
        } else if (pattern === 'hh' && typeof value === 'number') {
          value = value === 0 ? 12 : value > 12 ? value - 12 : value;
        }
        if (typeof value === 'number') {
          value = padNumber(value, pattern.length);
        }
        if (typeof value !== 'undefined') {
          str = str.replace(pattern, value);
        }
      }
    });
    return str;
  };

  // Check if the field value is valid.
  var validFieldValue = function validFieldValue(type, value) {
    var _format$match;
    var isValid = true;
    (_format$match = format.match(new RegExp('([y|d|M|H|h|m|s])+', 'ig'))) === null || _format$match === void 0 || _format$match.forEach(function (pattern) {
      var key = patternMap[pattern[0]];
      var fieldValue = type === key ? value : dateField[key];
      if (fieldValue === null) {
        isValid = false;
        return;
      }
    });
    return isValid;
  };
  var isEmptyValue = function isEmptyValue(type, value) {
    var _format$match2;
    var checkValueArray = (_format$match2 = format.match(new RegExp('([y|d|M|H|h|m|s])+', 'ig'))) === null || _format$match2 === void 0 ? void 0 : _format$match2.map(function (pattern) {
      var key = patternMap[pattern[0]];
      var fieldValue = type === key ? value : dateField[key];
      return fieldValue !== null;
    });
    return checkValueArray === null || checkValueArray === void 0 ? void 0 : checkValueArray.every(function (item) {
      return item === false;
    });
  };
  var toDate = function toDate(type, value) {
    var year = dateField.year,
      month = dateField.month,
      day = dateField.day,
      hour = dateField.hour,
      minute = dateField.minute,
      second = dateField.second;
    var date = new Date(year || 0, typeof month === 'number' ? Math.max(month - 1, 0) : 0,
    // The default day is 1 when the value is null, otherwise it becomes the last day of the month.
    day || 1, hour || 0, minute || 0, second || 0);
    if (typeof type === 'undefined' || typeof value === 'undefined') {
      return date;
    }
    if (value === null || !validFieldValue(type, value)) {
      if (isEmptyValue(type, value)) {
        return null;
      }

      // Invalid Date
      return new Date('');
    } else if ((type === 'day' || type === 'month') && value === 0) {
      // Invalid Date. If the type is day and the value is 0, it is considered an invalid date.
      return new Date('');
    }
    if (type === 'meridiem' && typeof hour === 'number') {
      var newHour = hour > 12 ? hour - 12 : hour + 12;
      type = 'hour';
      value = newHour;
    }
    return modifyDate(date, type, value);
  };
  return {
    dateField: dateField,
    dispatch: dispatch,
    toDate: toDate,
    toDateString: toDateString,
    isEmptyValue: isEmptyValue
  };
};
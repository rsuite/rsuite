'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
exports.useDateInputState = useDateInputState;
var _startCase = _interopRequireDefault(require("lodash/startCase"));
var _react = require("react");
var _date = require("../../internals/utils/date");
var _CustomProvider = require("../../CustomProvider");
var _DateField = require("../DateField");
function useDateInputState(_ref) {
  var formatStr = _ref.formatStr,
    locale = _ref.locale,
    date = _ref.date,
    isControlledDate = _ref.isControlledDate;
  var _useCustom = (0, _CustomProvider.useCustom)(),
    formatDate = _useCustom.formatDate;
  var _useDateField = (0, _DateField.useDateField)(formatStr, locale.localize, date),
    dateField = _useDateField.dateField,
    dispatch = _useDateField.dispatch,
    toDateString = _useDateField.toDateString,
    toDate = _useDateField.toDate,
    isEmptyValue = _useDateField.isEmptyValue;
  var setDateOffset = function setDateOffset(pattern, offset, callback) {
    var currentDate = new Date();
    var year = dateField.year || currentDate.getFullYear();
    var month = dateField.month ? dateField.month - 1 : currentDate.getMonth();
    var day = dateField.day || 0;
    var hour = dateField.hour || 0;
    var minute = dateField.minute || 0;
    var second = dateField.second || 0;
    var actionName;
    var value;
    switch (pattern) {
      case 'y':
        actionName = 'setYear';
        value = (0, _date.addYears)(new Date(year, 0), offset).getFullYear();
        break;
      case 'M':
        actionName = 'setMonth';
        value = (0, _date.addMonths)(new Date(year, month), offset).getMonth() + 1;
        break;
      case 'd':
        actionName = 'setDay';
        var prevDate = new Date(year, month, day);
        value = (0, _date.addDays)(prevDate, offset).getDate();
        if (offset > 0) {
          value = (0, _date.isLastDayOfMonth)(prevDate) ? 1 : value;
        } else {
          value = prevDate.getDate() === 1 ? (0, _date.lastDayOfMonth)(prevDate).getDate() : value;
        }
        break;
      case 'H':
      case 'h':
        actionName = 'setHour';
        value = (0, _date.addHours)(new Date(year, month, day, hour), offset).getHours();
        break;
      case 'm':
        actionName = 'setMinute';
        value = (0, _date.addMinutes)(new Date(year, month, day, hour, minute), offset).getMinutes();
        break;
      case 's':
        actionName = 'setSecond';
        value = (0, _date.addSeconds)(new Date(year, month, day, hour, minute, second), offset).getSeconds();
        break;
      case 'a':
        actionName = 'setHour';
        value = hour >= 12 ? hour - 12 : hour + 12;
        break;
    }
    if (actionName && typeof value === 'number') {
      dispatch({
        type: actionName,
        value: value
      });
      var field = _DateField.patternMap[pattern];
      callback === null || callback === void 0 || callback(toDate(field, value));
    }
  };
  var setDateField = function setDateField(pattern, value, callback) {
    var field = _DateField.patternMap[pattern];
    var actionName = "set" + (0, _startCase.default)(field);
    dispatch({
      type: actionName,
      value: value
    });
    callback === null || callback === void 0 || callback(toDate(field, value));
  };
  var getDateField = function getDateField(pattern) {
    var fieldName = _DateField.patternMap[pattern];
    return {
      name: fieldName,
      value: dateField[fieldName]
    };
  };
  var toControlledDateString = function toControlledDateString() {
    if (date && (0, _date.isValid)(date)) {
      return formatDate(date, formatStr, {
        locale: locale
      });
    }
    // if date is not valid, return uncontrolled date string
    return toDateString();
  };
  var setNewDate = (0, _react.useCallback)(function (value) {
    dispatch({
      type: 'setNewDate',
      value: value
    });
  }, [dispatch]);
  (0, _react.useEffect)(function () {
    if (isControlledDate) {
      if (date && (0, _date.isValid)(date)) {
        setNewDate(date);
      } else if (date === null) {
        setNewDate(null);
      }
    }
  }, [date, dispatch, isControlledDate, setNewDate]);
  return {
    dateField: dateField,
    setDateOffset: setDateOffset,
    setDateField: setDateField,
    setNewDate: setNewDate,
    getDateField: getDateField,
    toDateString: isControlledDate ? toControlledDateString : toDateString,
    isEmptyValue: isEmptyValue
  };
}
var _default = exports.default = useDateInputState;
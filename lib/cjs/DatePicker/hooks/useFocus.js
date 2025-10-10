'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _delay = _interopRequireDefault(require("lodash/delay"));
var _addMonths = _interopRequireDefault(require("date-fns/addMonths"));
var _addDays = _interopRequireDefault(require("date-fns/addDays"));
var _hooks = require("../../internals/hooks");
var _CustomProvider = require("../../CustomProvider");
var _utils = require("../../Calendar/utils");
var _utils2 = require("../../internals/Picker/utils");
function useFocus(props) {
  var target = props.target,
    showMonth = props.showMonth,
    id = props.id,
    localeProp = props.locale;
  var _useCustom = (0, _CustomProvider.useCustom)(),
    getLocale = _useCustom.getLocale,
    formatDate = _useCustom.formatDate;
  var _getLocale = getLocale('DateTimeFormats', localeProp),
    formattedMonthPattern = _getLocale.formattedMonthPattern,
    formattedDayPattern = _getLocale.formattedDayPattern;

  /**
   * Get the corresponding container based on date selection and month selection
   */
  var getOverlayContainer = function getOverlayContainer() {
    return showMonth ? document.getElementById(id + "-calendar-month-dropdown") : document.getElementById(id + "-calendar-table");
  };

  /**
   * Check whether the date is focusable
   */
  var checkFocusable = function checkFocusable(date) {
    var formatStr = showMonth ? formattedMonthPattern : formattedDayPattern;
    var ariaLabel = (0, _utils.getAriaLabel)(date, formatStr, formatDate);
    var container = getOverlayContainer();
    var dateElement = container === null || container === void 0 ? void 0 : container.querySelector("[aria-label=\"" + ariaLabel + "\"]");
    if ((dateElement === null || dateElement === void 0 ? void 0 : dateElement.getAttribute('aria-disabled')) === 'true') {
      return false;
    }
    return true;
  };

  /**
   * Focus on the currently selected date element
   */
  var focusSelectedDate = function focusSelectedDate() {
    (0, _delay.default)(function () {
      var container = getOverlayContainer();
      var selectedElement = container === null || container === void 0 ? void 0 : container.querySelector('[aria-selected="true"]');
      selectedElement === null || selectedElement === void 0 || selectedElement.focus();
    }, 1);
  };

  /**
   * Focus on the input element
   */
  var focusInput = (0, _hooks.useEventCallback)(function () {
    (0, _delay.default)(function () {
      var _target$current;
      return (_target$current = target.current) === null || _target$current === void 0 ? void 0 : _target$current.focus();
    }, 1);
  });
  var onKeyFocusEvent = (0, _hooks.useEventCallback)(function (event, options) {
    var date = options.date,
      callback = options.callback;
    var delta = 0;
    var step = showMonth ? 6 : 7;
    var changeDateFunc = showMonth ? _addMonths.default : _addDays.default;
    (0, _utils2.onMenuKeyDown)(event, {
      down: function down() {
        delta = step;
      },
      up: function up() {
        delta = -step;
      },
      right: function right() {
        delta = 1;
      },
      left: function left() {
        delta = -1;
      }
    });
    var nextDate = changeDateFunc(date, delta);
    if (checkFocusable(nextDate)) {
      callback(nextDate);
      focusSelectedDate();
    }
  });
  return {
    focusInput: focusInput,
    focusSelectedDate: focusSelectedDate,
    onKeyFocusEvent: onKeyFocusEvent
  };
}
var _default = exports.default = useFocus;
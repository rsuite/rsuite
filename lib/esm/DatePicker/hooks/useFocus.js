'use client';
import delay from 'lodash/delay';
import addMonths from 'date-fns/addMonths';
import addDays from 'date-fns/addDays';
import { useEventCallback } from "../../internals/hooks/index.js";
import { useCustom } from "../../CustomProvider/index.js";
import { getAriaLabel } from "../../Calendar/utils/index.js";
import { onMenuKeyDown } from "../../internals/Picker/utils.js";
function useFocus(props) {
  var target = props.target,
    showMonth = props.showMonth,
    id = props.id,
    localeProp = props.locale;
  var _useCustom = useCustom(),
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
    var ariaLabel = getAriaLabel(date, formatStr, formatDate);
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
    delay(function () {
      var container = getOverlayContainer();
      var selectedElement = container === null || container === void 0 ? void 0 : container.querySelector('[aria-selected="true"]');
      selectedElement === null || selectedElement === void 0 || selectedElement.focus();
    }, 1);
  };

  /**
   * Focus on the input element
   */
  var focusInput = useEventCallback(function () {
    delay(function () {
      var _target$current;
      return (_target$current = target.current) === null || _target$current === void 0 ? void 0 : _target$current.focus();
    }, 1);
  });
  var onKeyFocusEvent = useEventCallback(function (event, options) {
    var date = options.date,
      callback = options.callback;
    var delta = 0;
    var step = showMonth ? 6 : 7;
    var changeDateFunc = showMonth ? addMonths : addDays;
    onMenuKeyDown(event, {
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
export default useFocus;
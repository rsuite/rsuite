'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _partial = _interopRequireDefault(require("lodash/partial"));
var _camelCase = _interopRequireDefault(require("lodash/camelCase"));
var _isNumber = _interopRequireDefault(require("lodash/isNumber"));
var _hooks = require("../../internals/hooks");
var _date = require("../../internals/utils/date");
var _hooks2 = require("../hooks");
var _TimeColumn = _interopRequireDefault(require("./TimeColumn"));
var _utils = require("./utils");
var _excluded = ["as", "className", "classPrefix", "show", "showMeridiem"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var TimeDropdown = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    className = props.className,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'calendar-time-dropdown' : _props$classPrefix,
    show = props.show,
    _props$showMeridiem = props.showMeridiem,
    showMeridiem = _props$showMeridiem === void 0 ? false : _props$showMeridiem,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var _useCalendar = (0, _hooks2.useCalendar)(),
    locale = _useCalendar.locale,
    format = _useCalendar.format,
    date = _useCalendar.date,
    onSelect = _useCalendar.onChangeTime,
    targetId = _useCalendar.targetId;
  var rowRef = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    var time = (0, _utils.getClockTime)({
      format: format,
      date: date,
      showMeridiem: showMeridiem
    });
    // The currently selected time scrolls to the visible range.
    if (show && rowRef.current) {
      (0, _utils.scrollToTime)(time, rowRef.current);
    }
  }, [date, format, show, showMeridiem]);
  var handleClick = (0, _hooks.useEventCallback)(function (type, d, event) {
    var nextDate = date || (0, _date.startOfToday)();
    switch (type) {
      case 'hours':
        nextDate = (0, _date.setHours)(nextDate, showMeridiem && (0, _date.getHours)(nextDate) >= 12 ? d + 12 : d);
        break;
      case 'minutes':
        nextDate = (0, _date.setMinutes)(nextDate, d);
        break;
      case 'seconds':
        nextDate = (0, _date.setSeconds)(nextDate, d);
        break;
    }
    onSelect === null || onSelect === void 0 || onSelect(nextDate, event);
  });
  var handleClickMeridiem = (0, _hooks.useEventCallback)(function (meridiem, event) {
    var tempDate = date || (0, _date.startOfToday)();
    var hours = (0, _date.getHours)(tempDate);
    var isAM = hours < 12;
    var adjustHours = function adjustHours(meridiem, hours) {
      if (meridiem === 'AM') {
        return isAM ? hours : hours - 12;
      }
      return isAM ? hours + 12 : hours;
    };
    var nextHours = adjustHours(meridiem, hours);
    var nextDate = (0, _date.setHours)(tempDate, nextHours);
    onSelect === null || onSelect === void 0 || onSelect(nextDate, event);
  });
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    prefix = _useClassNames.prefix,
    rootPrefix = _useClassNames.rootPrefix,
    merge = _useClassNames.merge;
  var renderColumn = function renderColumn(type, value) {
    if (!(0, _isNumber.default)(value)) {
      return null;
    }
    var _getTimeLimits$type = (0, _utils.getTimeLimits)(showMeridiem)[type],
      start = _getTimeLimits$type.start,
      end = _getTimeLimits$type.end;
    var items = [];
    var hideFunc = props[(0, _camelCase.default)("hide_" + type)];
    var disabledFunc = props[(0, _camelCase.default)("disabled_" + type)];
    for (var i = start; i <= end; i += 1) {
      if (!(hideFunc !== null && hideFunc !== void 0 && hideFunc(i, date))) {
        var disabled = disabledFunc === null || disabledFunc === void 0 ? void 0 : disabledFunc(i, date);
        var itemClasses = prefix('cell', {
          'cell-active': value === i,
          'cell-disabled': disabled
        });
        items.push(/*#__PURE__*/_react.default.createElement("li", {
          key: i,
          role: "option",
          tabIndex: -1,
          "aria-label": i + " " + type,
          "aria-selected": value === i,
          "aria-disabled": disabled,
          "data-key": type + "-" + i,
          onClick: !disabled ? (0, _partial.default)(handleClick, type, i) : undefined
        }, /*#__PURE__*/_react.default.createElement("span", {
          className: itemClasses
        }, showMeridiem && type === 'hours' && i === 0 ? 12 : (0, _utils.formatWithLeadingZero)(i))));
      }
    }
    return /*#__PURE__*/_react.default.createElement(_TimeColumn.default, {
      prefix: prefix,
      title: locale === null || locale === void 0 ? void 0 : locale[type],
      "data-type": type,
      "aria-label": "Select " + type
    }, items);
  };
  var renderMeridiemColumn = function renderMeridiemColumn() {
    var columns = ['AM', 'PM'];
    return /*#__PURE__*/_react.default.createElement(_TimeColumn.default, {
      prefix: prefix,
      title: 'AM/PM',
      "data-type": "meridiem",
      "aria-label": "Select meridiem"
    }, columns.map(function (meridiem, index) {
      var ampm = date && ((0, _date.getHours)(date) >= 12 ? 'PM' : 'AM');
      var itemClasses = prefix('cell', {
        'cell-active': ampm === meridiem
      });
      return /*#__PURE__*/_react.default.createElement("li", {
        key: index,
        role: "option",
        tabIndex: -1,
        "aria-label": meridiem,
        "aria-selected": ampm === meridiem,
        "data-key": "meridiem-" + meridiem,
        onClick: (0, _partial.default)(handleClickMeridiem, meridiem)
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: itemClasses
      }, meridiem));
    }));
  };
  var time = (0, _utils.getClockTime)({
    format: format,
    date: date,
    showMeridiem: showMeridiem
  });
  var classes = merge(className, rootPrefix(classPrefix), {
    show: show
  });
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
    role: "group",
    tabIndex: -1,
    id: targetId ? targetId + "-" + classPrefix : undefined
  }, (0, _date.omitHideDisabledProps)(rest), {
    ref: ref,
    className: classes
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: prefix('content')
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: prefix('row'),
    ref: rowRef
  }, renderColumn('hours', time.hours), renderColumn('minutes', time.minutes), renderColumn('seconds', time.seconds), showMeridiem && renderMeridiemColumn())));
});
TimeDropdown.displayName = 'TimeDropdown';
var _default = exports.default = TimeDropdown;
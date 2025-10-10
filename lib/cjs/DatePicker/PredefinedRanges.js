'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _Button = _interopRequireDefault(require("../Button"));
var _Stack = _interopRequireDefault(require("../Stack"));
var _hooks = require("../internals/hooks");
var _utils = require("./utils");
var _excluded = ["className", "disableShortcut", "onShortcutClick", "calendarDate", "ranges", "locale"],
  _excluded2 = ["value", "closeOverlay", "label"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var PredefinedRanges = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var className = props.className,
    disableShortcut = props.disableShortcut,
    onShortcutClick = props.onShortcutClick,
    calendarDate = props.calendarDate,
    rangesProp = props.ranges,
    locale = props.locale,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var _useState = (0, _react.useState)((0, _utils.getRanges)(props)),
    ranges = _useState[0],
    setRanges = _useState[1];
  (0, _hooks.useUpdateEffect)(function () {
    setRanges((0, _utils.getRanges)({
      ranges: rangesProp,
      calendarDate: calendarDate
    }));
  }, [calendarDate, rangesProp]);
  var hasLocaleKey = (0, _react.useCallback)(function (key) {
    return (0, _utils.getDefaultRanges)(calendarDate).some(function (item) {
      return item.label === key;
    });
  }, [calendarDate]);
  if (ranges.length === 0) {
    return null;
  }
  return /*#__PURE__*/_react.default.createElement(_Stack.default, (0, _extends2.default)({
    className: className,
    ref: ref,
    alignItems: "flex-start",
    spacing: 4
  }, rest), ranges.map(function (range, index) {
    var value = range.value,
      closeOverlay = range.closeOverlay,
      label = range.label,
      rest = (0, _objectWithoutPropertiesLoose2.default)(range, _excluded2);
    var disabled = disableShortcut === null || disableShortcut === void 0 ? void 0 : disableShortcut(value);
    var handleClickShortcut = function handleClickShortcut(event) {
      if (disabled) {
        return;
      }
      onShortcutClick === null || onShortcutClick === void 0 || onShortcutClick(range, closeOverlay !== false ? true : false, event);
    };
    return /*#__PURE__*/_react.default.createElement(_Button.default, (0, _extends2.default)({
      appearance: "link",
      size: "sm",
      key: index,
      disabled: disabled,
      onClick: handleClickShortcut
    }, rest), hasLocaleKey(label) && typeof label === 'string' ? locale === null || locale === void 0 ? void 0 : locale[label] : label);
  }));
});
var _default = exports.default = PredefinedRanges;
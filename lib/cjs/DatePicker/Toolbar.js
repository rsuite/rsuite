'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireDefault(require("react"));
var _Button = _interopRequireDefault(require("../Button"));
var _hooks = require("../internals/hooks");
var _PredefinedRanges = _interopRequireDefault(require("./PredefinedRanges"));
var _Stack = _interopRequireDefault(require("../Stack"));
var _excluded = ["className", "classPrefix", "calendarDate", "ranges", "locale", "hideOkBtn", "disableOkBtn", "disableShortcut", "onOk", "onShortcutClick"];
var OkButton = function OkButton(_ref) {
  var disableOkBtn = _ref.disableOkBtn,
    calendarDate = _ref.calendarDate,
    onOk = _ref.onOk,
    children = _ref.children;
  var disabled = disableOkBtn === null || disableOkBtn === void 0 ? void 0 : disableOkBtn(calendarDate);
  return /*#__PURE__*/_react.default.createElement(_Button.default, {
    appearance: "primary",
    size: "sm",
    disabled: disabled,
    onClick: disabled ? undefined : onOk
  }, children);
};

/**
 * Toolbar for DatePicker and DateRangePicker
 */
var Toolbar = /*#__PURE__*/_react.default.forwardRef(function Toolbar(props, ref) {
  var className = props.className,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'picker-toolbar' : _props$classPrefix,
    calendarDate = props.calendarDate,
    ranges = props.ranges,
    locale = props.locale,
    hideOkBtn = props.hideOkBtn,
    disableOkBtn = props.disableOkBtn,
    disableShortcut = props.disableShortcut,
    onOk = props.onOk,
    onShortcutClick = props.onShortcutClick,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix,
    withClassPrefix = _useClassNames.withClassPrefix;
  if (hideOkBtn && (ranges === null || ranges === void 0 ? void 0 : ranges.length) === 0) {
    return null;
  }
  var classes = merge(className, withClassPrefix());
  return /*#__PURE__*/_react.default.createElement(_Stack.default, (0, _extends2.default)({
    ref: ref,
    className: classes,
    justifyContent: "space-between",
    alignItems: "flex-start"
  }, rest), /*#__PURE__*/_react.default.createElement(_PredefinedRanges.default, {
    wrap: true,
    className: prefix('ranges'),
    ranges: ranges,
    calendarDate: calendarDate,
    locale: locale,
    disableShortcut: disableShortcut,
    onShortcutClick: onShortcutClick,
    "data-testid": "daterange-predefined-bottom"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: prefix('right')
  }, !hideOkBtn && /*#__PURE__*/_react.default.createElement(OkButton, {
    disableOkBtn: disableOkBtn,
    calendarDate: calendarDate,
    onOk: onOk
  }, locale === null || locale === void 0 ? void 0 : locale.ok)));
});
Toolbar.displayName = 'Toolbar';
var _default = exports.default = Toolbar;
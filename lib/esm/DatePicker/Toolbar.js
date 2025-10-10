'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["className", "classPrefix", "calendarDate", "ranges", "locale", "hideOkBtn", "disableOkBtn", "disableShortcut", "onOk", "onShortcutClick"];
import React from 'react';
import Button from "../Button/index.js";
import { useClassNames } from "../internals/hooks/index.js";
import PredefinedRanges from "./PredefinedRanges.js";
import Stack from "../Stack/index.js";
var OkButton = function OkButton(_ref) {
  var disableOkBtn = _ref.disableOkBtn,
    calendarDate = _ref.calendarDate,
    onOk = _ref.onOk,
    children = _ref.children;
  var disabled = disableOkBtn === null || disableOkBtn === void 0 ? void 0 : disableOkBtn(calendarDate);
  return /*#__PURE__*/React.createElement(Button, {
    appearance: "primary",
    size: "sm",
    disabled: disabled,
    onClick: disabled ? undefined : onOk
  }, children);
};

/**
 * Toolbar for DatePicker and DateRangePicker
 */
var Toolbar = /*#__PURE__*/React.forwardRef(function Toolbar(props, ref) {
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
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix,
    withClassPrefix = _useClassNames.withClassPrefix;
  if (hideOkBtn && (ranges === null || ranges === void 0 ? void 0 : ranges.length) === 0) {
    return null;
  }
  var classes = merge(className, withClassPrefix());
  return /*#__PURE__*/React.createElement(Stack, _extends({
    ref: ref,
    className: classes,
    justifyContent: "space-between",
    alignItems: "flex-start"
  }, rest), /*#__PURE__*/React.createElement(PredefinedRanges, {
    wrap: true,
    className: prefix('ranges'),
    ranges: ranges,
    calendarDate: calendarDate,
    locale: locale,
    disableShortcut: disableShortcut,
    onShortcutClick: onShortcutClick,
    "data-testid": "daterange-predefined-bottom"
  }), /*#__PURE__*/React.createElement("div", {
    className: prefix('right')
  }, !hideOkBtn && /*#__PURE__*/React.createElement(OkButton, {
    disableOkBtn: disableOkBtn,
    calendarDate: calendarDate,
    onOk: onOk
  }, locale === null || locale === void 0 ? void 0 : locale.ok)));
});
Toolbar.displayName = 'Toolbar';
export default Toolbar;
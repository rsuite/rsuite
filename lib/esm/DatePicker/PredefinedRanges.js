'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["className", "disableShortcut", "onShortcutClick", "calendarDate", "ranges", "locale"],
  _excluded2 = ["value", "closeOverlay", "label"];
import React, { useCallback, useState } from 'react';
import Button from "../Button/index.js";
import Stack from "../Stack/index.js";
import { useUpdateEffect } from "../internals/hooks/index.js";
import { getDefaultRanges, getRanges } from "./utils.js";
var PredefinedRanges = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var className = props.className,
    disableShortcut = props.disableShortcut,
    onShortcutClick = props.onShortcutClick,
    calendarDate = props.calendarDate,
    rangesProp = props.ranges,
    locale = props.locale,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var _useState = useState(getRanges(props)),
    ranges = _useState[0],
    setRanges = _useState[1];
  useUpdateEffect(function () {
    setRanges(getRanges({
      ranges: rangesProp,
      calendarDate: calendarDate
    }));
  }, [calendarDate, rangesProp]);
  var hasLocaleKey = useCallback(function (key) {
    return getDefaultRanges(calendarDate).some(function (item) {
      return item.label === key;
    });
  }, [calendarDate]);
  if (ranges.length === 0) {
    return null;
  }
  return /*#__PURE__*/React.createElement(Stack, _extends({
    className: className,
    ref: ref,
    alignItems: "flex-start",
    spacing: 4
  }, rest), ranges.map(function (range, index) {
    var value = range.value,
      closeOverlay = range.closeOverlay,
      label = range.label,
      rest = _objectWithoutPropertiesLoose(range, _excluded2);
    var disabled = disableShortcut === null || disableShortcut === void 0 ? void 0 : disableShortcut(value);
    var handleClickShortcut = function handleClickShortcut(event) {
      if (disabled) {
        return;
      }
      onShortcutClick === null || onShortcutClick === void 0 || onShortcutClick(range, closeOverlay !== false ? true : false, event);
    };
    return /*#__PURE__*/React.createElement(Button, _extends({
      appearance: "link",
      size: "sm",
      key: index,
      disabled: disabled,
      onClick: handleClickShortcut
    }, rest), hasLocaleKey(label) && typeof label === 'string' ? locale === null || locale === void 0 ? void 0 : locale[label] : label);
  }));
});
export default PredefinedRanges;
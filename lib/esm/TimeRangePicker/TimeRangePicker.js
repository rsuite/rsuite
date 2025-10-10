'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import React from 'react';
import DateRangePicker from "../DateRangePicker/index.js";
import { useCustom } from "../CustomProvider/index.js";
var defaultRanges = [];
var TimeRangePicker = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('TimeRangePicker', props),
    propsWithDefaults = _useCustom.propsWithDefaults,
    getLocale = _useCustom.getLocale;
  var _getLocale = getLocale('DateTimeFormats'),
    shortTimeFormat = _getLocale.shortTimeFormat;
  return /*#__PURE__*/React.createElement(DateRangePicker, _extends({
    ref: ref,
    showHeader: false,
    format: shortTimeFormat,
    ranges: defaultRanges
  }, propsWithDefaults));
});
TimeRangePicker.displayName = 'TimeRangePicker';
export default TimeRangePicker;
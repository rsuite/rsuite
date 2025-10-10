'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import React, { useMemo } from 'react';
import DatePicker from "../DatePicker/index.js";
import { useCustom } from "../CustomProvider/index.js";
var TimePicker = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('TimePicker', props),
    propsWithDefaults = _useCustom.propsWithDefaults,
    getLocale = _useCustom.getLocale;
  var locale = getLocale('DateTimeFormats');
  var defaultRanges = useMemo(function () {
    return [{
      label: locale === null || locale === void 0 ? void 0 : locale.now,
      value: function value() {
        return new Date();
      }
    }];
  }, [locale]);
  return /*#__PURE__*/React.createElement(DatePicker, _extends({
    ref: ref,
    format: locale === null || locale === void 0 ? void 0 : locale.shortTimeFormat,
    ranges: defaultRanges
  }, propsWithDefaults));
});
TimePicker.displayName = 'TimePicker';
export default TimePicker;
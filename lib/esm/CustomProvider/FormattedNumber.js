'use client';
import React, { useMemo } from 'react';
import { useCustom } from "./index.js";
export function FormattedNumber(_ref) {
  var value = _ref.value,
    formatOptions = _ref.formatOptions;
  var _useCustom = useCustom(),
    code = _useCustom.code;
  var formatter = useMemo(function () {
    return new Intl.NumberFormat(code, formatOptions);
  }, [code, formatOptions]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, formatter.format(value));
}
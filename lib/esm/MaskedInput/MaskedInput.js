'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import React from 'react';
import TextMask from "./TextMask.js";
import Input from "../Input/index.js";
import { useCustom } from "../CustomProvider/index.js";
var MaskedInput = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('MaskedInput', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    inputAs = _propsWithDefaults$as === void 0 ? TextMask : _propsWithDefaults$as;
  return /*#__PURE__*/React.createElement(Input, _extends({}, propsWithDefaults, {
    as: inputAs,
    ref: ref
  }));
});
export default MaskedInput;
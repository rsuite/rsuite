'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import React from 'react';
import Button from "../../Button/index.js";
var ToggleButton = /*#__PURE__*/React.forwardRef(function (props, ref) {
  return /*#__PURE__*/React.createElement(Button, _extends({}, props, {
    ref: ref,
    as: "div",
    ripple: false
  }));
});
ToggleButton.displayName = 'ToggleButton';
export default ToggleButton;
'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["expanded", "focusItemValue"];
import React from 'react';
import { useCombobox } from "../internals/Picker/index.js";
import Input from "../Input/index.js";
var Combobox = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCombobox = useCombobox(),
    id = _useCombobox.id,
    popupType = _useCombobox.popupType;
  var expanded = props.expanded,
    focusItemValue = props.focusItemValue,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  return /*#__PURE__*/React.createElement(Input, _extends({
    role: "combobox",
    "aria-autocomplete": "list",
    "aria-haspopup": popupType,
    "aria-expanded": expanded,
    "aria-activedescendant": focusItemValue ? id + "-opt-" + focusItemValue : undefined,
    autoComplete: "off",
    id: id,
    ref: ref
  }, rest));
});
export default Combobox;
'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["onSave", "onCancel"];
import React from 'react';
import CheckIcon from '@rsuite/icons/Check';
import CloseIcon from '@rsuite/icons/Close';
import IconButton from "../IconButton/index.js";
import Stack from "../Stack/index.js";
var EditableControls = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var onSave = props.onSave,
    onCancel = props.onCancel,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  return /*#__PURE__*/React.createElement(Stack, _extends({
    ref: ref,
    spacing: 6
  }, rest), /*#__PURE__*/React.createElement(IconButton, {
    size: "sm",
    icon: /*#__PURE__*/React.createElement(CheckIcon, null),
    "aria-label": "Save",
    onClick: onSave
  }), /*#__PURE__*/React.createElement(IconButton, {
    size: "sm",
    icon: /*#__PURE__*/React.createElement(CloseIcon, null),
    "aria-label": "Cancel",
    onClick: onCancel
  }));
});
export default EditableControls;
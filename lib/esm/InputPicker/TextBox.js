'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _taggedTemplateLiteralLoose from "@babel/runtime/helpers/esm/taggedTemplateLiteralLoose";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _templateObject;
var _excluded = ["tags", "inputProps", "readOnly", "disabled", "multiple", "onBlur", "onFocus", "onChange", "inputValue", "inputRef", "editable", "showTagList"];
import React from 'react';
import TagList from "./TagList.js";
import { useClassNames } from "../internals/hooks/index.js";
import InputSearch from "./InputSearch.js";
var TextBox = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var tags = props.tags,
    inputProps = props.inputProps,
    readOnly = props.readOnly,
    disabled = props.disabled,
    multiple = props.multiple,
    onBlur = props.onBlur,
    onFocus = props.onFocus,
    onChange = props.onChange,
    inputValue = props.inputValue,
    inputRef = props.inputRef,
    editable = props.editable,
    showTagList = props.showTagList,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var _useClassNames = useClassNames('picker'),
    prefix = _useClassNames.prefix;
  if (!multiple && disabled) {
    return null;
  }
  return /*#__PURE__*/React.createElement("div", _extends({
    className: prefix(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["textbox"]))),
    ref: ref
  }, rest), showTagList ? /*#__PURE__*/React.createElement(TagList, null, tags) : null, editable && /*#__PURE__*/React.createElement(InputSearch, _extends({}, inputProps, {
    tabIndex: -1,
    readOnly: readOnly,
    onBlur: onBlur,
    onFocus: onFocus,
    inputRef: inputRef,
    onChange: onChange,
    value: inputValue
  })));
});
export default TextBox;
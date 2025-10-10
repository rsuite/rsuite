'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _taggedTemplateLiteralLoose from "@babel/runtime/helpers/esm/taggedTemplateLiteralLoose";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _templateObject, _templateObject2;
var _excluded = ["as", "classPrefix", "value", "className", "placeholder", "inputRef", "onChange"];
import React from 'react';
import SearchIcon from '@rsuite/icons/Search';
import { useClassNames } from "../hooks/index.js";
import Input from "../../Input/index.js";
import InputGroup from "../../InputGroup/index.js";
var SearchBox = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'search-box' : _props$classPrefix,
    value = props.value,
    className = props.className,
    placeholder = props.placeholder,
    inputRef = props.inputRef,
    onChange = props.onChange,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix;
  var classes = merge(className, withClassPrefix());
  return /*#__PURE__*/React.createElement(Component, _extends({}, rest, {
    ref: ref,
    className: classes
  }), /*#__PURE__*/React.createElement(InputGroup, {
    inside: true
  }, /*#__PURE__*/React.createElement(Input, {
    role: "searchbox",
    className: prefix(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["input"]))),
    value: value,
    onChange: onChange,
    placeholder: placeholder,
    ref: inputRef
  }), /*#__PURE__*/React.createElement(InputGroup.Addon, null, /*#__PURE__*/React.createElement(SearchIcon, {
    className: prefix(_templateObject2 || (_templateObject2 = _taggedTemplateLiteralLoose(["icon"])))
  }))));
});
SearchBox.displayName = 'SearchBox';
export default SearchBox;
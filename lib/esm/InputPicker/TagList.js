'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _taggedTemplateLiteralLoose from "@babel/runtime/helpers/esm/taggedTemplateLiteralLoose";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _templateObject;
var _excluded = ["children"];
import React from 'react';
import { useClassNames } from "../internals/hooks/index.js";
import useCombobox from "../internals/Picker/hooks/useCombobox.js";
var TagList = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var children = props.children,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var _useClassNames = useClassNames('picker'),
    prefix = _useClassNames.prefix;
  var _useCombobox = useCombobox(),
    id = _useCombobox.id;
  return /*#__PURE__*/React.createElement("div", _extends({
    ref: ref,
    role: "listbox",
    id: id + "-describe",
    className: prefix(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["tag-list"])))
  }, rest), children);
});
export default TagList;
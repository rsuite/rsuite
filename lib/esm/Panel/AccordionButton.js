'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _taggedTemplateLiteralLoose from "@babel/runtime/helpers/esm/taggedTemplateLiteralLoose";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _templateObject;
var _excluded = ["classPrefix", "expanded", "id", "className", "controlId", "children", "disabled", "caretAs"];
import React from 'react';
import Icon from '@rsuite/icons/Icon';
import ArrowDownLineIcon from '@rsuite/icons/ArrowDownLine';
import { useClassNames } from "../internals/hooks/index.js";
var AccordionButton = function AccordionButton(props) {
  var _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'panel-btn' : _props$classPrefix,
    expanded = props.expanded,
    id = props.id,
    className = props.className,
    controlId = props.controlId,
    children = props.children,
    disabled = props.disabled,
    _props$caretAs = props.caretAs,
    caretAs = _props$caretAs === void 0 ? ArrowDownLineIcon : _props$caretAs,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    prefix = _useClassNames.prefix,
    withClassPrefix = _useClassNames.withClassPrefix;
  return /*#__PURE__*/React.createElement("button", _extends({
    id: id,
    type: "button",
    "aria-controls": controlId,
    "aria-expanded": expanded,
    "aria-disabled": disabled,
    className: withClassPrefix(className),
    disabled: disabled
  }, rest), children, /*#__PURE__*/React.createElement(Icon, {
    as: caretAs,
    "aria-hidden": "true",
    className: prefix(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["icon"]))),
    rotate: expanded ? 180 : 0,
    "data-testid": "caret icon"
  }));
};
export default AccordionButton;
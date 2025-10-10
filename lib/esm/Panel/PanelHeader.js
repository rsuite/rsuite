'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "classPrefix", "className", "children", "collapsible", "caretAs", "disabled", "expanded", "role", "bodyId", "buttonId", "onClickButton"];
import React, { isValidElement, cloneElement } from 'react';
import get from 'lodash/get';
import Heading from "../Heading/index.js";
import AccordionButton from "./AccordionButton.js";
import { useClassNames } from "../internals/hooks/index.js";
var PanelHeader = function PanelHeader(props) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? Heading : _props$as,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'panel' : _props$classPrefix,
    className = props.className,
    children = props.children,
    collapsible = props.collapsible,
    caretAs = props.caretAs,
    disabled = props.disabled,
    expanded = props.expanded,
    role = props.role,
    bodyId = props.bodyId,
    buttonId = props.buttonId,
    onClickButton = props.onClickButton,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix;
  var headerElement;
  if (! /*#__PURE__*/isValidElement(children) || Array.isArray(children)) {
    headerElement = /*#__PURE__*/React.createElement("span", {
      className: prefix('title')
    }, children);
  } else {
    var _className = merge(prefix('title'), get(children, 'props.className'));
    headerElement = /*#__PURE__*/cloneElement(children, {
      className: _className
    });
  }
  return /*#__PURE__*/React.createElement(Component, _extends({
    level: 2,
    className: merge(className, prefix('header'))
  }, rest), collapsible ? /*#__PURE__*/React.createElement(AccordionButton, {
    id: buttonId,
    role: role,
    caretAs: caretAs,
    controlId: bodyId,
    disabled: disabled,
    expanded: expanded,
    onClick: onClickButton
  }, headerElement) : headerElement);
};
export default PanelHeader;
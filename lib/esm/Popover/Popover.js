'use client';
import _taggedTemplateLiteralLoose from "@babel/runtime/helpers/esm/taggedTemplateLiteralLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _templateObject, _templateObject2, _templateObject3;
var _excluded = ["as", "classPrefix", "title", "children", "style", "visible", "className", "full", "arrow"];
import React from 'react';
import PropTypes from 'prop-types';
import Heading from "../Heading/index.js";
import { useClassNames } from "../internals/hooks/index.js";
import { useCustom } from "../CustomProvider/index.js";
/**
 * The `Popover` component is used to display a popup window for a target component.
 * @see https://rsuitejs.com/components/popover
 */
var Popover = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('Popover', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'popover' : _propsWithDefaults$cl,
    title = propsWithDefaults.title,
    children = propsWithDefaults.children,
    style = propsWithDefaults.style,
    visible = propsWithDefaults.visible,
    className = propsWithDefaults.className,
    full = propsWithDefaults.full,
    _propsWithDefaults$ar = propsWithDefaults.arrow,
    arrow = _propsWithDefaults$ar === void 0 ? true : _propsWithDefaults$ar,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix;
  var classes = merge(className, withClassPrefix({
    full: full
  }));
  var styles = _extends({
    display: 'block',
    opacity: visible ? 1 : undefined
  }, style);
  return /*#__PURE__*/React.createElement(Component, _extends({
    role: "dialog"
  }, rest, {
    ref: ref,
    className: classes,
    style: styles
  }), arrow && /*#__PURE__*/React.createElement("div", {
    className: prefix(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["arrow"]))),
    "aria-hidden": true
  }), title && /*#__PURE__*/React.createElement(Heading, {
    level: 3,
    className: prefix(_templateObject2 || (_templateObject2 = _taggedTemplateLiteralLoose(["title"])))
  }, title), /*#__PURE__*/React.createElement("div", {
    className: prefix(_templateObject3 || (_templateObject3 = _taggedTemplateLiteralLoose(["content"])))
  }, children));
});
Popover.displayName = 'Popover';
Popover.propTypes = {
  as: PropTypes.elementType,
  classPrefix: PropTypes.string,
  children: PropTypes.node,
  title: PropTypes.node,
  style: PropTypes.object,
  visible: PropTypes.bool,
  className: PropTypes.string,
  full: PropTypes.bool,
  arrow: PropTypes.bool
};
export default Popover;
'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["wrapperAs", "href", "as", "classPrefix", "title", "target", "className", "style", "active", "children", "separator"];
import React from 'react';
import PropTypes from 'prop-types';
import SafeAnchor from "../SafeAnchor/index.js";
import { useClassNames } from "../internals/hooks/index.js";
/**
 * The `<Breadcrumb.Item>` component is used to specify each section of the Breadcrumb.
 * @see https://rsuitejs.com/components/breadcrumb
 */
var BreadcrumbItem = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$wrapperAs = props.wrapperAs,
    WrapperComponent = _props$wrapperAs === void 0 ? 'li' : _props$wrapperAs,
    href = props.href,
    _props$as = props.as,
    Component = _props$as === void 0 ? href ? SafeAnchor : 'span' : _props$as,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'breadcrumb-item' : _props$classPrefix,
    title = props.title,
    target = props.target,
    className = props.className,
    style = props.style,
    active = props.active,
    children = props.children,
    separator = props.separator,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var classes = merge(className, withClassPrefix({
    active: active
  }));
  return /*#__PURE__*/React.createElement(WrapperComponent, _extends({
    style: style,
    className: classes,
    ref: ref
  }, rest), active ? /*#__PURE__*/React.createElement("span", null, children) : /*#__PURE__*/React.createElement(Component, {
    href: href,
    title: title,
    target: target
  }, children), separator);
});
BreadcrumbItem.displayName = 'BreadcrumbItem';
BreadcrumbItem.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  href: PropTypes.string,
  title: PropTypes.string,
  target: PropTypes.string,
  classPrefix: PropTypes.string,
  as: PropTypes.elementType
};
export default BreadcrumbItem;
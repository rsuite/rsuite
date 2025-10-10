'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "classPrefix", "children", "active", "className"];
import React from 'react';
import { useClassNames } from "../internals/hooks/index.js";
var TabPanel = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'tab-panel' : _props$classPrefix,
    children = props.children,
    active = props.active,
    className = props.className,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge;
  return /*#__PURE__*/React.createElement(Component, _extends({
    role: "tabpanel",
    ref: ref,
    tabIndex: 0,
    hidden: !active,
    className: merge(className, withClassPrefix())
  }, rest), children);
});
TabPanel.displayName = 'TabPanel';
export default TabPanel;
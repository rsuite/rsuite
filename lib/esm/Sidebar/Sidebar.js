'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "classPrefix", "className", "collapsible", "width", "style"];
import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from "../internals/hooks/index.js";
import { useCustom } from "../CustomProvider/index.js";
import { ContainerContext } from "../Container/Container.js";
/**
 * The `Sidebar` component for use with the `Container` component.
 * @see https://rsuitejs.com/components/container/
 */
var Sidebar = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('Sidebar', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'aside' : _propsWithDefaults$as,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'sidebar' : _propsWithDefaults$cl,
    className = propsWithDefaults.className,
    collapsible = propsWithDefaults.collapsible,
    _propsWithDefaults$wi = propsWithDefaults.width,
    width = _propsWithDefaults$wi === void 0 ? 260 : _propsWithDefaults$wi,
    style = propsWithDefaults.style,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge;
  var classes = merge(className, withClassPrefix({
    collapse: collapsible
  }));
  var _useContext = useContext(ContainerContext),
    setHasSidebar = _useContext.setHasSidebar;
  useEffect(function () {
    /** Notify the Container that the Sidebar is in the child node of the Container. */
    setHasSidebar === null || setHasSidebar === void 0 || setHasSidebar(true);
  }, [setHasSidebar]);
  var styles = _extends({
    flex: "0 0 " + width + "px",
    width: width
  }, style);
  return /*#__PURE__*/React.createElement(Component, _extends({}, rest, {
    ref: ref,
    className: classes,
    style: styles
  }));
});
Sidebar.displayName = 'Sidebar';
Sidebar.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  collapsible: PropTypes.bool,
  style: PropTypes.object
};
export default Sidebar;
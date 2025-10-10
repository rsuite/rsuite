'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "classPrefix", "className", "children"];
import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from "../internals/hooks/index.js";
import { useCustom } from "../CustomProvider/index.js";
export var ContainerContext = /*#__PURE__*/React.createContext({});
/**
 * The Container component is used to wrap content in a themed container with a max-width.
 * @see https://rsuitejs.com/components/container
 */
var Container = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('Container', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'section' : _propsWithDefaults$as,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'container' : _propsWithDefaults$cl,
    className = propsWithDefaults.className,
    children = propsWithDefaults.children,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var _useState = useState(false),
    hasSidebar = _useState[0],
    setHasSidebar = _useState[1];
  var _useClassNames = useClassNames(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge;
  var classes = merge(className, withClassPrefix({
    'has-sidebar': hasSidebar
  }));
  var contextValue = useMemo(function () {
    return {
      setHasSidebar: setHasSidebar
    };
  }, [setHasSidebar]);
  return /*#__PURE__*/React.createElement(ContainerContext.Provider, {
    value: contextValue
  }, /*#__PURE__*/React.createElement(Component, _extends({}, rest, {
    ref: ref,
    className: classes
  }), children));
});
Container.displayName = 'Container';
Container.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  classPrefix: PropTypes.string
};
export default Container;
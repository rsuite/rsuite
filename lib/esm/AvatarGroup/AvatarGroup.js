'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "classPrefix", "spacing", "className", "children", "stack", "size", "style"];
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from "../internals/hooks/index.js";
import { isIE } from "../internals/utils/index.js";
import { oneOf } from "../internals/propTypes/index.js";
import { useCustom } from "../CustomProvider/index.js";
export var AvatarGroupContext = /*#__PURE__*/React.createContext({});

/**
 * The AvatarGroup component is used to represent a collection of avatars.
 * @see https://rsuitejs.com/components/avatar
 */
var AvatarGroup = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('AvatarGroup', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'avatar-group' : _propsWithDefaults$cl,
    spacing = propsWithDefaults.spacing,
    className = propsWithDefaults.className,
    children = propsWithDefaults.children,
    stack = propsWithDefaults.stack,
    size = propsWithDefaults.size,
    style = propsWithDefaults.style,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge;
  var classes = merge(className, withClassPrefix({
    stack: stack
  }));
  var contextValue = useMemo(function () {
    return {
      size: size
    };
  }, [size]);
  var styles = isIE() ? style : _extends({}, style, {
    gap: spacing
  });
  return /*#__PURE__*/React.createElement(Component, _extends({
    role: "group"
  }, rest, {
    ref: ref,
    className: classes,
    style: styles
  }), /*#__PURE__*/React.createElement(AvatarGroupContext.Provider, {
    value: contextValue
  }, children));
});
AvatarGroup.displayName = 'AvatarGroup';
AvatarGroup.propTypes = {
  as: PropTypes.elementType,
  classPrefix: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  stack: PropTypes.bool,
  spacing: PropTypes.number,
  size: oneOf(['lg', 'md', 'sm', 'xs'])
};
export default AvatarGroup;
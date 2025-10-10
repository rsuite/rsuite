'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "classPrefix", "className", "inverse", "backdrop", "speed", "center", "vertical", "content", "size"];
import React from 'react';
import PropTypes from 'prop-types';
import { useClassNames, useUniqueId } from "../internals/hooks/index.js";
import { oneOf } from "../internals/propTypes/index.js";
import { useCustom } from "../CustomProvider/index.js";
/**
 * The `Loader` component is used to indicate the loading state of a page or a section.
 * @see https://rsuitejs.com/components/loader
 */
var Loader = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('Loader', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'loader' : _propsWithDefaults$cl,
    className = propsWithDefaults.className,
    inverse = propsWithDefaults.inverse,
    backdrop = propsWithDefaults.backdrop,
    _propsWithDefaults$sp = propsWithDefaults.speed,
    speed = _propsWithDefaults$sp === void 0 ? 'normal' : _propsWithDefaults$sp,
    center = propsWithDefaults.center,
    vertical = propsWithDefaults.vertical,
    content = propsWithDefaults.content,
    size = propsWithDefaults.size,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix,
    prefix = _useClassNames.prefix;
  var labelId = useUniqueId('loader-label-');
  var classes = merge(className, prefix('wrapper', "speed-" + speed, size, {
    'backdrop-wrapper': backdrop,
    vertical: vertical,
    inverse: inverse,
    center: center
  }));
  return /*#__PURE__*/React.createElement(Component, _extends({
    role: "status",
    "aria-labelledby": content ? labelId : undefined
  }, rest, {
    ref: ref,
    className: classes
  }), backdrop && /*#__PURE__*/React.createElement("div", {
    className: prefix('backdrop')
  }), /*#__PURE__*/React.createElement("div", {
    className: withClassPrefix()
  }, /*#__PURE__*/React.createElement("span", {
    className: prefix('spin')
  }), content && /*#__PURE__*/React.createElement("span", {
    id: labelId,
    className: prefix('content')
  }, content)));
});
Loader.displayName = 'Loader';
Loader.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  center: PropTypes.bool,
  backdrop: PropTypes.bool,
  inverse: PropTypes.bool,
  vertical: PropTypes.bool,
  content: PropTypes.node,
  size: oneOf(['lg', 'md', 'sm', 'xs']),
  speed: oneOf(['normal', 'fast', 'slow', 'paused'])
};
export default Loader;
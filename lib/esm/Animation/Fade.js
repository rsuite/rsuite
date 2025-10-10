'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["timeout", "className"];
import React from 'react';
import Transition from "./Transition.js";
import { useClassNames } from "../internals/hooks/index.js";
import { useCustom } from "../CustomProvider/index.js";
/**
 * Fade animation component
 * @see https://rsuitejs.com/components/animation/#fade
 */
var Fade = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var _ref$timeout = _ref.timeout,
    timeout = _ref$timeout === void 0 ? 300 : _ref$timeout,
    className = _ref.className,
    props = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useClassNames = useClassNames('anim'),
    prefix = _useClassNames.prefix,
    merge = _useClassNames.merge;
  var _useCustom = useCustom('Fade', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  return /*#__PURE__*/React.createElement(Transition, _extends({}, propsWithDefaults, {
    ref: ref,
    timeout: timeout,
    className: merge(className, prefix('fade')),
    enteredClassName: prefix('in'),
    enteringClassName: prefix('in')
  }));
});
Fade.displayName = 'Fade';
export default Fade;
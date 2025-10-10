'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["timeout"];
import React from 'react';
import Transition from "./Transition.js";
import { useClassNames } from "../internals/hooks/index.js";
import { useCustom } from "../CustomProvider/index.js";
/**
 * Bounce animation component
 * @see https://rsuitejs.com/components/animation/#bounce
 */
var Bounce = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var _ref$timeout = _ref.timeout,
    timeout = _ref$timeout === void 0 ? 300 : _ref$timeout,
    props = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useClassNames = useClassNames('anim'),
    prefix = _useClassNames.prefix;
  var _useCustom = useCustom('Bounce', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  return /*#__PURE__*/React.createElement(Transition, _extends({}, propsWithDefaults, {
    ref: ref,
    animation: true,
    timeout: timeout,
    enteringClassName: prefix('bounce-in'),
    enteredClassName: prefix('bounce-in'),
    exitingClassName: prefix('bounce-out'),
    exitedClassName: prefix('bounce-out')
  }));
});
Bounce.displayName = 'Bounce';
export default Bounce;
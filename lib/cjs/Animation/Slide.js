'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireDefault(require("react"));
var _Transition = _interopRequireDefault(require("./Transition"));
var _hooks = require("../internals/hooks");
var _CustomProvider = require("../CustomProvider");
var _excluded = ["timeout", "placement"];
/**
 * Slide animation component
 * @see https://rsuitejs.com/components/animation/#slide
 */
var Slide = /*#__PURE__*/_react.default.forwardRef(function (_ref, ref) {
  var _ref$timeout = _ref.timeout,
    timeout = _ref$timeout === void 0 ? 300 : _ref$timeout,
    _ref$placement = _ref.placement,
    placement = _ref$placement === void 0 ? 'right' : _ref$placement,
    props = (0, _objectWithoutPropertiesLoose2.default)(_ref, _excluded);
  var _useCustom = (0, _CustomProvider.useCustom)('Slide', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _useClassNames = (0, _hooks.useClassNames)('anim'),
    prefix = _useClassNames.prefix;
  var enterClassName = prefix('slide-in', placement);
  var exitClassName = prefix('slide-out', placement);
  return /*#__PURE__*/_react.default.createElement(_Transition.default, (0, _extends2.default)({}, propsWithDefaults, {
    ref: ref,
    animation: true,
    timeout: timeout,
    enteringClassName: enterClassName,
    enteredClassName: enterClassName,
    exitingClassName: exitClassName,
    exitedClassName: exitClassName
  }));
});
Slide.displayName = 'Slide';
var _default = exports.default = Slide;
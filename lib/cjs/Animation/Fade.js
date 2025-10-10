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
var _excluded = ["timeout", "className"];
/**
 * Fade animation component
 * @see https://rsuitejs.com/components/animation/#fade
 */
var Fade = /*#__PURE__*/_react.default.forwardRef(function (_ref, ref) {
  var _ref$timeout = _ref.timeout,
    timeout = _ref$timeout === void 0 ? 300 : _ref$timeout,
    className = _ref.className,
    props = (0, _objectWithoutPropertiesLoose2.default)(_ref, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)('anim'),
    prefix = _useClassNames.prefix,
    merge = _useClassNames.merge;
  var _useCustom = (0, _CustomProvider.useCustom)('Fade', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  return /*#__PURE__*/_react.default.createElement(_Transition.default, (0, _extends2.default)({}, propsWithDefaults, {
    ref: ref,
    timeout: timeout,
    className: merge(className, prefix('fade')),
    enteredClassName: prefix('in'),
    enteringClassName: prefix('in')
  }));
});
Fade.displayName = 'Fade';
var _default = exports.default = Fade;
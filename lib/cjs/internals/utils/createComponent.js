'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.createComponent = createComponent;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireDefault(require("react"));
var _kebabCase = _interopRequireDefault(require("lodash/kebabCase"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _hooks = require("../hooks");
var _CustomProvider = require("../../CustomProvider");
var _excluded = ["name", "componentAs", "componentClassPrefix"],
  _excluded2 = ["as", "classPrefix", "className", "role"];
/**
 * Create a component with `classPrefix` and `as` attributes.
 */
function createComponent(_ref) {
  var name = _ref.name,
    componentAs = _ref.componentAs,
    componentClassPrefix = _ref.componentClassPrefix,
    defaultProps = (0, _objectWithoutPropertiesLoose2.default)(_ref, _excluded);
  var Component = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
    var _useCustom = (0, _CustomProvider.useCustom)(name, props),
      propsWithDefaults = _useCustom.propsWithDefaults;
    var _propsWithDefaults$as = propsWithDefaults.as,
      Component = _propsWithDefaults$as === void 0 ? componentAs || 'div' : _propsWithDefaults$as,
      _propsWithDefaults$cl = propsWithDefaults.classPrefix,
      classPrefix = _propsWithDefaults$cl === void 0 ? componentClassPrefix || (0, _kebabCase.default)(name) : _propsWithDefaults$cl,
      className = propsWithDefaults.className,
      role = propsWithDefaults.role,
      rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded2);
    var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
      withClassPrefix = _useClassNames.withClassPrefix,
      merge = _useClassNames.merge;
    var classes = merge(className, withClassPrefix());
    return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({}, defaultProps, rest, {
      role: role,
      ref: ref,
      className: classes
    }));
  });
  Component.displayName = name;
  Component.propTypes = {
    as: _propTypes.default.elementType,
    className: _propTypes.default.string,
    classPrefix: _propTypes.default.string,
    children: _propTypes.default.node
  };
  return Component;
}
var _default = exports.default = createComponent;
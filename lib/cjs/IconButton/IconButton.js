'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Button = _interopRequireDefault(require("../Button"));
var _propTypes2 = require("../internals/propTypes");
var _hooks = require("../internals/hooks");
var _CustomProvider = require("../CustomProvider");
var _excluded = ["icon", "placement", "children", "circle", "classPrefix", "className"];
/**
 * The `IconButton` component is used to specify a button with icon.
 * @see https://rsuitejs.com/components/button
 */
var IconButton = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useCustom = (0, _CustomProvider.useCustom)('IconButton', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var icon = propsWithDefaults.icon,
    _propsWithDefaults$pl = propsWithDefaults.placement,
    placement = _propsWithDefaults$pl === void 0 ? 'left' : _propsWithDefaults$pl,
    children = propsWithDefaults.children,
    circle = propsWithDefaults.circle,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'btn-icon' : _propsWithDefaults$cl,
    className = propsWithDefaults.className,
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var classes = merge(className, withClassPrefix("placement-" + placement, {
    circle: circle,
    'with-text': typeof children !== 'undefined'
  }));
  return /*#__PURE__*/_react.default.createElement(_Button.default, (0, _extends2.default)({}, rest, {
    ref: ref,
    className: classes
  }), icon, children);
});
IconButton.displayName = 'IconButton';
IconButton.propTypes = {
  className: _propTypes.default.string,
  icon: _propTypes.default.any,
  classPrefix: _propTypes.default.string,
  circle: _propTypes.default.bool,
  children: _propTypes.default.node,
  placement: (0, _propTypes2.oneOf)(['left', 'right'])
};
var _default = exports.default = IconButton;
'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _hooks = require("../internals/hooks");
var _excluded = ["classPrefix", "className", "as"];
/**
 * The `<Dropdown.Separator>` API
 *
 * Renders a non-focusable and non-interactive `separator`
 * Per ARIA APG https://www.w3.org/WAI/ARIA/apg/patterns/menu/
 */
var DropdownSeparator = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'dropdown-item-divider' : _props$classPrefix,
    className = props.className,
    _props$as = props.as,
    Component = _props$as === void 0 ? 'li' : _props$as,
    restProps = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
    ref: ref,
    role: "separator",
    className: merge(withClassPrefix(), className)
  }, restProps));
});
DropdownSeparator.displayName = 'Dropdown.Separator';
DropdownSeparator.propTypes = {
  as: _propTypes.default.elementType
};
var _default = exports.default = DropdownSeparator;
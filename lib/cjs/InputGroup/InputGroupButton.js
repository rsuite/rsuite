'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireDefault(require("react"));
var _hooks = require("../internals/hooks");
var _Button = _interopRequireDefault(require("../Button"));
var _excluded = ["classPrefix", "className"];
/**
 * The `InputGroup.Button` component is used to specify an input field with an add-on.
 * @see https://rsuitejs.com/components/input/#input-group
 */
var InputGroupButton = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'input-group-btn' : _props$classPrefix,
    className = props.className,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge;
  var _useClassNames2 = (0, _hooks.useClassNames)('input-group-addon'),
    withAddOnClassPrefix = _useClassNames2.withClassPrefix;
  var classes = merge(withAddOnClassPrefix(), className, withClassPrefix());
  return /*#__PURE__*/_react.default.createElement(_Button.default, (0, _extends2.default)({}, rest, {
    ref: ref,
    className: classes
  }));
});
InputGroupButton.displayName = 'InputGroupButton';
var _default = exports.default = InputGroupButton;
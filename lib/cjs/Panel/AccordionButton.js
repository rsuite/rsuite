'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _taggedTemplateLiteralLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteralLoose"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireDefault(require("react"));
var _Icon = _interopRequireDefault(require("@rsuite/icons/Icon"));
var _ArrowDownLine = _interopRequireDefault(require("@rsuite/icons/ArrowDownLine"));
var _hooks = require("../internals/hooks");
var _templateObject;
var _excluded = ["classPrefix", "expanded", "id", "className", "controlId", "children", "disabled", "caretAs"];
var AccordionButton = function AccordionButton(props) {
  var _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'panel-btn' : _props$classPrefix,
    expanded = props.expanded,
    id = props.id,
    className = props.className,
    controlId = props.controlId,
    children = props.children,
    disabled = props.disabled,
    _props$caretAs = props.caretAs,
    caretAs = _props$caretAs === void 0 ? _ArrowDownLine.default : _props$caretAs,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    prefix = _useClassNames.prefix,
    withClassPrefix = _useClassNames.withClassPrefix;
  return /*#__PURE__*/_react.default.createElement("button", (0, _extends2.default)({
    id: id,
    type: "button",
    "aria-controls": controlId,
    "aria-expanded": expanded,
    "aria-disabled": disabled,
    className: withClassPrefix(className),
    disabled: disabled
  }, rest), children, /*#__PURE__*/_react.default.createElement(_Icon.default, {
    as: caretAs,
    "aria-hidden": "true",
    className: prefix(_templateObject || (_templateObject = (0, _taggedTemplateLiteralLoose2.default)(["icon"]))),
    rotate: expanded ? 180 : 0,
    "data-testid": "caret icon"
  }));
};
var _default = exports.default = AccordionButton;
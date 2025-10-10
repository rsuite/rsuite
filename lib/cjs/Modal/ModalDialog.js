'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.modalDialogPropTypes = exports.default = void 0;
var _taggedTemplateLiteralLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteralLoose"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _hooks = require("../internals/hooks");
var _constants = require("../internals/constants");
var _propTypes2 = require("../internals/propTypes");
var _templateObject;
var _excluded = ["as", "style", "children", "dialogClassName", "dialogStyle", "classPrefix", "className", "size"];
var modalDialogPropTypes = exports.modalDialogPropTypes = {
  size: (0, _propTypes2.oneOf)(_constants.SIZE),
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  dialogClassName: _propTypes.default.string,
  style: _propTypes.default.object,
  dialogStyle: _propTypes.default.object,
  children: _propTypes.default.node
};
var ModalDialog = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    style = props.style,
    children = props.children,
    dialogClassName = props.dialogClassName,
    dialogStyle = props.dialogStyle,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'modal' : _props$classPrefix,
    className = props.className,
    size = props.size,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var modalStyle = (0, _extends2.default)({
    display: 'block'
  }, style);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix,
    prefix = _useClassNames.prefix;
  var classes = merge(className, withClassPrefix(size));
  var dialogClasses = merge(dialogClassName, prefix('dialog'));
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
    role: "dialog",
    "aria-modal": true
  }, rest, {
    ref: ref,
    className: classes,
    style: modalStyle
  }), /*#__PURE__*/_react.default.createElement("div", {
    role: "document",
    className: dialogClasses,
    style: dialogStyle
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: prefix(_templateObject || (_templateObject = (0, _taggedTemplateLiteralLoose2.default)(["content"])))
  }, children)));
});
ModalDialog.displayName = 'ModalDialog';
ModalDialog.propTypes = modalDialogPropTypes;
var _default = exports.default = ModalDialog;
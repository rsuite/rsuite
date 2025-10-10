'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireDefault(require("react"));
var _useCombobox2 = _interopRequireDefault(require("../Picker/hooks/useCombobox"));
var _ScrollView = _interopRequireDefault(require("../ScrollView"));
var _TreeProvider = require("./TreeProvider");
var _excluded = ["as", "children", "treeRootClassName", "multiselectable", "style", "height"];
var ScrollShadowView = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  return /*#__PURE__*/_react.default.createElement(_ScrollView.default, (0, _extends2.default)({
    scrollShadow: true,
    ref: ref
  }, props));
});
var TreeView = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _props$as = props.as,
    as = _props$as === void 0 ? 'div' : _props$as,
    children = props.children,
    treeRootClassName = props.treeRootClassName,
    multiselectable = props.multiselectable,
    style = props.style,
    height = props.height,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var _useTreeContextProps = (0, _TreeProvider.useTreeContextProps)(),
    scrollShadow = _useTreeContextProps.scrollShadow,
    virtualized = _useTreeContextProps.virtualized;
  var _useCombobox = (0, _useCombobox2.default)(),
    id = _useCombobox.id,
    labelId = _useCombobox.labelId,
    popupType = _useCombobox.popupType;

  // If the tree is virtualized, the scroll shadow is not needed.
  var Component = scrollShadow && !virtualized ? ScrollShadowView : as;

  // If the tree is virtualized, the height is not needed.
  var viewStyles = (0, _extends2.default)({
    height: virtualized ? undefined : height
  }, style);
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
    role: "tree",
    style: viewStyles,
    id: id ? id + "-" + popupType : undefined,
    "aria-multiselectable": multiselectable,
    "aria-labelledby": labelId,
    ref: ref
  }, rest), /*#__PURE__*/_react.default.createElement("div", {
    className: treeRootClassName
  }, children));
});
var _default = exports.default = TreeView;
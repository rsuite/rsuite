'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _SafeAnchor = _interopRequireDefault(require("../SafeAnchor"));
var _hooks = require("../internals/hooks");
var _excluded = ["wrapperAs", "href", "as", "classPrefix", "title", "target", "className", "style", "active", "children", "separator"];
/**
 * The `<Breadcrumb.Item>` component is used to specify each section of the Breadcrumb.
 * @see https://rsuitejs.com/components/breadcrumb
 */
var BreadcrumbItem = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _props$wrapperAs = props.wrapperAs,
    WrapperComponent = _props$wrapperAs === void 0 ? 'li' : _props$wrapperAs,
    href = props.href,
    _props$as = props.as,
    Component = _props$as === void 0 ? href ? _SafeAnchor.default : 'span' : _props$as,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'breadcrumb-item' : _props$classPrefix,
    title = props.title,
    target = props.target,
    className = props.className,
    style = props.style,
    active = props.active,
    children = props.children,
    separator = props.separator,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var classes = merge(className, withClassPrefix({
    active: active
  }));
  return /*#__PURE__*/_react.default.createElement(WrapperComponent, (0, _extends2.default)({
    style: style,
    className: classes,
    ref: ref
  }, rest), active ? /*#__PURE__*/_react.default.createElement("span", null, children) : /*#__PURE__*/_react.default.createElement(Component, {
    href: href,
    title: title,
    target: target
  }, children), separator);
});
BreadcrumbItem.displayName = 'BreadcrumbItem';
BreadcrumbItem.propTypes = {
  active: _propTypes.default.bool,
  className: _propTypes.default.string,
  style: _propTypes.default.object,
  href: _propTypes.default.string,
  title: _propTypes.default.string,
  target: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  as: _propTypes.default.elementType
};
var _default = exports.default = BreadcrumbItem;
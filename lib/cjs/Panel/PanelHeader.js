'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _get = _interopRequireDefault(require("lodash/get"));
var _Heading = _interopRequireDefault(require("../Heading"));
var _AccordionButton = _interopRequireDefault(require("./AccordionButton"));
var _hooks = require("../internals/hooks");
var _excluded = ["as", "classPrefix", "className", "children", "collapsible", "caretAs", "disabled", "expanded", "role", "bodyId", "buttonId", "onClickButton"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var PanelHeader = function PanelHeader(props) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? _Heading.default : _props$as,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'panel' : _props$classPrefix,
    className = props.className,
    children = props.children,
    collapsible = props.collapsible,
    caretAs = props.caretAs,
    disabled = props.disabled,
    expanded = props.expanded,
    role = props.role,
    bodyId = props.bodyId,
    buttonId = props.buttonId,
    onClickButton = props.onClickButton,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix;
  var headerElement;
  if (! /*#__PURE__*/(0, _react.isValidElement)(children) || Array.isArray(children)) {
    headerElement = /*#__PURE__*/_react.default.createElement("span", {
      className: prefix('title')
    }, children);
  } else {
    var _className = merge(prefix('title'), (0, _get.default)(children, 'props.className'));
    headerElement = /*#__PURE__*/(0, _react.cloneElement)(children, {
      className: _className
    });
  }
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
    level: 2,
    className: merge(className, prefix('header'))
  }, rest), collapsible ? /*#__PURE__*/_react.default.createElement(_AccordionButton.default, {
    id: buttonId,
    role: role,
    caretAs: caretAs,
    controlId: bodyId,
    disabled: disabled,
    expanded: expanded,
    onClick: onClickButton
  }, headerElement) : headerElement);
};
var _default = exports.default = PanelHeader;
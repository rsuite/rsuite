'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _isNil2 = _interopRequireDefault(require("lodash/isNil"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _contains = _interopRequireDefault(require("dom-lib/contains"));
var _hooks = require("../internals/hooks");
var _excluded = ["as", "classPrefix", "className", "children", "vertical", "status", "disabled", "onClick", "onKeyDown", "onMouseMove"];
var _characterStatus;
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var characterStatus = (_characterStatus = {}, _characterStatus[0] = 'empty', _characterStatus[0.5] = 'half', _characterStatus[1] = 'full', _characterStatus);
var getKey = function getKey(a, b) {
  return (0, _contains.default)(a, b) ? 'before' : 'after';
};
var Character = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'li' : _props$as,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'rate-character' : _props$classPrefix,
    className = props.className,
    children = props.children,
    vertical = props.vertical,
    status = props.status,
    disabled = props.disabled,
    onClick = props.onClick,
    onKeyDown = props.onKeyDown,
    onMouseMove = props.onMouseMove,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix,
    withClassPrefix = _useClassNames.withClassPrefix;
  var beforeRef = (0, _react.useRef)(null);
  var classes = merge(className, withClassPrefix(!(0, _isNil2.default)(status) && characterStatus[status]));
  var handleMouseMove = (0, _react.useCallback)(function (event) {
    onMouseMove === null || onMouseMove === void 0 || onMouseMove(getKey(beforeRef.current, event.target), event);
  }, [onMouseMove]);
  var handleClick = (0, _react.useCallback)(function (event) {
    onClick === null || onClick === void 0 || onClick(getKey(beforeRef.current, event.target), event);
  }, [onClick]);
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({}, rest, {
    ref: ref,
    className: classes,
    tabIndex: 0,
    onClick: disabled ? null : handleClick,
    onKeyDown: disabled ? null : onKeyDown,
    onMouseMove: disabled ? null : handleMouseMove
  }), /*#__PURE__*/_react.default.createElement("div", {
    ref: beforeRef,
    className: prefix('before', {
      vertical: vertical
    })
  }, children), /*#__PURE__*/_react.default.createElement("div", {
    className: prefix('after')
  }, children));
});
Character.displayName = 'Character';
Character.propTypes = {
  as: _propTypes.default.elementType,
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  children: _propTypes.default.node,
  vertical: _propTypes.default.bool,
  status: _propTypes.default.number,
  disabled: _propTypes.default.bool,
  onMouseMove: _propTypes.default.func,
  onClick: _propTypes.default.func,
  onKeyDown: _propTypes.default.func
};
var _default = exports.default = Character;
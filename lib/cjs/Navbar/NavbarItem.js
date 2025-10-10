'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _isNil = _interopRequireDefault(require("lodash/isNil"));
var _Ripple = _interopRequireDefault(require("../internals/Ripple"));
var _SafeAnchor = _interopRequireDefault(require("../SafeAnchor"));
var _hooks = require("../internals/hooks");
var _utils = require("../internals/utils");
var _NavContext = _interopRequireDefault(require("../Nav/NavContext"));
var _classnames = _interopRequireDefault(require("classnames"));
var _excluded = ["as", "active", "disabled", "eventKey", "className", "classPrefix", "style", "children", "icon", "onClick", "onSelect"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * @private
 */
var NavbarItem = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? _SafeAnchor.default : _props$as,
    activeProp = props.active,
    disabled = props.disabled,
    eventKey = props.eventKey,
    className = props.className,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'navbar-item' : _props$classPrefix,
    style = props.style,
    children = props.children,
    icon = props.icon,
    onClick = props.onClick,
    onSelectProp = props.onSelect,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var _ref = (0, _react.useContext)(_NavContext.default),
    activeKey = _ref.activeKey,
    onSelectFromNav = _ref.onSelect;
  var active = activeProp !== null && activeProp !== void 0 ? activeProp : !(0, _isNil.default)(eventKey) && (0, _utils.shallowEqual)(eventKey, activeKey);
  var emitSelect = (0, _react.useCallback)(function (event) {
    onSelectProp === null || onSelectProp === void 0 || onSelectProp(eventKey, event);
    onSelectFromNav === null || onSelectFromNav === void 0 || onSelectFromNav(eventKey, event);
  }, [eventKey, onSelectProp, onSelectFromNav]);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    prefix = _useClassNames.prefix,
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge;
  var classes = merge(className, withClassPrefix({
    active: active,
    disabled: disabled
  }));
  var handleClick = (0, _react.useCallback)(function (event) {
    if (!disabled) {
      emitSelect(event);
      onClick === null || onClick === void 0 || onClick(event);
    }
  }, [disabled, emitSelect, onClick]);
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
    ref: ref,
    "aria-selected": active || undefined
  }, rest, {
    className: classes,
    onClick: handleClick,
    style: style
  }), icon && /*#__PURE__*/_react.default.cloneElement(icon, {
    className: (0, _classnames.default)(prefix('icon'), icon.props.className)
  }), children, /*#__PURE__*/_react.default.createElement(_Ripple.default, null));
});
NavbarItem.displayName = 'Navbar.Item';
NavbarItem.propTypes = {
  as: _propTypes.default.elementType,
  active: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  onClick: _propTypes.default.func,
  style: _propTypes.default.object,
  icon: _propTypes.default.node,
  onSelect: _propTypes.default.func,
  children: _propTypes.default.node,
  eventKey: _propTypes.default.any
};
var _default = exports.default = NavbarItem;
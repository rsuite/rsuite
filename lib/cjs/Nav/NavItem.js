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
var _NavContext = _interopRequireDefault(require("./NavContext"));
var _classnames = _interopRequireDefault(require("classnames"));
var _excluded = ["as", "active", "disabled", "eventKey", "className", "classPrefix", "style", "children", "icon", "divider", "panel", "onClick", "onSelect"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * The `Nav.Item` component is used to create navigation links.
 *
 * - When used as direct child of `<Nav>`, render the NavItem
 * - When used within a `<Nav.Menu>`, render the NavDropdownItem
 * @see https://rsuitejs.com/components/nav
 *
 */
var NavItem = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var nav = (0, _react.useContext)(_NavContext.default);
  if (!nav) {
    throw new Error('<Nav.Item> must be rendered within a <Nav> component.');
  }
  var _props$as = props.as,
    Component = _props$as === void 0 ? _SafeAnchor.default : _props$as,
    activeProp = props.active,
    disabled = props.disabled,
    eventKey = props.eventKey,
    className = props.className,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'nav-item' : _props$classPrefix,
    style = props.style,
    children = props.children,
    icon = props.icon,
    divider = props.divider,
    panel = props.panel,
    onClick = props.onClick,
    onSelectProp = props.onSelect,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var activeKey = nav.activeKey,
    onSelectFromNav = nav.onSelect;
  var active = activeProp !== null && activeProp !== void 0 ? activeProp : !(0, _isNil.default)(eventKey) && (0, _utils.shallowEqual)(eventKey, activeKey);
  var emitSelect = (0, _react.useCallback)(function (event) {
    onSelectProp === null || onSelectProp === void 0 || onSelectProp(eventKey, event);
    onSelectFromNav === null || onSelectFromNav === void 0 || onSelectFromNav(eventKey, event);
  }, [eventKey, onSelectProp, onSelectFromNav]);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix;
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
  if (divider) {
    return /*#__PURE__*/_react.default.createElement("div", (0, _extends2.default)({
      ref: ref,
      role: "separator",
      style: style,
      className: merge(className, prefix('divider'))
    }, rest));
  }
  if (panel) {
    return /*#__PURE__*/_react.default.createElement("div", (0, _extends2.default)({
      ref: ref,
      style: style,
      className: merge(className, prefix('panel'))
    }, rest), children);
  }
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
    ref: ref,
    tabIndex: disabled ? -1 : undefined
  }, rest, {
    className: classes,
    onClick: handleClick,
    style: style,
    "aria-selected": active || undefined
  }), icon && /*#__PURE__*/_react.default.cloneElement(icon, {
    className: (0, _classnames.default)(prefix('icon'), icon.props.className)
  }), children, /*#__PURE__*/_react.default.createElement(_Ripple.default, null));
});
NavItem.displayName = 'Nav.Item';
NavItem.propTypes = {
  as: _propTypes.default.elementType,
  active: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  divider: _propTypes.default.bool,
  panel: _propTypes.default.bool,
  onClick: _propTypes.default.func,
  style: _propTypes.default.object,
  icon: _propTypes.default.node,
  onSelect: _propTypes.default.func,
  children: _propTypes.default.node,
  eventKey: _propTypes.default.any
};
var _default = exports.default = NavItem;
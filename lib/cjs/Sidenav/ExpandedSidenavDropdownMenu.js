'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _taggedTemplateLiteralLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteralLoose"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _isNil = _interopRequireDefault(require("lodash/isNil"));
var _omit = _interopRequireDefault(require("lodash/omit"));
var _SidenavDropdownCollapse = _interopRequireDefault(require("./SidenavDropdownCollapse"));
var _Ripple = _interopRequireDefault(require("../internals/Ripple"));
var _Disclosure = _interopRequireDefault(require("../internals/Disclosure/Disclosure"));
var _ArrowLeftLine = _interopRequireDefault(require("@rsuite/icons/ArrowLeftLine"));
var _ArrowRightLine = _interopRequireDefault(require("@rsuite/icons/ArrowRightLine"));
var _hooks = require("../internals/hooks");
var _utils = require("../internals/utils");
var _Sidenav = require("./Sidenav");
var _CustomProvider = require("../CustomProvider");
var _templateObject;
var _excluded = ["as", "children", "disabled", "className", "style", "classPrefix", "tabIndex", "icon", "title", "eventKey", "onClick", "onSelect"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * Tree View Node
 * @see https://www.w3.org/TR/wai-aria-practices-1.2/#TreeView
 */
var ExpandedSidenavDropdownMenu = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var sidenavContext = (0, _react.useContext)(_Sidenav.SidenavContext);
  if (!sidenavContext) {
    throw new Error('<SidenavDropdownMenu> component is not supposed to be used standalone. Use <Nav.Menu> inside <Sidenav> instead.');
  }
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'li' : _props$as,
    children = props.children,
    disabled = props.disabled,
    className = props.className,
    style = props.style,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'dropdown-item' : _props$classPrefix,
    tabIndex = props.tabIndex,
    icon = props.icon,
    title = props.title,
    eventKey = props.eventKey,
    onClick = props.onClick,
    onSelect = props.onSelect,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var _useCustom = (0, _CustomProvider.useCustom)(),
    rtl = _useCustom.rtl;
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix,
    prefix = _useClassNames.prefix;
  var _sidenavContext$openK = sidenavContext.openKeys,
    openKeys = _sidenavContext$openK === void 0 ? [] : _sidenavContext$openK,
    onOpenChange = sidenavContext.onOpenChange,
    onSidenavSelect = sidenavContext.onSelect;
  var handleClick = (0, _react.useCallback)(function (event) {
    if (disabled) return;
    onSelect === null || onSelect === void 0 || onSelect(eventKey, event);
    onSidenavSelect === null || onSidenavSelect === void 0 || onSidenavSelect(eventKey, event);
  }, [disabled, onSelect, onSidenavSelect, eventKey]);
  var menuitemEventHandlers = {
    onClick: (0, _utils.createChainedFunction)(handleClick, onClick)
  };
  var Icon = rtl ? _ArrowLeftLine.default : _ArrowRightLine.default;
  return /*#__PURE__*/_react.default.createElement(_Disclosure.default, {
    open: !(0, _isNil.default)(eventKey) && openKeys.includes(eventKey),
    onToggle: function onToggle(_, event) {
      return onOpenChange === null || onOpenChange === void 0 ? void 0 : onOpenChange(eventKey, event);
    }
  }, function (_ref) {
    var open = _ref.open;
    var classes = merge(className, prefix('submenu'), prefix("pull-" + (rtl ? 'left' : 'right')), prefix(open ? 'expand' : 'collapse'), withClassPrefix({
      'with-icon': icon,
      // open,
      disabled: disabled
    }));
    var iconClasses = merge(className, prefix('toggle-icon'), prefix((open ? 'expand' : 'collapse') + "-icon"));
    return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
      ref: ref
    }, rest, {
      tabIndex: disabled ? -1 : tabIndex,
      style: style,
      className: classes
    }, menuitemEventHandlers), /*#__PURE__*/_react.default.createElement(_Disclosure.default.Button, null, function (buttonProps) {
      return /*#__PURE__*/_react.default.createElement("button", (0, _extends2.default)({
        className: prefix(_templateObject || (_templateObject = (0, _taggedTemplateLiteralLoose2.default)(["toggle"]))),
        onClick: handleClick
      }, (0, _omit.default)(buttonProps, ['open'])), icon && /*#__PURE__*/_react.default.cloneElement(icon, {
        className: prefix('menu-icon')
      }), title, /*#__PURE__*/_react.default.createElement(Icon, {
        className: iconClasses
      }), /*#__PURE__*/_react.default.createElement(_Ripple.default, null));
    }), /*#__PURE__*/_react.default.createElement(_Disclosure.default.Content, null, function (_ref2) {
      var open = _ref2.open;
      return /*#__PURE__*/_react.default.createElement(_SidenavDropdownCollapse.default, {
        open: open
      }, children);
    }));
  });
});
ExpandedSidenavDropdownMenu.displayName = 'Sidenav.Dropdown.Menu';
ExpandedSidenavDropdownMenu.propTypes = {
  as: _propTypes.default.elementType,
  expanded: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  onSelect: _propTypes.default.func,
  onClick: _propTypes.default.func,
  icon: _propTypes.default.node,
  eventKey: _propTypes.default.any,
  className: _propTypes.default.string,
  style: _propTypes.default.object,
  children: _propTypes.default.node,
  classPrefix: _propTypes.default.string,
  tabIndex: _propTypes.default.number,
  title: _propTypes.default.node,
  onMouseOver: _propTypes.default.func,
  onMouseOut: _propTypes.default.func
};
var _default = exports.default = ExpandedSidenavDropdownMenu;
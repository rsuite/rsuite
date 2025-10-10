'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _NavContext = _interopRequireDefault(require("./NavContext"));
var _Menubar = _interopRequireDefault(require("../internals/Menu/Menubar"));
var _NavDropdown = _interopRequireDefault(require("./NavDropdown"));
var _NavMenu = _interopRequireDefault(require("./NavMenu"));
var _NavDropdownItem = _interopRequireDefault(require("./NavDropdownItem"));
var _NavDropdownMenu = _interopRequireDefault(require("./NavDropdownMenu"));
var _AdaptiveNavItem = _interopRequireDefault(require("./AdaptiveNavItem"));
var _hooks = require("../internals/hooks");
var _Navbar = require("../Navbar/Navbar");
var _Sidenav = require("../Sidenav/Sidenav");
var _propTypes2 = require("../internals/propTypes");
var _utils = require("../internals/utils");
var _CustomProvider = require("../CustomProvider");
var _excluded = ["as", "classPrefix", "appearance", "vertical", "justified", "reversed", "pullRight", "className", "children", "activeKey", "defaultActiveKey", "onSelect"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * The `Nav` component is used to create navigation links.
 * @see https://rsuitejs.com/components/nav
 */
var Nav = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useCustom = (0, _CustomProvider.useCustom)('Nav', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'nav' : _propsWithDefaults$cl,
    _propsWithDefaults$ap = propsWithDefaults.appearance,
    appearance = _propsWithDefaults$ap === void 0 ? 'default' : _propsWithDefaults$ap,
    vertical = propsWithDefaults.vertical,
    justified = propsWithDefaults.justified,
    reversed = propsWithDefaults.reversed,
    pullRight = propsWithDefaults.pullRight,
    className = propsWithDefaults.className,
    children = propsWithDefaults.children,
    activeKeyProp = propsWithDefaults.activeKey,
    defaultActiveKey = propsWithDefaults.defaultActiveKey,
    onSelectProp = propsWithDefaults.onSelect,
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var sidenav = (0, _react.useContext)(_Sidenav.SidenavContext);

  // Whether inside a <Navbar>
  var navbar = (0, _react.useContext)(_Navbar.NavbarContext);
  var menubarRef = (0, _hooks.useEnsuredRef)(ref);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge,
    rootPrefix = _useClassNames.rootPrefix,
    prefix = _useClassNames.prefix;
  var classes = merge(className, rootPrefix({
    'navbar-nav': navbar,
    'navbar-right': pullRight,
    'sidenav-nav': sidenav
  }), withClassPrefix(appearance, {
    horizontal: navbar || !vertical && !sidenav,
    vertical: vertical || sidenav,
    justified: justified,
    reversed: reversed
  }));
  var _ref = sidenav || {},
    activeKeyFromSidenav = _ref.activeKey,
    onSelectFromSidenav = _ref.onSelect;
  var _useControlled = (0, _hooks.useControlled)(activeKeyProp !== null && activeKeyProp !== void 0 ? activeKeyProp : activeKeyFromSidenav, defaultActiveKey),
    activeKey = _useControlled[0],
    setActiveKey = _useControlled[1];
  var contextValue = (0, _react.useMemo)(function () {
    return {
      activeKey: activeKey,
      onSelect: function onSelect(eventKey, event) {
        setActiveKey(eventKey);
        onSelectProp === null || onSelectProp === void 0 || onSelectProp(eventKey, event);
        onSelectFromSidenav === null || onSelectFromSidenav === void 0 || onSelectFromSidenav(eventKey, event);
      }
    };
  }, [activeKey, onSelectFromSidenav, onSelectProp, setActiveKey]);
  if (sidenav !== null && sidenav !== void 0 && sidenav.expanded) {
    return /*#__PURE__*/_react.default.createElement(_NavContext.default.Provider, {
      value: contextValue
    }, /*#__PURE__*/_react.default.createElement("ul", (0, _extends2.default)({
      ref: ref,
      className: classes
    }, rest), children));
  }
  var hasWaterline = appearance !== 'default';

  // If inside a collapsed <Sidenav>, render an ARIA `menubar` (vertical)
  if (sidenav) {
    return /*#__PURE__*/_react.default.createElement(_NavContext.default.Provider, {
      value: contextValue
    }, /*#__PURE__*/_react.default.createElement(_Menubar.default, {
      vertical: !!sidenav
    }, function (menubar, ref) {
      return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
        ref: ref
      }, rest, {
        className: classes
      }, menubar), children);
    }));
  }
  return /*#__PURE__*/_react.default.createElement(_NavContext.default.Provider, {
    value: contextValue
  }, /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({}, rest, {
    ref: menubarRef,
    className: classes
  }), children, hasWaterline && /*#__PURE__*/_react.default.createElement("div", {
    className: prefix('bar')
  })));
});
var DeprecatedNavDropdown = (0, _utils.deprecateComponent)(_NavDropdown.default, '<Nav.Dropdown> is deprecated, use <Nav.Menu> instead.');
DeprecatedNavDropdown.Menu = (0, _utils.deprecateComponent)(_NavDropdownMenu.default, '<Nav.Dropdown.Menu> is deprecated, use <Nav.Menu> instead');
DeprecatedNavDropdown.Item = (0, _utils.deprecateComponent)(_NavDropdownItem.default, '<Nav.Dropdown.Item> is deprecated, use <Nav.Item> instead');
Nav.Dropdown = DeprecatedNavDropdown;
Nav.Item = _AdaptiveNavItem.default;
Nav.Menu = _NavMenu.default;
Nav.displayName = 'Nav';
Nav.propTypes = {
  classPrefix: _propTypes.default.string,
  className: _propTypes.default.string,
  children: _propTypes.default.node,
  appearance: (0, _propTypes2.oneOf)(['default', 'subtle', 'tabs', 'pills']),
  // Reverse Direction of tabs/subtle
  reversed: _propTypes.default.bool,
  justified: _propTypes.default.bool,
  vertical: _propTypes.default.bool,
  pullRight: _propTypes.default.bool,
  activeKey: _propTypes.default.any,
  onSelect: _propTypes.default.func
};
var _default = exports.default = Nav;
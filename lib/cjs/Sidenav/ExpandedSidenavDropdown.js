'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _kebabCase = _interopRequireDefault(require("lodash/kebabCase"));
var _omit = _interopRequireDefault(require("lodash/omit"));
var _constants = require("../internals/constants");
var _hooks = require("../internals/hooks");
var _utils = require("../internals/utils");
var _Sidenav = require("./Sidenav");
var _propTypes2 = require("../internals/propTypes");
var _SidenavDropdownCollapse = _interopRequireDefault(require("./SidenavDropdownCollapse"));
var _Disclosure = _interopRequireDefault(require("../internals/Disclosure/Disclosure"));
var _SidenavDropdownToggle = _interopRequireDefault(require("./SidenavDropdownToggle"));
var _NavMenu = require("../Nav/NavMenu");
var _NavContext = _interopRequireDefault(require("../Nav/NavContext"));
var _excluded = ["as", "title", "children", "className", "menuStyle", "disabled", "renderTitle", "renderToggle", "classPrefix", "placement", "toggleClassName", "icon", "eventKey", "toggleAs", "noCaret", "style", "onOpen", "onClose", "open", "onToggle"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var ExpandedSidenavDropdown = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var sidenav = (0, _react.useContext)(_Sidenav.SidenavContext);
  var nav = (0, _react.useContext)(_NavContext.default);
  var navMenu = (0, _react.useContext)(_NavMenu.NavMenuContext);
  if (!sidenav || !nav || !navMenu) {
    throw new Error('<SidenavDropdown> component is not supposed to be used standalone. Use <Nav.Menu> inside <Sidenav> instead.');
  }
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    title = props.title,
    children = props.children,
    className = props.className,
    menuStyle = props.menuStyle,
    disabled = props.disabled,
    renderTitle = props.renderTitle,
    renderToggle = props.renderToggle,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'dropdown' : _props$classPrefix,
    _props$placement = props.placement,
    placement = _props$placement === void 0 ? 'bottomStart' : _props$placement,
    toggleClassName = props.toggleClassName,
    icon = props.icon,
    eventKey = props.eventKey,
    toggleAs = props.toggleAs,
    noCaret = props.noCaret,
    style = props.style,
    onOpen = props.onOpen,
    onClose = props.onClose,
    openProp = props.open,
    onToggle = props.onToggle,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var internalId = (0, _hooks.useInternalId)('SidenavDropdown');
  var uniqueKey = eventKey !== null && eventKey !== void 0 ? eventKey : internalId;
  var _sidenav$openKeys = sidenav.openKeys,
    openKeys = _sidenav$openKeys === void 0 ? [] : _sidenav$openKeys,
    onOpenChange = sidenav.onOpenChange;
  var items = navMenu[0].items;
  var hasSelectedItems =
  // has items that is active indicated by <Nav activeKey>
  nav.activeKey && items.some(function (item) {
    return item.eventKey === nav.activeKey;
  }) ||
  // has items that is active indicated by <Nav.Item active>
  items.some(function (item) {
    return item.active;
  });
  var handleToggleDisclosure = (0, _react.useCallback)(function (open, event) {
    if (open) {
      onClose === null || onClose === void 0 || onClose();
    } else {
      onOpen === null || onOpen === void 0 || onOpen();
    }
    onToggle === null || onToggle === void 0 || onToggle(open);
    onOpenChange === null || onOpenChange === void 0 || onOpenChange(uniqueKey, event);
  }, [onClose, onOpen, onToggle, uniqueKey, onOpenChange]);
  var open = openProp !== null && openProp !== void 0 ? openProp : openKeys.includes(uniqueKey);
  return /*#__PURE__*/_react.default.createElement(_Disclosure.default, {
    open: open,
    onToggle: handleToggleDisclosure
  }, function (_ref, containerRef) {
    var _withClassPrefix;
    var open = _ref.open;
    var classes = merge(className, withClassPrefix((_withClassPrefix = {}, _withClassPrefix["placement-" + (0, _kebabCase.default)((0, _utils.placementPolyfill)(placement))] = placement, _withClassPrefix[open ? 'expand' : 'collapse'] = true, _withClassPrefix.disabled = disabled, _withClassPrefix['selected-within'] = hasSelectedItems, _withClassPrefix['no-caret'] = noCaret, _withClassPrefix)));
    return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
      ref: (0, _utils.mergeRefs)(ref, containerRef),
      style: style,
      className: classes
    }, rest, {
      "data-event-key": eventKey
    }), /*#__PURE__*/_react.default.createElement(_Disclosure.default.Button, null, function (buttonProps, buttonRef) {
      return /*#__PURE__*/_react.default.createElement(_SidenavDropdownToggle.default, (0, _extends2.default)({
        ref: buttonRef,
        as: toggleAs,
        noCaret: noCaret,
        className: toggleClassName,
        renderToggle: renderToggle,
        icon: icon,
        placement: placement
      }, (0, _omit.default)(buttonProps, ['open'])), title);
    }), /*#__PURE__*/_react.default.createElement(_Disclosure.default.Content, null, function (_ref2) {
      var open = _ref2.open;
      return /*#__PURE__*/_react.default.createElement(_SidenavDropdownCollapse.default, {
        open: open,
        style: menuStyle
      }, children);
    }));
  });
});
ExpandedSidenavDropdown.displayName = 'Sidenav.Dropdown';
ExpandedSidenavDropdown.propTypes = {
  activeKey: _propTypes.default.any,
  classPrefix: _propTypes.default.string,
  placement: (0, _propTypes2.oneOf)(_constants.PLACEMENT_8),
  title: _propTypes.default.node,
  disabled: _propTypes.default.bool,
  icon: _propTypes.default.node,
  menuStyle: _propTypes.default.object,
  className: _propTypes.default.string,
  toggleClassName: _propTypes.default.string,
  children: _propTypes.default.node,
  tabIndex: _propTypes.default.number,
  open: (0, _propTypes2.deprecatePropType)(_propTypes.default.bool),
  eventKey: _propTypes.default.any,
  as: _propTypes.default.elementType,
  toggleAs: _propTypes.default.elementType,
  noCaret: _propTypes.default.bool,
  style: _propTypes.default.object,
  onClose: _propTypes.default.func,
  onOpen: _propTypes.default.func,
  onToggle: _propTypes.default.func,
  onMouseEnter: _propTypes.default.func,
  onMouseLeave: _propTypes.default.func,
  onContextMenu: _propTypes.default.func,
  onClick: _propTypes.default.func,
  renderTitle: (0, _propTypes2.deprecatePropType)(_propTypes.default.func),
  renderToggle: _propTypes.default.func
};
var _default = exports.default = ExpandedSidenavDropdown;
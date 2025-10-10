'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _omit = _interopRequireDefault(require("lodash/omit"));
var _pick = _interopRequireDefault(require("lodash/pick"));
var _constants = require("../internals/constants");
var _hooks = require("../internals/hooks");
var _utils = require("../internals/utils");
var _Sidenav = require("./Sidenav");
var _propTypes2 = require("../internals/propTypes");
var _Menu = _interopRequireDefault(require("../internals/Menu/Menu"));
var _MenuItem = _interopRequireDefault(require("../internals/Menu/MenuItem"));
var _kebabCase = _interopRequireDefault(require("lodash/kebabCase"));
var _ExpandedSidenavDropdown = _interopRequireDefault(require("./ExpandedSidenavDropdown"));
var _NavContext = _interopRequireDefault(require("../Nav/NavContext"));
var _NavDropdownItem = _interopRequireDefault(require("../Nav/NavDropdownItem"));
var _NavDropdownMenu = _interopRequireDefault(require("../Nav/NavDropdownMenu"));
var _SidenavDropdownToggle = _interopRequireDefault(require("./SidenavDropdownToggle"));
var _NavMenu = require("../Nav/NavMenu");
var _excluded = ["as", "title", "onClose", "onOpen", "onToggle", "eventKey", "trigger", "placement", "toggleAs", "toggleClassName", "classPrefix", "className", "disabled", "children", "menuStyle", "style"],
  _excluded2 = ["active"],
  _excluded3 = ["open"],
  _excluded4 = ["open"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * @private this component is not supposed to be used directly
 *          Instead it's rendered by a <Nav.Menu> within a <Sidenav>
 *
 * <Sidenav>
 *   <Nav>
 *     <Nav.Menu> -> This submenu will render <SidenavDropdown> component
 *     </Nav.Menu>
 *   </Nav>
 * </Sidenav>
 */
var SidenavDropdown = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var sidenav = (0, _react.useContext)(_Sidenav.SidenavContext);
  var nav = (0, _react.useContext)(_NavContext.default);
  var navMenu = (0, _react.useContext)(_NavMenu.NavMenuContext);
  if (!sidenav || !nav || !navMenu) {
    throw new Error('<Sidenav.Dropdown> must be rendered within a <Nav> component within a <Sidenav> component.');
  }
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    title = props.title,
    onClose = props.onClose,
    onOpen = props.onOpen,
    onToggle = props.onToggle,
    eventKey = props.eventKey,
    _props$trigger = props.trigger,
    trigger = _props$trigger === void 0 ? 'click' : _props$trigger,
    _props$placement = props.placement,
    placement = _props$placement === void 0 ? 'bottomStart' : _props$placement,
    toggleAs = props.toggleAs,
    toggleClassName = props.toggleClassName,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'dropdown' : _props$classPrefix,
    className = props.className,
    disabled = props.disabled,
    children = props.children,
    menuStyle = props.menuStyle,
    style = props.style,
    toggleProps = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix,
    prefix = _useClassNames.prefix;
  var _useClassNames2 = (0, _hooks.useClassNames)('dropdown-menu'),
    withMenuClassPrefix = _useClassNames2.withClassPrefix,
    mergeMenuClassName = _useClassNames2.merge;
  var _useClassNames3 = (0, _hooks.useClassNames)('nav-item'),
    withNavItemClassPrefix = _useClassNames3.withClassPrefix,
    mergeNavItemClassNames = _useClassNames3.merge;
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
  var menuButtonTriggers = (0, _react.useMemo)(function () {
    if (!trigger) {
      return undefined;
    }
    var triggerMap = {
      hover: 'mouseover',
      click: 'click',
      contextMenu: 'contextmenu'
    };
    if (!Array.isArray(trigger)) {
      return [triggerMap[trigger]];
    }
    return trigger.map(function (t) {
      return triggerMap[t];
    });
  }, [trigger]);

  // Render a disclosure when inside expanded <Sidenav>
  if (sidenav.expanded) {
    return /*#__PURE__*/_react.default.createElement(_ExpandedSidenavDropdown.default, (0, _extends2.default)({
      ref: ref
    }, props));
  }
  var renderMenuButton = function renderMenuButton(menuButtonProps, buttonRef) {
    return /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
      disabled: disabled
    }, function (_ref, menuitemRef) {
      var active = _ref.active,
        menuitemProps = (0, _objectWithoutPropertiesLoose2.default)(_ref, _excluded2);
      return /*#__PURE__*/_react.default.createElement(_SidenavDropdownToggle.default, (0, _extends2.default)({
        ref: (0, _utils.mergeRefs)(buttonRef, menuitemRef),
        as: toggleAs,
        className: mergeNavItemClassNames(toggleClassName, withNavItemClassPrefix({
          focus: active
        }))
      }, menuButtonProps, (0, _omit.default)(menuitemProps, ['onClick']), (0, _omit.default)(toggleProps, 'data-testid')), title);
    });
  };
  return /*#__PURE__*/_react.default.createElement(_Menu.default, {
    menuButtonText: title,
    renderMenuButton: renderMenuButton,
    openMenuOn: menuButtonTriggers,
    renderMenuPopup: function renderMenuPopup(_ref2, popupRef) {
      var open = _ref2.open,
        popupProps = (0, _objectWithoutPropertiesLoose2.default)(_ref2, _excluded3);
      var menuClassName = mergeMenuClassName(className, withMenuClassPrefix({}));
      // When inside a collapsed <Sidenav>, render a header in menu
      var showHeader = !!sidenav;
      return /*#__PURE__*/_react.default.createElement("ul", (0, _extends2.default)({
        ref: popupRef,
        className: menuClassName,
        style: menuStyle,
        hidden: !open
      }, popupProps), showHeader && /*#__PURE__*/_react.default.createElement("div", {
        className: prefix('header')
      }, title), children);
    },
    onToggleMenu: function onToggleMenu(open, event) {
      onToggle === null || onToggle === void 0 || onToggle(open, eventKey, event);
      sidenav === null || sidenav === void 0 || sidenav.onOpenChange(eventKey, event);
      if (open) {
        onOpen === null || onOpen === void 0 || onOpen();
      } else {
        onClose === null || onClose === void 0 || onClose();
      }
    }
  }, function (_ref3, menuContainerRef) {
    var _withClassPrefix;
    var open = _ref3.open,
      menuContainer = (0, _objectWithoutPropertiesLoose2.default)(_ref3, _excluded4);
    var classes = merge(className, withClassPrefix((_withClassPrefix = {}, _withClassPrefix["placement-" + (0, _kebabCase.default)((0, _utils.placementPolyfill)(placement))] = !!placement, _withClassPrefix.disabled = disabled, _withClassPrefix.open = open, _withClassPrefix.submenu = true, _withClassPrefix['selected-within'] = hasSelectedItems, _withClassPrefix)));
    return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
      ref: (0, _utils.mergeRefs)(ref, menuContainerRef),
      className: classes
    }, menuContainer, (0, _pick.default)(toggleProps, ['data-testid']), {
      style: style
    }));
  });
});
SidenavDropdown.Item = _NavDropdownItem.default;
SidenavDropdown.Menu = _NavDropdownMenu.default;
SidenavDropdown.displayName = 'Sidenav.Dropdown';
SidenavDropdown.propTypes = {
  activeKey: _propTypes.default.any,
  classPrefix: _propTypes.default.string,
  trigger: _propTypes.default.oneOfType([_propTypes.default.array, (0, _propTypes2.oneOf)(['click', 'hover', 'contextMenu'])]),
  placement: (0, _propTypes2.oneOf)(_constants.PLACEMENT_8),
  title: _propTypes.default.node,
  disabled: _propTypes.default.bool,
  icon: _propTypes.default.node,
  menuStyle: _propTypes.default.object,
  className: _propTypes.default.string,
  toggleClassName: _propTypes.default.string,
  children: _propTypes.default.node,
  open: (0, _propTypes2.deprecatePropType)(_propTypes.default.bool),
  eventKey: _propTypes.default.any,
  as: _propTypes.default.elementType,
  toggleAs: _propTypes.default.elementType,
  noCaret: _propTypes.default.bool,
  style: _propTypes.default.object,
  onClose: _propTypes.default.func,
  onOpen: _propTypes.default.func,
  onToggle: _propTypes.default.func,
  onSelect: _propTypes.default.func,
  onMouseEnter: _propTypes.default.func,
  onMouseLeave: _propTypes.default.func,
  onContextMenu: _propTypes.default.func,
  onClick: _propTypes.default.func,
  renderToggle: _propTypes.default.func
};
var _default = exports.default = SidenavDropdown;
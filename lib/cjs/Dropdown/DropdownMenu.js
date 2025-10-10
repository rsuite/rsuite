'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _taggedTemplateLiteralLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteralLoose"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _omit2 = _interopRequireDefault(require("lodash/omit"));
var _Menu = _interopRequireDefault(require("../internals/Menu/Menu"));
var _MenuItem = _interopRequireDefault(require("../internals/Menu/MenuItem"));
var _Menubar = _interopRequireDefault(require("../internals/Menu/Menubar"));
var _PagePrevious = _interopRequireDefault(require("@rsuite/icons/PagePrevious"));
var _PageNext = _interopRequireDefault(require("@rsuite/icons/PageNext"));
var _DropdownContext = _interopRequireDefault(require("./DropdownContext"));
var _Nav = _interopRequireDefault(require("../Nav"));
var _NavContext = _interopRequireDefault(require("../Nav/NavContext"));
var _propTypes2 = require("../internals/propTypes");
var _hooks = require("../internals/hooks");
var _CustomProvider = require("../CustomProvider");
var _utils = require("../internals/utils");
var _templateObject, _templateObject2;
var _excluded = ["onToggle", "eventKey", "title", "activeKey", "onSelect", "classPrefix", "className", "children"],
  _excluded2 = ["icon", "disabled"],
  _excluded3 = ["open"],
  _excluded4 = ["selected", "active"],
  _excluded5 = ["open"],
  _excluded6 = ["open"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * The `<Dropdown.Menu>` API
 *
 * @description
 * Note the difference between this component and `<Menu>` component:
 * `<Menu>` is used for ARIA menu control logic and is used internally only.
 * This component is only used for supporting submenu syntax and is
 * assigned to Dropdown.Menu
 *
 * @example
 *
 * <Dropdown>
 *   <Dropdown.Item>Item 1</Dropdown.Item>
 *   <Dropdown.Menu title="Submenu">
 *     <Dropdown.Item>Sub item</Dropdown.Item>
 *   </Dropdown.Menu>
 * </Dropdown>
 */
var DropdownMenu = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var onToggle = props.onToggle,
    eventKey = props.eventKey,
    title = props.title,
    activeKey = props.activeKey,
    onSelect = props.onSelect,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'dropdown-menu' : _props$classPrefix,
    className = props.className,
    children = props.children,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var nav = (0, _react.useContext)(_NavContext.default);
  var dropdown = (0, _react.useContext)(_DropdownContext.default);
  var _useCustom = (0, _CustomProvider.useCustom)(),
    rtl = _useCustom.rtl;
  var handleToggleSubmenu = (0, _react.useCallback)(function (_, event) {
    onToggle === null || onToggle === void 0 || onToggle(eventKey, event);
  }, [eventKey, onToggle]);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix,
    withClassPrefix = _useClassNames.withClassPrefix;
  var _useClassNames2 = (0, _hooks.useClassNames)('dropdown-menu'),
    withMenuClassPrefix = _useClassNames2.withClassPrefix,
    mergeMenuClassName = _useClassNames2.merge;
  var _useClassNames3 = (0, _hooks.useClassNames)('dropdown-item'),
    mergeItemClassNames = _useClassNames3.merge,
    withItemClassPrefix = _useClassNames3.withClassPrefix,
    prefixItemClassName = _useClassNames3.prefix;
  var contextValue = (0, _react.useMemo)(function () {
    return {
      activeKey: activeKey,
      onSelect: onSelect
    };
  }, [activeKey, onSelect]);

  // If rendered within a <Nav>
  // Suggest <Nav.Menu>
  if (nav) {
    (0, _utils.warnOnce)('Usage of <Dropdown.Menu> within <Nav> is deprecated. Replace with <Nav.Menu>');
    return /*#__PURE__*/_react.default.createElement(_Nav.default.Menu, (0, _extends2.default)({
      ref: ref
    }, props));
  }

  // <Dropdown.Menu> is used outside of <Dropdown>
  // renders a vertical `menubar`
  if (!dropdown) {
    var classes = merge(className, withClassPrefix());
    return /*#__PURE__*/_react.default.createElement(_DropdownContext.default.Provider, {
      value: contextValue
    }, /*#__PURE__*/_react.default.createElement(_Menubar.default, {
      vertical: true
    }, function (menubar, menubarRef) {
      return /*#__PURE__*/_react.default.createElement("ul", (0, _extends2.default)({
        ref: (0, _utils.mergeRefs)(menubarRef, ref),
        className: classes
      }, menubar, rest), children);
    }));
  }

  // Parent menu exists. This is a submenu.
  // Should render a `menuitem` that controls this submenu.
  var _omit = (0, _omit2.default)(rest, ['trigger']),
    icon = _omit.icon,
    disabled = _omit.disabled,
    menuProps = (0, _objectWithoutPropertiesLoose2.default)(_omit, _excluded2);
  var Icon = rtl ? _PagePrevious.default : _PageNext.default;
  return /*#__PURE__*/_react.default.createElement(_Menu.default, {
    openMenuOn: ['mouseover', 'click'],
    renderMenuButton: function renderMenuButton(_ref, buttonRef) {
      var open = _ref.open,
        menuButtonProps = (0, _objectWithoutPropertiesLoose2.default)(_ref, _excluded3);
      return /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
        disabled: disabled
      }, function (_ref2, menuitemRef) {
        var selected = _ref2.selected,
          active = _ref2.active,
          menuitem = (0, _objectWithoutPropertiesLoose2.default)(_ref2, _excluded4);
        var classes = mergeItemClassNames(className, prefixItemClassName(_templateObject || (_templateObject = (0, _taggedTemplateLiteralLoose2.default)(["toggle"]))), withItemClassPrefix({
          'with-icon': icon,
          open: open,
          active: selected,
          disabled: disabled,
          focus: active
        }));
        return /*#__PURE__*/_react.default.createElement("div", (0, _extends2.default)({
          ref: (0, _utils.mergeRefs)(buttonRef, menuitemRef),
          className: classes,
          "data-event-key": eventKey,
          "data-event-key-type": typeof eventKey
        }, menuitem, (0, _omit2.default)(menuButtonProps, ['role'])), icon && /*#__PURE__*/_react.default.cloneElement(icon, {
          className: prefix('menu-icon')
        }), title, /*#__PURE__*/_react.default.createElement(Icon, {
          className: prefix(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteralLoose2.default)(["toggle-icon"])))
        }));
      });
    },
    renderMenuPopup: function renderMenuPopup(_ref3, popupRef) {
      var open = _ref3.open,
        popupProps = (0, _objectWithoutPropertiesLoose2.default)(_ref3, _excluded5);
      var menuClassName = mergeMenuClassName(className, withMenuClassPrefix());
      return /*#__PURE__*/_react.default.createElement("ul", (0, _extends2.default)({
        ref: popupRef,
        className: menuClassName,
        hidden: !open
      }, popupProps, menuProps), children);
    },
    onToggleMenu: handleToggleSubmenu
  }, function (_ref4, menuContainerRef) {
    var open = _ref4.open,
      menuContainer = (0, _objectWithoutPropertiesLoose2.default)(_ref4, _excluded6);
    var classes = mergeItemClassNames(className, withItemClassPrefix({
      disabled: disabled,
      open: open,
      submenu: true
    }));
    return /*#__PURE__*/_react.default.createElement("li", (0, _extends2.default)({
      ref: (0, _utils.mergeRefs)(ref, menuContainerRef),
      className: classes
    }, menuContainer));
  });
});
DropdownMenu.displayName = 'Dropdown.Menu';
DropdownMenu.propTypes = {
  active: _propTypes.default.bool,
  activeKey: _propTypes.default.any,
  className: _propTypes.default.string,
  children: _propTypes.default.node,
  icon: _propTypes.default.any,
  classPrefix: _propTypes.default.string,
  pullLeft: _propTypes.default.bool,
  title: _propTypes.default.node,
  open: _propTypes.default.bool,
  trigger: (0, _propTypes2.oneOf)(['click', 'hover']),
  eventKey: _propTypes.default.any,
  expanded: _propTypes.default.bool,
  collapsible: _propTypes.default.bool,
  onSelect: _propTypes.default.func,
  onToggle: _propTypes.default.func
};
var _default = exports.default = DropdownMenu;
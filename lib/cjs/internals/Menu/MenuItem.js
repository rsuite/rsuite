'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _react = require("react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _isNil = _interopRequireDefault(require("lodash/isNil"));
var _hooks = require("../hooks");
var _MenuContext = _interopRequireWildcard(require("./MenuContext"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * Headless ARIA `menuitem`
 * @private
 */
function MenuItem(props) {
  var _menuState$items$menu;
  var children = props.children,
    _props$selected = props.selected,
    selected = _props$selected === void 0 ? false : _props$selected,
    _props$disabled = props.disabled,
    disabled = _props$disabled === void 0 ? false : _props$disabled,
    onActivate = props.onActivate;
  var menuitemRef = (0, _react.useRef)(null);
  var menuitemId = (0, _hooks.useUniqueId)('menuitem-');
  var menu = (0, _react.useContext)(_MenuContext.default);
  if (!menu) {
    throw new Error('<MenuItem> must be rendered within a <Menu>');
  }
  var menuState = menu[0],
    dispatch = menu[1];

  // Whether this menuitem has focus (indicated by `aria-activedescendant` from parent menu)
  var hasFocus = !(0, _isNil.default)(menuitemRef.current) && !(0, _isNil.default)(menuState.activeItemIndex) && ((_menuState$items$menu = menuState.items[menuState.activeItemIndex]) === null || _menuState$items$menu === void 0 ? void 0 : _menuState$items$menu.element) === menuitemRef.current;
  var handleClick = (0, _react.useCallback)(function (event) {
    if (disabled) {
      return;
    }
    onActivate === null || onActivate === void 0 || onActivate(event);
  }, [disabled, onActivate]);

  // Gain/release focus on mousedown in `menubar`

  var handleMouseDown = (0, _react.useCallback)(function () {
    if (!(0, _isNil.default)(menuitemRef.current) && !hasFocus) {
      dispatch({
        type: _MenuContext.MenuActionTypes.MoveFocus,
        to: _MenuContext.MoveFocusTo.Specific,
        id: menuitemRef.current.id
      });
    }
  }, [dispatch, hasFocus]);

  // Gain/release focus on mouseenter/mouseleave in `menu`
  var handleMouseMove = (0, _react.useCallback)(function () {
    if (!(0, _isNil.default)(menuitemRef.current) && !hasFocus) {
      dispatch({
        type: _MenuContext.MenuActionTypes.MoveFocus,
        to: _MenuContext.MoveFocusTo.Specific,
        id: menuitemRef.current.id
      });
    }
  }, [hasFocus, dispatch]);
  var handleMouseLeave = (0, _react.useCallback)(function () {
    dispatch({
      type: _MenuContext.MenuActionTypes.MoveFocus,
      to: _MenuContext.MoveFocusTo.None
    });
  }, [dispatch]);
  (0, _react.useEffect)(function () {
    var menuitemElement = menuitemRef.current;
    if (menuitemElement) {
      dispatch({
        type: _MenuContext.MenuActionTypes.RegisterItem,
        element: menuitemElement,
        props: {
          disabled: disabled
        }
      });
      return function () {
        dispatch({
          type: _MenuContext.MenuActionTypes.UnregisterItem,
          id: menuitemElement.id
        });
      };
    }
  }, [menuitemRef, disabled, dispatch]);
  var menuitemProps = {
    id: menuitemId,
    role: 'menuitem',
    // fixme Only use `aria-checked` on menuitemradio and menuitemcheckbox
    'aria-checked': selected || undefined,
    'aria-disabled': disabled,
    tabIndex: -1,
    onClick: handleClick,
    // render props

    selected: selected,
    active: hasFocus
  };

  // Only move focus on hover in a `menu`, not `menubar`
  if ((menuState === null || menuState === void 0 ? void 0 : menuState.role) === 'menu') {
    menuitemProps.onMouseMove = handleMouseMove;
    menuitemProps.onMouseLeave = handleMouseLeave;
  }
  if ((menuState === null || menuState === void 0 ? void 0 : menuState.role) === 'menubar') {
    menuitemProps.onMouseDown = handleMouseDown;
    menuitemProps.onMouseOver = handleMouseMove;
    menuitemProps.onMouseLeave = handleMouseLeave;
  }
  return children(menuitemProps, menuitemRef);
}
MenuItem.displayName = 'MenuItem';
MenuItem.propTypes = {
  selected: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  children: _propTypes.default.func.isRequired,
  onActivate: _propTypes.default.func
};
var _default = exports.default = MenuItem;
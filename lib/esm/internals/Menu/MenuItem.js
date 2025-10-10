'use client';
import { useCallback, useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash/isNil';
import { useUniqueId } from "../hooks/index.js";
import MenuContext, { MenuActionTypes, MoveFocusTo } from "./MenuContext.js";
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
  var menuitemRef = useRef(null);
  var menuitemId = useUniqueId('menuitem-');
  var menu = useContext(MenuContext);
  if (!menu) {
    throw new Error('<MenuItem> must be rendered within a <Menu>');
  }
  var menuState = menu[0],
    dispatch = menu[1];

  // Whether this menuitem has focus (indicated by `aria-activedescendant` from parent menu)
  var hasFocus = !isNil(menuitemRef.current) && !isNil(menuState.activeItemIndex) && ((_menuState$items$menu = menuState.items[menuState.activeItemIndex]) === null || _menuState$items$menu === void 0 ? void 0 : _menuState$items$menu.element) === menuitemRef.current;
  var handleClick = useCallback(function (event) {
    if (disabled) {
      return;
    }
    onActivate === null || onActivate === void 0 || onActivate(event);
  }, [disabled, onActivate]);

  // Gain/release focus on mousedown in `menubar`

  var handleMouseDown = useCallback(function () {
    if (!isNil(menuitemRef.current) && !hasFocus) {
      dispatch({
        type: MenuActionTypes.MoveFocus,
        to: MoveFocusTo.Specific,
        id: menuitemRef.current.id
      });
    }
  }, [dispatch, hasFocus]);

  // Gain/release focus on mouseenter/mouseleave in `menu`
  var handleMouseMove = useCallback(function () {
    if (!isNil(menuitemRef.current) && !hasFocus) {
      dispatch({
        type: MenuActionTypes.MoveFocus,
        to: MoveFocusTo.Specific,
        id: menuitemRef.current.id
      });
    }
  }, [hasFocus, dispatch]);
  var handleMouseLeave = useCallback(function () {
    dispatch({
      type: MenuActionTypes.MoveFocus,
      to: MoveFocusTo.None
    });
  }, [dispatch]);
  useEffect(function () {
    var menuitemElement = menuitemRef.current;
    if (menuitemElement) {
      dispatch({
        type: MenuActionTypes.RegisterItem,
        element: menuitemElement,
        props: {
          disabled: disabled
        }
      });
      return function () {
        dispatch({
          type: MenuActionTypes.UnregisterItem,
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
  selected: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.func.isRequired,
  onActivate: PropTypes.func
};
export default MenuItem;
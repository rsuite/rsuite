'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import React, { useCallback, useContext, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash/isNil';
import MenuContext, { MenuActionTypes, MoveFocusTo } from "./MenuContext.js";
import useMenu from "./useMenu.js";
import { useUniqueId, useFocus, useClickOutside } from "../hooks/index.js";
import { KEY_VALUES } from "../constants/index.js";
import { useCustom } from "../../CustomProvider/index.js";
import { isFocusLeaving, isFocusableElement } from "../utils/index.js";
var defaultOpenMenuOn = ['click'];
function getMenuItemTarget(event) {
  var _event$currentTarget;
  var target = event.target;
  if (target.getAttribute('role') === 'menuitem') {
    return target;
  }
  return Array.from((_event$currentTarget = event.currentTarget) === null || _event$currentTarget === void 0 ? void 0 : _event$currentTarget.querySelectorAll('[role="menuitem"]')).find(function (item) {
    return item.contains(target);
  });
}

/**
 * Headless ARIA `menu`
 * @private
 */
function Menu(_ref) {
  var _items$activeItemInde;
  var disabled = _ref.disabled,
    children = _ref.children,
    _ref$openMenuOn = _ref.openMenuOn,
    openMenuOn = _ref$openMenuOn === void 0 ? defaultOpenMenuOn : _ref$openMenuOn,
    _ref$defaultOpen = _ref.defaultOpen,
    defaultOpen = _ref$defaultOpen === void 0 ? false : _ref$defaultOpen,
    openProp = _ref.open,
    menuButtonText = _ref.menuButtonText,
    renderMenuButton = _ref.renderMenuButton,
    renderMenuPopup = _ref.renderMenuPopup,
    onToggleMenu = _ref.onToggleMenu;
  var buttonElementRef = useRef(null);
  var menuElementRef = useRef(null);
  var parentMenu = useContext(MenuContext);
  var isSubmenu = !!parentMenu;
  var menu = useMenu({
    open: defaultOpen
  });
  var _menu$ = menu[0],
    openState = _menu$.open,
    items = _menu$.items,
    activeItemIndex = _menu$.activeItemIndex,
    dispatch = menu[1];
  var openControlled = typeof openProp !== 'undefined';
  var open = openControlled ? openProp : openState;
  var _useCustom = useCustom(),
    rtl = _useCustom.rtl;
  var activeItem = isNil(activeItemIndex) ? null : (_items$activeItemInde = items[activeItemIndex]) === null || _items$activeItemInde === void 0 ? void 0 : _items$activeItemInde.element;
  var _useFocus = useFocus(menuElementRef),
    grabFocus = _useFocus.grab;
  var openMenu = useCallback(function (event) {
    dispatch({
      type: MenuActionTypes.OpenMenu
    });
    if (!event.isTrusted) {
      dispatch({
        type: MenuActionTypes.MoveFocus,
        to: MoveFocusTo.First
      });
    }
    onToggleMenu === null || onToggleMenu === void 0 || onToggleMenu(true, event);
    grabFocus();
  }, [dispatch, onToggleMenu, grabFocus]);
  var closeMenu = useCallback(function (event, returnFocusToButton) {
    if (returnFocusToButton === void 0) {
      returnFocusToButton = true;
    }
    dispatch({
      type: MenuActionTypes.CloseMenu
    });
    dispatch({
      type: MenuActionTypes.MoveFocus,
      to: MoveFocusTo.None
    });
    onToggleMenu === null || onToggleMenu === void 0 || onToggleMenu(false, event);
    if (returnFocusToButton) {
      var _buttonElementRef$cur;
      (_buttonElementRef$cur = buttonElementRef.current) === null || _buttonElementRef$cur === void 0 || _buttonElementRef$cur.focus({
        preventScroll: true
      });
    }
  }, [dispatch, onToggleMenu, buttonElementRef]);
  var toggleMenu = useCallback(function (event) {
    if (!open) {
      openMenu(event);
    } else {
      closeMenu(event);
    }
  }, [open, openMenu, closeMenu]);
  useClickOutside({
    enabled: open,
    isOutside: function isOutside(event) {
      var _buttonElementRef$cur2, _menuElementRef$curre;
      return !((_buttonElementRef$cur2 = buttonElementRef.current) !== null && _buttonElementRef$cur2 !== void 0 && _buttonElementRef$cur2.contains(event.target)) && !((_menuElementRef$curre = menuElementRef.current) !== null && _menuElementRef$curre !== void 0 && _menuElementRef$curre.contains(event.target));
    },
    // fixme if clicking on a focusable element, don't move focus to menu button
    handle: function handle(event) {
      return closeMenu(event, !isFocusableElement(event.target));
    }
  });

  /**
   * Keyboard interaction on menu button
   * @see https://www.w3.org/TR/wai-aria-practices-1.2/#keyboard-interaction-13
   */
  var handleButtonKeydown = useCallback(function (e) {
    switch (e.key) {
      // Open the menu
      case KEY_VALUES.ENTER:
      case KEY_VALUES.SPACE:
        e.preventDefault();
        e.stopPropagation();
        if (!open) {
          openMenu(e);
          dispatch({
            type: MenuActionTypes.MoveFocus,
            to: MoveFocusTo.First
          });
        } else {
          closeMenu(e);
        }
        break;
      // Open the menu (if closed) and move focus to first item
      // This is mostly useful after opening the menu with click
      case KEY_VALUES.DOWN:
        e.preventDefault();
        e.stopPropagation();
        if (!open) {
          openMenu(e);
        }
        dispatch({
          type: MenuActionTypes.MoveFocus,
          to: MoveFocusTo.First
        });
        break;
    }
  }, [open, openMenu, closeMenu, dispatch]);
  var handleButtonClick = useCallback(function (event) {
    if (disabled) {
      return;
    }
    toggleMenu(event);
  }, [disabled, toggleMenu]);
  var handleButtonContextMenu = useCallback(function (event) {
    // prevents default contextmenu
    event.preventDefault();

    // Only opens menu on right click. Left click can close the menu opened by a right click
    if (open) return;
    if (disabled) return;
    openMenu(event);
  }, [open, disabled, openMenu]);
  var buttonEventHandlers = useMemo(function () {
    var buttonEventHandlers = {
      onKeyDown: handleButtonKeydown
    };

    /**
     * Bind event of trigger,
     * not used in  in the expanded state of '<Sidenav>'
     */
    if (openMenuOn !== null && openMenuOn !== void 0 && openMenuOn.includes('click')) {
      buttonEventHandlers.onClick = handleButtonClick;
    }
    if (openMenuOn !== null && openMenuOn !== void 0 && openMenuOn.includes('contextmenu')) {
      buttonEventHandlers.onContextMenu = handleButtonContextMenu;
    }
    return buttonEventHandlers;
  }, [openMenuOn, handleButtonKeydown, handleButtonClick, handleButtonContextMenu]);
  var buttonId = useUniqueId('menubutton-');
  var menuId = useUniqueId('menu-');
  var buttonAriaAttributes = useMemo(function () {
    // Ref: https://www.w3.org/TR/wai-aria-practices-1.2/#wai-aria-roles-states-and-properties-14
    return {
      role: 'button',
      'aria-haspopup': 'menu',
      'aria-expanded': open || undefined,
      // it's recommend to remove aria-expanded when menu is hidden
      'aria-controls': menuId
    };
  }, [open, menuId]);
  var buttonProps = useMemo(function () {
    return _extends({
      id: buttonId
    }, buttonAriaAttributes, buttonEventHandlers, {
      // render props
      open: open
    });
  }, [buttonId, buttonAriaAttributes, buttonEventHandlers, open]);
  var customMenuButton = useMemo(function () {
    return renderMenuButton === null || renderMenuButton === void 0 ? void 0 : renderMenuButton(buttonProps, buttonElementRef);
  }, [renderMenuButton, buttonProps, buttonElementRef]);
  var buttonElement = customMenuButton !== null && customMenuButton !== void 0 ? customMenuButton : /*#__PURE__*/React.createElement("button", _extends({
    ref: buttonElementRef
  }, buttonProps), menuButtonText);

  /**
   * Keyboard interaction on menu
   * @see https://www.w3.org/TR/wai-aria-practices-1.2/#keyboard-interaction-12
   */
  var handleMenuKeydown = useCallback(function (e) {
    switch (e.key) {
      // Move focus to previous item
      case KEY_VALUES.UP:
        e.preventDefault();
        e.stopPropagation();
        dispatch({
          type: MenuActionTypes.MoveFocus,
          to: MoveFocusTo.Prev
        });
        break;
      // Move focus to next item
      case KEY_VALUES.DOWN:
        e.preventDefault();
        e.stopPropagation();
        dispatch({
          type: MenuActionTypes.MoveFocus,
          to: MoveFocusTo.Next
        });
        break;
      // When focus is in a menu and on a menuitem that has a submenu, opens the submenu and places focus on its first item.
      case KEY_VALUES.RIGHT:
        e.preventDefault();
        e.stopPropagation();
        if (!rtl) {
          if ((activeItem === null || activeItem === void 0 ? void 0 : activeItem.getAttribute('aria-haspopup')) === 'menu') {
            activeItem.click();
          }
        } else if (isSubmenu) {
          dispatch({
            type: MenuActionTypes.CloseMenu
          });
        }
        break;
      // When focus is in a submenu of an item in a menu, closes the submenu and returns focus to the parent menuitem.
      case KEY_VALUES.LEFT:
        e.preventDefault();
        e.stopPropagation();
        if (!rtl) {
          if (isSubmenu) {
            closeMenu(e);
          }
        } else if ((activeItem === null || activeItem === void 0 ? void 0 : activeItem.getAttribute('aria-haspopup')) === 'menu') {
          activeItem.click();
        }
        break;
      // Move focus to the first item
      case KEY_VALUES.HOME:
        e.preventDefault();
        e.stopPropagation();
        dispatch({
          type: MenuActionTypes.MoveFocus,
          to: MoveFocusTo.First
        });
        break;
      // Move focus to the last item
      case KEY_VALUES.END:
        e.preventDefault();
        e.stopPropagation();
        dispatch({
          type: MenuActionTypes.MoveFocus,
          to: MoveFocusTo.Last
        });
        break;
      // - When focus is on a menuitem that has a submenu, opens the submenu and places focus on its first item.
      // - Otherwise, activates the item and closes the menu.
      case KEY_VALUES.ENTER:
      case KEY_VALUES.SPACE:
        if (activeItem) {
          e.preventDefault();
          e.stopPropagation();
          activeItem.click();
          if (!activeItem.getAttribute('aria-haspopup')) {
            closeMenu(e);
          }
        }
        break;
      //  Close the menu that contains focus and return focus to the element or context,
      //  e.g., menu button or parent menuitem, from which the menu was opened.
      case KEY_VALUES.ESC:
        closeMenu(e);
        break;
    }
  }, [dispatch, activeItem, isSubmenu, rtl, closeMenu]);

  // Only used for clicks bubbling from child `menuitem`s.
  var handleMenuClick = useCallback(function (event) {
    var target = getMenuItemTarget(event);
    if (!target) return;

    // Only handle clicks on `menuitem`s
    if (target.getAttribute('role') !== 'menuitem') return;

    // Ignore clicks on `menuitem`s that controls a submenu
    if (target.getAttribute('aria-haspopup') === 'menu') return;

    // Ignore disabled `menuitem`s
    if (target.getAttribute('aria-disabled') === 'true') return;
    closeMenu(event, !isSubmenu);
  }, [closeMenu, isSubmenu]);

  // Ref: https://www.w3.org/TR/wai-aria-practices-1.2/#wai-aria-roles-states-and-properties-13
  var menuAriaAttributes = {
    role: 'menu',
    'aria-labelledby': buttonId,
    'aria-activedescendant': activeItem === null || activeItem === void 0 ? void 0 : activeItem.id
  };
  var menuEventHandlers = {
    onClick: handleMenuClick,
    onKeyDown: handleMenuKeydown
  };
  var menuProps = _extends({
    id: menuId
  }, menuAriaAttributes, menuEventHandlers, {
    tabIndex: 0
  });
  var customMenuPopup = renderMenuPopup === null || renderMenuPopup === void 0 ? void 0 : renderMenuPopup(_extends({}, menuProps, {
    open: open
  }), menuElementRef);

  // fixme Wrong children here
  var menuElement = customMenuPopup !== null && customMenuPopup !== void 0 ? customMenuPopup : /*#__PURE__*/React.createElement("ul", _extends({
    ref: menuElementRef
  }, menuProps, {
    hidden: !open
  }), children);
  var handleMouseEnter = useCallback(function (e) {
    if (!disabled) {
      openMenu(e);
    }
  }, [disabled, openMenu]);
  var handleMouseLeave = useCallback(function (e) {
    if (!disabled) {
      closeMenu(e);
    }
  }, [disabled, closeMenu]);
  var rootElementRef = useRef(null);
  var handleContainerBlur = useCallback(function (event) {
    /* istanbul ignore else */
    if (isFocusLeaving(event)) {
      closeMenu(event, false);
    }
  }, [closeMenu]);
  var rootEventHandlers = {
    onBlur: handleContainerBlur
  };
  if (openMenuOn !== null && openMenuOn !== void 0 && openMenuOn.includes('mouseover')) {
    rootEventHandlers.onMouseEnter = handleMouseEnter;
    rootEventHandlers.onMouseLeave = handleMouseLeave;
  }
  var rootProps = _extends({}, rootEventHandlers, {
    children: /*#__PURE__*/React.createElement(React.Fragment, null, buttonElement, /*#__PURE__*/React.createElement(MenuContext.Provider, {
      value: menu
    }, menuElement)),
    // render props
    open: open
  });
  if (isSubmenu) {
    rootProps.role = 'none presentation';
  }
  return children(rootProps, rootElementRef);
}
Menu.displayName = 'Menu';
Menu.propTypes = {
  children: PropTypes.func.isRequired
};
export default Menu;
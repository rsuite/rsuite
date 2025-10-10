'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _isNil = _interopRequireDefault(require("lodash/isNil"));
var _MenuContext = _interopRequireWildcard(require("./MenuContext"));
var _useMenu = _interopRequireDefault(require("./useMenu"));
var _hooks = require("../hooks");
var _constants = require("../constants");
var _CustomProvider = require("../../CustomProvider");
var _utils = require("../utils");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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
  var buttonElementRef = (0, _react.useRef)(null);
  var menuElementRef = (0, _react.useRef)(null);
  var parentMenu = (0, _react.useContext)(_MenuContext.default);
  var isSubmenu = !!parentMenu;
  var menu = (0, _useMenu.default)({
    open: defaultOpen
  });
  var _menu$ = menu[0],
    openState = _menu$.open,
    items = _menu$.items,
    activeItemIndex = _menu$.activeItemIndex,
    dispatch = menu[1];
  var openControlled = typeof openProp !== 'undefined';
  var open = openControlled ? openProp : openState;
  var _useCustom = (0, _CustomProvider.useCustom)(),
    rtl = _useCustom.rtl;
  var activeItem = (0, _isNil.default)(activeItemIndex) ? null : (_items$activeItemInde = items[activeItemIndex]) === null || _items$activeItemInde === void 0 ? void 0 : _items$activeItemInde.element;
  var _useFocus = (0, _hooks.useFocus)(menuElementRef),
    grabFocus = _useFocus.grab;
  var openMenu = (0, _react.useCallback)(function (event) {
    dispatch({
      type: _MenuContext.MenuActionTypes.OpenMenu
    });
    if (!event.isTrusted) {
      dispatch({
        type: _MenuContext.MenuActionTypes.MoveFocus,
        to: _MenuContext.MoveFocusTo.First
      });
    }
    onToggleMenu === null || onToggleMenu === void 0 || onToggleMenu(true, event);
    grabFocus();
  }, [dispatch, onToggleMenu, grabFocus]);
  var closeMenu = (0, _react.useCallback)(function (event, returnFocusToButton) {
    if (returnFocusToButton === void 0) {
      returnFocusToButton = true;
    }
    dispatch({
      type: _MenuContext.MenuActionTypes.CloseMenu
    });
    dispatch({
      type: _MenuContext.MenuActionTypes.MoveFocus,
      to: _MenuContext.MoveFocusTo.None
    });
    onToggleMenu === null || onToggleMenu === void 0 || onToggleMenu(false, event);
    if (returnFocusToButton) {
      var _buttonElementRef$cur;
      (_buttonElementRef$cur = buttonElementRef.current) === null || _buttonElementRef$cur === void 0 || _buttonElementRef$cur.focus({
        preventScroll: true
      });
    }
  }, [dispatch, onToggleMenu, buttonElementRef]);
  var toggleMenu = (0, _react.useCallback)(function (event) {
    if (!open) {
      openMenu(event);
    } else {
      closeMenu(event);
    }
  }, [open, openMenu, closeMenu]);
  (0, _hooks.useClickOutside)({
    enabled: open,
    isOutside: function isOutside(event) {
      var _buttonElementRef$cur2, _menuElementRef$curre;
      return !((_buttonElementRef$cur2 = buttonElementRef.current) !== null && _buttonElementRef$cur2 !== void 0 && _buttonElementRef$cur2.contains(event.target)) && !((_menuElementRef$curre = menuElementRef.current) !== null && _menuElementRef$curre !== void 0 && _menuElementRef$curre.contains(event.target));
    },
    // fixme if clicking on a focusable element, don't move focus to menu button
    handle: function handle(event) {
      return closeMenu(event, !(0, _utils.isFocusableElement)(event.target));
    }
  });

  /**
   * Keyboard interaction on menu button
   * @see https://www.w3.org/TR/wai-aria-practices-1.2/#keyboard-interaction-13
   */
  var handleButtonKeydown = (0, _react.useCallback)(function (e) {
    switch (e.key) {
      // Open the menu
      case _constants.KEY_VALUES.ENTER:
      case _constants.KEY_VALUES.SPACE:
        e.preventDefault();
        e.stopPropagation();
        if (!open) {
          openMenu(e);
          dispatch({
            type: _MenuContext.MenuActionTypes.MoveFocus,
            to: _MenuContext.MoveFocusTo.First
          });
        } else {
          closeMenu(e);
        }
        break;
      // Open the menu (if closed) and move focus to first item
      // This is mostly useful after opening the menu with click
      case _constants.KEY_VALUES.DOWN:
        e.preventDefault();
        e.stopPropagation();
        if (!open) {
          openMenu(e);
        }
        dispatch({
          type: _MenuContext.MenuActionTypes.MoveFocus,
          to: _MenuContext.MoveFocusTo.First
        });
        break;
    }
  }, [open, openMenu, closeMenu, dispatch]);
  var handleButtonClick = (0, _react.useCallback)(function (event) {
    if (disabled) {
      return;
    }
    toggleMenu(event);
  }, [disabled, toggleMenu]);
  var handleButtonContextMenu = (0, _react.useCallback)(function (event) {
    // prevents default contextmenu
    event.preventDefault();

    // Only opens menu on right click. Left click can close the menu opened by a right click
    if (open) return;
    if (disabled) return;
    openMenu(event);
  }, [open, disabled, openMenu]);
  var buttonEventHandlers = (0, _react.useMemo)(function () {
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
  var buttonId = (0, _hooks.useUniqueId)('menubutton-');
  var menuId = (0, _hooks.useUniqueId)('menu-');
  var buttonAriaAttributes = (0, _react.useMemo)(function () {
    // Ref: https://www.w3.org/TR/wai-aria-practices-1.2/#wai-aria-roles-states-and-properties-14
    return {
      role: 'button',
      'aria-haspopup': 'menu',
      'aria-expanded': open || undefined,
      // it's recommend to remove aria-expanded when menu is hidden
      'aria-controls': menuId
    };
  }, [open, menuId]);
  var buttonProps = (0, _react.useMemo)(function () {
    return (0, _extends2.default)({
      id: buttonId
    }, buttonAriaAttributes, buttonEventHandlers, {
      // render props
      open: open
    });
  }, [buttonId, buttonAriaAttributes, buttonEventHandlers, open]);
  var customMenuButton = (0, _react.useMemo)(function () {
    return renderMenuButton === null || renderMenuButton === void 0 ? void 0 : renderMenuButton(buttonProps, buttonElementRef);
  }, [renderMenuButton, buttonProps, buttonElementRef]);
  var buttonElement = customMenuButton !== null && customMenuButton !== void 0 ? customMenuButton : /*#__PURE__*/_react.default.createElement("button", (0, _extends2.default)({
    ref: buttonElementRef
  }, buttonProps), menuButtonText);

  /**
   * Keyboard interaction on menu
   * @see https://www.w3.org/TR/wai-aria-practices-1.2/#keyboard-interaction-12
   */
  var handleMenuKeydown = (0, _react.useCallback)(function (e) {
    switch (e.key) {
      // Move focus to previous item
      case _constants.KEY_VALUES.UP:
        e.preventDefault();
        e.stopPropagation();
        dispatch({
          type: _MenuContext.MenuActionTypes.MoveFocus,
          to: _MenuContext.MoveFocusTo.Prev
        });
        break;
      // Move focus to next item
      case _constants.KEY_VALUES.DOWN:
        e.preventDefault();
        e.stopPropagation();
        dispatch({
          type: _MenuContext.MenuActionTypes.MoveFocus,
          to: _MenuContext.MoveFocusTo.Next
        });
        break;
      // When focus is in a menu and on a menuitem that has a submenu, opens the submenu and places focus on its first item.
      case _constants.KEY_VALUES.RIGHT:
        e.preventDefault();
        e.stopPropagation();
        if (!rtl) {
          if ((activeItem === null || activeItem === void 0 ? void 0 : activeItem.getAttribute('aria-haspopup')) === 'menu') {
            activeItem.click();
          }
        } else if (isSubmenu) {
          dispatch({
            type: _MenuContext.MenuActionTypes.CloseMenu
          });
        }
        break;
      // When focus is in a submenu of an item in a menu, closes the submenu and returns focus to the parent menuitem.
      case _constants.KEY_VALUES.LEFT:
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
      case _constants.KEY_VALUES.HOME:
        e.preventDefault();
        e.stopPropagation();
        dispatch({
          type: _MenuContext.MenuActionTypes.MoveFocus,
          to: _MenuContext.MoveFocusTo.First
        });
        break;
      // Move focus to the last item
      case _constants.KEY_VALUES.END:
        e.preventDefault();
        e.stopPropagation();
        dispatch({
          type: _MenuContext.MenuActionTypes.MoveFocus,
          to: _MenuContext.MoveFocusTo.Last
        });
        break;
      // - When focus is on a menuitem that has a submenu, opens the submenu and places focus on its first item.
      // - Otherwise, activates the item and closes the menu.
      case _constants.KEY_VALUES.ENTER:
      case _constants.KEY_VALUES.SPACE:
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
      case _constants.KEY_VALUES.ESC:
        closeMenu(e);
        break;
    }
  }, [dispatch, activeItem, isSubmenu, rtl, closeMenu]);

  // Only used for clicks bubbling from child `menuitem`s.
  var handleMenuClick = (0, _react.useCallback)(function (event) {
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
  var menuProps = (0, _extends2.default)({
    id: menuId
  }, menuAriaAttributes, menuEventHandlers, {
    tabIndex: 0
  });
  var customMenuPopup = renderMenuPopup === null || renderMenuPopup === void 0 ? void 0 : renderMenuPopup((0, _extends2.default)({}, menuProps, {
    open: open
  }), menuElementRef);

  // fixme Wrong children here
  var menuElement = customMenuPopup !== null && customMenuPopup !== void 0 ? customMenuPopup : /*#__PURE__*/_react.default.createElement("ul", (0, _extends2.default)({
    ref: menuElementRef
  }, menuProps, {
    hidden: !open
  }), children);
  var handleMouseEnter = (0, _react.useCallback)(function (e) {
    if (!disabled) {
      openMenu(e);
    }
  }, [disabled, openMenu]);
  var handleMouseLeave = (0, _react.useCallback)(function (e) {
    if (!disabled) {
      closeMenu(e);
    }
  }, [disabled, closeMenu]);
  var rootElementRef = (0, _react.useRef)(null);
  var handleContainerBlur = (0, _react.useCallback)(function (event) {
    /* istanbul ignore else */
    if ((0, _utils.isFocusLeaving)(event)) {
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
  var rootProps = (0, _extends2.default)({}, rootEventHandlers, {
    children: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, buttonElement, /*#__PURE__*/_react.default.createElement(_MenuContext.default.Provider, {
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
  children: _propTypes.default.func.isRequired
};
var _default = exports.default = Menu;
'use client';
// Headless ARIA `menubar`
import React, { useCallback, useRef } from 'react';
import isNil from 'lodash/isNil';
import useMenu from "./useMenu.js";
import MenuContext, { MenuActionTypes, MoveFocusTo } from "./MenuContext.js";
import { KEY_VALUES } from "../constants/index.js";
import { useCustom } from "../../CustomProvider/index.js";
import { isFocusEntering, isFocusLeaving, isFocusableElement } from "../utils/index.js";
/**
 * @private
 */
export default function Menubar(_ref) {
  var _items$activeItemInde3;
  var _ref$vertical = _ref.vertical,
    vertical = _ref$vertical === void 0 ? false : _ref$vertical,
    children = _ref.children,
    onActivateItem = _ref.onActivateItem;
  var menubar = useMenu({
    role: 'menubar'
  });
  var _menubar$ = menubar[0],
    items = _menubar$.items,
    activeItemIndex = _menubar$.activeItemIndex,
    dispatch = menubar[1];
  var menubarElementRef = useRef(null);
  var onFocus = useCallback(function (event) {
    // Focus moves inside Menubar
    if (isFocusEntering(event) &&
    // Skip if focus is moving to a focusable element within this menu
    !(event.target !== event.currentTarget && isFocusableElement(event.target))) {
      var disabled = event.target.getAttribute('aria-disabled');

      // Skip if the item is disabled
      if (activeItemIndex === null && disabled !== 'true') {
        dispatch({
          type: MenuActionTypes.MoveFocus,
          to: MoveFocusTo.First
        });
      }
    }
  }, [activeItemIndex, dispatch]);
  var onBlur = useCallback(function (event) {
    // Focus moves outside of Menubar
    if (isFocusLeaving(event)) {
      dispatch({
        type: MenuActionTypes.MoveFocus,
        to: MoveFocusTo.None
      });
    }
  }, [dispatch]);
  var _useCustom = useCustom(),
    rtl = _useCustom.rtl;
  var onKeyDown = useCallback(function (event) {
    var _items$activeItemInde, _items$activeItemInde2;
    var activeItemElement = isNil(activeItemIndex) ? null : (_items$activeItemInde = (_items$activeItemInde2 = items[activeItemIndex]) === null || _items$activeItemInde2 === void 0 ? void 0 : _items$activeItemInde2.element) !== null && _items$activeItemInde !== void 0 ? _items$activeItemInde : null;
    switch (true) {
      case !vertical && !rtl && event.key === KEY_VALUES.RIGHT:
      case !vertical && rtl && event.key === KEY_VALUES.LEFT:
      case vertical && event.key === KEY_VALUES.DOWN:
        event.preventDefault();
        event.stopPropagation();
        dispatch({
          type: MenuActionTypes.MoveFocus,
          to: MoveFocusTo.Next
        });
        break;
      case !vertical && !rtl && event.key === KEY_VALUES.LEFT:
      case !vertical && rtl && event.key === KEY_VALUES.RIGHT:
      case vertical && event.key === KEY_VALUES.UP:
        event.preventDefault();
        event.stopPropagation();
        dispatch({
          type: MenuActionTypes.MoveFocus,
          to: MoveFocusTo.Prev
        });
        break;
      case event.key === KEY_VALUES.HOME:
        event.preventDefault();
        event.stopPropagation();
        dispatch({
          type: MenuActionTypes.MoveFocus,
          to: MoveFocusTo.First
        });
        break;
      case event.key === KEY_VALUES.END:
        event.preventDefault();
        event.stopPropagation();
        dispatch({
          type: MenuActionTypes.MoveFocus,
          to: MoveFocusTo.Last
        });
        break;
      case !vertical && event.key === KEY_VALUES.DOWN:
      case vertical && !rtl && event.key === KEY_VALUES.RIGHT:
      case vertical && rtl && event.key === KEY_VALUES.LEFT:
        if ((activeItemElement === null || activeItemElement === void 0 ? void 0 : activeItemElement.getAttribute('aria-haspopup')) === 'menu') {
          event.preventDefault();
          event.stopPropagation();
          activeItemElement.click();
        }
        break;
      case event.key === KEY_VALUES.ENTER:
      case event.key === KEY_VALUES.SPACE:
        event.preventDefault();
        event.stopPropagation();
        activeItemElement === null || activeItemElement === void 0 || activeItemElement.click();
        break;
    }
  }, [rtl, items, activeItemIndex, dispatch, vertical]);

  // Only used for handling click events bubbling from children
  // Which indicates that a child menuitem is being activated
  var onClick = useCallback(function (event) {
    if (items.some(function (item) {
      return item.element === event.target;
    })) {
      onActivateItem === null || onActivateItem === void 0 || onActivateItem(event);
    }
  }, [items, onActivateItem]);
  return /*#__PURE__*/React.createElement(MenuContext.Provider, {
    value: menubar
  }, children({
    role: 'menubar',
    tabIndex: 0,
    onFocus: onFocus,
    onBlur: onBlur,
    onKeyDown: onKeyDown,
    onClick: onClick,
    'aria-activedescendant': isNil(activeItemIndex) ? undefined : (_items$activeItemInde3 = items[activeItemIndex]) === null || _items$activeItemInde3 === void 0 ? void 0 : _items$activeItemInde3.element.id,
    'aria-orientation': vertical ? 'vertical' : undefined // implicitly set 'horizontal'
  }, menubarElementRef));
}
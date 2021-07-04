// Headless ARIA `menubar`
import React, { useCallback, useRef } from 'react';
import MenuContext, { MenuActionTypes, MoveFocusTo } from '../Dropdown/MenuContext';
import { KEY_VALUES, useCustom } from '../utils';
import { isFocusEntering, isFocusLeaving } from '../utils/events';
import useMenu from '../Dropdown/useMenu';

export interface MenubarProps {
  children: (menubar: React.HTMLAttributes<HTMLUListElement>) => React.ReactElement;
}

export default function Menubar({ children }: MenubarProps) {
  const menubar = useMenu();
  const [{ items, activeItemIndex }, dispatch] = menubar;

  const menubarElementRef = useRef<HTMLUListElement>();

  const onFocus = useCallback(
    (event: React.FocusEvent) => {
      // Focus moves inside Menubar
      if (isFocusEntering(event)) {
        if (activeItemIndex === null) {
          dispatch({ type: MenuActionTypes.MoveFocus, to: MoveFocusTo.First });
        }
      }
    },
    [activeItemIndex, dispatch]
  );

  const onBlur = useCallback(
    (event: React.FocusEvent) => {
      // Focus moves outside of Menubar
      if (isFocusLeaving(event)) {
        dispatch({ type: MenuActionTypes.MoveFocus, to: MoveFocusTo.None });
      }
    },
    [dispatch]
  );

  const { rtl } = useCustom('Menubar');

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLUListElement>) => {
      const activeItem = items[activeItemIndex];
      switch (event.key) {
        case KEY_VALUES.RIGHT:
          event.preventDefault();
          event.stopPropagation();
          dispatch({
            type: MenuActionTypes.MoveFocus,
            to: !rtl ? MoveFocusTo.Next : MoveFocusTo.Prev
          });
          break;
        case KEY_VALUES.LEFT:
          event.preventDefault();
          event.stopPropagation();
          dispatch({
            type: MenuActionTypes.MoveFocus,
            to: !rtl ? MoveFocusTo.Prev : MoveFocusTo.Next
          });
          break;
        case KEY_VALUES.HOME:
          event.preventDefault();
          event.stopPropagation();
          dispatch({
            type: MenuActionTypes.MoveFocus,
            to: MoveFocusTo.First
          });
          break;
        case KEY_VALUES.END:
          event.preventDefault();
          event.stopPropagation();
          dispatch({
            type: MenuActionTypes.MoveFocus,
            to: MoveFocusTo.Last
          });
          break;
        case KEY_VALUES.DOWN:
          if (activeItem?.element.getAttribute('aria-haspopup') === 'menu') {
            event.preventDefault();
            event.stopPropagation();
            activeItem.element.click();
          }
          break;
        case KEY_VALUES.ENTER:
        case KEY_VALUES.SPACE:
          event.preventDefault();
          event.stopPropagation();
          activeItem?.element.click();
          break;
      }
    },
    [rtl, items, activeItemIndex, dispatch]
  );

  const element = children({
    role: 'menubar',
    tabIndex: 0,
    onFocus,
    onBlur,
    onKeyDown,
    'aria-activedescendant': items[activeItemIndex]?.element.id
  });

  return (
    <MenuContext.Provider value={menubar}>
      {React.cloneElement(element, {
        ref: menubarElementRef
      })}
    </MenuContext.Provider>
  );
}

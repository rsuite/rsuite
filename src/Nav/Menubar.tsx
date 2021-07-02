// Headless ARIA `menubar`
import React, { useCallback, useRef } from 'react';
import MenubarContext, { MenubarActionTypes, MoveFocusTo } from './MenubarContext';
import useMenubar from './useMenubar';
import { KEY_VALUES, useCustom } from '../utils';
import { isFocusEntering, isFocusLeaving } from '../utils/events';

export interface MenubarProps {
  children: (menubar: React.HTMLAttributes<HTMLUListElement>) => React.ReactElement;
}

export default function Menubar({ children }: MenubarProps) {
  const menubar = useMenubar();
  const [{ items, activeItemIndex }, dispatch] = menubar;

  const menubarElementRef = useRef<HTMLUListElement>();

  const onFocus = useCallback(
    (event: React.FocusEvent) => {
      // Focus moves inside Menubar
      if (isFocusEntering(event)) {
        if (activeItemIndex === null) {
          dispatch({ type: MenubarActionTypes.MoveFocus, to: MoveFocusTo.First });
        }
      }
    },
    [activeItemIndex, dispatch]
  );

  const onBlur = useCallback(
    (event: React.FocusEvent) => {
      // Focus moves outside of Menubar
      if (isFocusLeaving(event)) {
        dispatch({ type: MenubarActionTypes.MoveFocus, to: MoveFocusTo.None });
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
            type: MenubarActionTypes.MoveFocus,
            to: !rtl ? MoveFocusTo.Next : MoveFocusTo.Prev
          });
          break;
        case KEY_VALUES.LEFT:
          event.preventDefault();
          event.stopPropagation();
          dispatch({
            type: MenubarActionTypes.MoveFocus,
            to: !rtl ? MoveFocusTo.Prev : MoveFocusTo.Next
          });
          break;
        case KEY_VALUES.HOME:
          event.preventDefault();
          event.stopPropagation();
          dispatch({
            type: MenubarActionTypes.MoveFocus,
            to: MoveFocusTo.First
          });
          break;
        case KEY_VALUES.END:
          event.preventDefault();
          event.stopPropagation();
          dispatch({
            type: MenubarActionTypes.MoveFocus,
            to: MoveFocusTo.Last
          });
          break;
        case KEY_VALUES.ENTER:
          event.preventDefault();
          event.stopPropagation();
          if (activeItem?.element.getAttribute('aria-haspopup') === 'menu') {
            activeItem?.element.click();
          }
          break;
      }
    },
    [items, activeItemIndex, dispatch]
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
    <MenubarContext.Provider value={menubar}>
      {React.cloneElement(element, {
        ref: menubarElementRef
      })}
    </MenubarContext.Provider>
  );
}

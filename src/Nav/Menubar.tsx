// Headless ARIA `menubar`
import React, { useCallback } from 'react';
import MenubarContext, { MenubarActionTypes, MoveFocusTo } from './MenubarContext';
import useMenubar from './useMenubar';
import { KEY_VALUES, useCustom } from '../utils';

export interface MenubarProps {
  children: (menubar: React.HTMLAttributes<HTMLUListElement>) => React.ReactElement;
}

export default function Menubar({ children }: MenubarProps) {
  const menubar = useMenubar();
  const [{ items, activeItemIndex }, dispatch] = menubar;

  const onFocus = useCallback(() => {
    dispatch({ type: MenubarActionTypes.MoveFocus, to: MoveFocusTo.First });
  }, [dispatch]);

  const onBlur = useCallback(() => {
    dispatch({ type: MenubarActionTypes.MoveFocus, to: MoveFocusTo.None });
  }, [dispatch]);

  const { rtl } = useCustom('Menubar');

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLUListElement>) => {
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
      }
    },
    [dispatch]
  );

  const element = children({
    role: 'menubar',
    tabIndex: 0,
    onFocus,
    onBlur,
    onKeyDown,
    'aria-activedescendant': items[activeItemIndex]?.element.id
  });

  return <MenubarContext.Provider value={menubar}>{element}</MenubarContext.Provider>;
}

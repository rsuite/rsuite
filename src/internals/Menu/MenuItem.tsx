import React, { useCallback, useContext, useEffect, useRef } from 'react';
import isNil from 'lodash/isNil';
import { useUniqueId } from '../hooks';
import MenuContext, { MenuActionTypes, MoveFocusTo } from './MenuContext';

export interface MenuItemProps {
  /** Active the current option */
  selected?: boolean;

  /** Disable the current option */
  disabled?: boolean;

  /** Render prop */
  children: (
    menuitem: React.LiHTMLAttributes<HTMLLIElement> & MenuitemRenderProps,
    ref: React.Ref<HTMLLIElement>
  ) => React.ReactElement;

  /** Callback when menuitem is being activated */
  onActivate?: React.MouseEventHandler;
}

export interface MenuitemRenderProps {
  selected: boolean;
  active: boolean;
}

/**
 * Headless ARIA `menuitem`
 * @private
 */
function MenuItem(props: MenuItemProps) {
  const { children, selected = false, disabled = false, onActivate } = props;

  const menuitemRef = useRef<HTMLLIElement>(null);
  const menuitemId = useUniqueId('menuitem-');

  const menu = useContext(MenuContext);

  if (!menu) {
    throw new Error('<MenuItem> must be rendered within a <Menu>');
  }

  const [menuState, dispatch] = menu;

  // Whether this menuitem has focus (indicated by `aria-activedescendant` from parent menu)
  const hasFocus =
    !isNil(menuitemRef.current) &&
    !isNil(menuState.activeItemIndex) &&
    menuState.items[menuState.activeItemIndex]?.element === menuitemRef.current;

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLLIElement>) => {
      if (disabled) {
        return;
      }

      onActivate?.(event);
    },
    [disabled, onActivate]
  );

  // Gain/release focus on mousedown in `menubar`

  const handleMouseDown = useCallback(() => {
    if (!isNil(menuitemRef.current) && !hasFocus) {
      dispatch({
        type: MenuActionTypes.MoveFocus,
        to: MoveFocusTo.Specific,
        id: menuitemRef.current.id
      });
    }
  }, [dispatch, hasFocus]);

  // Gain/release focus on mouseenter/mouseleave in `menu`
  const handleMouseMove = useCallback(() => {
    if (!isNil(menuitemRef.current) && !hasFocus) {
      dispatch({
        type: MenuActionTypes.MoveFocus,
        to: MoveFocusTo.Specific,
        id: menuitemRef.current.id
      });
    }
  }, [hasFocus, dispatch]);

  const handleMouseLeave = useCallback(() => {
    dispatch({
      type: MenuActionTypes.MoveFocus,
      to: MoveFocusTo.None
    });
  }, [dispatch]);

  useEffect(() => {
    const menuitemElement = menuitemRef.current;

    if (menuitemElement) {
      dispatch({
        type: MenuActionTypes.RegisterItem,
        element: menuitemElement,
        props: { disabled }
      });

      return () => {
        dispatch({ type: MenuActionTypes.UnregisterItem, id: menuitemElement.id });
      };
    }
  }, [menuitemRef, disabled, dispatch]);

  const menuitemProps: React.LiHTMLAttributes<HTMLLIElement> & MenuitemRenderProps = {
    id: menuitemId,
    role: 'menuitem',
    // fixme Only use `aria-checked` on menuitemradio and menuitemcheckbox
    'aria-checked': selected || undefined,
    'aria-disabled': disabled,
    tabIndex: -1,
    onClick: handleClick,
    // render props

    selected,
    active: hasFocus
  };

  // Only move focus on hover in a `menu`, not `menubar`
  if (menuState?.role === 'menu') {
    menuitemProps.onMouseMove = handleMouseMove;
    menuitemProps.onMouseLeave = handleMouseLeave;
  }

  if (menuState?.role === 'menubar') {
    menuitemProps.onMouseDown = handleMouseDown;
    menuitemProps.onMouseOver = handleMouseMove;
    menuitemProps.onMouseLeave = handleMouseLeave;
  }

  return children(menuitemProps, menuitemRef);
}

MenuItem.displayName = 'MenuItem';

export default MenuItem;

import React, { useCallback, useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import useUniqueId from '../utils/useUniqueId';
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
  onActivate?: (event: React.SyntheticEvent<HTMLElement>) => void;
}

export interface MenuitemRenderProps {
  selected: boolean;
  active: boolean;
}

/**
 * Headless ARIA `menuitem`
 */
function MenuItem(props: MenuItemProps) {
  const { children, selected, disabled, onActivate } = props;

  const menuitemRef = useRef<HTMLLIElement>();
  const menuitemId = useUniqueId('menuitem-');

  const menu = useContext(MenuContext);
  // fixme make sure <MenuItem> is used inside a <Menu>
  const [menuState, dispatch] = menu ?? [];

  // Whether this menuitem has focus (indicated by `aria-activedescendant` from parent menu)
  const hasFocus = menuState?.items[menuState?.activeItemIndex]?.element === menuitemRef.current;

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLLIElement>) => {
      if (disabled) {
        return;
      }

      onActivate?.(event);
      dispatch?.({
        type: MenuActionTypes.CloseMenu
      });
    },
    [disabled, onActivate, dispatch]
  );

  // Gain/release focus on mouseenter/mouseleave
  const handleMouseEnter = useCallback(() => {
    dispatch({
      type: MenuActionTypes.MoveFocus,
      to: MoveFocusTo.Specific,
      id: menuitemRef.current.id
    });
  }, [dispatch, menuitemRef]);

  const handleMouseLeave = useCallback(() => {
    dispatch({
      type: MenuActionTypes.MoveFocus,
      to: MoveFocusTo.None
    });
  }, [dispatch]);

  useEffect(() => {
    const menuitemElement = menuitemRef.current;

    dispatch?.({
      type: MenuActionTypes.RegisterItem,
      element: menuitemElement,
      props: { disabled }
    });
    return () => {
      dispatch?.({ type: MenuActionTypes.UnregisterItem, id: menuitemElement.id });
    };
  }, [menuitemRef, disabled, dispatch]);

  return children(
    {
      id: menuitemId,
      role: 'menuitem',
      // fixme use aria-checked instead of aria-selected, and only use them on menuitemradio and menuitemcheckbox
      'aria-selected': selected,
      'aria-disabled': disabled,
      tabIndex: -1,
      onClick: handleClick,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      // render props

      selected,
      active: hasFocus
    },
    menuitemRef
  );
}

MenuItem.displayName = 'MenuItem';
MenuItem.propTypes = {
  selected: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.func.isRequired,
  onActivate: PropTypes.func
};

export default MenuItem;

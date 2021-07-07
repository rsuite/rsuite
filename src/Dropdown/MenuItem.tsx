import React, { useCallback, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createChainedFunction, useClassNames } from '../utils';
import { SidenavContext } from '../Sidenav/Sidenav';
import { RsRefForwardingComponent, WithAsProps } from '../@types/common';
import { IconProps } from '@rsuite/icons/lib/Icon';
import useUniqueId from '../utils/useUniqueId';
import MenuContext, { MenuActionTypes, MoveFocusTo } from './MenuContext';
import useEnsuredRef from '../utils/useEnsuredRef';
import useCustom from '../utils/useCustom';

export interface DropdownMenuItemProps extends WithAsProps, React.HTMLAttributes<HTMLElement> {
  /** Active the current option */
  selected?: boolean;

  /** Whether to display the divider */
  divider?: boolean;

  /** Disable the current option */
  disabled?: boolean;

  /** Displays a custom panel */
  panel?: boolean;

  /** Set the icon */
  icon?: React.ReactElement<IconProps>;

  /**
   * Whether the submenu is opened.
   * @internal Only used when menuitem is used as a menu button (of its submenu)
   */
  open?: boolean;

  /** Whether the submenu is expanded, used in Sidenav. */
  expanded?: boolean;

  /** Callback when menuitem is being activated */
  onActivate?: (event: React.SyntheticEvent<HTMLElement>) => void;
}

const defaultProps: Partial<DropdownMenuItemProps> = {
  as: 'li',
  classPrefix: 'dropdown-item'
};

const MenuItem: RsRefForwardingComponent<'li', DropdownMenuItemProps> = React.forwardRef(
  (props: DropdownMenuItemProps, ref: React.Ref<any>) => {
    const {
      as: Component,
      children,
      divider,
      panel,
      selected,
      disabled,
      className,
      style,
      classPrefix,
      tabIndex,
      icon,
      expanded,
      onClick,
      onActivate,
      open,

      // Event handlers that we control
      onMouseEnter,
      onMouseLeave,
      ...rest
    } = props;

    const { merge, withClassPrefix, prefix } = useClassNames(classPrefix);

    const menuitemRef = useEnsuredRef<HTMLLIElement>(ref);
    const menuitemId = useUniqueId(prefix`-`);

    const menu = useContext(MenuContext);
    const [menuState, dispatch] = menu ?? [];

    const { sidenav, expanded: sidenavExpanded } = useContext(SidenavContext) || {};

    // Whether this menuitem has focus (indicated by `aria-activedescendant` from parent menu)
    const hasFocus = menuState?.items[menuState?.activeItemIndex]?.element === menuitemRef.current;

    const { rtl } = useCustom('DropdownMenu');

    const hasSubmenu = !!props['aria-haspopup'];

    const classes = merge(
      className,
      withClassPrefix({
        [`pull-${rtl ? 'left' : 'right'}`]: hasSubmenu,
        [expanded || sidenavExpanded ? 'expand' : 'collapse']: hasSubmenu && sidenav,
        'with-icon': icon,
        open,
        toggle: hasSubmenu,
        submenu: hasSubmenu,
        active: selected,
        disabled,
        focus: hasFocus
      })
    );

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
    const handleMouseEnter = useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        dispatch({
          type: MenuActionTypes.MoveFocus,
          to: MoveFocusTo.Specific,
          id: menuitemRef.current.id
        });

        onMouseEnter?.(event);
      },
      [dispatch, menuitemRef, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        dispatch({
          type: MenuActionTypes.MoveFocus,
          to: MoveFocusTo.None
        });

        onMouseLeave?.(event);
      },
      [dispatch, onMouseLeave]
    );

    const menuitemEventHandlers: React.LiHTMLAttributes<HTMLLIElement> = {
      onClick: createChainedFunction(handleClick, onClick),
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave
    };

    useEffect(() => {
      // Don't register separator items and panels
      // They aren't keyboard navigable
      if (!divider && !panel) {
        dispatch?.({
          type: MenuActionTypes.RegisterItem,
          element: menuitemRef.current,
          props: { disabled }
        });
      }
      return () => {
        dispatch?.({ type: MenuActionTypes.UnregisterItem, id: menuitemId });
      };
    }, [menuitemRef, menuitemId, disabled, divider, panel, dispatch]);

    if (divider) {
      return (
        <Component
          ref={menuitemRef}
          id={menuitemId}
          role="separator"
          style={style}
          className={merge(prefix('divider'), className)}
        />
      );
    }

    if (panel) {
      return (
        <Component
          ref={menuitemRef}
          id={menuitemId}
          role="none presentation"
          style={style}
          className={merge(prefix('panel'), className)}
        >
          {children}
        </Component>
      );
    }

    const menuitemAriaAttributes: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLLIElement>,
      HTMLLIElement
    > = {
      role: 'menuitem',
      'aria-selected': selected,
      'aria-disabled': disabled
    };

    return (
      <Component
        ref={menuitemRef}
        id={menuitemId}
        {...rest}
        tabIndex={disabled ? -1 : tabIndex}
        style={style}
        className={classes}
        {...menuitemAriaAttributes}
        {...menuitemEventHandlers}
      >
        {icon && React.cloneElement(icon, { className: prefix('menu-icon') })}
        {children}
      </Component>
    );
  }
);

MenuItem.displayName = 'MenuItem';
MenuItem.defaultProps = defaultProps;
MenuItem.propTypes = {
  as: PropTypes.elementType,
  divider: PropTypes.bool,
  panel: PropTypes.bool,
  open: PropTypes.bool,
  expanded: PropTypes.bool,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  icon: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
  classPrefix: PropTypes.string,
  tabIndex: PropTypes.number
};

export default MenuItem;

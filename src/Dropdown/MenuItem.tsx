import React, { useContext, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash/isNil';
import { isOneOf, createChainedFunction, useClassNames, useControlled, KEY_VALUES } from '../utils';
import { SidenavContext } from '../Sidenav/Sidenav';
import { WithAsProps, RsRefForwardingComponent } from '../@types/common';
import { IconProps } from '@rsuite/icons/lib/Icon';
import useUniqueId from '../utils/useUniqueId';
import MenuContext from './MenuContext';
import DropdownContext from './DropdownContext';
import useEnsuredRef from '../utils/useEnsuredRef';
import MenuControlContext from './MenuControlContext';
import useMenuControl from './useMenuControl';

export interface DropdownMenuItemProps<T = any>
  extends WithAsProps,
    Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'> {
  /** Active the current option */
  active?: boolean;

  /** Primary content */
  children?: React.ReactNode;

  /** You can use a custom element for this component */
  as?: React.ElementType;

  /** Whether to display the divider */
  divider?: boolean;

  /** Disable the current option */
  disabled?: boolean;

  /** The value of the current option */
  eventKey?: T;

  /** Displays a custom panel */
  panel?: boolean;

  /** Set the icon */
  icon?: React.ReactElement<IconProps>;

  /** The submenu that this menuitem controls (if exists) */
  submenu?: React.ReactElement;

  /** The sub-level menu appears from the right side by default, and when `pullLeft` is set, it appears from the left. */
  pullLeft?: boolean;

  /** Triggering event for submenu expansion. */
  trigger?: 'hover' | 'click';

  /** Whether the submenu is opened. */
  open?: boolean;

  /** Whether the submenu is expanded, used in Sidenav. */
  expanded?: boolean;

  /** Select the callback function for the current option  */
  onSelect?: (eventKey: T, event: React.SyntheticEvent<HTMLElement>) => void;
}

const defaultProps: Partial<DropdownMenuItemProps> = {
  as: 'li',
  classPrefix: 'dropdown-item',
  trigger: 'hover'
};

const MenuItem: RsRefForwardingComponent<'li', DropdownMenuItemProps> = React.forwardRef(
  (props: DropdownMenuItemProps, ref: React.Ref<any>) => {
    const {
      as: Component,
      children,
      divider,
      panel,
      active: activeProp,
      disabled,
      className,
      submenu,
      style,
      classPrefix,
      tabIndex,
      pullLeft,
      icon,
      trigger,
      open: openProp,
      expanded: expandedProp,
      eventKey,
      onClick,
      onMouseOver,
      onMouseOut,
      onSelect,
      ...rest
    } = props;

    const { merge, withClassPrefix, prefix } = useClassNames(classPrefix);

    const menuitemRef = useEnsuredRef<HTMLLIElement>(ref);
    const menuitemId = useUniqueId(prefix`-`);
    const submenuRef = useRef<HTMLUListElement>();

    const dropdown = useContext(DropdownContext);
    const menu = useContext(MenuContext);
    const menuControl = useContext(MenuControlContext);
    const submenuControl = useMenuControl(submenuRef);

    const { sidenav, expanded } = useContext(SidenavContext) || {};
    const [open, setOpen] = useControlled(openProp, menu?.openKeys?.includes(eventKey) ?? false);

    const active =
      activeProp ||
      (!isNil(menu?.activeKey) && menu.activeKey === eventKey) ||
      (!isNil(dropdown.activeKey) && dropdown.activeKey === eventKey);

    // Whether this menuitem has focus
    const focus = menuControl?.items[menuControl?.activeItemIndex] === menuitemRef.current;

    /**
     * Keyboard interaction on menu
     * @see https://www.w3.org/TR/wai-aria-practices-1.2/#keyboard-interaction-12
     */
    const handleSubmenuKeydown = useCallback(
      (e: React.KeyboardEvent<HTMLUListElement>) => {
        switch (e.key) {
          // Close the menu
          case KEY_VALUES.ESC:
            e.preventDefault();
            e.stopPropagation();
            setOpen(false);
            menuControl?.focusItem(menuitemRef.current);
            break;
          default:
            break;
        }
      },
      [menuControl?.focusItem]
    );

    const classes = merge(
      className,
      withClassPrefix({
        [`pull-${pullLeft ? 'left' : 'right'}`]: submenu,
        [expandedProp || expanded ? 'expand' : 'collapse']: submenu && sidenav,
        'with-icon': icon,
        open,
        submenu,
        active,
        disabled,
        focus
      })
    );

    const openSubmenuIfExists = useCallback(() => {
      if (!submenu) return;

      setOpen(true);

      submenuControl.focusItemAt(0);
    }, [submenu, submenuControl]);

    const activate = useCallback(
      (event?: React.SyntheticEvent<HTMLLIElement>) => {
        onSelect?.(eventKey, event);
        menu?.onSelect?.(eventKey, event);
      },
      [eventKey, onSelect, menu?.onSelect]
    );

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLLIElement>) => {
        event.preventDefault();
        event.stopPropagation();

        if (disabled) {
          return;
        }

        if (submenu) {
          openSubmenuIfExists();
        } else {
          activate();
        }
      },
      [disabled, open, submenu, openSubmenuIfExists, activate]
    );

    const handleMouseOver = useCallback(() => {
      setOpen(true);
    }, [setOpen]);

    const handleMouseOut = useCallback(() => {
      setOpen(false);
    }, [setOpen]);

    const itemEventProps: React.LiHTMLAttributes<HTMLLIElement> = {};

    if (isOneOf('hover', trigger) && submenu && !expanded) {
      itemEventProps.onMouseOver = createChainedFunction(handleMouseOver, onMouseOver);
      itemEventProps.onMouseOut = createChainedFunction(handleMouseOut, onMouseOut);
    }

    useEffect(() => {
      menuControl?.registerItem(menuitemRef.current);
    }, []);

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

    /**
     * Apply aria attributes if submenu exists
     */
    function renderChildren() {
      if (!React.isValidElement(children)) return children;

      const ariaAttributes: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
      > = {};

      if (submenu) {
        ariaAttributes.id = menuitemId;
        ariaAttributes['aria-haspopup'] = 'menu';
        ariaAttributes['aria-expanded'] = open;
        ariaAttributes.tabIndex = disabled ? -1 : focus ? 0 : -1;
      }

      return React.cloneElement(children, ariaAttributes);
    }

    function renderSubmenu() {
      if (!submenu) return null;

      return (
        <MenuControlContext.Provider value={submenuControl}>
          {React.cloneElement(submenu, {
            ref: submenuRef,
            'aria-labelledby': menuitemId,
            hidden: !open,
            onKeyDown: handleSubmenuKeydown
          })}
        </MenuControlContext.Provider>
      );
    }

    const ariaAttributes: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLLIElement>,
      HTMLLIElement
    > = {
      role: !submenu ? 'menuitem' : 'none presentation',
      'aria-disabled': disabled
    };

    // Too aggressive for now
    // if (active) {
    //   ariaAttributes.role = 'menuitemcheckbox';
    //   ariaAttributes['aria-checked'] = true;
    // }

    return (
      <Component
        id={menuitemId}
        {...ariaAttributes}
        {...rest}
        {...itemEventProps}
        tabIndex={disabled ? -1 : tabIndex}
        ref={menuitemRef}
        style={style}
        className={classes}
        onClick={createChainedFunction(handleClick, onClick)}
      >
        {icon && React.cloneElement(icon, { className: prefix('menu-icon') })}
        {renderChildren()}
        {renderSubmenu()}
      </Component>
    );
  }
);

MenuItem.displayName = 'DropdownMenuItem';
MenuItem.defaultProps = defaultProps;
MenuItem.propTypes = {
  as: PropTypes.elementType,
  divider: PropTypes.bool,
  panel: PropTypes.bool,
  trigger: PropTypes.oneOfType([PropTypes.array, PropTypes.oneOf(['click', 'hover'])]),
  open: PropTypes.bool,
  expanded: PropTypes.bool,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  pullLeft: PropTypes.bool,
  submenu: PropTypes.element,
  onSelect: PropTypes.func,
  onClick: PropTypes.func,
  icon: PropTypes.node,
  eventKey: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
  classPrefix: PropTypes.string,
  tabIndex: PropTypes.number
};

export default MenuItem;

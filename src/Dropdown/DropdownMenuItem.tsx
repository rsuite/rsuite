import React, { useContext, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash/isNil';
import { isOneOf, createChainedFunction, useClassNames, useControlled } from '../utils';
import { SidenavContext } from '../Sidenav/Sidenav';
import { WithAsProps, RsRefForwardingComponent } from '../@types/common';
import { IconProps } from '@rsuite/icons/lib/Icon';
import useUniqueId from '../utils/useUniqueId';
import MenuContext from './MenuContext';
import DropdownContext from './DropdownContext';
import useEnsuredRef from '../utils/useEnsuredRef';

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

const DropdownMenuItem: RsRefForwardingComponent<'a', DropdownMenuItemProps> = React.forwardRef(
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

    const menuitemRef = useEnsuredRef(ref);
    const menuitemId = useUniqueId(prefix`-`);

    const dropdown = useContext(DropdownContext);
    const menu = useContext(MenuContext);

    const { sidenav, expanded } = useContext(SidenavContext) || {};
    const [open, setOpen] = useControlled(openProp, menu?.openKeys?.includes(eventKey) ?? false);

    const active =
      activeProp ||
      (!isNil(menu?.activeKey) && menu.activeKey === eventKey) ||
      (!isNil(dropdown.activeKey) && dropdown.activeKey === eventKey);

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
        focus: menu?.activeDescendantId === menuitemId
      })
    );

    const handleClick = useCallback(
      (event: React.SyntheticEvent<any>) => {
        if (disabled) {
          event.preventDefault();
          return;
        }

        if (isOneOf('click', trigger) && submenu) {
          setOpen(!open);
        }

        onSelect?.(eventKey, event);
        menu?.onSelect?.(eventKey, event);
      },
      [disabled, open, eventKey, trigger, submenu, setOpen, onSelect, menu?.onSelect]
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
      menu?.onItemRendered(menuitemRef.current);
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
        <div
          ref={menuitemRef}
          id={menuitemId}
          role="menuitem"
          style={style}
          className={merge(prefix('panel'), className)}
        >
          {children}
        </div>
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
      }

      return React.cloneElement(children, ariaAttributes);
    }

    /**
     * Apply aria attributes on submenu if exists
     */
    function renderSubmenu() {
      if (!submenu || !React.isValidElement(submenu)) return null;

      const ariaAttributes: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
      > = {
        'aria-labelledby': menuitemId
      };

      return React.cloneElement(submenu, ariaAttributes);
    }

    const ariaAttributes: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLLIElement>,
      HTMLLIElement
    > = {
      role: 'menuitem',
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

DropdownMenuItem.displayName = 'DropdownMenuItem';
DropdownMenuItem.defaultProps = defaultProps;
DropdownMenuItem.propTypes = {
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

export default DropdownMenuItem;

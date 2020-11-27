import React, { useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import SafeAnchor from '../SafeAnchor';
import { isOneOf, createChainedFunction, useClassNames, useControlled } from '../utils';
import { SidenavContext } from '../Sidenav/Sidenav';
import { WithAsProps, RsRefForwardingComponent } from '../@types/common';
import { IconProps } from '@rsuite/icons';

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

  /** Whether it is a submenu. */
  submenu?: boolean;

  /** The sub-level menu appears from the right side by default, and when `pullLeft` is set, it appears from the left. */
  pullLeft?: boolean;

  /** Triggering event for submenu expansion. */
  trigger?: 'hover' | 'click';

  /** Whether the submenu is opened. */
  open?: boolean;

  /** Whether the submenu is expanded, used in Sidenav. */
  expanded?: boolean;

  /** You can use a custom element for this link */
  linkAs?: React.ElementType;

  /** Select the callback function for the current option  */
  onSelect?: (eventKey: T, event: React.SyntheticEvent<HTMLElement>) => void;

  /** Custom rendering item */
  renderItem?: (item: React.ReactNode) => React.ReactNode;
}

const defaultProps: Partial<DropdownMenuItemProps> = {
  linkAs: SafeAnchor,
  as: 'li',
  classPrefix: 'dropdown-item',
  tabIndex: -1,
  trigger: 'hover'
};

const DropdownMenuItem: RsRefForwardingComponent<'li', DropdownMenuItemProps> = React.forwardRef(
  (props: DropdownMenuItemProps, ref) => {
    const {
      as: Component,
      linkAs: Link,
      children,
      divider,
      panel,
      active,
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
      renderItem,
      ...rest
    } = props;

    const { merge, withClassPrefix, prefix } = useClassNames(classPrefix);
    const { sidenav, expanded } = useContext(SidenavContext) || {};
    const [open, setOpen] = useControlled(openProp, false);
    const classes = merge(
      className,
      withClassPrefix({
        [`pull-${pullLeft ? 'left' : 'right'}`]: submenu,
        [expandedProp ? 'expand' : 'collapse']: submenu && sidenav,
        'with-icon': icon,
        open,
        submenu,
        active,
        disabled
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
      },
      [disabled, open, eventKey, trigger, submenu, setOpen, onSelect]
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

    if (divider) {
      return (
        <Component
          ref={ref}
          role="separator"
          style={style}
          className={merge(prefix('divider'), className)}
        />
      );
    }

    if (panel) {
      return (
        <Component
          ref={ref}
          role="menuitem"
          style={style}
          className={merge(prefix('panel'), className)}
        >
          {children}
        </Component>
      );
    }

    const item = (
      <Link
        {...rest}
        onClick={createChainedFunction(handleClick, onClick)}
        className={prefix('content')}
        tabIndex={tabIndex}
      >
        {icon && React.cloneElement(icon, { className: prefix('menu-icon') })}
        {children}
      </Link>
    );

    return (
      <Component
        ref={ref}
        role="menuitem"
        aria-disabled={disabled}
        {...itemEventProps}
        style={style}
        className={classes}
      >
        {renderItem ? renderItem(item) : item}
      </Component>
    );
  }
);

DropdownMenuItem.displayName = 'DropdownMenuItem';
DropdownMenuItem.defaultProps = defaultProps;
DropdownMenuItem.propTypes = {
  as: PropTypes.elementType,
  linkAs: PropTypes.elementType,
  divider: PropTypes.bool,
  panel: PropTypes.bool,
  trigger: PropTypes.oneOfType([PropTypes.array, PropTypes.oneOf(['click', 'hover'])]),
  open: PropTypes.bool,
  expanded: PropTypes.bool,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  pullLeft: PropTypes.bool,
  submenu: PropTypes.bool,
  onSelect: PropTypes.func,
  onClick: PropTypes.func,
  icon: PropTypes.node,
  eventKey: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
  classPrefix: PropTypes.string,
  tabIndex: PropTypes.number,
  renderItem: PropTypes.func
};

export default DropdownMenuItem;

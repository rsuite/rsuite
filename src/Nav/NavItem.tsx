import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash/isNil';
import Ripple from '../Ripple';
import SafeAnchor from '../SafeAnchor';
import { shallowEqual, useClassNames } from '../utils';
import { RsRefForwardingComponent, WithAsProps } from '../@types/common';
import { IconProps } from '@rsuite/icons/lib/Icon';
import NavContext from './NavContext';

export interface NavItemProps<T = string>
  extends WithAsProps,
    Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'> {
  /** Activation status */
  active?: boolean;

  /** Disabled status */
  disabled?: boolean;

  /** divier for nav item */
  divider?: boolean;

  /** display panel */
  panel?: boolean;

  /** Sets the icon for the component */
  icon?: React.ReactElement<IconProps>;

  /** The value of the current option */
  eventKey?: T;

  /** Providing a `href` will render an `<a>` element */
  href?: string;

  /** Select the callback function that the event triggers. */
  onSelect?: (eventKey: T | undefined, event: React.SyntheticEvent) => void;
}

/**
 * The <Nav.Item> API
 * When used as direct child of <Nav>, render the NavItem
 * When used within a <Nav.Menu>, render the NavDropdownItem
 */
const NavItem: RsRefForwardingComponent<'a', NavItemProps> = React.forwardRef(
  (props: NavItemProps, ref: React.Ref<any>) => {
    const nav = useContext(NavContext);

    if (!nav) {
      throw new Error('<Nav.Item> must be rendered within a <Nav> component.');
    }

    const {
      as: Component = SafeAnchor,
      active: activeProp,
      disabled,
      eventKey,
      className,
      classPrefix = 'nav-item',
      style,
      children,
      icon,
      divider,
      panel,
      onClick,
      onSelect: onSelectProp,
      ...rest
    } = props;

    const { activeKey, onSelect: onSelectFromNav } = nav;

    const active = activeProp ?? (!isNil(eventKey) && shallowEqual(eventKey, activeKey));

    const emitSelect = useCallback(
      (event: React.SyntheticEvent) => {
        onSelectProp?.(eventKey, event);
        onSelectFromNav?.(eventKey, event);
      },
      [eventKey, onSelectProp, onSelectFromNav]
    );

    const { withClassPrefix, merge, prefix } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix({ active, disabled }));

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        if (!disabled) {
          emitSelect(event);
          onClick?.(event);
        }
      },
      [disabled, emitSelect, onClick]
    );

    if (divider) {
      return (
        <div
          ref={ref}
          role="separator"
          style={style}
          className={merge(className, prefix('divider'))}
          {...rest}
        />
      );
    }

    if (panel) {
      return (
        <div ref={ref} style={style} className={merge(className, prefix('panel'))} {...rest}>
          {children}
        </div>
      );
    }

    return (
      <Component
        ref={ref}
        tabIndex={disabled ? -1 : undefined}
        {...rest}
        className={classes}
        onClick={handleClick}
        style={style}
        aria-selected={active || undefined}
      >
        {icon && React.cloneElement(icon, { className: prefix('icon') })}
        {children}
        <Ripple />
      </Component>
    );
  }
);

NavItem.displayName = 'Nav.Item';
NavItem.propTypes = {
  as: PropTypes.elementType,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  divider: PropTypes.bool,
  panel: PropTypes.bool,
  onClick: PropTypes.func,
  style: PropTypes.object,
  icon: PropTypes.node,
  onSelect: PropTypes.func,
  children: PropTypes.node,
  eventKey: PropTypes.any
};

export default NavItem;

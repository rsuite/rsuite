import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash/isNil';
import { IconProps } from '@rsuite/icons/lib/Icon';
import Ripple from '../Ripple';
import SafeAnchor from '../SafeAnchor';
import { shallowEqual, useClassNames } from '../utils';
import { RsRefForwardingComponent, WithAsProps } from '../@types/common';
import NavContext from '../Nav/NavContext';

export interface NavItemProps<T = string>
  extends WithAsProps,
    Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'> {
  /** Activation status */
  active?: boolean;

  /** Disabled status */
  disabled?: boolean;

  /** Sets the icon for the component */
  icon?: React.ReactElement<IconProps>;

  /** The value of the current option */
  eventKey?: T;

  /** Providing a `href` will render an `<a>` element */
  href?: string;

  /** Select the callback function that the event triggers. */
  onSelect?: (eventKey: T | undefined, event: React.SyntheticEvent) => void;
}

const NavbarItem: RsRefForwardingComponent<'a', NavItemProps> = React.forwardRef(
  (props: NavItemProps, ref: React.Ref<any>) => {
    const {
      as: Component = SafeAnchor,
      active: activeProp,
      disabled,
      eventKey,
      className,
      classPrefix = 'navbar-item',
      style,
      children,
      icon,
      onClick,
      onSelect: onSelectProp,
      ...rest
    } = props;

    const { activeKey, onSelect: onSelectFromNav } = useContext(NavContext);

    const active = activeProp ?? (!isNil(eventKey) && shallowEqual(eventKey, activeKey));

    const emitSelect = useCallback(
      (event: React.SyntheticEvent) => {
        onSelectProp?.(eventKey, event);
        onSelectFromNav?.(eventKey, event);
      },
      [eventKey, onSelectProp, onSelectFromNav]
    );

    const { withClassPrefix, merge } = useClassNames(classPrefix);
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

    return (
      <Component
        ref={ref}
        aria-selected={active || undefined}
        {...rest}
        className={classes}
        onClick={handleClick}
        style={style}
      >
        {icon}
        {children}
        <Ripple />
      </Component>
    );
  }
);

NavbarItem.displayName = 'Navbar.Item';
NavbarItem.propTypes = {
  as: PropTypes.elementType,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object,
  icon: PropTypes.node,
  onSelect: PropTypes.func,
  children: PropTypes.node,
  eventKey: PropTypes.any
};

export default NavbarItem;

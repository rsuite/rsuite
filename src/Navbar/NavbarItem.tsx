import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash/isNil';
import { IconProps } from '@rsuite/icons/Icon';
import Ripple from '@/internals/Ripple';
import SafeAnchor from '../SafeAnchor';
import { useClassNames } from '@/internals/hooks';
import { shallowEqual } from '@/internals/utils';
import { RsRefForwardingComponent, WithAsProps } from '@/internals/types';
import NavContext, { NavContextProps } from '../Nav/NavContext';
import classNames from 'classnames';

export interface NavbarItemProps<T = string | number>
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

/**
 * @private
 */
const NavbarItem: RsRefForwardingComponent<'a', NavbarItemProps> = React.forwardRef(
  (props: NavbarItemProps, ref: React.Ref<any>) => {
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

    const { activeKey, onSelect: onSelectFromNav } = useContext(NavContext) as NavContextProps;

    const active = activeProp ?? (!isNil(eventKey) && shallowEqual(eventKey, activeKey));

    const emitSelect = useCallback(
      (event: React.SyntheticEvent) => {
        onSelectProp?.(eventKey, event);
        onSelectFromNav?.(eventKey, event);
      },
      [eventKey, onSelectProp, onSelectFromNav]
    );

    const { prefix, withClassPrefix, merge } = useClassNames(classPrefix);
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
        {icon &&
          React.cloneElement(icon, {
            className: classNames(prefix('icon'), icon.props.className)
          })}
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

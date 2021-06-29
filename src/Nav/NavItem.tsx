import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import Ripple from '../Ripple';
import SafeAnchor from '../SafeAnchor';
import { useClassNames, appendTooltip } from '../utils';
import { WithAsProps, RsRefForwardingComponent, TypeAttributes } from '../@types/common';
import { IconProps } from '@rsuite/icons/lib/Icon';
import { SidenavContext } from '../Sidenav/Sidenav';
import TreeviewRootItem from '../Sidenav/TreeviewRootItem';

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

  /** Whether NavItem have a tooltip  */
  tooltip?: boolean | TypeAttributes.Placement;

  /** Providing a `href` will render an `<a>` element */
  href?: string;

  /** Select the callback function that the event triggers. */
  onSelect?: (eventKey: T, event: React.SyntheticEvent) => void;
}

const defaultProps: Partial<NavItemProps> = {
  classPrefix: 'nav-item',
  as: SafeAnchor,
  tabIndex: 0
};

const NavItem: RsRefForwardingComponent<'a', NavItemProps> = React.forwardRef(
  (props: NavItemProps, ref: React.Ref<any>) => {
    const {
      as: Component,
      active,
      disabled,
      eventKey,
      className,
      classPrefix,
      style,
      children,
      icon,
      tabIndex,
      tooltip,
      divider,
      panel,
      onClick,
      onSelect,
      ...rest
    } = props;

    const sidenav = useContext(SidenavContext);

    const { withClassPrefix, merge, prefix } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix({ active, disabled }));

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        if (!disabled) {
          onSelect?.(eventKey, event);
          onClick?.(event);
        }
      },
      [disabled, onSelect, eventKey, onClick]
    );

    if (sidenav?.expanded) {
      const { children, ...restProps } = props;
      return <TreeviewRootItem title={children} {...restProps} />;
    }

    if (divider) {
      return (
        <div
          ref={ref}
          role="separator"
          style={style}
          className={merge(className, prefix('divider'))}
        />
      );
    }

    if (panel) {
      return (
        <div ref={ref} style={style} className={merge(className, prefix('panel'))}>
          {children}
        </div>
      );
    }

    const ariaAttributes: React.HTMLAttributes<HTMLElement> = {};

    const item = (
      <Component
        aria-selected={active}
        {...rest}
        tabIndex={tabIndex}
        disabled={Component === SafeAnchor ? disabled : null}
        className={classes}
        onClick={handleClick}
        ref={ref}
        style={style}
        {...ariaAttributes}
      >
        {icon}
        {children}
        <Ripple />
      </Component>
    );

    return tooltip
      ? appendTooltip({
          ref,
          children: item,
          message: children,
          placement: typeof tooltip === 'boolean' ? 'right' : tooltip
        })
      : item;
  }
);

NavItem.defaultProps = defaultProps;
NavItem.displayName = 'NavItem';
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
  eventKey: PropTypes.any,
  tabIndex: PropTypes.number,
  tooltip: PropTypes.bool
};

export default NavItem;

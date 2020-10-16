import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Ripple from '../Ripple';
import SafeAnchor from '../SafeAnchor';
import { createChainedFunction, useClassNames, appendTooltip } from '../utils';
import { WithAsProps, RsRefForwardingComponent } from '../@types/common';
import { IconProps } from '../Icon';

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
  hasTooltip?: boolean;

  /** Providing a `href` will render an `<a>` element */
  href?: string;

  /** Select the callback function that the event triggers. */
  onSelect?: (eventKey: T, event: React.SyntheticEvent) => void;

  /** Custom rendering item */
  renderItem?: (item: React.ReactNode) => React.ReactNode;
}

const defaultProps: Partial<NavItemProps> = {
  classPrefix: 'nav-item',
  as: SafeAnchor,
  tabIndex: 0
};

const NavItem: RsRefForwardingComponent<'li', NavItemProps> = React.forwardRef(
  (props: NavItemProps, ref: React.Ref<HTMLLIElement>) => {
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
      hasTooltip,
      divider,
      panel,
      renderItem,
      onClick,
      onSelect,
      ...rest
    } = props;

    const handleClick = useCallback(
      (event: React.MouseEvent) => {
        if (onSelect && !disabled) {
          onSelect(eventKey, event);
        }
      },
      [onSelect, disabled, eventKey]
    );

    const { withClassPrefix, merge, prefix } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix({ active, disabled }));

    if (divider) {
      return (
        <li
          ref={ref}
          role="separator"
          style={style}
          className={merge(className, prefix('divider'))}
        />
      );
    }

    if (panel) {
      return (
        <li ref={ref} style={style} className={merge(className, prefix('panel'))}>
          {children}
        </li>
      );
    }

    let item: React.ReactNode = (
      <Component
        {...rest}
        disabled={Component === SafeAnchor ? disabled : null}
        tabIndex={tabIndex}
        className={merge(className, prefix('content'))}
        onClick={createChainedFunction(onClick, handleClick)}
      >
        {icon}
        {children}
        <Ripple />
      </Component>
    );

    if (renderItem) {
      item = renderItem(item);
    }
    return (
      <li ref={ref} className={classes} style={style}>
        {hasTooltip
          ? appendTooltip({ children: item, message: children, placement: 'right' })
          : item}
      </li>
    );
  }
);

NavItem.defaultProps = defaultProps;
NavItem.displayName = 'NavItem';
NavItem.propTypes = {
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
  hasTooltip: PropTypes.bool,
  as: PropTypes.elementType,
  renderItem: PropTypes.func
};

export default NavItem;

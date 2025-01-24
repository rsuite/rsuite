import React from 'react';
import ArrowDownLineIcon from '@rsuite/icons/ArrowDownLine';
import Button from '../Button';
import NavItem, { NavItemProps } from './NavItem';
import { useClassNames } from '@/internals/hooks';
import { forwardRef } from '@/internals/utils';
import type { WithAsProps, PlacementCorners } from '@/internals/types';

export interface NavDropdownToggleProps extends WithAsProps {
  icon?: NavItemProps['icon'];
  noCaret?: boolean;
  renderToggle?: (props: WithAsProps, ref: React.Ref<any>) => any;
  placement?: PlacementCorners;
}

/**
 * @private this component is not supposed to be used directly
 *          Instead it's rendered by a <Nav.Menu> call
 *
 * <Nav>
 *   <Nav.Menu> -> This will render <NavDropdown> component that renders a <NavDropdownToggle>
 *   </Nav.Menu>
 * </Nav>
 */
const NavDropdownToggle = forwardRef<typeof Button, NavDropdownToggleProps>((props, ref) => {
  const {
    as: Component = NavItem,
    className,
    classPrefix = 'dropdown-toggle',
    renderToggle,
    children,
    noCaret,
    ...rest
  } = props;

  const { withClassPrefix, merge } = useClassNames(classPrefix);
  const { prefix: prefixNavItem } = useClassNames('nav-item');
  const classes = merge(className, withClassPrefix({ 'no-caret': noCaret }));

  const toggle = (
    <Component {...rest} ref={ref} className={classes}>
      {children}
      {!noCaret && <ArrowDownLineIcon className={prefixNavItem('caret')} />}
    </Component>
  );

  return renderToggle ? renderToggle(rest, ref) : toggle;
});

NavDropdownToggle.displayName = 'Nav.Dropdown.Toggle';

export default NavDropdownToggle;

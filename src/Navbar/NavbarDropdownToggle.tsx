import React from 'react';
import ArrowDownLineIcon from '@rsuite/icons/ArrowDownLine';
import NavbarItem from './NavbarItem';
import Button from '../Button';
import { forwardRef } from '@/internals/utils';
import { useClassNames } from '@/internals/hooks';
import type { WithAsProps, PlacementCorners } from '@/internals/types';

export interface NavbarDropdownToggleProps extends WithAsProps {
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
const NavbarDropdownToggle = forwardRef<typeof Button, NavbarDropdownToggleProps>((props, ref) => {
  const {
    as: Component = NavbarItem,
    className,
    classPrefix = 'navbar-item',
    renderToggle,
    children,
    noCaret,
    ...rest
  } = props;

  const { prefix, withClassPrefix, merge } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix({ 'no-caret': noCaret }));

  const toggle = (
    <Component {...rest} ref={ref} className={classes}>
      {children}
      {!noCaret && <ArrowDownLineIcon className={prefix('caret')} />}
    </Component>
  );

  return renderToggle ? renderToggle(rest, ref) : toggle;
});

NavbarDropdownToggle.displayName = 'Navbar.Dropdown.Toggle';

export default NavbarDropdownToggle;

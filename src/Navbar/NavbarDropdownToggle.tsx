import React from 'react';
import ArrowDownLineIcon from '@rsuite/icons/ArrowDownLine';
import NavbarItem from './NavbarItem';
import Button from '../Button';
import Box, { BoxProps } from '@/internals/Box';
import { forwardRef } from '@/internals/utils';
import { useStyles } from '@/internals/hooks';
import type { PlacementCorners } from '@/internals/types';

export interface NavbarDropdownToggleProps extends BoxProps {
  noCaret?: boolean;
  placement?: PlacementCorners;
  renderToggle?: (props: BoxProps, ref: React.Ref<any>) => any;
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
    as = NavbarItem,
    className,
    classPrefix = 'navbar-item',
    renderToggle,
    children,
    noCaret,
    ...rest
  } = props;

  const { prefix, withPrefix, merge } = useStyles(classPrefix);
  const classes = merge(className, withPrefix({ 'no-caret': noCaret }));

  const toggle = (
    <Box as={as} {...rest} ref={ref} className={classes}>
      {children}
      {!noCaret && <ArrowDownLineIcon className={prefix('caret')} />}
    </Box>
  );

  return renderToggle ? renderToggle(rest, ref) : toggle;
});

NavbarDropdownToggle.displayName = 'Navbar.Dropdown.Toggle';

export default NavbarDropdownToggle;

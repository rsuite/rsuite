import React from 'react';
import ArrowDownLineIcon from '@rsuite/icons/ArrowDownLine';
import Button from '../Button';
import NavItem, { NavItemProps } from './NavItem';
import Box, { BoxProps } from '@/internals/Box';
import { useStyles } from '@/internals/hooks';
import { forwardRef } from '@/internals/utils';
import type { PlacementCorners } from '@/internals/types';

export interface NavDropdownToggleProps extends BoxProps {
  icon?: NavItemProps['icon'];
  noCaret?: boolean;
  renderToggle?: (props: BoxProps, ref: React.Ref<any>) => any;
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
    as = NavItem,
    className,
    classPrefix = 'dropdown-toggle',
    renderToggle,
    children,
    noCaret,
    ...rest
  } = props;

  const { withPrefix, merge } = useStyles(classPrefix);
  const { prefix: prefixNavItem } = useStyles('nav-item');
  const classes = merge(className, withPrefix({ 'no-caret': noCaret }));

  const toggle = (
    <Box as={as} {...rest} ref={ref} className={classes}>
      {children}
      {!noCaret && <ArrowDownLineIcon className={prefixNavItem('caret')} />}
    </Box>
  );

  return renderToggle ? renderToggle(rest, ref) : toggle;
});

NavDropdownToggle.displayName = 'Nav.Dropdown.Toggle';

export default NavDropdownToggle;

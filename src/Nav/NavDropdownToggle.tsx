import React from 'react';
import ArrowDownLineIcon from '@rsuite/icons/ArrowDownLine';
import Button from '../Button';
import { useClassNames } from '@/internals/hooks';
import { WithAsProps, RsRefForwardingComponent, PlacementCorners } from '@/internals/types';
import NavItem, { NavItemProps } from './NavItem';

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
const NavDropdownToggle: RsRefForwardingComponent<typeof Button, NavDropdownToggleProps> =
  React.forwardRef((props: NavDropdownToggleProps, ref) => {
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

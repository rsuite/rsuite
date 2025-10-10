import React from 'react';
import Button from '../Button';
import { WithAsProps, RsRefForwardingComponent, TypeAttributes } from '../internals/types';
export interface NavbarDropdownToggleProps extends WithAsProps {
    noCaret?: boolean;
    renderToggle?: (props: WithAsProps, ref: React.Ref<any>) => any;
    placement?: TypeAttributes.Placement8;
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
declare const NavbarDropdownToggle: RsRefForwardingComponent<typeof Button, NavbarDropdownToggleProps>;
export default NavbarDropdownToggle;

import React from 'react';
import ArrowDownLineIcon from '@rsuite/icons/ArrowDownLine';
import Button from '../Button';
import SidenavItem from './SidenavItem';
import { forwardRef } from '@/internals/utils';
import { useClassNames } from '@/internals/hooks';
import type { WithAsProps, PlacementCorners } from '@/internals/types';

export interface SidenavDropdownToggleProps extends WithAsProps {
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
const SidenavDropdownToggle = forwardRef<typeof Button, SidenavDropdownToggleProps>(
  (props, ref) => {
    const {
      as: Component = SidenavItem,
      className,
      classPrefix = 'dropdown-toggle',
      renderToggle,
      children,
      noCaret,
      ...rest
    } = props;

    const { prefix, withClassPrefix, merge } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix({ 'no-caret': noCaret }));

    const toggle = (
      <Component {...rest} ref={ref} className={classes} tooltip={children}>
        {children}
        {!noCaret && <ArrowDownLineIcon className={prefix('caret')} />}
      </Component>
    );

    return renderToggle ? renderToggle(rest, ref) : toggle;
  }
);

SidenavDropdownToggle.displayName = 'Sidenav.Dropdown.Toggle';

export default SidenavDropdownToggle;

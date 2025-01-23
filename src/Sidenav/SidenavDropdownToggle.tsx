import React from 'react';
import ArrowRightLineIcon from '@rsuite/icons/ArrowRightLine';
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
      classPrefix = 'sidenav-dropdown-toggle',
      className,
      renderToggle,
      children,
      noCaret,
      ...rest
    } = props;

    const { prefix, merge, withClassPrefix } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix());

    const toggle = (
      <Component className={classes} ref={ref} tooltip={children} {...rest}>
        <span className={prefix('title')}>{children}</span>
        {!noCaret && <ArrowRightLineIcon className={prefix('caret')} />}
      </Component>
    );

    return renderToggle ? renderToggle(rest, ref) : toggle;
  }
);

SidenavDropdownToggle.displayName = 'Sidenav.Dropdown.Toggle';

export default SidenavDropdownToggle;

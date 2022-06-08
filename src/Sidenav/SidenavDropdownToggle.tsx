import React from 'react';
import PropTypes from 'prop-types';
import ArrowDownLineIcon from '@rsuite/icons/ArrowDownLine';
import Button from '../Button';
import { useClassNames } from '../utils';
import { WithAsProps, RsRefForwardingComponent, TypeAttributes } from '../@types/common';
import SidenavItem from './SidenavItem';

export interface SidenavDropdownToggleProps extends WithAsProps {
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
const SidenavDropdownToggle: RsRefForwardingComponent<typeof Button, SidenavDropdownToggleProps> =
  React.forwardRef((props: SidenavDropdownToggleProps, ref) => {
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
  });

SidenavDropdownToggle.displayName = 'Sidenav.Dropdown.Toggle';
SidenavDropdownToggle.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  classPrefix: PropTypes.string,
  noCaret: PropTypes.bool,
  as: PropTypes.elementType,
  renderToggle: PropTypes.func,
  placement: PropTypes.oneOf([
    'bottomStart',
    'bottomEnd',
    'topStart',
    'topEnd',
    'leftStart',
    'rightStart',
    'leftEnd',
    'rightEnd'
  ])
};

export default SidenavDropdownToggle;

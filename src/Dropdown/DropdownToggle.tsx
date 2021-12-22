import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import { useClassNames } from '../utils';
import { IconProps } from '@rsuite/icons/lib/Icon';
import { WithAsProps, RsRefForwardingComponent, TypeAttributes } from '../@types/common';
import useToggleCaret from '../utils/useToggleCaret';
import { SidenavContext } from '../Sidenav/Sidenav';
import NavContext from '../Nav/NavContext';

export interface DropdownToggleProps extends WithAsProps {
  icon?: React.ReactElement<IconProps>;
  noCaret?: boolean;
  renderToggle?: (props: WithAsProps, ref: React.Ref<any>) => any;
  placement?: TypeAttributes.Placement8;
}

const DropdownToggle: RsRefForwardingComponent<typeof Button, DropdownToggleProps> =
  React.forwardRef((props: DropdownToggleProps, ref) => {
    const {
      as: Component = Button,
      className,
      classPrefix = 'dropdown-toggle',
      renderToggle,
      children,
      icon,
      noCaret,
      placement = 'bottomStart',
      ...rest
    } = props;

    const sidenav = useContext(SidenavContext);
    const { withinNav } = useContext(NavContext);
    const { prefix, withClassPrefix, merge } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix({ 'no-caret': noCaret }));

    const inSidenav = !!sidenav;

    // Caret icon is down by default, when Dropdown is used in Sidenav.
    const Caret = useToggleCaret(inSidenav ? 'bottomStart' : placement);

    const toggle = (
      <Component
        appearance={withinNav ? 'subtle' : undefined}
        {...rest}
        ref={ref}
        className={classes}
      >
        {icon &&
          React.cloneElement(icon, {
            className: prefix('icon')
          })}
        {children}
        {noCaret ? null : <Caret className={prefix('caret')} />}
      </Component>
    );

    return renderToggle ? renderToggle(rest, ref) : toggle;
  });

DropdownToggle.displayName = 'DropdownToggle';
DropdownToggle.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  icon: PropTypes.node,
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

export default DropdownToggle;

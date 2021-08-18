import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import { useClassNames } from '../utils';
import { IconProps } from '@rsuite/icons/lib/Icon';
import { WithAsProps, RsRefForwardingComponent, TypeAttributes } from '../@types/common';
import useToggleCaret from '../utils/useToggleCaret';
import { SidenavContext } from '../Sidenav/Sidenav';

export interface DropdownToggleProps extends WithAsProps {
  icon?: React.ReactElement<IconProps>;
  noCaret?: boolean;
  renderToggle?: (props: WithAsProps, ref: React.Ref<any>) => any;
  placement?: TypeAttributes.Placement8;
}

const defaultProps: Partial<DropdownToggleProps> = {
  as: Button,
  classPrefix: 'dropdown-toggle'
};

const DropdownToggle: RsRefForwardingComponent<
  typeof Button,
  DropdownToggleProps
> = React.forwardRef((props: DropdownToggleProps, ref) => {
  const {
    as: Component,
    className,
    classPrefix,
    renderToggle,
    children,
    icon,
    noCaret,
    placement,
    ...rest
  } = props;

  const sidenav = useContext(SidenavContext);
  const { prefix, withClassPrefix, merge } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix({ 'no-caret': noCaret }));

  const inSidenav = !!sidenav;

  // Caret icon is down by default, when Dropdown is used in Sidenav.
  const Caret = useToggleCaret(inSidenav ? 'bottomStart' : placement);

  const buttonProps = Component === Button ? { appearance: 'subtle' } : null;
  const toggle = (
    <Component {...buttonProps} {...rest} ref={ref} className={classes}>
      <span className={prefix('icon')}>{icon}</span>
      {children}
      {noCaret ? null : <Caret className={prefix('caret')} />}
    </Component>
  );

  return renderToggle ? renderToggle(rest, ref) : toggle;
});

DropdownToggle.displayName = 'DropdownToggle';
DropdownToggle.defaultProps = defaultProps;
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

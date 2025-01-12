import React from 'react';
import Button from '../Button';
import { forwardRef } from '@/internals/utils';
import { useClassNames, useToggleCaret } from '@/internals/hooks';
import { IconProps } from '@rsuite/icons/Icon';
import { WithAsProps, PlacementCorners } from '@/internals/types';

export interface DropdownToggleProps extends WithAsProps {
  icon?: React.ReactElement<IconProps>;
  noCaret?: boolean;
  renderToggle?: (props: WithAsProps, ref: React.Ref<any>) => any;
  placement?: PlacementCorners;
}

const DropdownToggle = forwardRef<typeof Button, DropdownToggleProps>(
  (props: DropdownToggleProps, ref) => {
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

    const { prefix, withClassPrefix, merge } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix({ 'no-caret': noCaret }));

    // Caret icon is down by default, when Dropdown is used in Sidenav.
    const Caret = useToggleCaret(placement);

    const toggle = (
      <Component {...rest} ref={ref} className={classes}>
        {icon &&
          React.cloneElement(icon, {
            className: prefix('icon')
          })}
        {children}
        {noCaret ? null : <Caret className={prefix('caret')} />}
      </Component>
    );

    return renderToggle ? renderToggle(rest, ref) : toggle;
  }
);

DropdownToggle.displayName = 'DropdownToggle';

export default DropdownToggle;

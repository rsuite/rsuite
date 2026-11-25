import React from 'react';
import Button, { ButtonProps } from '../Button';
import { forwardRef } from '@/internals/utils';
import { useStyles, useCustom } from '@/internals/hooks';
import type { IconProps } from '@rsuite/icons/Icon';

export interface IconButtonProps extends ButtonProps {
  /** Set the icon */
  icon?: React.ReactElement<IconProps>;

  /** Set circle button */
  circle?: boolean;

  /** The placement of icon */
  placement?: 'left' | 'right' | 'start' | 'end';
}

/**
 * The `IconButton` component is used to specify a button with icon.
 * @see https://rsuitejs.com/components/button
 */
const IconButton = forwardRef<typeof Button, IconButtonProps>((props, ref) => {
  const { propsWithDefaults } = useCustom('IconButton', props);
  const {
    circle,
    children,
    className,
    classPrefix = 'btn-icon',
    placement = 'start',
    icon,
    ...rest
  } = propsWithDefaults;

  const { merge, withPrefix } = useStyles(classPrefix);
  const classes = merge(className, withPrefix());

  return (
    <Button
      {...rest}
      ref={ref}
      className={classes}
      data-shape={circle ? 'circle' : undefined}
      data-placement={placement}
      data-with-text={typeof children !== 'undefined' || undefined}
    >
      {icon}
      {children}
    </Button>
  );
});

IconButton.displayName = 'IconButton';

export default IconButton;

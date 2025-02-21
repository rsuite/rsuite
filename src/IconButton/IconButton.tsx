import React from 'react';
import Button, { ButtonProps } from '../Button';
import { forwardRef } from '@/internals/utils';
import { useClassNames } from '@/internals/hooks';
import { useCustom } from '../CustomProvider';
import type { IconProps } from '@rsuite/icons/Icon';

export interface IconButtonProps extends ButtonProps {
  /** Set the icon */
  icon?: React.ReactElement<IconProps>;

  /** Set circle button */
  circle?: boolean;

  /** The placement of icon */
  placement?: 'left' | 'right';
}

/**
 * The `IconButton` component is used to specify a button with icon.
 * @see https://rsuitejs.com/components/button
 */
const IconButton = forwardRef<typeof Button, IconButtonProps>((props, ref) => {
  const { propsWithDefaults } = useCustom('IconButton', props);
  const {
    icon,
    placement = 'left',
    children,
    circle,
    classPrefix = 'btn-icon',
    className,
    ...rest
  } = propsWithDefaults;

  const { merge, withClassPrefix } = useClassNames(classPrefix);
  const classes = merge(
    className,
    withClassPrefix(`placement-${placement}`, {
      circle,
      'with-text': typeof children !== 'undefined'
    })
  );

  return (
    <Button {...rest} ref={ref} className={classes}>
      {icon}
      {children}
    </Button>
  );
});

IconButton.displayName = 'IconButton';

export default IconButton;

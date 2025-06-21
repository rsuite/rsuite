import React from 'react';
import Stack, { StackProps } from '../Stack';
import { useStyles, useCustom } from '@/internals/hooks';
import { forwardRef } from '@/internals/utils';

export interface ButtonToolbarProps extends StackProps {
  /**
   * The ARIA role describing the button toolbar. Generally the default
   * "toolbar" role is correct. An `aria-label` or `aria-labelledby`
   * prop is also recommended.
   */
  role?: string;
}

/**
 * The ButtonToolbar component is used to group a series of buttons together in a single line.
 * @see https://rsuitejs.com/components/button/#button-toolbar
 */
const ButtonToolbar = forwardRef<typeof Stack, ButtonToolbarProps>(
  (props: ButtonToolbarProps, ref) => {
    const { propsWithDefaults } = useCustom('ButtonToolbar', props);
    const {
      as,
      className,
      classPrefix = 'btn-toolbar',
      role = 'toolbar',
      ...rest
    } = propsWithDefaults;

    const { withPrefix, merge } = useStyles(classPrefix);
    const classes = merge(className, withPrefix());
    return <Stack as={as} role={role} ref={ref} className={classes} {...rest} />;
  }
);

ButtonToolbar.displayName = 'ButtonToolbar';

export default ButtonToolbar;

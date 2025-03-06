import React from 'react';
import Stack, { StackProps } from '../Stack';
import { useStyles } from '@/internals/hooks';
import { forwardRef } from '@/internals/utils';
import { WithAsProps } from '@/internals/types';
import { useCustom } from '../CustomProvider';

export interface ButtonToolbarProps extends WithAsProps {
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
      as: Component = Stack,
      className,
      classPrefix = 'btn-toolbar',
      role = 'toolbar',
      ...rest
    } = propsWithDefaults;

    const stackProps: StackProps | null = Component === Stack ? { wrap: true, spacing: 10 } : null;

    const { withPrefix, merge } = useStyles(classPrefix);
    const classes = merge(className, withPrefix());
    return <Component {...stackProps} {...rest} role={role} ref={ref} className={classes} />;
  }
);

ButtonToolbar.displayName = 'ButtonToolbar';

export default ButtonToolbar;

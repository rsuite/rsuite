import React from 'react';
import Box, { BoxProps } from '@/internals/Box';
import { forwardRef } from '@/internals/utils';
import { useStyles, useCustom } from '@/internals/hooks';
import type { Size } from '@/internals/types';

export interface KbdProps extends BoxProps {
  /**
   * Sets Kbd size.
   */
  size?: Size;
}

/**
 *
 * The `Kbd` component is used to display a Kbd.
 *
 * @see https://rsuitejs.com/components/kbd
 */
const Kbd = forwardRef<'kbd', KbdProps>((props: KbdProps, ref) => {
  const { propsWithDefaults } = useCustom('Kbd', props);
  const { as = 'kbd', classPrefix = 'kbd', className, size = 'md', ...rest } = propsWithDefaults;

  const { withPrefix, merge } = useStyles(classPrefix);
  const classes = merge(className, withPrefix(size));

  return <Box as={as} {...rest} ref={ref} className={classes} />;
});

Kbd.displayName = 'Kbd';

export default Kbd;

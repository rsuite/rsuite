import React from 'react';
import Box, { BoxProps } from '@/internals/Box';
import { forwardRef } from '@/internals/utils';
import { useStyles, useCustom } from '@/internals/hooks';

export interface HeadingProps extends BoxProps {
  /**
   * Sets heading level, h1 through h6.
   * @default 3
   */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

/**
 *
 * The `Heading` component is used to display a heading.
 *
 * @see https://rsuitejs.com/components/heading
 */
const Heading = forwardRef<'h3', HeadingProps>((props: HeadingProps, ref) => {
  const { propsWithDefaults } = useCustom('Heading', props);
  const { as, classPrefix = 'heading', className, level = 3, ...rest } = propsWithDefaults;

  const { withPrefix, merge } = useStyles(classPrefix);
  const classes = merge(className, withPrefix());

  return <Box as={as || `h${level}`} {...rest} ref={ref} className={classes} />;
});

Heading.displayName = 'Heading';

export default Heading;

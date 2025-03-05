import React from 'react';
import { forwardRef } from '@/internals/utils';
import { useClassNames } from '@/internals/hooks';
import { useCustom } from '../CustomProvider';
import type { WithAsProps } from '@/internals/types';

export interface HeadingProps extends WithAsProps {
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

  const { withClassPrefix, merge } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix());

  const Component = as || `h${level}`;

  return <Component {...rest} ref={ref} className={classes} />;
});

Heading.displayName = 'Heading';

export default Heading;

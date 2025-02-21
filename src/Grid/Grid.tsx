import React from 'react';
import { forwardRef } from '@/internals/utils';
import { useClassNames } from '@/internals/hooks';
import { useCustom } from '../CustomProvider';
import type { WithAsProps } from '@/internals/types';
export interface GridProps extends WithAsProps {
  /** Fluid layout */
  fluid?: boolean;
}

/**
 * The Grid component is used to specify the layout of child elements in rows and columns.
 * @see https://rsuitejs.com/components/grid
 */
const Grid = forwardRef<'div', GridProps>((props: GridProps, ref) => {
  const { propsWithDefaults } = useCustom('Grid', props);
  const {
    as: Component = 'div',
    classPrefix = 'grid-container',
    className,
    fluid,
    ...rest
  } = propsWithDefaults;

  const { withClassPrefix, prefix, merge } = useClassNames(classPrefix);
  const classes = merge(className, fluid ? prefix({ fluid }) : withClassPrefix());

  return <Component role="grid" {...rest} ref={ref} className={classes} />;
});

Grid.displayName = 'Grid';

export default Grid;

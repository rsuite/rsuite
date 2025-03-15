import React from 'react';
import { forwardRef } from '@/internals/utils';
import { useStyles } from '@/internals/hooks';
import { useCustom } from '../CustomProvider';
import type { WithAsProps } from '@/internals/types';
export interface GridProps extends WithAsProps {
  /** Whether the grid container should have a fluid width */
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

  const { withPrefix, prefix, merge } = useStyles(classPrefix);
  const classes = merge(className, fluid ? prefix({ fluid }) : withPrefix());

  return <Component {...rest} ref={ref} className={classes} />;
});

Grid.displayName = 'Grid';

export default Grid;

import React from 'react';
import FlexboxGridItem from './FlexboxGridItem';
import { forwardRef } from '@/internals/utils';
import { useClassNames } from '@/internals/hooks';
import { useCustom } from '../CustomProvider';
import type { WithAsProps } from '@/internals/types';

export interface FlexboxGridProps extends WithAsProps {
  /** align */
  align?: 'top' | 'middle' | 'bottom';

  /** horizontal arrangement */
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between';
}

const Subcomponents = {
  Item: FlexboxGridItem
};

/**
 * The FlexboxGrid component is a box that can be used to layout other components.
 * @see https://rsuitejs.com/components/flexbox-grid
 */
const FlexboxGrid = forwardRef<'div', FlexboxGridProps, typeof Subcomponents>(
  (props: FlexboxGridProps, ref) => {
    const { propsWithDefaults } = useCustom('FlexboxGrid', props);
    const {
      as: Component = 'div',
      className,
      classPrefix = 'flex-box-grid',
      align = 'top',
      justify = 'start',
      ...rest
    } = propsWithDefaults;
    const { merge, withClassPrefix } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix(align, justify));
    return <Component {...rest} ref={ref} className={classes} />;
  },
  Subcomponents
);

FlexboxGrid.displayName = 'FlexboxGrid';

export default FlexboxGrid;

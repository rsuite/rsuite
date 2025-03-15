import React from 'react';
import FlexboxGridItem from './FlexboxGridItem';
import { forwardRef } from '@/internals/utils';
import { useStyles } from '@/internals/hooks';
import { useCustom } from '../CustomProvider';
import type { WithAsProps } from '@/internals/types';

export interface FlexboxGridProps extends WithAsProps {
  /**
   * Vertical alignment
   * @deprecated Please use `<Row align={...}>` instead.
   */
  align?: 'top' | 'middle' | 'bottom';

  /**
   * Horizontal alignment
   * @deprecated Please use `<Row justify={...}>` instead.
   */
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between';
}

const Subcomponents = {
  Item: FlexboxGridItem
};

/**
 * The FlexboxGrid component is a box that can be used to layout other components.
 * @see https://rsuitejs.com/components/flexbox-grid
 * @deprecated Please use `Row` instead.
 * ```
 * <Row>
 *   <Col>1</Col>
 *   <Col>2</Col>
 *   <Col>3</Col>
 * </Row>
 * ```
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
    const { merge, withPrefix } = useStyles(classPrefix);
    const classes = merge(className, withPrefix(align, justify));
    return <Component {...rest} ref={ref} className={classes} />;
  },
  Subcomponents
);

FlexboxGrid.displayName = 'FlexboxGrid';

export default FlexboxGrid;

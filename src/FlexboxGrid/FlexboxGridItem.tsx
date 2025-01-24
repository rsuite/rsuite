import React from 'react';
import { forwardRef } from '@/internals/utils';
import { useClassNames } from '@/internals/hooks';
import type { WithAsProps } from '@/internals/types';

export interface FlexboxGridItemProps extends WithAsProps {
  /** spacing between grids */
  colspan?: number;

  /** grid orders for sorting */
  order?: number;
}

/**
 * The `FlexboxGrid.Item` component is used to specify the layout of the child element in the `FlexboxGrid` component.
 * @see https://rsuitejs.com/components/flexbox-grid
 */
const FlexboxGridItem = forwardRef<'div', FlexboxGridItemProps>(
  (props: FlexboxGridItemProps, ref) => {
    const {
      as: Component = 'div',
      className,
      classPrefix = 'flex-box-grid-item',
      colspan = 0,
      order = 0,
      ...rest
    } = props;

    const { merge, withClassPrefix } = useClassNames(classPrefix);
    const classes = merge(
      className,
      withClassPrefix({
        [colspan]: colspan >= 0,
        [`order-${order}`]: order
      })
    );

    return <Component ref={ref} {...rest} className={classes} />;
  }
);

FlexboxGridItem.displayName = 'FlexboxGridItem';

export default FlexboxGridItem;

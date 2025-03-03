import React from 'react';
import { useClassNames } from '@/internals/hooks';
import { useCustom } from '../CustomProvider';
import { forwardRef, mergeStyles, getCssValue } from '@/internals/utils';
import type { WithAsProps } from '@/internals/types';

export interface RowProps extends WithAsProps {
  /** Spacing between columns */
  gutter?: number | string;

  /** Vertical alignment of columns */
  align?: 'top' | 'middle' | 'bottom';

  /** Horizontal distribution of columns */
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between';
}

/**
 * The `Row` component is used for layout and grids.
 * @see https://rsuitejs.com/components/grid
 */
const Row = forwardRef<'div', RowProps>((props, ref) => {
  const { propsWithDefaults } = useCustom('Row', props);
  const {
    as: Component = 'div',
    align,
    classPrefix = 'row',
    className,
    children,
    gutter,
    justify,
    style,
    ...rest
  } = propsWithDefaults;

  const { withClassPrefix, merge } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix(align, justify));

  const rowStyles = mergeStyles(style, {
    ['--rs-grid-gutter']: getCssValue(gutter)
  });

  return (
    <Component {...rest} ref={ref} className={classes} style={rowStyles}>
      {children}
    </Component>
  );
});

Row.displayName = 'Row';

export default Row;

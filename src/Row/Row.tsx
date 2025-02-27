import React from 'react';
import { useClassNames } from '@/internals/hooks';
import { useCustom } from '../CustomProvider';
import { forwardRef, mergeStyles, getCssValue } from '@/internals/utils';
import type { WithAsProps } from '@/internals/types';

export interface RowProps extends WithAsProps {
  gutter?: number | string;
}

/**
 * The `Row` component is used for layout and grids.
 * @see https://rsuitejs.com/components/grid
 */
const Row = forwardRef<'div', RowProps>((props, ref) => {
  const { propsWithDefaults } = useCustom('Row', props);
  const {
    as: Component = 'div',
    classPrefix = 'row',
    className,
    gutter,
    children,
    style,
    ...rest
  } = propsWithDefaults;

  const { withClassPrefix, merge } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix());

  const rowStyles = mergeStyles(style, {
    ['--rs-grid-gutter']: getCssValue(gutter)
  });

  return (
    <Component role="row" {...rest} ref={ref} className={classes} style={rowStyles}>
      {children}
    </Component>
  );
});

Row.displayName = 'Row';

export default Row;

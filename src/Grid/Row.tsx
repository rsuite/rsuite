import React from 'react';
import Box, { BoxProps } from '@/internals/Box';
import { useStyles } from '@/internals/hooks';
import { useCustom } from '../CustomProvider';
import { forwardRef, mergeStyles } from '@/internals/utils';
import { getResponsiveGutterStyles } from './utils/styles';
import type { ResponsiveValue } from '@/internals/types';
import type { RowAlignment, RowJustify, GutterType } from './types';

export interface RowProps extends BoxProps {
  /** Spacing between columns. Support responsive values */
  gutter?: GutterType | ResponsiveValue<GutterType>;

  /** Vertical alignment of columns. Support responsive values */
  align?: RowAlignment | ResponsiveValue<RowAlignment>;

  /** Horizontal distribution of columns. Support responsive values */
  justify?: RowJustify | ResponsiveValue<RowJustify>;
}

/**
 * The Row component is used to create a row container that can contain Col components.
 * @see https://rsuitejs.com/components/grid
 */
const Row = forwardRef<'div', RowProps>((props, ref) => {
  const { propsWithDefaults } = useCustom('Row', props);
  const {
    as,
    className,
    classPrefix = 'row',
    style,
    align,
    justify,
    gutter,
    ...rest
  } = propsWithDefaults;

  const { withPrefix, merge, responsive } = useStyles(classPrefix);
  const classes = merge(className, withPrefix(), ...responsive(align), ...responsive(justify));
  const rowStyles = mergeStyles(style, getResponsiveGutterStyles(gutter));

  return <Box as={as} {...rest} ref={ref} className={classes} style={rowStyles} />;
});

Row.displayName = 'Row';

export default Row;

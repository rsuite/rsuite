import React from 'react';
import Box, { BoxProps } from '@/internals/Box';
import isPlainObject from 'lodash/isPlainObject';
import { useStyles } from '@/internals/hooks';
import { useCustom } from '../CustomProvider';
import { forwardRef, mergeStyles, getCssValue } from '@/internals/utils';
import { BREAKPOINTS } from '@/internals/constants';
import type { ResponsiveValue } from '@/internals/types';
import type { RowAlignment, RowJustify } from './types';

type GutterType = number | string | [number | string, number | string];

const getResponsiveGutterStyles = (gutter?: GutterType | ResponsiveValue<GutterType>) => {
  if (typeof gutter === 'undefined') {
    return {};
  }

  if (isPlainObject(gutter)) {
    return BREAKPOINTS.reduce<Record<string, string>>((styles, breakpoint) => {
      const value = gutter[breakpoint];
      if (!value) return styles;

      const [h, v] = Array.isArray(value) ? value : [value, value];

      const cssVars = {
        [`--rs-grid-gutter${breakpoint === 'xs' ? '' : `-${breakpoint}`}`]: getCssValue(h),
        [`--rs-grid-row-gutter${breakpoint === 'xs' ? '' : `-${breakpoint}`}`]: getCssValue(v)
      };

      return mergeStyles(styles, cssVars) as Record<string, string>;
    }, {});
  }

  const [h, v] = Array.isArray(gutter) ? gutter : [gutter, gutter];

  return {
    '--rs-grid-gutter': getCssValue(h as string | number),
    '--rs-grid-row-gutter': getCssValue(v as string | number)
  };
};

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

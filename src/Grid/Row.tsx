import React from 'react';
import { useStyles } from '@/internals/hooks';
import { useCustom } from '../CustomProvider';
import { forwardRef, mergeStyles, getCssValue } from '@/internals/utils';
import { BREAKPOINTS } from '@/internals/constants';
import type { WithAsProps, ResponsiveValue } from '@/internals/types';
import type { RowAlignment, RowJustify } from './types';

const getResponsiveGutterStyles = (gutter?: number | string | ResponsiveValue<number | string>) => {
  if (!gutter) {
    return {};
  }

  if (typeof gutter !== 'object') {
    return { '--rs-grid-gutter': getCssValue(gutter) };
  }

  return BREAKPOINTS.reduce((styles, breakpoint) => {
    const breakpointValue = gutter[breakpoint];
    if (!breakpointValue) return styles;

    return mergeStyles(styles, {
      [`--rs-grid-gutter${breakpoint === 'xs' ? '' : `-${breakpoint}`}`]:
        getCssValue(breakpointValue)
    });
  }, {});
};

export interface RowProps extends WithAsProps {
  /** Spacing between columns. Support responsive values */
  gutter?: number | string | ResponsiveValue<number | string>;

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
    as: Component = 'div',
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

  return <Component {...rest} ref={ref} className={classes} style={rowStyles} />;
});

Row.displayName = 'Row';

export default Row;

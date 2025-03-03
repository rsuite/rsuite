import React from 'react';
import { useClassNames } from '@/internals/hooks';
import { useCustom } from '../CustomProvider';
import { forwardRef, mergeStyles, getCssValue } from '@/internals/utils';
import { BREAKPOINTS } from '@/internals/constants';
import type { WithAsProps } from '@/internals/types';
import type { ResponsiveValue, RowAlignment, RowJustify } from './types';

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
    const value = typeof breakpointValue === 'number' ? `${breakpointValue}px` : breakpointValue;
    return { ...styles, [`--rs-grid-gutter${breakpoint === 'xs' ? '' : `-${breakpoint}`}`]: value };
  }, {});
};

const getResponsiveClassNames = (
  withClassPrefix: (...classes: any[]) => string,
  value?: string | ResponsiveValue<string>
) => {
  if (!value) {
    return [];
  }

  if (typeof value !== 'object') {
    return [withClassPrefix(value)];
  }

  return BREAKPOINTS.reduce((classes, breakpoint) => {
    const breakpointValue = value[breakpoint];
    if (!breakpointValue) return classes;
    return [...classes, withClassPrefix(`${breakpoint}-${breakpointValue}`)];
  }, [] as string[]);
};

const getResponsiveAlignStyles = (align?: RowAlignment | ResponsiveValue<RowAlignment>) => {
  if (!align) {
    return {};
  }

  if (typeof align !== 'object') {
    return { '--rs-grid-align': align };
  }

  return BREAKPOINTS.reduce((styles, breakpoint) => {
    const breakpointValue = align[breakpoint];
    if (!breakpointValue) return styles;
    return {
      ...styles,
      [`--rs-grid-align${breakpoint === 'xs' ? '' : `-${breakpoint}`}`]: breakpointValue
    };
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

  const { withClassPrefix, merge } = useClassNames(classPrefix);
  const alignClasses = getResponsiveClassNames(withClassPrefix, align);
  const justifyClasses = getResponsiveClassNames(withClassPrefix, justify);
  const classes = merge(className, withClassPrefix(justify), ...alignClasses, ...justifyClasses);
  const rowStyles = mergeStyles(
    style,
    getResponsiveGutterStyles(gutter),
    getResponsiveAlignStyles(align)
  );

  return <Component {...rest} ref={ref} className={classes} style={rowStyles} />;
});

Row.displayName = 'Row';

export default Row;

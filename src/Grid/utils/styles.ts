import isPlainObject from 'lodash/isPlainObject';
import { BREAKPOINTS } from '@/internals/constants';
import { mergeStyles, getCssValue } from '@/internals/utils';
import type { ResponsiveValue } from '@/internals/types';
import type { GutterType } from '../types';

/**
 * Generates CSS variable styles for grid gutters, supporting both single values and arrays [horizontal, vertical]
 */
export const getResponsiveGutterStyles = (gutter?: GutterType | ResponsiveValue<GutterType>) => {
  if (typeof gutter === 'undefined') {
    return {};
  }

  // Helper function to process gutter values and generate CSS variables
  const processGutterValue = (value: any, prefix = ''): Record<string, string> => {
    const [h, v] = Array.isArray(value) ? value : [value, value];
    return {
      [`--rs-grid-gutter${prefix}`]: getCssValue(h),
      [`--rs-grid-row-gutter${prefix}`]: getCssValue(v)
    };
  };

  // Handle responsive object
  if (isPlainObject(gutter)) {
    return BREAKPOINTS.reduce<Record<string, string>>((styles, breakpoint) => {
      const value = gutter[breakpoint];
      if (!value) return styles;

      const prefix = breakpoint === 'xs' ? '' : `-${breakpoint}`;
      return mergeStyles(styles, processGutterValue(value, prefix)) as Record<string, string>;
    }, {});
  }

  // Handle non-responsive value
  return processGutterValue(gutter as GutterType);
};

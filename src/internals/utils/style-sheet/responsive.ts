import { BREAKPOINTS } from '@/internals/constants';
import type { ResponsiveValue } from '@/internals/types';

export const getResponsiveClasses = (
  prefix: (...classes: any[]) => string,
  value?: string | ResponsiveValue<string>
) => {
  if (!value) {
    return [];
  }

  if (typeof value !== 'object') {
    return [prefix(value)];
  }

  return BREAKPOINTS.reduce((classes, breakpoint) => {
    const breakpointValue = value[breakpoint];
    if (!breakpointValue) return classes;
    return [...classes, prefix(`${breakpoint}-${breakpointValue}`)];
  }, [] as string[]);
};

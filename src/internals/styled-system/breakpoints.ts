import type { Breakpoints } from '@/internals/types';

/**
 * Breakpoint values in pixels - matching SCSS variables.
 * Keep this module independent of CSS processing so media-query consumers only load the values.
 */
export const breakpointValues: Record<Breakpoints, number> = {
  xs: 0, // Base mobile first
  sm: 576, // $screen-sm
  md: 768, // $screen-md
  lg: 992, // $screen-lg
  xl: 1200, // $screen-xl
  xxl: 1400, // $screen-xxl
  '2xl': 1400 // Alias for xxl for compatibility
} as const;

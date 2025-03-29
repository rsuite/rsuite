/**
 * Breakpoint map with breakpoint names as keys and size values as values
 */
export interface BreakpointMap {
  [key: string]: string;
}

/**
 * Media query map with breakpoint names as keys and media query strings as values
 */
export interface MediaQueryMap {
  [key: string]: string;
}

/**
 * The type of the query parameter.
 */
export type Query = string;

/**
 * Breakpoint entry with name, min and max values
 */
export interface BreakpointEntry {
  name: string;
  min: string | null;
  max: string | null;
}

/**
 * Map of breakpoint condition names to media query strings
 */
export interface BreakpointConditions {
  [key: string]: string;
}

/**
 * Result of createBreakpoints function
 */
export interface BreakpointSystem {
  values: BreakpointEntry[];
  only: (name: string) => string;
  keys: () => string[];
  conditions: BreakpointConditions;
  getCondition: (key: string) => string;
  up: (name: string) => string;
  down: (name: string) => string;
  between: (minName: string, maxName: string) => string;
  legacyMap: MediaQueryMap;
  createMediaQueryMap: () => MediaQueryMap;
}

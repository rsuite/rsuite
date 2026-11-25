import isEmpty from 'lodash/isEmpty';
import camelCase from 'lodash/camelCase';
import canUseDOM from 'dom-lib/canUseDOM';
import type { StyleProperties } from '@/internals/types';

/**
 * Processes and returns a value suitable for CSS (with a unit).
 */
export function getCssValue(value?: number | string | null, unit = 'px') {
  if (value === undefined || value === null || value === '') {
    return undefined;
  }

  // If the value is 0, return it as a string without unit
  if (value === 0) {
    return '0';
  }

  // If the value is a number, append the default unit (defaults to 'px')
  if (typeof value === 'number') {
    return `${value}${unit}`;
  }

  // Return string values as is
  return value.toString();
}

/**
 * Merge multiple style objects, filtering out undefined values
 */
export function mergeStyles(
  ...styles: (StyleProperties | undefined | null)[]
): React.CSSProperties | undefined {
  const mergedStyles = styles?.filter(Boolean).reduce<StyleProperties>((acc, style) => {
    if (!style) return acc;
    return { ...acc, ...style };
  }, {});

  return isEmpty(mergedStyles) ? undefined : mergedStyles;
}

/**
 * Create CSS variables for offset positioning
 */
export function createOffsetStyles(
  offset?: [number | string, number | string],
  prefix = '--rs-offset'
): React.CSSProperties | undefined {
  if (!offset) return undefined;

  const [x, y] = offset;
  return {
    [`${prefix}-x`]: getCssValue(x),
    [`${prefix}-y`]: getCssValue(y)
  };
}

/**
 * Check if a string is a valid CSS property name
 * @param prop - The property name to check
 * @returns True if the property is a valid CSS property
 */
export function isCSSProperty(prop: string): prop is Extract<keyof CSSStyleDeclaration, string> {
  if (!canUseDOM || typeof prop !== 'string' || !prop) {
    return false;
  }

  try {
    // Handle standard properties
    const style = document.documentElement.style;

    // Check standard property
    if (prop in style) {
      return true;
    } else if (camelCase(prop) in style) {
      return true;
    }

    // Handle vendor-prefixed properties (e.g., Webkit, Moz, ms, O)
    const prefixes = ['Webkit', 'Moz', 'ms', 'O'];
    const propName = prop.charAt(0).toUpperCase() + prop.slice(1);

    return prefixes.some(prefix => `${prefix}${propName}` in style);
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`Failed to check CSS property: ${prop}`, e);
    }
    return false;
  }
}

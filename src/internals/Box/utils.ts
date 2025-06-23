import { getCssValue, getColorValue } from '@/internals/utils';
import { processResponsiveValue, cssPropertyMap } from '@/internals/styled-system';
import type { WithResponsive } from '@/internals/types';

// Derive box property keys from style mappings
const boxPropKeys = Object.keys(cssPropertyMap);

/**
 * Extract box properties from props
 * @param props Original props object
 * @returns Object containing only box properties
 */
export const extractBoxProps = (props: Record<string, any>): Record<string, any> => {
  const boxProps: Record<string, any> = {};

  // Extract only box related properties
  boxPropKeys.forEach(key => {
    if (key in props && props[key] !== undefined) {
      boxProps[key] = props[key];
    }
  });

  return boxProps;
};

/**
 * Filter out layout properties from props
 * @param props Original props object
 * @returns New object without layout properties
 */
export const omitBoxProps = (props: Record<string, any>): Record<string, any> => {
  const filteredProps: Record<string, any> = {};

  // Copy all properties except box related ones
  Object.keys(props).forEach(key => {
    if (!boxPropKeys.includes(key)) {
      filteredProps[key] = props[key];
    }
  });

  return filteredProps;
};

// Type for CSS variable values that can be string, number, or responsive values
type CSSVarValue = WithResponsive<string | number | undefined>;

/**
 * Converts layout properties to CSS variables with abbreviated names
 * @param props Object containing layout properties
 * @returns Object with CSS variables
 */
export const getBoxCSSVariables = (props: Record<string, any>): Record<string, CSSVarValue> => {
  const cssVars: Record<string, CSSVarValue> = {};
  const prefix = `--rs-box-`;
  const cssVar = (name: keyof typeof cssPropertyMap) => `${prefix}${name}`;

  // Process padding, margin, size properties
  Object.entries(cssPropertyMap).forEach(([name, prop]) => {
    const { type, valueTransformer } = prop;

    if (typeof props[name] === 'undefined') {
      return;
    }

    const varName = cssVar(name);
    const value = props[name];

    if (valueTransformer) {
      cssVars[varName] = processResponsiveValue(value, val => valueTransformer(val));
    } else if (['spacing', 'sizing'].includes(type)) {
      cssVars[varName] = processResponsiveValue(value, val => getCssValue(val));
    } else if (type === 'color') {
      cssVars[varName] = processResponsiveValue(value, val => getColorValue(val));
    } else if (['border', 'layout', 'flex'].includes(type)) {
      cssVars[varName] = processResponsiveValue(value, val => val);
    }
  });

  return cssVars;
};

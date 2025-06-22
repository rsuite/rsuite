import { getCssValue, getSizeStyle, getColorVar } from '@/internals/utils';
import { BREAKPOINTS } from '@/internals/constants';
import type { ResponsiveValue } from '@/internals/types';
import type { Color } from '@/internals/types/colours';

// Mapping for padding properties to their CSS style equivalents
const paddingStyleMap: Record<string, string> = {
  p: 'padding',
  pt: 'paddingTop',
  pb: 'paddingBottom',
  pl: 'paddingLeft',
  pr: 'paddingRight',
  px: 'paddingInline',
  py: 'paddingBlock'
};

// Mapping for margin properties to their CSS style equivalents
const marginStyleMap: Record<string, string> = {
  m: 'margin',
  mt: 'marginTop',
  mb: 'marginBottom',
  ml: 'marginLeft',
  mr: 'marginRight',
  mx: 'marginInline',
  my: 'marginBlock'
};

// Mapping for size properties to their CSS style equivalents
const sizeStyleMap: Record<string, string> = {
  w: 'width',
  h: 'height',
  minw: 'minWidth',
  maxw: 'maxWidth',
  minh: 'minHeight',
  maxh: 'maxHeight'
};

// Derive box property keys from style mappings
const boxPropKeys = [
  ...Object.keys(paddingStyleMap),
  ...Object.keys(marginStyleMap),
  ...Object.keys(sizeStyleMap),
  'bd',
  'bg',
  'c',
  'display',
  'rounded',
  'shadow'
];

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

/**
 * Checks if a value is a responsive value object
 * @param value - Value to check
 * @returns True if the value is a responsive value object
 */
function isResponsiveValue(value: any): value is ResponsiveValue<any> {
  return (
    value !== null &&
    typeof value === 'object' &&
    !Array.isArray(value) &&
    Object.keys(value).some(key => BREAKPOINTS.includes(key))
  );
}

/**
 * Process a value that might be a responsive value
 * @param value - Value to process
 * @param processor - Function to process non-responsive values
 * @returns Processed value or responsive object with processed values
 */
function processResponsiveValue<T, R extends string | number | undefined>(
  value: T | ResponsiveValue<T> | undefined,
  processor: (val: T) => R
): R | ResponsiveValue<R> | undefined {
  if (value === undefined) {
    return undefined;
  }

  if (isResponsiveValue(value)) {
    const result: ResponsiveValue<R> = {};
    Object.entries(value).forEach(([breakpoint, val]) => {
      if (val !== undefined) {
        const processed = processor(val as T);
        if (processed !== undefined) {
          result[breakpoint as keyof ResponsiveValue<R>] = processed;
        }
      }
    });
    return Object.keys(result).length > 0 ? result : undefined;
  }

  return processor(value as T);
}

// Type for CSS variable values that can be string, number, or responsive values
type CSSVarValue = string | number | undefined | ResponsiveValue<string | number>;

// Silence ESLint warnings for unused parameters in forEach callbacks
/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * Converts layout properties to CSS variables with abbreviated names
 * @param props Object containing layout properties
 * @returns Object with CSS variables
 */
export const getBoxCSSVariables = (props: Record<string, any>): Record<string, CSSVarValue> => {
  const cssVars: Record<string, CSSVarValue> = {};
  const prefix = `--rs-box-`;

  // Process padding properties
  Object.keys(paddingStyleMap).forEach(propKey => {
    if (props[propKey] !== undefined) {
      cssVars[`${prefix}${propKey}`] = processResponsiveValue(
        props[propKey],
        val => getCssValue(val) as string
      );
    }
  });

  // Process margin properties
  Object.keys(marginStyleMap).forEach(propKey => {
    if (props[propKey] !== undefined) {
      cssVars[`${prefix}${propKey}`] = processResponsiveValue(
        props[propKey],
        val => getCssValue(val) as string
      );
    }
  });

  // Process size properties
  Object.keys(sizeStyleMap).forEach(propKey => {
    if (props[propKey] !== undefined) {
      cssVars[`${prefix}${propKey}`] = processResponsiveValue(
        props[propKey],
        val => getCssValue(val) as string
      );
    }
  });

  if (props.bd !== undefined) {
    cssVars[`${prefix}bd`] = processResponsiveValue(props.bd, val => getCssValue(val) as string);
  }

  if (props.display !== undefined) {
    cssVars[`${prefix}display`] = processResponsiveValue(props.display, val => val as string);
  }

  if (props.c !== undefined) {
    cssVars[`${prefix}c`] = processResponsiveValue(
      props.c,
      val => getColorVar(val as Color | string) as string
    );
  }

  if (props.bg !== undefined) {
    cssVars[`${prefix}bg`] = processResponsiveValue(
      props.bg,
      val => getColorVar(val as Color | string) as string
    );
  }

  // Handle special cases for rounded and shadow
  if (props.rounded !== undefined) {
    const processRounded = (val: any) => {
      const result = getSizeStyle(val, 'box', 'rounded');
      return result ? result : undefined;
    };

    if (isResponsiveValue(props.rounded)) {
      // Handle responsive rounded values
      const responsiveRounded: ResponsiveValue<Record<string, string | number | undefined>> = {};

      Object.entries(props.rounded).forEach(([breakpoint, val]) => {
        if (val !== undefined) {
          const styleObj = processRounded(val);
          if (styleObj) {
            responsiveRounded[breakpoint as keyof ResponsiveValue<Record<string, string>>] =
              styleObj;
          }
        }
      });

      // For each CSS variable key in the rounded styles, create a responsive value
      const processedKeys = new Set<string>();

      Object.entries(responsiveRounded).forEach(([_breakpoint, styleObj]) => {
        if (styleObj) {
          Object.entries(styleObj).forEach(([key, _value]) => {
            processedKeys.add(key);
          });
        }
      });

      processedKeys.forEach(key => {
        const responsiveValue: ResponsiveValue<string | number> = {};

        Object.entries(responsiveRounded).forEach(([breakpoint, styleObj]) => {
          if (styleObj && styleObj[key] !== undefined) {
            // Ensure we're only using string values for CSS variables
            const value = styleObj[key];
            if (typeof value === 'string' || typeof value === 'number') {
              responsiveValue[breakpoint as keyof ResponsiveValue<string | number>] = value;
            }
          }
        });

        if (Object.keys(responsiveValue).length > 0) {
          cssVars[key] = responsiveValue;
        }
      });
    } else {
      // Handle non-responsive rounded value
      const styleObj = processRounded(props.rounded);
      if (styleObj) {
        Object.entries(styleObj).forEach(([key, value]) => {
          cssVars[key] = value;
        });
      }
    }
  }

  if (props.shadow !== undefined) {
    const processShadow = (val: any) => {
      const result = getSizeStyle(val, 'box', 'shadow');
      return result ? result : undefined;
    };

    if (isResponsiveValue(props.shadow)) {
      // Handle responsive shadow values
      const responsiveShadow: ResponsiveValue<Record<string, string | number | undefined>> = {};

      Object.entries(props.shadow).forEach(([breakpoint, val]) => {
        if (val !== undefined) {
          const styleObj = processShadow(val);
          if (styleObj) {
            responsiveShadow[breakpoint as keyof ResponsiveValue<Record<string, string>>] =
              styleObj;
          }
        }
      });

      // For each CSS variable key in the shadow styles, create a responsive value
      const processedKeys = new Set<string>();

      Object.entries(responsiveShadow).forEach(([_breakpoint, styleObj]) => {
        if (styleObj) {
          Object.entries(styleObj).forEach(([key, _value]) => {
            processedKeys.add(key);
          });
        }
      });

      processedKeys.forEach(key => {
        const responsiveValue: ResponsiveValue<string | number> = {};

        Object.entries(responsiveShadow).forEach(([breakpoint, styleObj]) => {
          if (styleObj && styleObj[key] !== undefined) {
            // Ensure we're only using string values for CSS variables
            const value = styleObj[key];
            if (typeof value === 'string' || typeof value === 'number') {
              responsiveValue[breakpoint as keyof ResponsiveValue<string | number>] = value;
            }
          }
        });

        if (Object.keys(responsiveValue).length > 0) {
          cssVars[key] = responsiveValue;
        }
      });
    } else {
      // Handle non-responsive shadow value
      const styleObj = processShadow(props.shadow);
      if (styleObj) {
        Object.entries(styleObj).forEach(([key, value]) => {
          cssVars[key] = value;
        });
      }
    }
  }

  return cssVars;
};

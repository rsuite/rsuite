import { CSSProperties, useId, useLayoutEffect, useContext } from 'react';
import isEmpty from 'lodash/isEmpty';
import StyleManager from '../utils/style-sheet/style-manager';
import type { Breakpoints } from '../types';
import { CustomContext } from '@/internals/Provider/CustomContext';

// CSS Property Map
const propertyMap: Record<string, string> = {
  // Padding
  p: 'padding',
  pt: 'padding-top',
  pr: 'padding-right',
  pb: 'padding-bottom',
  pl: 'padding-left',

  // Margin
  m: 'margin',
  mt: 'margin-top',
  mr: 'margin-right',
  mb: 'margin-bottom',
  ml: 'margin-left',

  // Size
  w: 'width',
  h: 'height',
  minw: 'min-width',
  maxw: 'max-width',
  minh: 'min-height',
  maxh: 'max-height',

  // Display
  display: 'display',

  // Color and Background
  c: 'color',
  bg: 'background',

  // Border
  bd: 'border',
  rounded: 'border-radius',

  // Shadow
  shadow: 'box-shadow',

  // Stack
  spacing: 'gap',
  align: 'align-items',
  justify: 'justify-content'
};

/**
 * Options for the useStyled hook
 */
interface UseStyledOptions {
  /**
   * CSS variables to apply
   */
  cssVars?: Record<string, string | number | undefined>;

  /**
   * Base class name to include
   */
  className?: string;

  /**
   * Base style to merge with
   */
  style?: CSSProperties;

  /**
   * Whether this element should be styled
   * Can be a boolean or a breakpoint string
   */
  enabled?: boolean | Breakpoints;

  /**
   * Prefix for the generated class name
   * @default 'rs'
   */
  prefix?: string;
}

/**
 * Result of the useStyled hook
 */
interface UseStyledResult {
  /**
   * Combined class name including the unique identifier
   */
  className: string | undefined;

  /**
   * Style object without CSS variables
   */
  style: CSSProperties | undefined;

  /**
   * Unique identifier for this styled element
   */
  id: string;
}

/**
 * Custom hook for managing component styling with scoped CSS variables
 *
 * This hook handles:
 * 1. Generating a unique class name for the component
 * 2. Creating a scoped style rule to prevent CSS variable inheritance
 * 3. Managing the lifecycle of style rules
 *
 * @param options - Styling options
 * @returns Styling properties to apply to the component
 */
export function useStyled(options: UseStyledOptions): UseStyledResult {
  const { cssVars = {}, className, style, enabled = true, prefix = 'box' } = options;

  // CSS Variable Prefix, e.g. --rs-box-
  const cssVarPrefix = `--rs-${prefix}-`;

  const { csp } = useContext(CustomContext);

  // Generate a unique ID for this component instance
  const uniqueId = useId().replace(/:/g, '');
  const componentId = `${prefix}-${uniqueId}`;

  // Only apply styling if enabled and there are CSS variables
  const shouldApplyStyles = enabled && !isEmpty(cssVars);

  // Apply CSS variables through StyleManager
  useLayoutEffect(() => {
    if (!shouldApplyStyles) return;

    // Create CSS rules for the variables
    let cssRules = '';

    // Add CSS variable definitions
    Object.entries(cssVars).forEach(([key, value]) => {
      if (value !== undefined) {
        cssRules += `${key}: ${value}; `;
      }
    });

    // Add actual style rules based on CSS variables
    if (!isEmpty(cssVars)) {
      // Iterate over all CSS variables and add corresponding CSS properties
      Object.keys(cssVars).forEach(varName => {
        // Extract property name from variable name (remove prefix)
        const propName = varName.startsWith(cssVarPrefix)
          ? varName.substring(cssVarPrefix.length)
          : varName;

        // Check if the property has a corresponding CSS property mapping
        const cssProperty = propertyMap[propName];
        if (cssProperty) {
          cssRules += `${cssProperty}: var(${varName}); `;
        }
      });
    }

    // Add the rule to the style manager with CSP nonce
    StyleManager.addRule(`.${componentId}`, cssRules, { nonce: csp?.nonce });

    return () => {
      // Clean up rules when component unmounts
      StyleManager.removeRule(`.${componentId}`);
    };
  }, [componentId, cssVars, shouldApplyStyles]);

  // Combine class names
  const combinedClassName = shouldApplyStyles
    ? `${className || ''} ${componentId}`.trim()
    : className;

  return {
    className: combinedClassName || undefined,
    style,
    id: componentId
  };
}

export default useStyled;

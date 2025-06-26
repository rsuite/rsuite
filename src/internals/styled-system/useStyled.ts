import isEmpty from 'lodash/isEmpty';
import { CSSProperties, useId, useContext } from 'react';
import { useIsomorphicLayoutEffect } from '@/internals/hooks';
import { isCSSProperty } from '@/internals/utils';
import { CustomContext } from '@/internals/Provider/CustomContext';
import { breakpointValues, isResponsiveValue } from './responsive';
import { cssSystemPropAlias } from './css-property';
import { StyleManager } from './style-manager';
import type { Breakpoints, WithResponsive, ResponsiveValue } from '@/internals/types';

interface UseStyledOptions {
  /**
   * CSS variables to apply
   */
  cssVars?: Record<string, WithResponsive<string | number | undefined>>;

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
 * 4. Handling responsive values for different breakpoints
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
  const componentId = `rs-${prefix}-${uniqueId}`;

  // Only apply styling if enabled and there are CSS variables
  const shouldApplyStyles = enabled && !isEmpty(cssVars);

  // Apply CSS variables through StyleManager
  useIsomorphicLayoutEffect(() => {
    if (!shouldApplyStyles) return;

    // Create base CSS rules for the variables
    let baseVarRules = '';
    let basePropRules = '';

    // Track responsive variables to handle separately
    const responsiveVars: Record<string, ResponsiveValue<string | number | undefined>> = {};

    // Process CSS variables, separating responsive from non-responsive
    Object.entries(cssVars).forEach(([key, value]) => {
      if (value !== undefined) {
        if (isResponsiveValue(value)) {
          // Store responsive values for later processing
          responsiveVars[key] = value;

          // Add xs (mobile first) values to base styles if present
          const xsValue = (value as ResponsiveValue<string | number>).xs;
          if (xsValue !== undefined) {
            baseVarRules += `${key}: ${xsValue}; `;
          }
        } else {
          // Add non-responsive values directly
          baseVarRules += `${key}: ${value}; `;
        }
      }
    });

    // Add actual style rules based on CSS variables
    Object.keys(cssVars).forEach(varName => {
      // Skip responsive values that don't have xs values
      if (
        responsiveVars[varName] &&
        !(responsiveVars[varName] as ResponsiveValue<string | number>).xs
      )
        return;

      // Extract property name from variable name (remove prefix)
      const propName = varName.startsWith(cssVarPrefix)
        ? varName.substring(cssVarPrefix.length)
        : varName;

      // Check if the property has a corresponding CSS property mapping
      const cssProperty = cssSystemPropAlias[propName];
      if (cssProperty) {
        basePropRules += `${cssProperty.property}: var(${varName}); `;
      } else if (isCSSProperty(propName)) {
        basePropRules += `${propName}: var(${varName}); `;
      }
    });

    // Combine variable definitions and property assignments
    const baseCssRules = baseVarRules + basePropRules;

    // Add the base rule to the style manager
    StyleManager.addRule(`.${componentId}`, baseCssRules, { nonce: csp?.nonce });

    // Process responsive variables
    if (!isEmpty(responsiveVars)) {
      // Create media queries for each breakpoint
      const breakpointVarRules: Record<Breakpoints, string> = {
        xs: '', // xs rules will be merged into base styles
        sm: '',
        md: '',
        lg: '',
        xl: '',
        xxl: '',
        '2xl': ''
      };

      const breakpointPropRules: Record<Breakpoints, string> = {
        xs: '',
        sm: '',
        md: '',
        lg: '',
        xl: '',
        xxl: '',
        '2xl': ''
      };

      // Group styles by breakpoint
      Object.entries(responsiveVars).forEach(([varName, responsiveValue]) => {
        Object.entries(responsiveValue).forEach(([breakpoint, value]) => {
          const bp = breakpoint as Breakpoints;
          if (value !== undefined && bp !== 'xs') {
            // Add the CSS variable definition for this breakpoint
            breakpointVarRules[bp] += `${varName}: ${value}; `;

            // Extract property name from variable name (remove prefix)
            const propName = varName.startsWith(cssVarPrefix)
              ? varName.substring(cssVarPrefix.length)
              : varName;

            // Check if the property has a corresponding CSS property mapping
            const cssProperty = cssSystemPropAlias[propName];
            if (cssProperty) {
              breakpointPropRules[bp] += `${cssProperty}: var(${varName}); `;
            } else if (isCSSProperty(propName)) {
              breakpointPropRules[bp] += `${propName}: var(${varName}); `;
            }
          }
        });
      });

      // Combine variable definitions and property assignments for each breakpoint
      const breakpointRules: Record<Breakpoints, string> = {
        xs: '',
        sm: breakpointVarRules.sm + breakpointPropRules.sm,
        md: breakpointVarRules.md + breakpointPropRules.md,
        lg: breakpointVarRules.lg + breakpointPropRules.lg,
        xl: breakpointVarRules.xl + breakpointPropRules.xl,
        xxl: breakpointVarRules.xxl + breakpointPropRules.xxl,
        '2xl': breakpointVarRules['2xl'] + breakpointPropRules['2xl']
      };

      // Add media queries for each breakpoint with rules (skip xs)
      Object.entries(breakpointRules).forEach(([breakpoint, rules]) => {
        if (rules && breakpoint !== 'xs') {
          const bp = breakpoint as Breakpoints;
          const minWidth = breakpointValues[bp];
          StyleManager.addRule(
            `@media (min-width: ${minWidth}px)`,
            `.${componentId} { ${rules} }`,
            { nonce: csp?.nonce }
          );
        }
      });
    }

    return () => {
      // Clean up rules when component unmounts
      StyleManager.removeRule(`.${componentId}`);

      // Clean up media query rules
      Object.keys(breakpointValues).forEach(breakpoint => {
        const bp = breakpoint as Breakpoints;
        const minWidth = breakpointValues[bp];
        StyleManager.removeRule(`@media (min-width: ${minWidth}px)`);
      });
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

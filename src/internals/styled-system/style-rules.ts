import isEmpty from 'lodash/isEmpty';
import { breakpointValues } from './breakpoints';
import { isResponsiveValue } from './responsive';
import { cssSystemPropAlias } from './css-alias';
import { isSupportedCSSProperty } from './css-properties';
import type { Breakpoints, WithResponsive, ResponsiveValue } from '@/internals/types';

export type StyleVariables = Record<string, WithResponsive<string | number | undefined>>;

export interface StyleRule {
  selector: string;
  cssText: string;
  key?: string;
}

/** Build scoped and responsive rules without accessing a document or stylesheet. */
export function createStyleRules(
  componentId: string,
  cssVars: StyleVariables,
  prefix: string
): StyleRule[] {
  const cssVarPrefix = `--rs-${prefix}-`;
  const styleRules: StyleRule[] = [];
  // The identifier starts with rs-; escape other characters without requiring CSS.escape.
  const escapedId = componentId.replace(
    /[^\w-]/gu,
    char => `\\${char.codePointAt(0)!.toString(16)} `
  );
  // Require the class while raising priority above component and state selectors.
  const selector = `.${escapedId}:is(#${escapedId}, .${escapedId})`;

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
      (responsiveVars[varName] as ResponsiveValue<string | number>).xs === undefined
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
    } else if (isSupportedCSSProperty(propName)) {
      basePropRules += `${propName}: var(${varName}); `;
    }
  });

  // Combine variable definitions and property assignments
  const baseCssRules = baseVarRules + basePropRules;

  // Add the base rule to the style manager
  styleRules.push({ selector, cssText: baseCssRules });

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
            breakpointPropRules[bp] += `${cssProperty.property}: var(${varName}); `;
          } else if (isSupportedCSSProperty(propName)) {
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
        const key = `${componentId}-${breakpoint}`;
        styleRules.push({
          selector: `@media (min-width: ${minWidth}px)`,
          cssText: `${selector} { ${rules} }`,
          key
        });
      }
    });
  }

  return styleRules;
}

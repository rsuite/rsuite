import isEmpty from 'lodash/isEmpty';
import { CSSProperties, useId, useContext } from 'react';
import { useIsomorphicLayoutEffect } from '@/internals/hooks';
import { CustomContext } from '@/internals/Provider/CustomContext';
import { StyleManager } from './style-manager';
import { encodeStyleId } from './style-id';
import { createStyleRules, type StyleVariables } from './style-rules';
import { StyleContext } from './registry/StyleContext';
import type { Breakpoints } from '@/internals/types';

interface UseStyledOptions {
  /**
   * CSS variables to apply
   */
  cssVars?: StyleVariables;

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

  const { csp } = useContext(CustomContext);
  const registryScope = useContext(StyleContext);
  const manager = registryScope ?? StyleManager;

  // Generate a unique ID for this component instance
  const uniqueId = encodeStyleId(useId());
  const baseComponentId = `rs-${prefix}-${uniqueId}`;
  const componentId = registryScope
    ? registryScope.getStyleId(baseComponentId, cssVars, prefix)
    : baseComponentId;

  // Only apply styling if enabled and there are CSS variables
  const shouldApplyStyles = enabled && !isEmpty(cssVars);

  if (registryScope && typeof document === 'undefined' && shouldApplyStyles) {
    registryScope.collectStyles(baseComponentId, cssVars, prefix, csp?.nonce);
  }

  // Apply CSS variables through StyleManager
  useIsomorphicLayoutEffect(() => {
    if (!shouldApplyStyles) return;

    const rules = createStyleRules(componentId, cssVars, prefix);
    rules.forEach(({ selector, cssText, key }) => {
      manager.addRule(selector, cssText, {
        nonce: csp?.nonce,
        ...(key === undefined ? {} : { key })
      });
    });

    return () => {
      rules.forEach(({ key, selector }) => manager.removeRule(key ?? selector));
    };
  }, [componentId, cssVars, shouldApplyStyles, manager, csp?.nonce]);

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

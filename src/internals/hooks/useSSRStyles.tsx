import React, { useMemo, useEffect } from 'react';
import { StyleCollector } from '@/internals/styled-system/style-collector';
import { StyleManager } from '@/internals/styled-system/style-manager';

export interface UseSSRStylesOptions {
  /**
   * Custom StyleCollector instance
   * If provided, auto-creation will be skipped
   */
  collector?: StyleCollector;

  /**
   * Enable automatic SSR style collection
   * @default true
   */
  enabled?: boolean;

  /**
   * CSP nonce for inline styles
   */
  nonce?: string;
}

export interface UseSSRStylesResult {
  /**
   * StyleCollector instance (undefined on client)
   */
  collector: StyleCollector | undefined;

  /**
   * Whether currently in SSR environment
   */
  isSSR: boolean;

  /**
   * Style element to inject (null on client or when no styles)
   */
  styleElement: React.ReactElement | null;
}

/**
 * Hook for automatic SSR style collection
 *
 * This hook automatically:
 * - Detects SSR environment
 * - Creates StyleCollector during SSR
 * - Sets collector to StyleManager
 * - Generates style element for injection
 * - Cleans up on unmount
 *
 * @example
 * ```tsx
 * function MyProvider({ children }) {
 *   const { styleElement } = useSSRStyles();
 *
 *   return (
 *     <>
 *       {styleElement}
 *       {children}
 *     </>
 *   );
 * }
 * ```
 */
export function useSSRStyles(options: UseSSRStylesOptions = {}): UseSSRStylesResult {
  const { collector: userCollector, enabled = true, nonce } = options;

  // Detect SSR environment (stable across renders)
  const isSSR = useMemo(() => typeof window === 'undefined', []);

  // Create or use provided collector
  const collector = useMemo(() => {
    // If user provided a collector, use it
    if (userCollector) {
      return userCollector;
    }

    // If SSR is disabled, return undefined
    if (!enabled) {
      return undefined;
    }

    // Auto-create collector during SSR
    if (isSSR) {
      return new StyleCollector(nonce);
    }

    return undefined;
  }, [userCollector, enabled, isSSR, nonce]);

  // Synchronously set collector to StyleManager during SSR
  // This must happen before rendering so child components can use it
  if (isSSR && collector) {
    StyleManager.setCollector(collector);
  }

  // On client, cleanup collector on unmount
  useEffect(() => {
    if (!isSSR) {
      return () => {
        StyleManager.setCollector(null);
      };
    }
  }, [isSSR]);

  // Generate style element for SSR
  // Note: This returns a placeholder that will be replaced with actual styles
  // after all components have rendered and added their styles to the collector
  const styleElement = useMemo(() => {
    if (!isSSR || !collector) {
      return null;
    }

    // Return style element with collected styles
    // The collector will be populated as child components render
    return (
      <style
        data-rs-style-manager
        nonce={nonce}
        dangerouslySetInnerHTML={collector.getStyleHTML()}
      />
    );
  }, [isSSR, collector, nonce]);

  return {
    collector,
    isSSR,
    styleElement
  };
}

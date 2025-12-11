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

  /**
   * Force SSR mode (useful for testing)
   * When true, will create collector even in browser environment
   * @default false
   */
  forceSSR?: boolean;
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
 * SSRStyleElement - A component that renders collected styles during SSR
 *
 * This component must be rendered AFTER children so that all styles
 * have been collected before rendering the style element.
 */
interface SSRStyleElementProps {
  collector: StyleCollector;
  nonce?: string;
}

function SSRStyleElement({ collector, nonce }: SSRStyleElementProps) {
  // This component renders during SSR, and at this point
  // all child components have already added their styles to the collector
  return (
    <style data-rs-style-manager nonce={nonce} dangerouslySetInnerHTML={collector.getStyleHTML()} />
  );
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
 *       {children}
 *       {styleElement}
 *     </>
 *   );
 * }
 * ```
 */
export function useSSRStyles(options: UseSSRStylesOptions = {}): UseSSRStylesResult {
  const { collector: userCollector, enabled = true, nonce, forceSSR = false } = options;

  // Detect SSR environment (stable across renders)
  const isSSR = useMemo(() => forceSSR || typeof window === 'undefined', [forceSSR]);

  // Check if SSR styles already exist in the DOM (client-side only)
  const hasSSRStyles = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return !!document.querySelector('[data-rs-style-manager]');
  }, []);

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

    // On client: if SSR styles already exist, don't create a new collector
    // This prevents duplicate style collection after hydration
    if (!isSSR && hasSSRStyles) {
      return undefined;
    }

    // Auto-create collector during SSR or when forceSSR is enabled
    if (isSSR) {
      return new StyleCollector(nonce);
    }

    return undefined;
  }, [userCollector, enabled, isSSR, nonce, hasSSRStyles]);

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
  // IMPORTANT: Only auto-render styleElement if we auto-created the collector
  // If user provided their own collector, they are responsible for extracting styles
  const styleElement = useMemo(() => {
    // Don't render if not in SSR mode
    if (!isSSR || !collector) {
      return null;
    }

    // Don't render if user provided their own collector
    // They will use rsuite/ssr API to extract styles manually
    if (userCollector) {
      return null;
    }

    // Only auto-render for auto-created collectors
    return <SSRStyleElement collector={collector} nonce={nonce} />;
  }, [isSSR, collector, nonce, userCollector]);

  return {
    collector,
    isSSR,
    styleElement
  };
}

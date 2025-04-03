import { useEffect } from 'react';
import { useScript } from './useScript';

/**
 * Loads Less.js and return the Less API
 * @param cdnUrl The CDN URL of Less.js
 * @param options The options to pass to Less.js
 * @returns Less object or undefined if Less.js is not loaded
 */
export function useLess(cdnUrl: string, options?: any) {
  useEffect(() => {
    // Less global config.
    if (!window['less']) {
      window['less'] = options as any;
    }
  });

  const status = useScript(cdnUrl);

  return status === 'ready' ? window['less'] : undefined;
}

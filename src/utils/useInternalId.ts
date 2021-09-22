import { useDebugValue, useRef } from 'react';
import uniqueId from 'lodash/uniqueId';

/**
 * Used for generating unique ID for DOM elements
 */
export default function useInternalId(prefix?: string) {
  const idRef = useRef<string>();

  if (!idRef.current) {
    idRef.current = uniqueId(`internal://${prefix}`);
  }

  useDebugValue(idRef.current);

  return idRef.current;
}

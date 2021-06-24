import { useRef } from 'react';
import uniqueId from 'lodash/uniqueId';

/**
 * Used for generating unique ID for elements
 */
export default function useUniqueId(prefix?: string) {
  const idRef = useRef<string>();

  if (!idRef.current) {
    idRef.current = uniqueId(prefix);
  }

  return idRef.current;
}

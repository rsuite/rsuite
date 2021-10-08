import { useRef } from 'react';
import uniqueId from 'lodash/uniqueId';

/**
 * Used for generating unique ID for DOM elements
 *
 * @param idProp If id is provided, it will be used instead of generating a new one
 */
export default function useUniqueId(prefix: string, idProp?: string) {
  const idRef = useRef<string>();

  if (!idRef.current) {
    idRef.current = uniqueId(prefix);
  }

  return idProp ?? idRef.current;
}

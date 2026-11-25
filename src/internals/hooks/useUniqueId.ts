import { useId } from 'react';

/**
 * Used for generating unique ID for DOM elements
 *
 * @param idProp If id is provided, it will be used instead of generating a new one
 */
export function useUniqueId(prefix: string, idProp?: string) {
  const generatedId = useId();
  return idProp ?? `${prefix}${generatedId}`;
}

export default useUniqueId;

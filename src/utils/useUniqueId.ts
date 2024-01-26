import * as React from 'react';
import uniqueId from 'lodash/uniqueId';

const reactUseId: undefined | (() => string) = (React as any)['useId'.toString()];

/**
 * Used for generating unique ID for DOM elements
 *
 * @param idProp If id is provided, it will be used instead of generating a new one
 */
export default function useUniqueId(prefix: string, idProp?: string) {
  const idRef = React.useRef<string>();

  if (reactUseId !== undefined) {
    return idProp ?? `${prefix}${reactUseId()}`;
  }

  if (!idRef.current) {
    idRef.current = uniqueId(prefix);
  }

  return idProp ?? idRef.current;
}

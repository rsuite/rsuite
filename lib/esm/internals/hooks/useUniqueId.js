'use client';
import * as React from 'react';
import uniqueId from 'lodash/uniqueId';
var reactUseId = React['useId'.toString()];

/**
 * Used for generating unique ID for DOM elements
 *
 * @param idProp If id is provided, it will be used instead of generating a new one
 */
export function useUniqueId(prefix, idProp) {
  var idRef = React.useRef();
  if (reactUseId !== undefined) {
    return idProp !== null && idProp !== void 0 ? idProp : "" + prefix + reactUseId();
  }
  if (!idRef.current) {
    idRef.current = uniqueId(prefix);
  }
  return idProp !== null && idProp !== void 0 ? idProp : idRef.current;
}
export default useUniqueId;
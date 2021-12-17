import { useEffect, useState } from 'react';
import uniqueId from 'lodash/uniqueId';

/**
 * Used for generating unique ID for DOM elements
 *
 * @param idProp If id is provided, it will be used instead of generating a new one
 */
export default function useUniqueId(prefix: string, idProp?: string) {
  const [idState, setIDState] = useState<string>('');

  useEffect(() => {
    if (!idState) {
      setIDState(uniqueId(prefix));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return idProp ?? idState;
}

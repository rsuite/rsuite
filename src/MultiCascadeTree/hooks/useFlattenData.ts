import { useState, useCallback, useEffect } from 'react';
import { UNSAFE_flattenTree } from '../../Tree/utils';
import { attachParent } from '@/internals/utils';
import { ItemKeys } from '../types';

/**
 * A hook to flatten tree structure data
 */
function useFlattenData<T>(data: T[], itemKeys: ItemKeys) {
  const { childrenKey } = itemKeys;
  const [flattenData, setFlattenData] = useState<T[]>(
    UNSAFE_flattenTree(data, itemKeys.childrenKey)
  );

  const addFlattenData = useCallback(
    (children: T[], parent: T) => {
      const nodes = children.map(child => {
        return attachParent(child, parent);
      });

      parent[childrenKey] = nodes;

      setFlattenData([...flattenData, ...nodes]);
    },
    [childrenKey, flattenData]
  );

  useEffect(() => {
    setFlattenData(UNSAFE_flattenTree(data, itemKeys.childrenKey));
  }, [data, itemKeys.childrenKey]);

  return { addFlattenData, flattenData };
}

export default useFlattenData;

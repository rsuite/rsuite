import { useState, useCallback, useEffect } from 'react';
import { shallowEqual } from '@/internals/utils';
import { findNodeOfTree } from '@/internals/Tree/utils';
import type { TreeNode } from '@/internals/Tree/types';

interface UseTreeWithChildrenOptions {
  valueKey: string;
  childrenKey: string;
}

/**
 * Custom hook that provides functionality for managing a tree structure with children.
 */
export default function useTreeWithChildren<T extends TreeNode>(
  data: T[],
  options: UseTreeWithChildrenOptions
) {
  const { valueKey, childrenKey } = options;
  const [loadingNodeValues, setLoadingNodeValues] = useState([]);
  const [treeData, setTreeData] = useState(data);

  useEffect(() => {
    setTreeData(data);
  }, [data]);

  const concatChildren = useCallback(
    (treeNode: TreeNode, children: any[]): any[] => {
      const value = treeNode[valueKey];
      treeNode = findNodeOfTree(data, item => value === item[valueKey]);
      treeNode[childrenKey] = children;
      const newData = data.concat([]);
      setTreeData(newData);
      return newData;
    },
    [data, valueKey, childrenKey]
  );

  const appendChild = useCallback(
    (node, getChildren) => {
      setLoadingNodeValues(prev => prev.concat(node[valueKey]));
      const children = getChildren(node);

      if (children instanceof Promise) {
        children.then(res => {
          const newData = concatChildren(node, res);
          setTreeData(newData);
          setLoadingNodeValues(prev => prev.filter(item => !shallowEqual(item, node[valueKey])));
        });
      } else {
        setTreeData(concatChildren(node, children));
        setLoadingNodeValues(prev => prev.filter(item => !shallowEqual(item, node[valueKey])));
      }
    },
    [concatChildren, valueKey]
  );
  return { treeData, loadingNodeValues, appendChild };
}
